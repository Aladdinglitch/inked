import { Instagram, Facebook, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const socials = [
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/inked_attraction?igsh=ZjEybG83c290dXcz" },
  { icon: ExternalLink, label: "TikTok", href: "https://www.tiktok.com/@inked_attraction?_r=1&_t=ZS-98cS2BvS4w" },
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/inked_Attraction" },
];

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {socials.map(({ icon: Icon, label, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-gold hover:text-gold"
        >
          <Icon size={16} />
        </a>
      ))}
    </div>
  );
}
