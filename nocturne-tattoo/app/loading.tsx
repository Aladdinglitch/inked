import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container pt-40 pb-24 sm:pt-48">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="mt-6 h-14 w-3/4" />
      <Skeleton className="mt-4 h-5 w-1/2" />
      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[4/5] w-full" />
        ))}
      </div>
    </div>
  );
}
