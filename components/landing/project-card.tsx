"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { ProjectData } from "@/lib/types";
import { ArrowUpRight, Github } from "lucide-react";
import { useState } from "react";

export function ProjectCard({
  project,
  variant = "default",
}: {
  project: ProjectData;
  variant?: "hero" | "default";
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col w-full h-64 group relative cursor-pointer"
    >
      <Link
        href={`/projects/${project.slug}`}
        className={`group block card relative overflow-hidden ${
          variant === "hero" ? "p-8 sm:p-10" : "p-6 sm:p-8"
        } grow group-hover:opacity-100 group-hover:scale-105 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5">
          {/* Left: Content */}
          <div className="space-y-4 flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <h3
                className={`font-semibold tracking-tight-custom text-white group-hover:text-accent transition-colors duration-300 ${
                  variant === "hero" ? "text-2xl" : "text-xl"
                }`}
              >
                {project.title}
              </h3>
              {project.featured && (
                <span className="shrink-0 font-mono text-[9px] uppercase tracking-widest text-accent bg-accent/8 border border-accent/15 rounded-full px-2.5 py-1">
                  Featured
                </span>
              )}
            </div>

            <p
              className={`text-[#999] leading-relaxed max-w-xl ${
                variant === "hero" ? "text-base" : "text-[15px]"
              }`}
            >
              {project.description}
            </p>

            {/* Tech stack */}
            <p className="font-mono text-xs text-[#666]">
              {project.stack.join(" · ")}
            </p>
          </div>

          {/* Right: Actions */}
          <div className="flex sm:flex-col items-center gap-3 shrink-0 sm:pt-1">
            <div
              className="w-10 h-10 rounded-full bg-white/4 border border-white/6 flex items-center justify-center text-[#999]
                            group-hover:bg-accent group-hover:text-background group-hover:border-transparent
                            transition-all duration-300"
            >
              <ArrowUpRight
                size={18}
                className="group-hover:rotate-45 transition-transform duration-300"
              />
            </div>
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#555] hover:text-white transition-colors p-1"
                  aria-label="View source"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={15} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Hover impact overlay */}
        <AnimatePresence>
          {hovered && project.impact && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute bottom-0 left-0 right-0 px-6 sm:px-8 py-4 bg-linear-to-t from-surface/95 via-surface/80 to-transparent"
            >
              <p className="text-sm text-accent font-medium">
                {project.impact}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </Link>
    </motion.div>
  );
}
