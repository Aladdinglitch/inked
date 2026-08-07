"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");

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
        <h3 className="mt-5 font-display text-2xl text-fg">Message sent.</h3>
        <p className="mt-2 text-sm text-muted">
          Thanks{name ? `, ${name.split(" ")[0]}` : ""} — we typically reply within one business day.
        </p>
        <Button variant="outline" size="sm" className="mt-6" onClick={() => setSubmitted(false)}>
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="space-y-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="c-name">Name</Label>
          <Input id="c-name" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="c-email">Email</Label>
          <Input id="c-email" type="email" required />
        </div>
      </div>
      <div>
        <Label htmlFor="c-subject">Subject</Label>
        <Input id="c-subject" placeholder="General inquiry, press, collaboration..." />
      </div>
      <div>
        <Label htmlFor="c-message">Message</Label>
        <Textarea id="c-message" required placeholder="How can we help?" className="min-h-[160px]" />
      </div>
      <Button type="submit" className="w-full sm:w-auto">
        Send Message <Send size={14} />
      </Button>
    </form>
  );
}
