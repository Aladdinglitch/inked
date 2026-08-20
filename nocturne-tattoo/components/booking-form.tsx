"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, ImagePlus, X, CheckCircle2 } from "lucide-react";
import { artists, styles, tattooPlacements, piercingLocations, sizeOptions, budgetRanges } from "@/lib/data";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { InkArt } from "./ink-art";
import { cn } from "@/lib/utils";
import { submitNetlifyForm } from "@/lib/netlify-forms";

type ServiceType = "tattoo" | "piercing";

type TattooFormState = {
  serviceType: "tattoo";
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

type PiercingFormState = {
  serviceType: "piercing";
  piercingLocation: string;
  earPart: string;
  earSide: string;
  noseDetail: string;
  navelDetail: string;
  nippleDetail: string;
  locationDetail: string;
  preferredDate: string;
  timeOfDay: string;
  notes: string;
  name: string;
  email: string;
  phone: string;
};

const tattooInitialState: TattooFormState = {
  serviceType: "tattoo",
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

const piercingInitialState: PiercingFormState = {
  serviceType: "piercing",
  piercingLocation: "",
  earPart: "",
  earSide: "",
  noseDetail: "",
  navelDetail: "",
  nippleDetail: "",
  locationDetail: "",
  preferredDate: "",
  timeOfDay: "",
  notes: "",
  name: "",
  email: "",
  phone: "",
};

const tattooSteps = ["Service", "Artist", "Style", "Placement", "Size", "Budget", "Dates", "References", "Contact"];
const piercingSteps = ["Service", "Location", "Dates", "Contact"];

const PIERCING_FOLLOW_UP_LOCATIONS = ["Ear", "Nose", "Navel", "XXX-Section", "Nipple"] as const;

export function BookingForm() {
  const [serviceType, setServiceType] = useState<ServiceType | "">("");
  const [step, setStep] = useState(0);
  const [tattooForm, setTattooForm] = useState<TattooFormState>(tattooInitialState);
  const [piercingForm, setPiercingForm] = useState<PiercingFormState>(piercingInitialState);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [direction, setDirection] = useState(1);

  const steps = serviceType === "piercing" ? piercingSteps : tattooSteps;

  const updateTattoo = <K extends keyof TattooFormState>(key: K, value: TattooFormState[K]) =>
    setTattooForm((f) => ({ ...f, [key]: value }));

  const updatePiercing = <K extends keyof PiercingFormState>(key: K, value: PiercingFormState[K]) =>
    setPiercingForm((f) => ({ ...f, [key]: value }));

  const selectService = (type: ServiceType) => {
    setServiceType(type);
    setStep(1);
  };

  const canAdvance = useMemo(() => {
    if (step === 0) return serviceType !== "";

    if (serviceType === "piercing") {
      switch (step) {
        case 1:
          return piercingForm.piercingLocation !== "";
        case 2:
          return piercingForm.preferredDate !== "";
        case 3:
          return piercingForm.name.trim() !== "" && /\S+@\S+\.\S+/.test(piercingForm.email);
        default:
          return true;
      }
    }

    switch (step) {
      case 1:
        return tattooForm.artist !== "";
      case 2:
        return tattooForm.style !== "";
      case 3:
        return tattooForm.placement !== "";
      case 4:
        return tattooForm.size !== "";
      case 5:
        return tattooForm.budget !== "";
      case 6:
        return tattooForm.preferredDate !== "";
      case 7:
        return true;
      case 8:
        return tattooForm.name.trim() !== "" && /\S+@\S+\.\S+/.test(tattooForm.email);
      default:
        return true;
    }
  }, [step, serviceType, tattooForm, piercingForm]);

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    if (dir === -1 && step === 1) {
      setStep(0);
      return;
    }
    setStep((s) => Math.min(Math.max(s + dir, 0), steps.length - 1));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!serviceType || !canAdvance || submitting) return;

    setSubmitting(true);
    setSubmitError("");
    const formName = serviceType === "piercing" ? "piercing-booking" : "tattoo-booking";
    const values = serviceType === "piercing" ? piercingForm : tattooForm;

    try {
      await submitNetlifyForm(formName, {
        ...values,
        files: "files" in values ? values.files.join(", ") : "",
        "bot-field": "",
      });
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong while submitting your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setServiceType("");
    setTattooForm(tattooInitialState);
    setPiercingForm(piercingInitialState);
    setStep(0);
    setSubmitted(false);
    setSubmitting(false);
    setSubmitError("");
  };

  if (submitted) {
    const isPiercing = serviceType === "piercing";
    const name = isPiercing ? piercingForm.name : tattooForm.name;
    const email = isPiercing ? piercingForm.email : tattooForm.email;
    const artistName = artists.find((a) => a.slug === tattooForm.artist)?.name ?? "your chosen artist";

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
          Thanks, {name.split(" ")[0] || "there"} — we&apos;ve logged your{" "}
          {isPiercing ? "piercing" : "tattoo"} request
          {!isPiercing && (
            <>
              {" "}
              for {artistName}
            </>
          )}
          . Expect a reply at <span className="text-fg">{email}</span> within two business days to
          confirm details and take a deposit.
        </p>
        <div className="mx-auto mt-8 max-w-sm rounded-lg border border-gold/30 bg-ink p-5 text-left text-sm">
          {isPiercing ? (
            <>
              <SummaryRow label="Service" value={piercingForm.serviceType} />
              <SummaryRow label="Location" value={piercingForm.piercingLocation} />
              <SummaryRow label="Preferred date" value={piercingForm.preferredDate} last />
            </>
          ) : (
            <>
              <SummaryRow label="Service" value={tattooForm.serviceType} />
              <SummaryRow label="Style" value={tattooForm.style} />
              <SummaryRow label="Placement" value={tattooForm.placement} />
              <SummaryRow label="Size" value={tattooForm.size} />
              <SummaryRow label="Budget" value={tattooForm.budget} />
              <SummaryRow label="Preferred date" value={tattooForm.preferredDate} last />
            </>
          )}
        </div>
        <Button variant="outline" className="mt-8" onClick={resetForm}>
          Start Another Request
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      name={serviceType === "piercing" ? "piercing-booking" : "tattoo-booking"}
      method="POST"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value={serviceType === "piercing" ? "piercing-booking" : "tattoo-booking"} />
      <HiddenBookingFields serviceType={serviceType} tattoo={tattooForm} piercing={piercingForm} />
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="booking-bot-field">Do not fill this field</label>
        <input id="booking-bot-field" name="bot-field" tabIndex={-1} autoComplete="off" />
      </div>
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
            key={`${serviceType}-${step}`}
            custom={direction}
            initial={{ opacity: 0, x: direction * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {step === 0 && (
              <StepShell title="What would you like to book?" subtitle="Choose tattoo or piercing to get started.">
                <div className="grid gap-3 sm:grid-cols-2">
                  <ServiceCard
                    title="Tattoo"
                    description="Custom design, placement, and session planning."
                    selected={serviceType === "tattoo"}
                    onClick={() => selectService("tattoo")}
                  />
                  <ServiceCard
                    title="Piercing"
                    description="Location, jewellery guidance, and appointment request."
                    selected={serviceType === "piercing"}
                    onClick={() => selectService("piercing")}
                  />
                </div>
              </StepShell>
            )}

            {serviceType === "tattoo" && step === 1 && (
              <StepShell title="Choose an artist" subtitle="Pick who you'd like to work with, or leave it to us.">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {artists.map((a, i) => (
                    <button
                      key={a.slug}
                      onClick={() => updateTattoo("artist", a.slug)}
                      className={cn(
                        "overflow-hidden rounded-lg border text-left transition-colors",
                        tattooForm.artist === a.slug ? "border-gold" : "border-border hover:border-gold/40"
                      )}
                    >
                      <div className="relative aspect-square">
                        {a.image ? (
                          <Image src={a.image} alt={a.name} fill className="object-cover" />
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
                    onClick={() => updateTattoo("artist", "no-preference")}
                    className={cn(
                      "flex flex-col items-center justify-center rounded-lg border p-4 text-center transition-colors",
                      tattooForm.artist === "no-preference"
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

            {serviceType === "tattoo" && step === 2 && (
              <StepShell title="Pick a style" subtitle="Choose the closest match — your artist will refine it with you.">
                <PillGrid options={styles.map((s) => s.name)} value={tattooForm.style} onChange={(v) => updateTattoo("style", v)} />
              </StepShell>
            )}

            {serviceType === "tattoo" && step === 3 && (
              <StepShell title="Tattoo placement" subtitle="Where on the body is this going?">
                <PillGrid
                  options={tattooPlacements}
                  value={tattooForm.placement}
                  onChange={(v) => updateTattoo("placement", v)}
                />
              </StepShell>
            )}

            {serviceType === "tattoo" && step === 4 && (
              <StepShell title="Approximate size" subtitle="A rough scale helps us quote session length.">
                <PillGrid options={sizeOptions} value={tattooForm.size} onChange={(v) => updateTattoo("size", v)} columns={2} />
              </StepShell>
            )}

            {serviceType === "tattoo" && step === 5 && (
              <StepShell title="Budget range" subtitle="This keeps the design proposal realistic from the start.">
                <PillGrid options={budgetRanges} value={tattooForm.budget} onChange={(v) => updateTattoo("budget", v)} columns={2} />
              </StepShell>
            )}

            {serviceType === "tattoo" && step === 6 && (
              <StepShell title="Preferred dates" subtitle="Give us a target date and a time of day that suits you.">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="tattoo-date">Preferred date</Label>
                    <Input
                      id="tattoo-date"
                      type="date"
                      value={tattooForm.preferredDate}
                      onChange={(e) => updateTattoo("preferredDate", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Time of day</Label>
                    <PillGrid
                      options={["Morning", "Afternoon", "Evening"]}
                      value={tattooForm.timeOfDay}
                      onChange={(v) => updateTattoo("timeOfDay", v)}
                      columns={3}
                    />
                  </div>
                </div>
              </StepShell>
            )}

            {serviceType === "tattoo" && step === 7 && (
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
                      updateTattoo("files", [...tattooForm.files, ...names].slice(0, 5));
                    }}
                  />
                </label>
                {tattooForm.files.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {tattooForm.files.map((name, i) => (
                      <li
                        key={name + i}
                        className="flex items-center justify-between rounded-lg border border-gold/30 bg-ink px-4 py-2 text-sm text-foreground-secondary"
                      >
                        {name}
                        <button
                          onClick={() => updateTattoo("files", tattooForm.files.filter((_, idx) => idx !== i))}
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
                  <Label htmlFor="tattoo-notes">Anything else?</Label>
                  <Textarea
                    id="tattoo-notes"
                    value={tattooForm.notes}
                    onChange={(e) => updateTattoo("notes", e.target.value)}
                    placeholder="Tell us about the idea, cover-ups, or scheduling constraints..."
                  />
                </div>
              </StepShell>
            )}

            {serviceType === "tattoo" && step === 8 && (
              <StepShell title="Contact information" subtitle="So we know where to send the confirmation.">
                <ContactFields
                  name={tattooForm.name}
                  email={tattooForm.email}
                  phone={tattooForm.phone}
                  onNameChange={(v) => updateTattoo("name", v)}
                  onEmailChange={(v) => updateTattoo("email", v)}
                  onPhoneChange={(v) => updateTattoo("phone", v)}
                />
              </StepShell>
            )}

            {serviceType === "piercing" && step === 1 && (
              <StepShell title="Piercing location" subtitle="Where would you like to get pierced?">
                <LocationCardGrid
                  options={piercingLocations}
                  value={piercingForm.piercingLocation}
                  onChange={(v) => {
                    updatePiercing("piercingLocation", v);
                    updatePiercing("earPart", "");
                    updatePiercing("earSide", "");
                    updatePiercing("noseDetail", "");
                    updatePiercing("navelDetail", "");
                    updatePiercing("nippleDetail", "");
                    updatePiercing("locationDetail", "");
                  }}
                />
                <AnimatePresence>
                  {piercingForm.piercingLocation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 space-y-5 rounded-lg border border-gold/20 bg-ink/50 p-5">
                        {piercingForm.piercingLocation === "Ear" && (
                          <>
                            <FollowUpGroup label="Which part of the ear?">
                              {["Lobe", "Helix", "Tragus", "Conch", "Other"].map((opt) => (
                                <FollowUpPill
                                  key={opt}
                                  label={opt}
                                  selected={piercingForm.earPart === opt}
                                  onClick={() => updatePiercing("earPart", opt)}
                                />
                              ))}
                            </FollowUpGroup>
                            <FollowUpGroup label="Left, right, or both?">
                              {["Left", "Right", "Both"].map((opt) => (
                                <FollowUpPill
                                  key={opt}
                                  label={opt}
                                  selected={piercingForm.earSide === opt}
                                  onClick={() => updatePiercing("earSide", opt)}
                                />
                              ))}
                            </FollowUpGroup>
                          </>
                        )}

                        {piercingForm.piercingLocation === "Nose" && (
                          <FollowUpGroup label="Nose pierce style">
                            {["Nostril", "Septum", "Other"].map((opt) => (
                              <FollowUpPill
                                key={opt}
                                label={opt}
                                selected={piercingForm.noseDetail === opt}
                                onClick={() => updatePiercing("noseDetail", opt)}
                              />
                            ))}
                            {piercingForm.noseDetail === "Other" && (
                              <Input
                                className="mt-3"
                                placeholder="Please specify"
                                value={piercingForm.locationDetail}
                                onChange={(e) => updatePiercing("locationDetail", e.target.value)}
                              />
                            )}
                          </FollowUpGroup>
                        )}

                        {piercingForm.piercingLocation === "Navel" && (
                          <FollowUpGroup label="Navel type">
                            {["Standard navel", "Other"].map((opt) => (
                              <FollowUpPill
                                key={opt}
                                label={opt}
                                selected={piercingForm.navelDetail === opt}
                                onClick={() => updatePiercing("navelDetail", opt)}
                              />
                            ))}
                            {piercingForm.navelDetail === "Other" && (
                              <Input
                                className="mt-3"
                                placeholder="Please specify"
                                value={piercingForm.locationDetail}
                                onChange={(e) => updatePiercing("locationDetail", e.target.value)}
                              />
                            )}
                          </FollowUpGroup>
                        )}

                        {piercingForm.piercingLocation === "XXX-Section" && (
                          <div>
                            <Label>Preferred area</Label>
                            <Textarea
                              className="mt-2"
                              placeholder="Please specify the preferred area privately"
                              value={piercingForm.locationDetail}
                              onChange={(e) => updatePiercing("locationDetail", e.target.value)}
                              rows={3}
                            />
                          </div>
                        )}

                        {piercingForm.piercingLocation === "Nipple" && (
                          <FollowUpGroup label="Which side?">
                            {["Left", "Right", "Both"].map((opt) => (
                              <FollowUpPill
                                key={opt}
                                label={opt}
                                selected={piercingForm.nippleDetail === opt}
                                onClick={() => updatePiercing("nippleDetail", opt)}
                              />
                            ))}
                          </FollowUpGroup>
                        )}

                        {!PIERCING_FOLLOW_UP_LOCATIONS.includes(
                          piercingForm.piercingLocation as (typeof PIERCING_FOLLOW_UP_LOCATIONS)[number]
                        ) && (
                          <div>
                            <Label htmlFor="piercing-notes-detail">Additional notes</Label>
                            <Textarea
                              id="piercing-notes-detail"
                              className="mt-2"
                              placeholder="Tell us more about this location"
                              value={piercingForm.locationDetail}
                              onChange={(e) => updatePiercing("locationDetail", e.target.value)}
                              rows={3}
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </StepShell>
            )}

            {serviceType === "piercing" && step === 2 && (
              <StepShell title="Preferred dates" subtitle="Give us a target date and a time of day that suits you.">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="piercing-date">Preferred date</Label>
                    <Input
                      id="piercing-date"
                      type="date"
                      value={piercingForm.preferredDate}
                      onChange={(e) => updatePiercing("preferredDate", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Time of day</Label>
                    <PillGrid
                      options={["Morning", "Afternoon", "Evening"]}
                      value={piercingForm.timeOfDay}
                      onChange={(v) => updatePiercing("timeOfDay", v)}
                      columns={3}
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <Label htmlFor="piercing-notes">Anything else?</Label>
                  <Textarea
                    id="piercing-notes"
                    value={piercingForm.notes}
                    onChange={(e) => updatePiercing("notes", e.target.value)}
                    placeholder="Jewellery preferences, first piercing, or scheduling constraints..."
                  />
                </div>
              </StepShell>
            )}

            {serviceType === "piercing" && step === 3 && (
              <StepShell title="Contact information" subtitle="So we know where to send the confirmation.">
                <ContactFields
                  name={piercingForm.name}
                  email={piercingForm.email}
                  phone={piercingForm.phone}
                  onNameChange={(v) => updatePiercing("name", v)}
                  onEmailChange={(v) => updatePiercing("email", v)}
                  onPhoneChange={(v) => updatePiercing("phone", v)}
                />
              </StepShell>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {submitError && <p role="alert" className="mt-6 text-sm text-oxblood-bright">{submitError}</p>}
      <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
        <Button type="button" variant="ghost" onClick={() => go(-1)} disabled={step === 0 || submitting} size="sm">
          <ArrowLeft size={14} /> Back
        </Button>
        <Button type={step === steps.length - 1 ? "submit" : "button"} onClick={step === steps.length - 1 ? undefined : () => go(1)} disabled={!canAdvance || submitting} size="sm">
          {step === steps.length - 1 ? (
            <>
              {submitting ? "Sending…" : "Submit Request"} <Check size={14} />
            </>
          ) : (
            <>
              Continue <ArrowRight size={14} />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

function HiddenBookingFields({
  serviceType,
  tattoo,
  piercing,
}: {
  serviceType: ServiceType | "";
  tattoo: TattooFormState;
  piercing: PiercingFormState;
}) {
  const values = serviceType === "piercing" ? piercing : tattoo;
  return (
    <div aria-hidden="true" className="hidden">
      {Object.entries(values).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={Array.isArray(value) ? value.join(", ") : value} />
      ))}
    </div>
  );
}

function ServiceCard({
  title,
  description,
  selected,
  onClick,
}: {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "rounded-lg border p-6 text-left transition-colors",
        selected ? "border-gold bg-gold/10" : "border-border hover:border-gold/40"
      )}
      aria-pressed={selected}
    >
      <p className="font-display text-xl text-fg">{title}</p>
      <p className="mt-2 text-sm text-muted">{description}</p>
    </motion.button>
  );
}

function LocationCardGrid({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      const cols = typeof window !== "undefined" && window.innerWidth >= 640 ? 3 : 2;
      let next = index;
      if (e.key === "ArrowRight") next = Math.min(index + 1, options.length - 1);
      else if (e.key === "ArrowLeft") next = Math.max(index - 1, 0);
      else if (e.key === "ArrowDown") next = Math.min(index + cols, options.length - 1);
      else if (e.key === "ArrowUp") next = Math.max(index - cols, 0);
      else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onChange(options[index]);
        return;
      } else return;

      e.preventDefault();
      document.getElementById(`location-${next}`)?.focus();
    },
    [options, onChange]
  );

  return (
    <div role="radiogroup" aria-label="Piercing location" className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {options.map((opt, i) => (
        <motion.button
          key={opt}
          id={`location-${i}`}
          type="button"
          role="radio"
          aria-checked={value === opt}
          tabIndex={value === opt || (value === "" && i === 0) ? 0 : -1}
          whileHover={{ scale: 1.03, borderColor: "rgba(212, 175, 55, 0.6)" }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onChange(opt)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className={cn(
            "min-h-[52px] rounded-lg border px-4 py-3 text-left text-sm transition-colors duration-200",
            value === opt
              ? "border-gold bg-gold/10 text-gold-bright shadow-[0_0_20px_rgba(212,175,55,0.15)]"
              : "border-border text-fg/80 hover:border-gold/40 hover:bg-gold/5"
          )}
        >
          {opt}
        </motion.button>
      ))}
    </div>
  );
}

function FollowUpGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-2 flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FollowUpPill({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "rounded-full border px-3 py-2 text-xs transition-colors",
        selected ? "border-gold bg-gold/10 text-gold-bright" : "border-border text-fg/80 hover:border-gold/40"
      )}
    >
      {label}
    </button>
  );
}

function ContactFields({
  name,
  email,
  phone,
  onNameChange,
  onEmailChange,
  onPhoneChange,
}: {
  name: string;
  email: string;
  phone: string;
  onNameChange: (v: string) => void;
  onEmailChange: (v: string) => void;
  onPhoneChange: (v: string) => void;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div>
        <Label htmlFor="name">Full name</Label>
        <Input id="name" value={name} onChange={(e) => onNameChange(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={email} onChange={(e) => onEmailChange(e.target.value)} required />
      </div>
      <div className="sm:col-span-2">
        <Label htmlFor="phone">Phone (optional)</Label>
        <Input id="phone" type="tel" value={phone} onChange={(e) => onPhoneChange(e.target.value)} />
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
          type="button"
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
