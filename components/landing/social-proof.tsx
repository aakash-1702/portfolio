"use client";

import { cpStats } from "@/data/cp-stats";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

function AnimatedCounter({ value, label, suffix }: { value: number; label: string; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (isInView) {
      animate(count, value, {
        duration: 1.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      });
    }
  }, [isInView, count, value]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1">
      <div className="flex items-baseline gap-0.5">
        <motion.span className="text-2xl sm:text-3xl font-semibold text-white tabular-nums tracking-tight-custom">
          {rounded}
        </motion.span>
        {suffix && (
          <span className="text-sm text-[#c4a482] font-medium">{suffix}</span>
        )}
      </div>
      <span className="font-mono text-[10px] uppercase tracking-widest text-[#666]">
        {label}
      </span>
    </div>
  );
}

export function SocialProof() {
  return (
    <div className="flex items-center justify-start gap-8 sm:gap-12 py-6 mt-10 border-t border-b border-white/[0.04]">
      <AnimatedCounter value={cpStats.leetcode.solved} label="Problems Solved" suffix="+" />
      <AnimatedCounter value={cpStats.leetcode.rating} label="LC Rating" />
      {cpStats.codeforces && (
        <AnimatedCounter value={cpStats.codeforces.rating} label="CF Rating" />
      )}
    </div>
  );
}
