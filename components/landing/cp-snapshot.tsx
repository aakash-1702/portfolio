"use client";

import { cpStats } from "@/data/cp-stats";
import { ArrowUpRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      className="text-4xl sm:text-5xl font-semibold tracking-tight-custom text-white tabular-nums"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {value}
    </motion.span>
  );
}

export function CPSnapshot() {
  const progress = Math.round(
    (cpStats.guardian.current / cpStats.guardian.target) * 100
  );
  const progressRef = useRef(null);
  const progressInView = useInView(progressRef, { once: true });

  return (
    <section>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight-custom text-white">
          Competitive Analytics
        </h2>
        <p className="text-sm text-[#777] mt-1">
          Because algorithms make you a better engineer
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* LeetCode */}
        <a
          href={cpStats.leetcode.profile}
          target="_blank"
          rel="noopener noreferrer"
          className="group card p-6 sm:p-8 flex flex-col justify-between min-h-[200px]"
        >
          <div className="flex justify-between items-start">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#666]">
              LeetCode
            </p>
            <ArrowUpRight
              size={14}
              className="text-[#333] group-hover:text-[#c4a482] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300"
            />
          </div>
          <div className="mt-auto pt-6">
            <AnimatedNumber value={cpStats.leetcode.rating} />
            <p className="text-sm text-[#888] mt-2">
              {cpStats.leetcode.solved} problems solved
            </p>
            {cpStats.leetcode.percentile && (
              <p className="text-xs text-[#c4a482]/70 mt-1 font-mono">
                {cpStats.leetcode.percentile} globally
              </p>
            )}
          </div>
        </a>

        {/* Codeforces */}
        {cpStats.codeforces ? (
          <a
            href={cpStats.codeforces.profile}
            target="_blank"
            rel="noopener noreferrer"
            className="group card p-6 sm:p-8 flex flex-col justify-between min-h-[200px]"
          >
            <div className="flex justify-between items-start">
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#666]">
                Codechef
              </p>
              <ArrowUpRight
                size={14}
                className="text-[#333] group-hover:text-[#c4a482] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300"
              />
            </div>
            <div className="mt-auto pt-6">
              <AnimatedNumber value={cpStats.codeforces.rating} />
              <p className="text-sm text-[#888] mt-2">
                Max rating {cpStats.codeforces.maxRating}
              </p>
              {cpStats.codeforces.percentile && (
                <p className="text-xs text-[#c4a482]/70 mt-1 font-mono">
                  {cpStats.codeforces.percentile} globally
                </p>
              )}
            </div>
          </a>
        ) : (
          /* CodeChef fallback */
          <a
            href={cpStats.codechef.profile}
            target="_blank"
            rel="noopener noreferrer"
            className="group card p-6 sm:p-8 flex flex-col justify-between min-h-[200px]"
          >
            <div className="flex justify-between items-start">
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#666]">
                CodeChef
              </p>
              <ArrowUpRight
                size={14}
                className="text-[#333] group-hover:text-[#c4a482] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300"
              />
            </div>
            <div className="mt-auto pt-6">
              <div className="flex items-baseline gap-2">
                <AnimatedNumber value={cpStats.codechef.stars} />
                <span className="text-3xl text-[#c4a482]">★</span>
              </div>
              <p className="text-sm text-[#888] mt-2">
                Peak rating {cpStats.codechef.rating}
              </p>
            </div>
          </a>
        )}
      </div>

      {/* Road to Guardian */}
      <div ref={progressRef} className="card p-6 sm:p-8 mt-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#c4a482] mb-1">
              Current Objective
            </p>
            <p className="text-lg font-medium text-white">Road to Guardian</p>
          </div>
          <div className="flex items-baseline gap-1.5 font-mono text-sm tabular-nums">
            <span className="text-[#c4a482]">{cpStats.guardian.current}</span>
            <span className="text-[#444]">/</span>
            <span className="text-[#999]">{cpStats.guardian.target}</span>
          </div>
        </div>

        <div className="relative h-2 w-full bg-white/[0.04] rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#c4a482] to-[#d4b896] rounded-full"
            initial={{ width: 0 }}
            animate={progressInView ? { width: `${progress}%` } : {}}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          />
          {/* Glow layer */}
          <motion.div
            className="absolute top-0 left-0 h-full bg-[#c4a482]/30 rounded-full blur-sm"
            initial={{ width: 0 }}
            animate={progressInView ? { width: `${progress}%` } : {}}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          />
        </div>

        <div className="flex justify-between mt-3">
          <p className="font-mono text-[11px] text-[#666] tabular-nums">
            {cpStats.guardian.target - cpStats.guardian.current} points to go
          </p>
          <p className="font-mono text-[11px] text-[#666] tabular-nums">
            {progress}% complete
          </p>
        </div>
      </div>
    </section>
  );
}
