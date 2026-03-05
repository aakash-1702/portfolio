"use client";
import { motion } from "framer-motion";

export function AnimatedShader() {
  return (
    <div
      aria-hidden="true"
      className="shader-blob pointer-events-none fixed inset-0 -z-10"
    >
      <motion.div
        initial={{ opacity: 0.6, scale: 1 }}
        animate={{
          x: [0, 120, -80, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.08, 0.98, 1],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[-10%] top-[-10%] w-[60vw] h-[60vw] sm:w-[40vw] sm:h-[40vw] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(196,164,130,0.12), transparent 30%), radial-gradient(circle at 80% 70%, rgba(180,140,100,0.08), transparent 40%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0.45 }}
        animate={{
          x: [0, -90, 60, 0],
          y: [0, 20, -30, 0],
          scale: [1, 0.98, 1.06, 1],
        }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[-12%] bottom-[-8%] w-[50vw] h-[50vw] sm:w-[30vw] sm:h-[30vw] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 20% 80%, rgba(90,60,40,0.06), transparent 30%), radial-gradient(circle at 60% 30%, rgba(196,164,130,0.06), transparent 40%)",
        }}
      />
    </div>
  );
}
