import type { Metadata } from "next";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import { FileDown } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Akash Dwivedi — backend-focused full-stack engineer building scalable systems.",
};

const stack = [
  "TypeScript",
  "Next.js",
  "React",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "Redis",
  "TailwindCSS",
  "Docker",
  "Git",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-32 pb-24">
      <StaggerContainer className="space-y-20" staggerChildren={0.1}>
        {/* Header */}
        <StaggerItem>
          <header>
            <div className="section-sep mb-6">
              <span>About</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight-custom text-white mb-4">
              The person behind the code
            </h1>
            <p className="text-lg text-[#aaa] max-w-xl leading-relaxed mb-6">
              Debuggers over debug logs. Data integrity over optimistic UI.
              I build things to last.
            </p>
            <a
              href="/AkashResume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#c4a482]/30 bg-[#c4a482]/5 text-[#c4a482] text-sm font-medium hover:bg-[#c4a482]/10 hover:border-[#c4a482]/50 transition-all duration-300"
            >
              <FileDown size={16} />
              Download Resume
            </a>
          </header>
        </StaggerItem>

        {/* Bio */}
        <StaggerItem>
          <div className="space-y-6 text-[16px] leading-relaxed">
            <p className="text-[#ccc]">
              I&apos;m Akash — a 3rd year CS student diving deep into distributed
              systems, database internals, and backend architecture. I believe
              the best code is code you don&apos;t have to think about at 3 AM.
            </p>
            <p className="text-[#999]">
              My main project is{" "}
              <span className="text-glow font-medium">BaseCase</span>, a DSA
              tracking platform. I built it to challenge my understanding of
              relational schemas (Sheet → Section → Problem) and nested, atomic
              transactions.
            </p>
            <p className="text-[#999]">
              When I&apos;m not building, I&apos;m usually doing Competitive
              Programming — not for the rank, but because writing efficient
              algorithms under pressure fundamentally changes how you write
              application code.
            </p>
          </div>
        </StaggerItem>

        {/* Technical Arsenal */}
        <StaggerItem>
          <div className="card p-8 sm:p-10">
            <div className="section-sep mb-6">
              <span>Technical Arsenal</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {stack.map((tech) => (
                <div
                  key={tech}
                  className="px-4 py-2 rounded-full border border-white/[0.05] bg-white/[0.02] text-[#bbb] text-sm
                             hover:border-[#c4a482]/25 hover:text-white magnetic-hover cursor-default"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </StaggerItem>

        {/* CP Section */}
        <StaggerItem>
          <div>
            <div className="section-sep mb-6">
              <span>Competitive Programming</span>
            </div>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              LeetCode{" "}
              <span className="text-white font-semibold tabular-nums">1868</span> ·
              CodeChef{" "}
              <span className="text-white font-semibold">2★</span> ·
              Working towards Guardian (2200). I do CP because it makes me a
              better engineer, not because I enjoy TLE at 2 AM.
            </p>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </div>
  );
}
