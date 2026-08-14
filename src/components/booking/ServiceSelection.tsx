"use client";

import Link from "next/link";

export function ServiceSelection() {
  return (
    <div className="rounded-3xl border border-border bg-card p-8">
      <p className="eyebrow mb-2">Booking</p>
      <h2 className="display text-2xl mb-4">What would you like to book?</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/booking/tattoo"
          className="group rounded-2xl border p-6 text-left transition hover:shadow-lg"
        >
          <h3 className="text-lg font-semibold">Tattoo</h3>
          <p className="mt-2 text-sm text-muted-foreground">Custom tattoo consultation and booking form.</p>
        </Link>

        <Link
          href="/booking/piercing"
          className="group rounded-2xl border p-6 text-left transition hover:shadow-lg"
        >
          <h3 className="text-lg font-semibold">Piercing</h3>
          <p className="mt-2 text-sm text-muted-foreground">Piercing intake — jewellery, area, experience, and appointment request.</p>
        </Link>
      </div>
    </div>
  );
}
