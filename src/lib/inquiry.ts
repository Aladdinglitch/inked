import type { InquiryPayload } from "@/lib/validators";

export type ProviderName = "webhook" | "email" | "whatsapp";

export function safeText(value: string | undefined, max = 5000) {
  return (value ?? "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, max);
}

export function escapeHtml(value: string | undefined) {
  return safeText(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);
}

export function inquiryLabel(payload: InquiryPayload) {
  return payload.type[0].toUpperCase() + payload.type.slice(1);
}

export function inquirySubject(payload: InquiryPayload) {
  return `New ${inquiryLabel(payload)} Inquiry — ${safeText(payload.name, 100)}`;
}

function line(label: string, value: string | undefined) {
  return value ? `<tr><th align="left" valign="top" style="padding:6px 16px 6px 0;color:#64748b;font-weight:500">${escapeHtml(label)}</th><td style="padding:6px 0;color:#0f172a">${escapeHtml(value)}</td></tr>` : "";
}

function textLines(payload: InquiryPayload) {
  if (payload.type === "tattoo") {
    return [
      `Placement: ${payload.tattoo.placement}`,
      `Style: ${payload.tattoo.style}`,
      payload.tattoo.size ? `Size: ${payload.tattoo.size}` : "",
      payload.tattoo.budget ? `Budget: ${payload.tattoo.budget}` : "",
      payload.tattoo.description ? `Description: ${payload.tattoo.description}` : "",
      payload.tattoo.referenceUrl ? `Reference: ${payload.tattoo.referenceUrl}` : "",
      payload.tattoo.referenceFiles?.length ? `Reference files: ${payload.tattoo.referenceFiles.join(", ")}` : "",
    ].filter(Boolean);
  }

  if (payload.type === "piercing") {
    return [
      `Location: ${payload.piercing.location}`,
      payload.piercing.locationDetail ? `Location detail: ${payload.piercing.locationDetail}` : "",
      payload.piercing.jewelryPreference ? `Jewellery: ${payload.piercing.jewelryPreference}` : "",
      payload.piercing.quantity ? `Quantity: ${payload.piercing.quantity}` : "",
      typeof payload.piercing.firstPiercing === "boolean" ? `First piercing: ${payload.piercing.firstPiercing ? "Yes" : "No"}` : "",
      payload.piercing.previousExperience ? `Previous experience: ${payload.piercing.previousExperience}` : "",
    ].filter(Boolean);
  }

  return payload.subject ? [`Subject: ${payload.subject}`] : [];
}

export function htmlEmail(payload: InquiryPayload, requestId: string) {
  const detailRows = textLines(payload).map((value) => `<tr><td colspan="2" style="padding:6px 0;color:#0f172a">${escapeHtml(value)}</td></tr>`).join("");
  const appointment = payload.type === "contact" ? undefined : payload.appointment;

  return `<!doctype html><html><body style="margin:0;background:#f1f5f9;padding:32px;font-family:Arial,sans-serif;color:#0f172a"><div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden"><div style="background:#111318;padding:24px 28px;color:#f8fafc"><p style="margin:0 0 8px;color:#d2ad4a;font-size:12px;letter-spacing:2px;text-transform:uppercase">Inked Attraction</p><h1 style="margin:0;font-size:24px">${escapeHtml(inquirySubject(payload))}</h1></div><div style="padding:28px"><h2 style="font-size:16px;margin:0 0 12px">Client information</h2><table style="width:100%;border-collapse:collapse">${line("Name", payload.name)}${line("Email", payload.email)}${line("Phone", payload.phone)}${line("Type", inquiryLabel(payload))}${line("Preferred date", appointment?.preferredDate)}${line("Preferred time", appointment?.preferredTime)}</table><h2 style="font-size:16px;margin:24px 0 12px">Inquiry details</h2><table style="width:100%;border-collapse:collapse">${detailRows}${line("Message", payload.message)}</table><p style="margin:24px 0 0;color:#64748b;font-size:12px">Reference: ${escapeHtml(requestId)}</p></div></div></body></html>`;
}

export function whatsappText(payload: InquiryPayload, requestId: string) {
  const appointment = payload.type === "contact" ? undefined : payload.appointment;
  const details = textLines(payload).join("\n");
  return [
    "🔔 NEW INKED ATTRACTION INQUIRY",
    "",
    `Service: ${inquiryLabel(payload)}`,
    "",
    "CLIENT",
    `Name: ${safeText(payload.name, 100)}`,
    `Email: ${safeText(payload.email, 254)}`,
    `Phone: ${safeText(payload.phone, 30)}`,
    "",
    details ? details.toUpperCase() : "DETAILS",
    details,
    appointment ? `\nAPPOINTMENT\nDate: ${safeText(appointment.preferredDate, 30) || "Not specified"}\nTime: ${safeText(appointment.preferredTime, 30) || "Not specified"}` : "",
    payload.message ? `\nMESSAGE\n${safeText(payload.message, 2000)}` : "",
    `\nReference: ${requestId}`,
  ].filter(Boolean).join("\n").slice(0, 4000);
}
