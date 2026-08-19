"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import { submitNetlifyForm } from "@/lib/netlify-forms";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [values, setValues] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const update = (field: keyof typeof values, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await submitNetlifyForm("contact-inquiry", { ...values, "bot-field": "" });
      setSubmitted(true);
    } catch {
      setError("Something went wrong while submitting your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl2 border border-gold/30 bg-surface p-10 text-center"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-gold">
          <CheckCircle2 size={24} />
        </div>
        <h3 className="mt-5 font-display text-2xl text-fg">Message received.</h3>
        <p className="mt-2 text-sm text-muted">Thanks{namePrefix(values.name)} — we typically reply within one business day.</p>
        <Button variant="outline" size="sm" className="mt-6" onClick={() => setSubmitted(false)}>
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      name="contact-inquiry"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <input type="hidden" name="form-name" value="contact-inquiry" />
      <div className="sr-only" aria-hidden="true">
        <Label htmlFor="contact-bot-field">Do not fill this field</Label>
        <Input id="contact-bot-field" name="bot-field" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="c-name">Name</Label>
          <Input id="c-name" name="name" required value={values.name} onChange={(e) => update("name", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="c-email">Email</Label>
          <Input id="c-email" name="email" type="email" required value={values.email} onChange={(e) => update("email", e.target.value)} />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="c-phone">Phone (optional)</Label>
          <Input id="c-phone" name="phone" type="tel" value={values.phone} onChange={(e) => update("phone", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="c-subject">Subject</Label>
          <Input id="c-subject" name="subject" placeholder="General inquiry, press, collaboration..." value={values.subject} onChange={(e) => update("subject", e.target.value)} />
        </div>
      </div>
      <div>
        <Label htmlFor="c-message">Message</Label>
        <Textarea id="c-message" name="message" required placeholder="How can we help?" className="min-h-[160px]" value={values.message} onChange={(e) => update("message", e.target.value)} />
      </div>
      {error && <p role="alert" className="text-sm text-oxblood-bright">{error}</p>}
      <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
        {submitting ? "Sending…" : "Send Message"} <Send size={14} />
      </Button>
    </form>
  );
}

function namePrefix(name: string) {
  return name ? `, ${name.split(" ")[0]}` : "";
}
