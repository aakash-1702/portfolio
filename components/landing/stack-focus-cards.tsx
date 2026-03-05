"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export function StackFocusCards() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const cards = [
    {
      title: "Stack",
      items: [
        "TypeScript",
        "PostgreSQL",
        "MongoDB",
        "AWS",
        "Kubernetes",
        "Docker",
        "React",
        "Node.js",
        "Redis",
        "Next.js",
      ],
    },
    {
      title: "Focus",
      items: [
        "Systems",
        "Architecture",
        "Data Integrity",
        "Scalability",
        "DevOps",
        "Cloud Infrastructure",
      ],
    },
    {
      title: "Currently",
      items: [
        "Building BaseCase",
        "Grinding LeetCode",
        "Learning advanced cloud patterns",
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
      {cards.map((card, idx) => {
        const isActive = activeCard === idx;
        const isMuted = activeCard !== null && !isActive;

        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -6, scale: 1.015 }}
            transition={{
              duration: 0.8,
              ease: [0.25, 1, 0.5, 1],
              delay: idx * 0.15,
            }}
            onHoverStart={() => setActiveCard(idx)}
            onHoverEnd={() => setActiveCard(null)}
            className={`relative overflow-hidden rounded-xl border cursor-default transition-all duration-300 group ${
              isActive
                ? "bg-white/6 border-accent/35 shadow-[0_14px_36px_-16px_rgba(196,164,130,0.45)]"
                : "bg-white/2 border-white/8"
            } ${isMuted ? "opacity-65 scale-[0.985]" : "opacity-100"}`}
            style={{ minHeight: "220px" }}
          >
            <div
              className={`absolute inset-0 pointer-events-none z-0 transition-opacity duration-300 ${
                isActive ? "opacity-100" : "opacity-70"
              }`}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient
                    id={`shader${idx}`}
                    cx="50%"
                    cy="50%"
                    r="50%"
                    fx="50%"
                    fy="50%"
                  >
                    <stop offset="0%" stopColor="#c4a482" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#c4a482" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <ellipse cx="100" cy="100" rx="90" ry="60">
                  <animate
                    attributeName="rx"
                    values="90;100;90"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="ry"
                    values="60;70;60"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </ellipse>
                <ellipse
                  cx="100"
                  cy="100"
                  rx="90"
                  ry="60"
                  fill={`url(#shader${idx})`}
                />
              </svg>
            </div>

            <div
              className={`pointer-events-none absolute inset-0 rounded-xl bg-linear-to-br from-accent/16 via-transparent to-transparent transition-opacity duration-300 ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            />

            <div className="relative z-10 p-6 sm:p-7 flex flex-col h-full justify-center items-start">
              <p
                className={`text-[10px] uppercase tracking-wide-custom mb-2 font-mono transition-colors duration-300 ${
                  isActive ? "text-accent" : "text-accent/80"
                }`}
              >
                {card.title}
              </p>
              <ul
                className={`text-sm space-y-1.5 transition-colors duration-300 ${
                  isActive ? "text-[#ddd]" : "text-[#9a9a9a]"
                }`}
              >
                {card.items.map((item) => (
                  <li
                    key={item}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
