"use client";

import { SITE_CONFIG } from "@/lib/constants";
import { Twitter, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ui/fade-in";

const links = [
  {
    label: "Email",
    href: `mailto:${SITE_CONFIG.email}`,
    value: SITE_CONFIG.email,
    icon: Mail,
    accent: "group-hover:text-rose-400",
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/im_aakash49",
    value: "x.com/im_aakash49",
    icon: Twitter,
    accent: "group-hover:text-[#c4a482]",
  },
  {
    label: "LinkedIn",
    href: SITE_CONFIG.linkedin,
    value: "linkedin.com/in/aakash49",
    icon: Linkedin,
    accent: "group-hover:text-blue-400",
  },
];

function handleEmailClick(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  // Try mailto first; if browser doesn't handle it, fall back to Gmail compose
  const email = SITE_CONFIG.email;
  const mailtoUrl = `mailto:${email}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${email}`;

  // Attempt mailto via a hidden iframe to detect failure
  window.location.href = mailtoUrl;

  // Fallback: if nothing happens after 500ms, open Gmail
  setTimeout(() => {
    window.open(gmailUrl, "_blank");
  }, 500);
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-32 pb-24">
      <StaggerContainer className="space-y-16" staggerChildren={0.1}>
        {/* Header */}
        <StaggerItem>
          <header>
            <div className="section-sep mb-6">
              <span>Contact</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight-custom text-white mb-4">
              Let&apos;s talk
            </h1>
            <p className="text-lg text-[#aaa] max-w-xl leading-relaxed">
              Open to internships, collaborations, and interesting backend
              problems. Don&apos;t be a stranger.
            </p>
          </header>
        </StaggerItem>

        {/* Contact Cards */}
        <StaggerItem>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={link.label === "Email" ? handleEmailClick : undefined}
                target={link.label !== "Email" ? "_blank" : undefined}
                rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
                className="group card p-6 flex flex-col justify-between min-h-[180px]"
              >
                <div className="flex justify-between items-start">
                  <div className={`p-3 rounded-full bg-white/[0.03] border border-white/[0.05] ${link.accent} transition-colors duration-300`}>
                    <link.icon size={18} className="text-[#888] transition-colors duration-300" />
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="text-[#333] group-hover:text-[#999] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300"
                  />
                </div>
                <div className="mt-auto pt-4">
                  <p className="text-base font-medium text-white">{link.label}</p>
                  <p className="text-sm text-[#777] mt-0.5 truncate">{link.value}</p>
                </div>
              </a>
            ))}
          </div>
        </StaggerItem>
      </StaggerContainer>
    </div>
  );
}
