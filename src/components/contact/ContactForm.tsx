"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { contactSchema, type ContactFormValues } from "@/lib/validators";
import { submitNetlifyForm } from "@/lib/netlify-forms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [submitError, setSubmitError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = handleSubmit(async (data) => {
    setSubmitError("");
    try {
      await submitNetlifyForm("contact-inquiry", {
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        "bot-field": data.website ?? "",
      });
      toast.success("Inquiry received. We’ll reply soon.");
      reset();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "We couldn't send your inquiry right now. Please try again.");
    }
  });

  return (
    <form name="contact-inquiry" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={onSubmit} className="relative space-y-5 rounded-3xl border border-border bg-card p-6 md:p-8">
      <input type="hidden" name="form-name" value="contact-inquiry" />
      <input {...register("website")} name="bot-field" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" className="mt-2" {...register("name")} />
        {errors.name ? <p className="mt-1 text-xs text-secondary">{errors.name.message}</p> : null}
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" autoComplete="email" className="mt-2" {...register("email")} />
        {errors.email ? <p className="mt-1 text-xs text-secondary">{errors.email.message}</p> : null}
      </div>
      <div>
        <Label htmlFor="phone">Phone <span className="text-foreground-subtle">(optional)</span></Label>
        <Input id="phone" type="tel" autoComplete="tel" className="mt-2" {...register("phone")} />
        {errors.phone ? <p className="mt-1 text-xs text-secondary">{errors.phone.message}</p> : null}
      </div>
      <div>
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" className="mt-2" {...register("subject")} />
        {errors.subject ? <p className="mt-1 text-xs text-secondary">{errors.subject.message}</p> : null}
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" className="mt-2" rows={6} {...register("message")} />
        {errors.message ? <p className="mt-1 text-xs text-secondary">{errors.message.message}</p> : null}
      </div>
      {submitError ? <p className="flex items-center justify-between gap-4 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-foreground" role="alert" aria-live="assertive"><span>{submitError}</span><button type="button" className="shrink-0 font-semibold text-primary underline-offset-4 hover:underline" onClick={() => void onSubmit()}>Retry</button></p> : null}
      <div aria-live="polite">
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending…" : "Send message"}</Button>
      </div>
    </form>
  );
}
