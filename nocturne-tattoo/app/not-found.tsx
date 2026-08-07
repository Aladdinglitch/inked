import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-gold">404</p>
      <h1 className="mt-4 font-display text-5xl text-fg sm:text-6xl">Page not inked yet.</h1>
      <p className="mt-4 max-w-md text-sm text-muted">
        Whatever you were looking for isn&apos;t here. Try the homepage, or head straight to booking.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button asChild>
          <Link href="/">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/booking">Book a Session</Link>
        </Button>
      </div>
    </section>
  );
}
