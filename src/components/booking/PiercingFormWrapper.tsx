"use client";

import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { PiercingForm } from "@/components/booking/PiercingForm";

function PiercingFormFallback() {
  return <Skeleton className="h-96 w-full rounded-3xl" />;
}

export function PiercingFormWrapper() {
  return (
    <Suspense fallback={<PiercingFormFallback />}>
      <PiercingForm />
    </Suspense>
  );
}
