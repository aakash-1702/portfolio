"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export function HireMeCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="card p-6 sm:p-8 mt-8 flex flex-col sm:flex-row items-start gap-6"
    >
      <div className="flex-1">
        <p className="text-sm text-[#c4a482] font-mono uppercase mb-2">
          Open to work
        </p>
        <h3 className="text-xl font-semibold text-white mb-2">
          Hiring? Let's talk.
        </h3>
        <p className="text-[#ddd] leading-relaxed">
          I build reliable backend systems and ship battle-tested features. I
          care about clear APIs, operability, and documentation that helps teams
          move faster.
        </p>

        <ul className="mt-4 text-sm text-[#999] space-y-1">
          <li>• Availability: Immediate for full-time or contract (remote)</li>
          <li>
            • Preferred domains: Core infra, data platforms, high-throughput
            APIs
          </li>
          <li>
            • Impact highlights: shipped resilient data pipelines & schema-first
            migrations
          </li>
        </ul>
      </div>

      <div className="flex flex-col items-start sm:items-end gap-3">
        <Link
          href="/contact"
          className="inline-block bg-[#c4a482] text-black px-4 py-2 rounded-md font-medium hover:opacity-95"
        >
          Contact me
        </Link>
        <a
          href="mailto:hello@example.com"
          className="text-sm text-[#ddd] hover:text-[#c4a482]"
        >
          hello@example.com
        </a>
      </div>
    </motion.div>
  );
}
