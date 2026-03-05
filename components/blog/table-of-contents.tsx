"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ content }: { content: string }) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Extract headings from rendered DOM
  useEffect(() => {
    const timer = setTimeout(() => {
      const article = document.querySelector("article");
      if (!article) return;

      const elements = article.querySelectorAll("h2, h3");
      const items: TocItem[] = Array.from(elements).map((el) => {
        // Ensure the heading has an id
        if (!el.id) {
          el.id = el.textContent
            ?.toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "") ?? "";
        }
        return {
          id: el.id,
          text: el.textContent ?? "",
          level: el.tagName === "H2" ? 2 : 3,
        };
      });
      setHeadings(items);
    }, 500); // Wait for MDX to render

    return () => clearTimeout(timer);
  }, [content]);

  // Intersection observer for active section tracking
  useEffect(() => {
    if (headings.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="hidden lg:block" aria-label="Table of Contents">
      <p className="font-mono text-[10px] uppercase tracking-widest text-[#666] mb-4">
        On this page
      </p>
      <ul className="space-y-2 border-l border-white/[0.06]">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                "block text-xs leading-relaxed transition-all duration-200 border-l -ml-px py-0.5",
                heading.level === 3 ? "pl-6" : "pl-4",
                activeId === heading.id
                  ? "text-[#c4a482] border-l-[#c4a482]"
                  : "text-[#666] hover:text-[#999] border-l-transparent"
              )}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
