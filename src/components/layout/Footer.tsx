import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { SocialLinks } from "@/components/ui/social-links";
import { Logo } from "@/components/brand/Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-[#050505]">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:py-20">
        <div className="flex flex-col items-center gap-6 border-b border-border pb-12">
          <Logo variant="footer" />
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.14em] text-muted-foreground">
              Tattoo &amp; Piercing
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.14em] text-muted-foreground/80">
              Your Story. Our Art.
            </p>
          </div>
        </div>

        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <p className="text-sm leading-7 text-muted-foreground">
              Premium custom ink, precision piercings, and thoughtful appointment experiences. Where artistry meets luxury.
            </p>
            <div className="mt-6">
              <SocialLinks />
            </div>
          </div>
          <div>
            <p className="eyebrow mb-5">Explore</p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {NAV_LINKS.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-5">Studio</p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {NAV_LINKS.slice(4).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/booking" className="text-primary transition-colors hover:text-foreground">
                  Request a consultation
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-5">Visit the studio</p>
            <p className="text-sm leading-6 text-muted-foreground">
              {SITE.address}
              <br />
              {SITE.city}
            </p>
            <a className="mt-4 block text-sm text-muted-foreground transition-colors hover:text-primary" href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <a className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-primary" href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
          </div>
        </div>
      </div>

      <div className="border-t border-border px-4 py-5 text-center text-xs text-muted-foreground md:px-6">
        © {year} Inked Attraction. All rights reserved.
      </div>
    </footer>
  );
}
