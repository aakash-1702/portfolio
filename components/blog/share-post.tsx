"use client";

import { useState } from "react";
import { Check, Copy, Twitter } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

interface SharePostProps {
  title: string;
  slug: string;
}

export function SharePost({ title, slug }: SharePostProps) {
  const [copied, setCopied] = useState(false);
  const url = `${SITE_CONFIG.url}/blog/${slug}`;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: just ignore if clipboard API is unavailable
    }
  };

  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-[10px] uppercase tracking-widest text-[#666]">
        Share
      </span>
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-xs text-[#666] hover:text-[#c4a482] transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter size={14} />
        <span>Twitter</span>
      </a>
      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 text-xs text-[#666] hover:text-[#c4a482] transition-colors"
        aria-label="Copy link"
      >
        {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
        <span>{copied ? "Copied!" : "Copy link"}</span>
      </button>
    </div>
  );
}
