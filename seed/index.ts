import "dotenv/config";
import { prisma } from "../lib/prisma";
import { seedProjects } from "./seed.projects";
import { seedCPStats } from "./seed.cp-stats";
import { seedTimeline } from "./seed.timeline";
import { seedBlogPosts } from "./seed.blog";

async function main() {
  console.log("🌱 Seeding database...\n");

  await seedProjects();
  await seedCPStats();
  await seedTimeline();
  await seedBlogPosts();

  console.log("\n✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
