import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import {
  contactInquirySchema,
  inquiryRequestSchema,
  piercingInquirySchema,
  tattooInquirySchema,
  type InquiryPayload,
} from "@/lib/validators";
import { htmlEmail, inquirySubject, safeText, whatsappText, type ProviderName } from "@/lib/inquiry";

const MAX_BODY_BYTES = 64 * 1024;
const memoryRequests = new Map<string, number[]>();
let distributedLimiter: Ratelimit | null | undefined;

type ProviderResult = { name: ProviderName; promise: Promise<void> };

function requestId() {
  return `INQ-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}

function clientIp(request: Request) {
  return request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

function getDistributedLimiter() {
  if (distributedLimiter !== undefined) return distributedLimiter;
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    distributedLimiter = null;
    return distributedLimiter;
  }
  distributedLimiter = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, "10 m"),
    prefix: "inked-attraction:inquiry",
  });
  return distributedLimiter;
}

async function isRateLimited(identifier: string) {
  const limiter = getDistributedLimiter();
  if (limiter) return !(await limiter.limit(identifier)).success;

  const now = Date.now();
  const recent = (memoryRequests.get(identifier) ?? []).filter((timestamp) => now - timestamp < 10 * 60 * 1000);
  if (recent.length >= 5) {
    memoryRequests.set(identifier, recent);
    return true;
  }
  recent.push(now);
  memoryRequests.set(identifier, recent);
  if (memoryRequests.size > 5000) {
    for (const [key, timestamps] of memoryRequests) {
      if (timestamps.every((timestamp) => now - timestamp >= 10 * 60 * 1000)) memoryRequests.delete(key);
    }
  }
  return false;
}

function sanitizePayload(payload: InquiryPayload): InquiryPayload {
  const sanitized = JSON.parse(JSON.stringify(payload, (_key: string, value: unknown) => typeof value === "string" ? safeText(value) : value)) as InquiryPayload;
  return sanitized;
}

async function sendWebhook(payload: InquiryPayload, id: string, requestUrl: string) {
  const endpoint = process.env.INQUIRY_WEBHOOK_URL;
  if (!endpoint) throw new Error("Webhook is not configured");
  const target = new URL(endpoint);
  if (target.protocol !== "https:") throw new Error("Webhook must use HTTPS");
  const currentRequest = new URL(requestUrl);
  if (target.origin === currentRequest.origin && target.pathname === currentRequest.pathname) {
    throw new Error("Webhook cannot point to the inquiry API itself");
  }
  const response = await fetch(target, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(process.env.INQUIRY_WEBHOOK_SECRET ? { "x-inquiry-secret": process.env.INQUIRY_WEBHOOK_SECRET } : {}),
    },
    body: JSON.stringify({ type: payload.type, requestId: id, submittedAt: new Date().toISOString(), data: payload }),
    signal: AbortSignal.timeout(10_000),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Webhook returned ${response.status}`);
}

async function sendEmail(payload: InquiryPayload, id: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.INQUIRY_FROM_EMAIL;
  const to = process.env.INQUIRY_TO_EMAIL;
  if (!apiKey || !from || !to) throw new Error("Email is not configured");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject: inquirySubject(payload),
      html: htmlEmail(payload, id),
    }),
    signal: AbortSignal.timeout(10_000),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Email returned ${response.status}`);
}

async function sendWhatsApp(payload: InquiryPayload, id: string) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const recipient = process.env.WHATSAPP_RECIPIENT_NUMBER?.replace(/\D/g, "");
  if (!token || !phoneId || !recipient || recipient.length < 7) throw new Error("WhatsApp is not configured");
  const version = process.env.WHATSAPP_API_VERSION ?? "v20.0";
  const response = await fetch(`https://graph.facebook.com/${encodeURIComponent(version)}/${encodeURIComponent(phoneId)}/messages`, {
    method: "POST",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify({ messaging_product: "whatsapp", to: recipient, type: "text", text: { preview_url: false, body: whatsappText(payload, id) } }),
    signal: AbortSignal.timeout(10_000),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`WhatsApp returned ${response.status}`);
}

function successResponse() {
  return NextResponse.json({ success: true, message: "Your inquiry has been received. We'll review your request and contact you to confirm the next steps." });
}

export async function POST(request: Request) {
  const id = requestId();
  const contentType = request.headers.get("content-type")?.split(";", 1)[0].trim();
  if (contentType !== "application/json") return NextResponse.json({ success: false, error: "Invalid request." }, { status: 415 });
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) return NextResponse.json({ success: false, error: "Request is too large." }, { status: 413 });
  if (!request.headers.get("user-agent")) return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
  if (await isRateLimited(clientIp(request))) return NextResponse.json({ success: false, error: "Too many requests. Please try again later." }, { status: 429 });

  let body: unknown;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) return NextResponse.json({ success: false, error: "Request is too large." }, { status: 413 });
    body = JSON.parse(raw) as unknown;
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
  }

  const requestResult = inquiryRequestSchema.safeParse(body);
  if (!requestResult.success) return NextResponse.json({ success: false, error: "Please check your inquiry and try again." }, { status: 400 });
  if (requestResult.data.website) return successResponse();

  const schema = requestResult.data.type === "tattoo" ? tattooInquirySchema : requestResult.data.type === "piercing" ? piercingInquirySchema : contactInquirySchema;
  const parsed = schema.safeParse({ type: requestResult.data.type, ...(requestResult.data.data as object) });
  if (!parsed.success) return NextResponse.json({ success: false, error: "Please check your inquiry and try again." }, { status: 400 });

  const payload = sanitizePayload(parsed.data as InquiryPayload);
  const providers: ProviderResult[] = [];
  if (process.env.INQUIRY_WEBHOOK_URL) providers.push({ name: "webhook", promise: sendWebhook(payload, id, request.url) });
  if (process.env.RESEND_API_KEY || process.env.INQUIRY_FROM_EMAIL || process.env.INQUIRY_TO_EMAIL) providers.push({ name: "email", promise: sendEmail(payload, id) });
  if (process.env.WHATSAPP_ACCESS_TOKEN || process.env.WHATSAPP_PHONE_NUMBER_ID || process.env.WHATSAPP_RECIPIENT_NUMBER) providers.push({ name: "whatsapp", promise: sendWhatsApp(payload, id) });

  if (!providers.length) {
    console.error("Inquiry delivery is not configured", { id, type: payload.type });
    return NextResponse.json({ success: false, error: "Inquiry service is temporarily unavailable." }, { status: 503 });
  }

  const results = await Promise.allSettled(providers.map(({ promise }) => promise));
  const failures = results.filter((result): result is PromiseRejectedResult => result.status === "rejected");
  failures.forEach((failure, index) => console.error("Inquiry provider failed", { id, provider: providers[index]?.name, error: failure.reason instanceof Error ? failure.reason.message : "unknown" }));
  if (failures.length === providers.length) return NextResponse.json({ success: false, error: "We couldn't send your inquiry right now. Please try again." }, { status: 502 });
  return successResponse();
}
