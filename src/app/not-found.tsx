import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-4 py-32 md:px-6">
      <p className="eyebrow">404</p>
      <h1 className="display text-5xl text-foreground">Page not found</h1>
      <p className="text-muted-foreground">That route doesn&apos;t exist.</p>
      <Button asChild>
        <Link href="/">Back home</Link>
      </Button>
    </div>
  );
}
