import { projects } from "@/data/projects";
import { ProjectCard } from "./project-card";
import Link from "next/link";

export function SelectedWork() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section>
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight-custom text-white">
            Selected Work
          </h2>
          <p className="text-sm text-[#777] mt-1">Projects I&apos;m proud of</p>
        </div>
        <Link
          href="/projects"
          className="text-sm text-[#666] hover:text-accent transition-colors magnetic-hover"
        >
          View all &rarr;
        </Link>
      </div>

      {/* Featured projects — full-width hero cards */}
      {featured.length > 0 && (
        <div className="space-y-4 mb-4">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}

      {/* Non-featured projects — smaller cards */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rest.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
