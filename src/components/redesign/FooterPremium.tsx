"use client";
import Link from "next/link";

export default function FooterPremium() {
  return (
    <footer className="mt-20 border-t border-neutral-100 bg-white py-20">
      <div className="container grid gap-8 md:grid-cols-3">
        <div>
          <h4 className="font-display text-2xl">Inked Attraction</h4>
          <p className="mt-3 text-sm text-muted">Lagos tattoo and piercing studio — modern, safe, and client-focused.</p>
        </div>

        <div>
          <p className="text-sm font-medium">Navigate</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/artists">Artists</Link></li>
            <li><Link href="/portfolio">Portfolio</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium">Stay in touch</p>
          <form className="mt-4 flex gap-2">
            <input aria-label="Email" placeholder="Email address" className="w-full rounded-full border border-neutral-200 px-4 py-2 text-sm" />
            <button className="rounded-full bg-black px-4 py-2 text-sm text-white">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="container mt-12 border-t border-neutral-100 pt-8 text-sm text-muted">© Inked Attraction — All rights reserved.</div>
    </footer>
  );
}
