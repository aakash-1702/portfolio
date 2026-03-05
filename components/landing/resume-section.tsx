"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function ResumeSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mt-28"
    >
      <div className="section-sep mb-10">
        <span>06 — Resume</span>
      </div>

      <div className="card p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-6">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-2">
            Download My Resume
          </h3>
          <p className="text-[#ddd] leading-relaxed">
            Explore my professional journey, skills, and accomplishments in
            detail. Download my resume to learn more about my experience and how
            I can contribute to your team.
          </p>
        </div>

        <div className="flex flex-col items-start sm:items-end gap-3">
          <a
            href="/resume/demo-resume.pdf"
            download
            className="inline-block bg-[#c4a482] text-black px-4 py-2 rounded-md font-medium hover:opacity-95"
          >
            Download Resume
          </a>
          <Link
            href="/contact"
            className="text-sm text-[#ddd] hover:text-[#c4a482]"
          >
            Contact me for more details
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
