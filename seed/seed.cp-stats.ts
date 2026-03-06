import { prisma } from "../lib/prisma";

const cpStatsData = {
  leetcode: {
    rating: 1868,
    solved: 400,
    profile: "https://leetcode.com/u/AshenCold/",
    percentile: "Top 5%",
  },
  codeforces: {
    rating: 1450,
    maxRating: 1500,
    profile: "https://codeforces.com/profile/akash",
    percentile: "Top 15%",
  },
  codechef: {
    stars: 2,
    rating: 1500,
    profile: "https://www.codechef.com/users/im_aakash49",
  },
  guardian: {
    current: 1868,
    target: 2200,
  },
  lastUpdated: "2026-03-01",
};

export async function seedCPStats() {
  console.log("  📊 Seeding CP stats...");

  // Single-row pattern: delete all then create
  await prisma.cPStats.deleteMany();
  await prisma.cPStats.create({
    data: {
      leetcode: cpStatsData.leetcode,
      codeforces: cpStatsData.codeforces,
      codechef: cpStatsData.codechef,
      guardian: cpStatsData.guardian,
      lastUpdated: cpStatsData.lastUpdated,
    },
  });

  console.log("  ✓ CP stats seeded");
}
