"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, ImagePlus, X, CheckCircle2 } from "lucide-react";
import { artists, styles, placements, sizeOptions, budgetRanges } from "@/lib/data";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { InkArt } from "./ink-art";
import { cn } from "@/lib/utils";

type FormState = {
  artist: string;
  style: string;
  placement: string;
  size: string;
  budget: string;
  preferredDate: string;
  timeOfDay: string;
  notes: string;
  files: string[];
  name: string;
  email: string;
  phone: string;
};

const initialState: FormState = {
  artist: "",
  style: "",
  placement: "",
  size: "",
  budget: "",
  preferredDate: "",
  timeOfDay: "",
  notes: "",
  files: [],
  name: "",
  email: "",
  phone: "",
};

const steps = [
  "Artist",
  "Style",
  "Placement",
  "Size",
  "Budget",
  "Dates",
  "References",
  "Contact",
];

export function BookingForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [direction, setDirection] = useState(1);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const canAdvance = useMemo(() => {
    switch (step) {
      case 0:
        return form.artist !== "";
      case 1:
        return form.style !== "";
      case 2:
        return form.placement !== "";
      case 3:
        return form.size !== "";
      case 4:
        return form.budget !== "";
      case 5:
        return form.preferredDate !== "";
      case 6:
        return true;
      case 7:
        return form.name.trim() !== "" && /\S+@\S+\.\S+/.test(form.email);
      default:
        return true;
    }
  }, [step, form]);

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    if (dir === 1 && step === steps.length - 1) {
      setSubmitted(true);
      return;
    }
    setStep((s) => Math.min(Math.max(s + dir, 0), steps.length - 1));
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl2 border border-gold/30 bg-surface p-10 text-center sm:p-16"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 text-gold">
          <CheckCircle2 size={28} />
        </div>
        <h3 className="mt-6 font-display text-3xl text-fg">Request received.</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
          Thanks, {form.name.split(" ")[0] || "there"} — we&apos;ve logged your request for{" "}
          {artists.find((a) => a.slug === form.artist)?.name ?? "your chosen artist"}. Expect a
          reply at <span className="text-fg">{form.email}</span> within two business days to
          confirm details and take a deposit.
        </p>
        <div className="mx-auto mt-8 max-w-sm rounded-lg border border-gold/30 bg-ink p-5 text-left text-sm">
          <SummaryRow label="Style" value={form.style} />
          <SummaryRow label="Placement" value={form.placement} />
          <SummaryRow label="Size" value={form.size} />
          <SummaryRow label="Budget" value={form.budget} />
          <SummaryRow label="Preferred date" value={form.preferredDate} last />
        </div>
        <Button
          variant="outline"
          className="mt-8"
          onClick={() => {
            setForm(initialState);
            setStep(0);
            setSubmitted(false);
          }}
        >
          Start Another Request
        </Button>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-10 flex items-center gap-1.5">
        {steps.map((label, i) => (
          <div key={label} className="flex flex-1 flex-col gap-2">
            <div
              className={cn(
                "h-1 rounded-full transition-colors duration-300",
                i <= step ? "bg-gold" : "bg-border"
              )}
            />
            <span
              className={cn(
                "hidden font-mono text-[10px] uppercase tracking-widest sm:block",
                i === step ? "text-gold" : "text-muted/60"
              )}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className="min-h-[340px] overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            initial={{ opacity: 0, x: direction * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {step === 0 && (
              <StepShell title="Choose an artist" subtitle="Pick who you'd like to work with, or leave it to us.">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {artists.map((a, i) => (
                    <button
                      key={a.slug}
                      onClick={() => update("artist", a.slug)}
                      className={cn(
                        "overflow-hidden rounded-lg border text-left transition-colors",
                        form.artist === a.slug ? "border-gold" : "border-border hover:border-gold/40"
                      )}
                    >
                      <div className="relative aspect-square">
                        {a.image ? (
                          <Image
                            src={a.image}
                            alt={a.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <InkArt seed={i * 13 + 5} styleSlug={a.styleSlugs[0]} className="h-full w-full" />
                        )}
                      </div>
                      <div className="p-3">
                        <p className="text-sm text-fg">{a.name}</p>
                        <p className="text-[11px] text-muted">{a.role}</p>
                      </div>
                    </button>
                  ))}
                  <button
                    onClick={() => update("artist", "no-preference")}
                    className={cn(
                      "flex flex-col items-center justify-center rounded-lg border p-4 text-center transition-colors",
                      form.artist === "no-preference"
                        ? "border-gold"
                        : "border-dashed border-border hover:border-gold/40"
                    )}
                  >
                    <span className="text-sm text-fg">No preference</span>
                    <span className="mt-1 text-[11px] text-muted">We&apos;ll match you</span>
                  </button>
                </div>
              </StepShell>
            )}

            {step === 1 && (
              <StepShell title="Pick a style" subtitle="Choose the closest match — your artist will refine it with you.">
                <PillGrid options={styles.map((s) => s.name)} value={form.style} onChange={(v) => update("style", v)} />
              </StepShell>
            )}

            {step === 2 && (
              <StepShell title="Placement" subtitle="Where on the body is this going?">
                <PillGrid options={placements} value={form.placement} onChange={(v) => update("placement", v)} />
              </StepShell>
            )}

            {step === 3 && (
              <StepShell title="Approximate size" subtitle="A rough scale helps us quote session length.">
                <PillGrid options={sizeOptions} value={form.size} onChange={(v) => update("size", v)} columns={2} />
              </StepShell>
            )}

            {step === 4 && (
              <StepShell title="Budget range" subtitle="This keeps the design proposal realistic from the start.">
                <PillGrid options={budgetRanges} value={form.budget} onChange={(v) => update("budget", v)} columns={2} />
              </StepShell>
            )}

            {step === 5 && (
              <StepShell title="Preferred dates" subtitle="Give us a target date and a time of day that suits you.">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="date">Preferred date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={form.preferredDate}
                      onChange={(e) => update("preferredDate", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Time of day</Label>
                    <PillGrid
                      options={["Morning", "Afternoon", "Evening"]}
                      value={form.timeOfDay}
                      onChange={(v) => update("timeOfDay", v)}
                      columns={3}
                    />
                  </div>
                </div>
              </StepShell>
            )}

            {step === 6 && (
              <StepShell title="Reference images" subtitle="Optional — inspiration, placement photos, or prior work.">
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border p-10 text-center transition-colors hover:border-gold/50">
                  <ImagePlus size={22} className="text-gold" />
                  <span className="mt-3 text-sm text-fg">Click to upload files</span>
                  <span className="mt-1 text-xs text-muted">PNG or JPG, up to 5 images</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      const names = Array.from(e.target.files ?? []).map((f) => f.name);
                      update("files", [...form.files, ...names].slice(0, 5));
                    }}
                  />
                </label>
                {form.files.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {form.files.map((name, i) => (
                      <li
                        key={name + i}
                        className="flex items-center justify-between rounded-lg border border-gold/30 bg-ink px-4 py-2 text-sm text-foreground-secondary"
                      >
                        {name}
                        <button
                          onClick={() => update("files", form.files.filter((_, idx) => idx !== i))}
                          aria-label={`Remove ${name}`}
                          className="text-muted hover:text-oxblood-bright"
                        >
                          <X size={14} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-6">
                  <Label htmlFor="notes">Anything else?</Label>
                  <Textarea
                    id="notes"
                    value={form.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    placeholder="Tell us about the idea, cover-ups, or scheduling constraints..."
                  />
                </div>
              </StepShell>
            )}

            {step === 7 && (
              <StepShell title="Contact information" subtitle="So we know where to send the confirmation.">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="phone">Phone (optional)</Label>
                    <Input id="phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                  </div>
                </div>
              </StepShell>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
        <Button variant="ghost" onClick={() => go(-1)} disabled={step === 0} size="sm">
          <ArrowLeft size={14} /> Back
        </Button>
        <Button onClick={() => go(1)} disabled={!canAdvance} size="sm">
          {step === steps.length - 1 ? (
            <>
              Submit Request <Check size={14} />
            </>
          ) : (
            <>
              Continue <ArrowRight size={14} />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

function StepShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-display text-2xl text-fg">{title}</h3>
      <p className="mt-1 text-sm text-muted">{subtitle}</p>
      <div className="mt-7">{children}</div>
    </div>
  );
}

function PillGrid({
  options,
  value,
  onChange,
  columns = 4,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  columns?: number;
}) {
  const colClass =
    columns === 2 ? "sm:grid-cols-2" : columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-4";
  return (
    <div className={cn("grid grid-cols-2 gap-3", colClass)}>
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={cn(
            "rounded-lg border px-4 py-3 text-left text-sm transition-colors",
            value === opt ? "border-gold bg-gold/10 text-gold-bright" : "border-border text-fg/80 hover:border-gold/40"
          )}
          aria-pressed={value === opt}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function SummaryRow({ label, value, last = false }: { label: string; value?: string; last?: boolean }) {
  return (
    <div className={cn("flex items-center justify-between py-2.5", !last && "border-b border-border/60")}>
      <span className="text-xs uppercase tracking-wide text-foreground-muted">{label}</span>
      <span className="text-foreground">{value || "—"}</span>
    </div>
  );
}
