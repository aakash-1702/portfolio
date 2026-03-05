import { SITE_CONFIG } from "@/lib/constants";
import { Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  { label: "GitHub", href: SITE_CONFIG.github, icon: Github },
  { label: "LinkedIn", href: SITE_CONFIG.linkedin, icon: Linkedin },
  { label: "Email", href: `mailto:${SITE_CONFIG.email}`, icon: Mail },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.04] bg-[#030303]/80 backdrop-blur-xl mt-24">
      <div className="mx-auto max-w-4xl px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="text-lg font-medium text-[#ededed] tracking-tight-custom">
            {SITE_CONFIG.name}
          </p>
          <p className="text-[#666] text-sm">
            Backend Systems &amp; Architecture
          </p>
        </div>

        {/* Right Side */}
        <div className="flex flex-col items-center md:items-end gap-6">
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.label !== "Email" ? "_blank" : undefined}
                rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
                aria-label={link.label}
                className="group p-2 -m-2"
              >
                <link.icon
                  size={18}
                  className="text-[#666] group-hover:text-[#c4a482] transition-colors duration-300"
                />
              </a>
            ))}
          </div>
          <p className="font-mono text-[10px] text-[#444] uppercase tracking-widest">
            Crafted with Next.js · Deployed on Vercel · © 2025
          </p>
        </div>

      </div>
    </footer>
  );
}
