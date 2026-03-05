"use client";

import { timeline } from "@/data/timeline";
import { motion } from "framer-motion";
import { GraduationCap, Rocket, Trophy } from "lucide-react";

const icons = {
  education: GraduationCap,
  project: Rocket,
  achievement: Trophy,
};

export function Timeline() {
  return (
    <section>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight-custom text-white">
          Journey
        </h2>
        <p className="text-sm text-[#777] mt-1">
          A timeline of milestones
        </p>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-[#c4a482]/20 via-white/[0.06] to-transparent" />

        <div className="space-y-0">
          {timeline.map((event, i) => {
            const Icon = icons[event.type];
            return (
              <motion.div
                key={`${event.year}-${event.title}`}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className="relative flex gap-5 py-5"
              >
                {/* Node */}
                <div className="relative z-10 flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-[#0a0a0a] border border-white/[0.08]">
                  <Icon size={16} className="text-[#c4a482]" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-1.5">
                  <div className="flex items-center gap-3 mb-1.5">
                    <h3 className="text-[15px] font-medium text-white">
                      {event.title}
                    </h3>
                    <span className="font-mono text-[10px] text-[#555] tabular-nums">
                      {event.year}
                    </span>
                  </div>
                  <p className="text-sm text-[#888] leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
