"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { artists } from "@/content/artists";
import { styles } from "@/content/styles";
import { tattooPlacements } from "@/content/piercings";
import { bookingSchema, type BookingFormValues } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
  const [submitError, setSubmitError] = useState("");
  const minimumDate = new Date().toISOString().split("T")[0];
  const preStyle = searchParams.get("style") ?? "";

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      serviceType: "tattoo",
      artistId: preArtist,
      styleId: preStyle,
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

  const { register, control, setValue, trigger, formState: { errors, isSubmitting } } = form;
  const values = useWatch({ control });

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

  const onSubmit = form.handleSubmit(async (data) => {
    setSubmitError("");
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          type: "tattoo",
          website: data.website ?? "",
          data: {
            type: "tattoo",
            name: data.name,
            email: data.email,
            phone: data.phone,
            tattoo: {
              placement: data.placement,
              style: styles.find((style) => style.id === data.styleId)?.name ?? data.styleId,
              size: data.size,
              budget: data.budget,
              description: data.notes,
              referenceFiles: files.map((file) => file.name),
            },
            appointment: { preferredDate: data.preferredDate, alternateDate: data.alternateDate },
            message: data.notes,
            context: { artistId: data.artistId, whatsapp: data.whatsapp },
          },
        }),
      });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "We could not send your request.");
      setSubmitted(true);
      toast.success("Booking request sent. We’ll reply within two business days.");
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "We could not send your request. Please try again.");
    }
  });

  if (submitted) {
    return (
      <div className="rounded-3xl border border-border bg-card p-10 text-center" aria-live="polite">
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
      <input {...register("website")} tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />
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
              {tattooPlacements.map((p) => (
                <button
                  key={p}
                  type="button"
                  aria-pressed={values.placement === p}
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
                  aria-pressed={values.size === s}
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
                  aria-pressed={values.budget === b}
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
              <Input id="preferredDate" type="date" min={minimumDate} className="mt-2" {...register("preferredDate")} />
              {errors.preferredDate ? <p className="mt-1 text-xs text-secondary">{errors.preferredDate.message}</p> : null}
            </div>
            <div>
              <Label htmlFor="alternateDate">Alternate date</Label>
              <Input id="alternateDate" type="date" min={minimumDate} className="mt-2" {...register("alternateDate")} />
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
                <li key={`${f.name}-${f.lastModified}`}>{f.name}</li>
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
            <Input id="phone" type="tel" autoComplete="tel" className="mt-2" {...register("phone")} />
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

      {submitError ? <p className="mt-5 flex items-center justify-between gap-4 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-foreground" role="alert" aria-live="assertive"><span>{submitError}</span><button type="button" className="shrink-0 font-semibold text-primary underline-offset-4 hover:underline" onClick={() => void onSubmit()}>Retry</button></p> : null}

      <div className="mt-8 flex gap-3">
        {step > 0 ? (
          <Button type="button" variant="outline" onClick={() => setStep((s) => s - 1)}>
            Back
          </Button>
        ) : null}
        {step < steps.length - 1 ? (
          <Button type="button" onClick={next}>Continue</Button>
        ) : (
          <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending…" : "Submit request"}</Button>
        )}
      </div>
    </form>
  );
}
