import { prisma } from "../lib/prisma";

const timeline = [
  {
    year: "2024",
    title: "Started B.Tech CSE",
    description:
      "Began Computer Science & Engineering at university. Dove deep into data structures and relational databases.",
    type: "education",
    order: 0,
  },
  {
    year: "2025",
    title: "Launched BaseCase",
    description:
      "Shipped a full-stack DSA tracking platform with relational data modeling, nested transactions, and production deployment.",
    type: "project",
    order: 1,
  },
  {
    year: "2025",
    title: "LeetCode 1868 Rating",
    description:
      "Crossed 400+ problems solved. Consistent weekly contest participation targeting Guardian rank.",
    type: "achievement",
    order: 2,
  },
  {
    year: "2026",
    title: "Portfolio v2 & Blog Launch",
    description:
      "Rebuilt personal site from scratch with Next.js 16, MDX blog engine, and premium design system.",
    type: "project",
    order: 3,
  },
];

export async function seedTimeline() {
  console.log("  📅 Seeding timeline...");

  // Clear and re-insert for idempotency
  await prisma.timelineEvent.deleteMany();
  await prisma.timelineEvent.createMany({ data: timeline });

  console.log(`  ✓ ${timeline.length} timeline events seeded`);
}
