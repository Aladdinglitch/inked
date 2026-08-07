"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { contactSchema, type ContactFormValues } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = handleSubmit(() => {
    toast.success("Message sent. We'll reply soon.");
    reset();
  });

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-3xl border border-border bg-card p-6 md:p-8">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" className="mt-2" {...register("name")} />
        {errors.name ? <p className="mt-1 text-xs text-secondary">{errors.name.message}</p> : null}
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" className="mt-2" {...register("email")} />
        {errors.email ? <p className="mt-1 text-xs text-secondary">{errors.email.message}</p> : null}
      </div>
      <div>
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" className="mt-2" {...register("subject")} />
        {errors.subject ? <p className="mt-1 text-xs text-secondary">{errors.subject.message}</p> : null}
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" className="mt-2" {...register("message")} />
        {errors.message ? <p className="mt-1 text-xs text-secondary">{errors.message.message}</p> : null}
      </div>
      <Button type="submit" disabled={isSubmitting}>Send message</Button>
    </form>
  );
}
