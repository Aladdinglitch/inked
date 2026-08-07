"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { artists } from "@/content/artists";
import { styles } from "@/content/styles";
import { bookingSchema, type BookingFormValues } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const placements = ["Arm", "Leg", "Torso", "Back", "Hand", "Neck", "Other"];
const sizes = ["Mini (<2\")", "Small (2–4\")", "Medium (4–8\")", "Large (8\"+)", "Full sleeve / back"];
const budgets = ["Under $300", "$300–600", "$600–1200", "$1200+", "Flexible"];

const steps = [
  "Artist & style",
  "Tattoo details",
  "References",
  "Contact",
  "Confirm",
];

export function BookingForm() {
  const searchParams = useSearchParams();
  const preArtist = searchParams.get("artist") ?? "";
  const [step, setStep] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      artistId: preArtist,
      styleId: "",
      placement: "",
      size: "",
      budget: "",
      preferredDate: "",
      alternateDate: "",
      whatsapp: "",
      name: "",
      email: "",
      phone: "",
      notes: "",
    },
  });

  const { register, watch, setValue, trigger, formState: { errors } } = form;
  const values = watch();

  const next = async () => {
    const fieldsByStep: (keyof BookingFormValues)[][] = [
      ["artistId", "styleId"],
      ["placement", "size", "budget", "preferredDate"],
      [],
      ["name", "email", "phone"],
      [],
    ];
    const ok = await trigger(fieldsByStep[step]);
    if (ok) setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const onSubmit = form.handleSubmit(() => {
    setSubmitted(true);
    toast.success("Booking request sent. We'll reply within two business days.");
  });

  if (submitted) {
    return (
      <div className="rounded-3xl border border-border bg-card p-10 text-center">
        <p className="eyebrow mb-2">Success</p>
        <h2 className="display text-3xl text-foreground">Request received</h2>
        <p className="mt-4 text-muted-foreground">
          Thanks, {values.name}. We&apos;ll review your idea and follow up at {values.email}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-card p-6 md:p-8">
      <div className="mb-8 flex flex-wrap gap-2">
        {steps.map((label, i) => (
          <span
            key={label}
            className={`rounded-full px-3 py-1 text-xs ${
              i === step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {i + 1}. {label}
          </span>
        ))}
      </div>

      {step === 0 ? (
        <div className="space-y-5">
          <div>
            <Label htmlFor="artistId">Preferred artist</Label>
            <select
              id="artistId"
              className="mt-2 flex h-11 w-full rounded-full border border-input bg-muted px-4 text-sm"
              {...register("artistId")}
            >
              <option value="">Select artist</option>
              {artists.map((a) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
            {errors.artistId ? <p className="mt-1 text-xs text-secondary">{errors.artistId.message}</p> : null}
          </div>
          <div>
            <Label htmlFor="styleId">Style</Label>
            <select
              id="styleId"
              className="mt-2 flex h-11 w-full rounded-full border border-input bg-muted px-4 text-sm"
              {...register("styleId")}
            >
              <option value="">Select style</option>
              {styles.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            {errors.styleId ? <p className="mt-1 text-xs text-secondary">{errors.styleId.message}</p> : null}
          </div>
        </div>
      ) : null}

      {step === 1 ? (
        <div className="space-y-5">
          <div>
            <Label>Placement</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {placements.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setValue("placement", p, { shouldValidate: true })}
                  className={`rounded-full border px-4 py-2 text-xs ${
                    values.placement === p ? "border-primary text-primary" : "border-border"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            {errors.placement ? <p className="mt-1 text-xs text-secondary">{errors.placement.message}</p> : null}
          </div>
          <div>
            <Label>Size</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setValue("size", s, { shouldValidate: true })}
                  className={`rounded-full border px-4 py-2 text-xs ${
                    values.size === s ? "border-primary text-primary" : "border-border"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {errors.size ? <p className="mt-1 text-xs text-secondary">{errors.size.message}</p> : null}
          </div>
          <div>
            <Label>Budget</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {budgets.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setValue("budget", b, { shouldValidate: true })}
                  className={`rounded-full border px-4 py-2 text-xs ${
                    values.budget === b ? "border-primary text-primary" : "border-border"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
            {errors.budget ? <p className="mt-1 text-xs text-secondary">{errors.budget.message}</p> : null}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="preferredDate">Preferred date</Label>
              <Input id="preferredDate" type="date" className="mt-2" {...register("preferredDate")} />
              {errors.preferredDate ? <p className="mt-1 text-xs text-secondary">{errors.preferredDate.message}</p> : null}
            </div>
            <div>
              <Label htmlFor="alternateDate">Alternate date</Label>
              <Input id="alternateDate" type="date" className="mt-2" {...register("alternateDate")} />
            </div>
          </div>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="space-y-4">
          <Label htmlFor="refs">Reference images</Label>
          <Input
            id="refs"
            type="file"
            accept="image/*"
            multiple
            className="mt-2"
            onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
          />
          {files.length > 0 ? (
            <ul className="text-sm text-muted-foreground">
              {files.map((f) => (
                <li key={f.name}>{f.name}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">Upload inspiration or placement photos (optional).</p>
          )}
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" className="mt-2" {...register("notes")} placeholder="Describe your idea…" />
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="space-y-5">
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
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" className="mt-2" {...register("phone")} />
            {errors.phone ? <p className="mt-1 text-xs text-secondary">{errors.phone.message}</p> : null}
          </div>
          <div>
            <Label htmlFor="whatsapp">WhatsApp</Label>
            <Input id="whatsapp" className="mt-2" placeholder="Optional" {...register("whatsapp")} />
          </div>
        </div>
      ) : null}

      {step === 4 ? (
        <div className="space-y-3 text-sm text-muted-foreground">
          <p><strong className="text-foreground">Artist:</strong> {artists.find((a) => a.id === values.artistId)?.name}</p>
          <p><strong className="text-foreground">Style:</strong> {styles.find((s) => s.id === values.styleId)?.name}</p>
          <p><strong className="text-foreground">Placement:</strong> {values.placement}</p>
          <p><strong className="text-foreground">Size:</strong> {values.size}</p>
          <p><strong className="text-foreground">Budget:</strong> {values.budget}</p>
          <p><strong className="text-foreground">Preferred date:</strong> {values.preferredDate}</p>
          <p><strong className="text-foreground">Contact:</strong> {values.name} · {values.email}</p>
          {values.whatsapp ? (
            <p><strong className="text-foreground">WhatsApp:</strong> {values.whatsapp}</p>
          ) : null}
        </div>
      ) : null}

      <div className="mt-8 flex gap-3">
        {step > 0 ? (
          <Button type="button" variant="outline" onClick={() => setStep((s) => s - 1)}>
            Back
          </Button>
        ) : null}
        {step < steps.length - 1 ? (
          <Button type="button" onClick={next}>Continue</Button>
        ) : (
          <Button type="submit">Submit request</Button>
        )}
      </div>
    </form>
  );
}
