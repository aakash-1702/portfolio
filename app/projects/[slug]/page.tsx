import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { projects } from "@/data/projects";
import { getProjectContent } from "@/lib/content";
import { ExternalLink, Github } from "lucide-react";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const mdxContent = getProjectContent(slug);

  return (
    <div className="mx-auto max-w-3xl px-6 pt-28 pb-16">
      {/* Header */}
      <header className="space-y-4 mb-12">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            {project.title}
          </h1>
          {project.status === "active" && (
            <span className="text-[11px] text-emerald-400 border border-emerald-400/30 rounded px-2 py-0.5 uppercase tracking-wider">
              Active
            </span>
          )}
        </div>
        <p className="text-sm text-zinc-400 leading-relaxed">
          {project.longDescription}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-xs text-zinc-500 bg-white/5 rounded px-2 py-1"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-1">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              <Github size={14} />
              Source Code
            </a>
          )}
        </div>
      </header>

      {/* MDX Content */}
      {mdxContent ? (
        <article className="prose prose-invert prose-zinc max-w-none prose-headings:font-medium prose-headings:tracking-tight prose-p:text-zinc-400 prose-p:leading-relaxed prose-a:text-white prose-a:underline prose-a:underline-offset-4 prose-strong:text-white prose-code:text-zinc-300 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-[#0a0a0a] prose-pre:border prose-pre:border-white/10 prose-li:text-zinc-400">
          <MDXRemote source={mdxContent} />
        </article>
      ) : (
        <p className="text-sm text-zinc-500">
          Detailed write-up coming soon.
        </p>
      )}

      <div className="mt-12 pt-6 border-t border-white/10">
        <Link
          href="/projects"
          className="text-xs text-zinc-500 hover:text-white transition-colors"
        >
          ← All projects
        </Link>
      </div>
    </div>
  );
}
