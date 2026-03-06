/**
 * Fetches live competitive programming stats from LeetCode and CodeChef.
 * Results are cached in-memory for 30 minutes to avoid hammering external APIs.
 */

// ─── Cache ───────────────────────────────────────────────────────────────────

const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

type CachedStats = {
  data: CPStatsResponse;
  fetchedAt: number;
};

let cache: CachedStats | null = null;

// ─── Types ───────────────────────────────────────────────────────────────────

export type CPStatsResponse = {
  leetcode: {
    rating: number;
    solved: number;
    profile: string;
    totalProblems: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    contestRating: number;
    contestRanking: number;
    contestsAttended: number;
  };
  codechef: {
    stars: number;
    rating: number;
    profile: string;
    globalRank: number | null;
    countryRank: number | null;
    highestRating: number;
  };
  lastUpdated: string;
};

// ─── LeetCode (GraphQL) ─────────────────────────────────────────────────────

const LEETCODE_USERNAME = "AshenCold";
const LEETCODE_GQL_URL = "https://leetcode.com/graphql";

async function fetchLeetCodeStats() {
  // Query 1: Solved count + breakdown
  const solvedQuery = {
    query: `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
        allQuestionsCount {
          difficulty
          count
        }
      }
    `,
    variables: { username: LEETCODE_USERNAME },
  };

  // Query 2: Contest rating
  const contestQuery = {
    query: `
      query getUserContestRanking($username: String!) {
        userContestRanking(username: $username) {
          rating
          globalRanking
          attendedContestsCount
        }
      }
    `,
    variables: { username: LEETCODE_USERNAME },
  };

  const headers = {
    "Content-Type": "application/json",
    Referer: "https://leetcode.com",
  };

  const [solvedRes, contestRes] = await Promise.all([
    fetch(LEETCODE_GQL_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(solvedQuery),
    }),
    fetch(LEETCODE_GQL_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(contestQuery),
    }),
  ]);

  if (!solvedRes.ok || !contestRes.ok) {
    throw new Error(
      `LeetCode API error: solved=${solvedRes.status}, contest=${contestRes.status}`
    );
  }

  const solvedData = await solvedRes.json();
  const contestData = await contestRes.json();

  const acStats =
    solvedData?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum ?? [];
  const allQuestions = solvedData?.data?.allQuestionsCount ?? [];

  const getCount = (arr: { difficulty: string; count: number }[], d: string) =>
    arr.find((s: { difficulty: string; count: number }) => s.difficulty === d)?.count ?? 0;

  const totalSolved = getCount(acStats, "All");
  const easySolved = getCount(acStats, "Easy");
  const mediumSolved = getCount(acStats, "Medium");
  const hardSolved = getCount(acStats, "Hard");
  const totalProblems = getCount(allQuestions, "All");

  const contestRanking = contestData?.data?.userContestRanking;

  return {
    rating: Math.round(contestRanking?.rating ?? 0),
    solved: totalSolved,
    profile: `https://leetcode.com/u/${LEETCODE_USERNAME}/`,
    totalProblems,
    easySolved,
    mediumSolved,
    hardSolved,
    contestRating: Math.round(contestRanking?.rating ?? 0),
    contestRanking: contestRanking?.globalRanking ?? 0,
    contestsAttended: contestRanking?.attendedContestsCount ?? 0,
  };
}

// ─── CodeChef ────────────────────────────────────────────────────────────────

const CODECHEF_USERNAME = "im_aakash49";
const CODECHEF_API_URL = `https://codechef-api.vercel.app/handle/${CODECHEF_USERNAME}`;

async function fetchCodeChefStats() {
  const res = await fetch(CODECHEF_API_URL);

  if (!res.ok) {
    throw new Error(`CodeChef API error: ${res.status}`);
  }

  const data = await res.json();

  return {
    stars: parseInt(data.stars ?? "0", 10) || 0,
    rating: data.currentRating ?? 0,
    profile: `https://www.codechef.com/users/${CODECHEF_USERNAME}`,
    globalRank: data.globalRank ?? null,
    countryRank: data.countryRank ?? null,
    highestRating: data.highestRating ?? 0,
  };
}

// ─── Combined Fetch ──────────────────────────────────────────────────────────

export async function fetchCPStats(): Promise<CPStatsResponse> {
  // Return from cache if fresh
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
    return cache.data;
  }

  const [leetcode, codechef] = await Promise.allSettled([
    fetchLeetCodeStats(),
    fetchCodeChefStats(),
  ]);

  const stats: CPStatsResponse = {
    leetcode:
      leetcode.status === "fulfilled"
        ? leetcode.value
        : {
            rating: 0,
            solved: 0,
            profile: `https://leetcode.com/u/${LEETCODE_USERNAME}/`,
            totalProblems: 0,
            easySolved: 0,
            mediumSolved: 0,
            hardSolved: 0,
            contestRating: 0,
            contestRanking: 0,
            contestsAttended: 0,
          },
    codechef:
      codechef.status === "fulfilled"
        ? codechef.value
        : {
            stars: 0,
            rating: 0,
            profile: `https://www.codechef.com/users/${CODECHEF_USERNAME}`,
            globalRank: null,
            countryRank: null,
            highestRating: 0,
          },
    lastUpdated: new Date().toISOString(),
  };

  // Update cache
  cache = { data: stats, fetchedAt: Date.now() };

  // Log any failures for debugging
  if (leetcode.status === "rejected") {
    console.error("[CP Stats] LeetCode fetch failed:", leetcode.reason);
  }
  if (codechef.status === "rejected") {
    console.error("[CP Stats] CodeChef fetch failed:", codechef.reason);
  }

  return stats;
}
