"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { piercingLocations, jewelryOptions } from "@/content/piercings";
import { piercingSchema, type PiercingFormValues } from "@/lib/validators";
import { submitNetlifyForm } from "@/lib/netlify-forms";

const steps = [
  "Piercing",
  "Jewellery",
  "Quantity",
  "Experience",
  "Appointment",
  "About you",
  "Review",
];

export function PiercingForm() {
  const [step, setStep] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const minimumDate = new Date().toISOString().split("T")[0];

  const form = useForm<PiercingFormValues>({
    resolver: zodResolver(piercingSchema),
    defaultValues: {
      serviceType: "piercing",
      piercingLocation: "",
      locationDetail: "",
      earDetail: "",
      noseDetail: "",
      navelDetail: "",
      nippleDetail: "",
      jewelry: "",
      jewelryOther: "",
      quantity: "1",

      previousDetails: "",
      preferredDate: "",
      preferredTime: "",
      name: "",
      email: "",
      phone: "",
      notes: "",
    },
  });

  const { register, control, setValue, trigger, formState: { errors, isSubmitting } } = form;
  const values = useWatch({ control });

  const next = async () => {
    const fieldsByStep: (keyof PiercingFormValues)[][] = [
      ["piercingLocation"],
      ["jewelry"],
      ["quantity"],
      ["firstPiercing"],
      ["preferredDate"],
      ["name", "email", "phone"],
      [],
    ];
    const ok = await trigger(fieldsByStep[step]);
    if (ok) setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const onSubmit = form.handleSubmit(async (data) => {
    setSubmitError("");
    try {
      await submitNetlifyForm("piercing-booking", {
        serviceType: data.serviceType,
        piercingLocation: data.piercingLocation,
        locationDetail: data.locationDetail,
        earDetail: data.earDetail,
        noseDetail: data.noseDetail,
        navelDetail: data.navelDetail,
        nippleDetail: data.nippleDetail,
        jewelry: data.jewelry === "Other" ? data.jewelryOther : data.jewelry,
        quantity: data.quantity,
        firstPiercing: data.firstPiercing,
        previousDetails: data.previousDetails,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
        name: data.name,
        email: data.email,
        phone: data.phone,
        notes: data.notes,
        referenceFiles: files.map((file) => file.name).join(", "),
        "bot-field": data.website ?? "",
      });
      setSubmitted(true);
      toast.success("Piercing request submitted. We’ll follow up soon.");
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "We could not send your request. Please try again.");
    }
  });

  if (submitted) {
    return (
      <div className="rounded-3xl border border-border bg-card p-10 text-center" aria-live="polite">
        <p className="eyebrow mb-2">Success</p>
        <h2 className="display text-3xl text-foreground">Request received</h2>
        <p className="mt-4 text-muted-foreground">Thanks, {values.name}. We&apos;ll contact you at {values.email} to confirm availability.</p>
      </div>
    );
  }

  return (
    <form name="piercing-booking" method="POST" onSubmit={onSubmit} className="rounded-3xl border border-border bg-card p-6 md:p-8">
      <input type="hidden" name="form-name" value="piercing-booking" />
      <input {...register("website")} name="bot-field" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />
      <div className="mb-6 flex flex-wrap gap-2">
        {steps.map((label, i) => (
          <span key={label} className={`rounded-full px-3 py-1 text-xs ${i === step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            {i + 1}. {label}
          </span>
        ))}
      </div>

      {step === 0 && (
        <div className="space-y-4">
          <Label>Where would you like to get pierced?</Label>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {piercingLocations.map((p) => (
              <button
                key={p}
                type="button"
                aria-pressed={values.piercingLocation === p}
                onClick={() => setValue("piercingLocation", p, { shouldValidate: true })}
                className={`rounded-2xl border px-4 py-3 text-sm font-medium transition-all hover:border-primary/60 hover:bg-muted/50 ${values.piercingLocation === p ? "border-primary bg-primary/10 text-primary" : "border-border"}`}
              >
                {p}
              </button>
            ))}

          </div>
          {values.piercingLocation && (
            <div className="space-y-3 rounded-2xl border border-border bg-muted/30 p-4">
              {values.piercingLocation === "Ear" && (
                <div>
                  <Label>Which part of the ear?</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {['Left', 'Right', 'Both'].map((option) => (
                      <button key={option} type="button" onClick={() => setValue("earDetail", option)} className={`rounded-full border px-3 py-2 text-xs ${values.earDetail === option ? "border-primary text-primary" : "border-border"}`}>
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {values.piercingLocation === "Nose" && (
                <div>
                  <Label>Nose pierce style</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {['Nostril', 'Septum', 'Other'].map((option) => (
                      <button key={option} type="button" onClick={() => setValue("noseDetail", option)} className={`rounded-full border px-3 py-2 text-xs ${values.noseDetail === option ? "border-primary text-primary" : "border-border"}`}>
                        {option}
                      </button>
                    ))}
                  </div>
                  {values.noseDetail === "Other" && (
                    <Input className="mt-3" placeholder="Please specify" {...register("locationDetail")} />
                  )}
                </div>
              )}

              {values.piercingLocation === "Navel" && (
                <div>
                  <Label>Navel type</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {['Standard navel', 'Other'].map((option) => (
                      <button key={option} type="button" onClick={() => setValue("navelDetail", option)} className={`rounded-full border px-3 py-2 text-xs ${values.navelDetail === option ? "border-primary text-primary" : "border-border"}`}>
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {values.piercingLocation === "XXX-Section" && (
                <div>
                  <Label>Preferred area</Label>
                  <Input className="mt-2" placeholder="Please specify the preferred area" {...register("locationDetail")} />
                </div>
              )}
              {values.piercingLocation === "Nipple" && (
                <div>
                  <Label>Which side?</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {['Left', 'Right', 'Both'].map((option) => (
                      <button key={option} type="button" onClick={() => setValue("nippleDetail", option)} className={`rounded-full border px-3 py-2 text-xs ${values.nippleDetail === option ? "border-primary text-primary" : "border-border"}`}>
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {!["Ear", "Nose", "Navel", "XXX-Section", "Nipple"].includes(values.piercingLocation) && (
                <div>
                  <Label>Additional details</Label>
                  <Input className="mt-2" placeholder="Tell us more about this location" {...register("locationDetail")} />
                </div>
              )}
            </div>
          )}
          {errors.piercingLocation ? <p className="mt-1 text-xs text-secondary">{errors.piercingLocation.message}</p> : null}
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <Label>Do you have a preferred jewellery style?</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {jewelryOptions.map((j) => (
              <button
                key={j}
                type="button"
                aria-pressed={values.jewelry === j}
                onClick={() => setValue("jewelry", j, { shouldValidate: true })}
                className={`rounded-full border px-4 py-2 text-xs ${values.jewelry === j ? "border-primary text-primary" : "border-border"}`}
              >
                {j}
              </button>
            ))}
            <button
              type="button"
              aria-pressed={values.jewelry === "Other"}
              onClick={() => setValue("jewelry", "Other", { shouldValidate: true })}
              className={`rounded-full border px-4 py-2 text-xs ${values.jewelry === "Other" ? "border-primary text-primary" : "border-border"}`}
            >
              Other
            </button>
          </div>
          {values.jewelry === "Other" && (
            <div>
              <Label htmlFor="jewelryOther">Please describe</Label>
              <Input id="jewelryOther" className="mt-2" {...register("jewelryOther")} />
            </div>
          )}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <Label>How many piercings are you interested in?</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {[
              "1",
              "2",
              "3",
              "4+",
              "Not sure",
            ].map((q) => (
              <button
                key={q}
                type="button"
                aria-pressed={values.quantity === q}
                onClick={() => setValue("quantity", q, { shouldValidate: true })}
                className={`rounded-full border px-4 py-2 text-xs ${values.quantity === q ? "border-primary text-primary" : "border-border"}`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <Label>Is this your first piercing?</Label>
          <div className="mt-2 flex gap-2">
            {(['Yes', 'No', 'Not sure'] as const).map((v) => (
              <button key={v} type="button" aria-pressed={values.firstPiercing === v} onClick={() => setValue('firstPiercing', v, { shouldValidate: true })} className={`rounded-full border px-4 py-2 text-xs ${values.firstPiercing === v ? 'border-primary text-primary' : 'border-border'}`}>
                {v}
              </button>
            ))}
          </div>
          {errors.firstPiercing ? <p className="mt-1 text-xs text-secondary">{errors.firstPiercing.message}</p> : null}
          {values.firstPiercing === 'No' && (
            <div>
              <Label htmlFor="previousDetails">What piercings do you currently have?</Label>
              <Input id="previousDetails" className="mt-2" {...register('previousDetails')} />
            </div>
          )}
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="preferredDate">Preferred date</Label>
              <Input id="preferredDate" type="date" min={minimumDate} className="mt-2" {...register("preferredDate")} />
              {errors.preferredDate ? <p className="mt-1 text-xs text-secondary">{errors.preferredDate.message}</p> : null}
            </div>
            <div>
              <Label htmlFor="preferredTime">Preferred time</Label>
              <Input id="preferredTime" type="time" className="mt-2" {...register("preferredTime")} />
            </div>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full name</Label>
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
            <Label htmlFor="notes">Tell us anything else</Label>
            <Textarea id="notes" className="mt-2" rows={4} {...register("notes")} />
          </div>
          <div>
            <Label>Reference images (optional)</Label>
            <Input
              type="file"
              accept="image/*"
              className="mt-2"
              onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
            />
            {files.length > 0 && (
              <ul className="mt-2 text-sm text-muted-foreground">
                {files.map((f) => (
                  <li key={`${f.name}-${f.lastModified}`} className="flex items-center justify-between">
                    <span>{f.name}</span>
                    <button type="button" onClick={() => setFiles((fs) => fs.filter((x) => x !== f))} className="text-xs text-secondary">Remove</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {step === 6 && (
        <div className="space-y-4">
          <h4 className="font-medium">Review your request</h4>
          <div className="grid gap-2">
            <div><strong>Service:</strong> {values.serviceType}</div>
            <div><strong>Location:</strong> {values.piercingLocation}{values.locationDetail ? ` — ${values.locationDetail}` : ''}</div>
            <div><strong>Jewellery:</strong> {values.jewelry}{values.jewelry === 'Other' ? ` — ${values.jewelryOther}` : ''}</div>
            <div><strong>Quantity:</strong> {values.quantity}</div>
            <div><strong>Preferred:</strong> {values.preferredDate} {values.preferredTime}</div>
            <div><strong>Name:</strong> {values.name}</div>
            <div><strong>Email:</strong> {values.email}</div>
            <div><strong>Phone:</strong> {values.phone}</div>
            <div><strong>Notes:</strong> {values.notes}</div>
          </div>
        </div>
      )}

      {submitError ? <p className="mt-5 flex items-center justify-between gap-4 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-foreground" role="alert" aria-live="assertive"><span>{submitError}</span><button type="button" className="shrink-0 font-semibold text-primary underline-offset-4 hover:underline" onClick={() => void onSubmit()}>Retry</button></p> : null}

      <div className="mt-6 flex justify-between">
        <div>
          {step > 0 && (
            <Button type="button" variant="ghost" onClick={() => setStep((s) => Math.max(s - 1, 0))}>Back</Button>
          )}
        </div>
        <div>
          {step < steps.length - 1 ? (
            <Button type="button" onClick={next}>Next</Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending…" : "Submit request"}</Button>
          )}
        </div>
      </div>
    </form>
  );
}
