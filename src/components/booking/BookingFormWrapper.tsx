"use client";

import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { BookingForm } from "@/components/booking/BookingForm";

function BookingFormFallback() {
  return <Skeleton className="h-96 w-full rounded-3xl" />;
}

export function BookingFormWrapper() {
  return (
    <Suspense fallback={<BookingFormFallback />}>
      <BookingForm />
    </Suspense>
  );
}
