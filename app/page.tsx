import { SelectedWork } from "@/components/landing/selected-work";
import { CPSnapshot } from "@/components/landing/cp-snapshot";
import { CareerVision } from "@/components/landing/career-vision";
import { HireMeCard } from "@/components/landing/hire-me";
import { WritingTeaser } from "@/components/landing/writing-teaser";
import { Timeline } from "@/components/landing/timeline";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import { ResumeSection } from "@/components/landing/resume-section";
import { StackFocusCards } from "@/components/landing/stack-focus-cards";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6 pt-28 pb-24">
      {/* ━━ Hero ━━ */}
      <StaggerContainer className="pt-10 pb-8" staggerChildren={0.12}>
        <StaggerItem>
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/[0.08] border border-emerald-500/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
            <span className="text-[12px] font-medium text-emerald-400/90">
              Open to SWE / Full Stack / Agentic-Ai / Gen-Ai roles · 2026
            </span>
          </div>
        </StaggerItem>
        <StaggerItem>
          <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-semibold tracking-tight-custom text-white leading-[1.15] max-w-3xl text-balance mb-4">
            I build backend systems
            <br />
            that <span className="text-glow italic">actually work</span> at 3
            AM.
          </h1>
        </StaggerItem>
        <StaggerItem>
          <p className="text-lg text-[#999] max-w-2xl leading-relaxed mb-10">
            Full-stack engineer obsessed with relational data, clean schemas,
            and shipping infrastructure that you can trust with production
            traffic. 3rd year B.Tech CSE.
          </p>
        </StaggerItem>
      </StaggerContainer>

      <div className="space-y-20 sm:space-y-24">
        {/* ━━ Stack/Focus/Currently ━━ */}
        <FadeIn>
          <StackFocusCards />
        </FadeIn>

        {/* ━━ Selected Work ━━ */}
        <FadeIn>
          <div className="section-sep mb-10">
            <span>01 — Selected Work</span>
          </div>
          <SelectedWork />
        </FadeIn>

        {/* ━━ CP Analytics ━━ */}
        <FadeIn>
          <div className="section-sep mb-10">
            <span>02 — Competitive Programming</span>
          </div>
          <CPSnapshot />
        </FadeIn>

        {/* ━━ Philosophy ━━ */}
        <FadeIn>
          <div className="section-sep mb-10">
            <span>03 — What Drives Me</span>
          </div>
          <CareerVision />
        </FadeIn>

        {/* ━━ Writing ━━ */}
        <FadeIn>
          <div className="section-sep mb-10">
            <span>04 — Writing</span>
          </div>
          <WritingTeaser />
        </FadeIn>

        {/* ━━ Journey ━━ */}
        <FadeIn>
          <div className="section-sep mb-10">
            <span>05 — Journey</span>
          </div>
          <Timeline />
        </FadeIn>

        {/* ━━ CTA ━━ */}
        <FadeIn>
          <HireMeCard />
        </FadeIn>

        {/* ━━ Resume ━━ */}
        <FadeIn>
          <ResumeSection />
        </FadeIn>
      </div>
    </div>
  );
}
