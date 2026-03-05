import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/landing/project-card";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Engineering projects — full-stack systems, data modeling, and scalable architecture.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pt-28 pb-16 space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          Projects
        </h1>
        <p className="text-sm text-zinc-400">
          Systems I&apos;ve designed and built.
        </p>
      </header>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-zinc-500 py-12 text-center">
          No projects yet.
        </p>
      )}

      <div className="pt-4">
        <Link
          href="/"
          className="text-xs text-zinc-500 hover:text-white transition-colors"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
