import { FadeIn } from "@/components/ui/fade-in";
import Link from "next/link";

export function CareerVision() {
  return (
    <section>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight-custom text-white">
          What Drives Me
        </h2>
        <p className="text-sm text-[#777] mt-1">
          The kind of work I want to do, and how I help teams win
        </p>
      </div>

      <div className="card relative overflow-hidden p-8 sm:p-12">
        {/* Large decorative quote */}
        <div className="absolute top-4 left-6 text-[120px] leading-none font-serif text-white/[0.02] select-none pointer-events-none">
          &ldquo;
        </div>

        <div className="relative z-10 space-y-6 max-w-2xl">
          <p className="text-lg sm:text-xl text-[#ddd] leading-relaxed font-light">
            I treat reliability as a product requirement. I design systems that
            are observable, testable, and easy for teammates to own — so your
            on-call rotations actually get easier over time.
          </p>

          <p className="text-[15px] text-[#999] leading-relaxed">
            I prefer schema-first design, small blast-radius deployments, and
            clear runbooks. I enjoy mentoring engineers to write safe migrations
            and building APIs that are delightful for integrators.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-white/[0.06]">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wide-custom text-[#c4a482]">
                Key strengths
              </p>
              <ul className="mt-2 text-sm text-[#ddd] space-y-1">
                <li>• Distributed systems & data integrity</li>
                <li>• Postgres, queues, and robust batching</li>
                <li>• Observability & SLO-driven design</li>
              </ul>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-wide-custom text-[#c4a482]">
                Recent impact
              </p>
              <ul className="mt-2 text-sm text-[#ddd] space-y-1">
                <li>
                  • Reduced incident frequency by improving schema migrations
                </li>
                <li>
                  • Shipped a resilient ingestion pipeline for product analytics
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex items-center gap-4">
            <Link
              href="/contact"
              className="bg-[#c4a482] text-black px-4 py-2 rounded-md font-medium"
            >
              Let's connect
            </Link>
            <a
              href="/projects/basecase"
              className="text-sm text-[#ddd] hover:text-[#c4a482]"
            >
              Read recent work ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
