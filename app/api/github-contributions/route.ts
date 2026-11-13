import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/portfolio-data";

export const revalidate = 3600;

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              weekday
            }
          }
        }
      }
    }
  }
`;

function usernameFromUrl(url: string) {
  return url.replace(/\/$/, "").split("/").pop() ?? "";
}

type Day = { date: string; contributionCount: number; weekday: number };

/** Same data shape as the GraphQL path, built from github-contributions-api.jogruber.de. */
async function fromPublicApi(login: string) {
  const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(login)}?y=last`, {
    next: { revalidate },
  });
  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch GitHub contributions" }, { status: 502 });
  }

  const json = (await res.json()) as {
    total?: { lastYear?: number };
    contributions?: { date: string; count: number }[];
  };
  if (!json.contributions) {
    return NextResponse.json({ error: "Unexpected contributions API response" }, { status: 502 });
  }

  // Group days into Sunday-started weeks, like GitHub's calendar.
  const weeks: { contributionDays: Day[] }[] = [];
  for (const { date, count } of json.contributions) {
    const weekday = new Date(`${date}T00:00:00Z`).getUTCDay();
    if (weekday === 0 || weeks.length === 0) weeks.push({ contributionDays: [] });
    weeks[weeks.length - 1].contributionDays.push({ date, contributionCount: count, weekday });
  }

  const total = json.total?.lastYear ?? json.contributions.reduce((sum, d) => sum + d.count, 0);
  return NextResponse.json({ total, weeks });
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const login = usernameFromUrl(siteConfig.github);

  // No token (e.g. not set on the host): fall back to the public, token-free contributions API.
  if (!token) return fromPublicApi(login);

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: QUERY, variables: { login } }),
    next: { revalidate },
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch GitHub contributions" }, { status: 502 });
  }

  const json = await res.json();
  const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar;

  if (!calendar) {
    return NextResponse.json({ error: "Unexpected GitHub API response" }, { status: 502 });
  }

  return NextResponse.json({
    total: calendar.totalContributions as number,
    weeks: calendar.weeks as {
      contributionDays: { date: string; contributionCount: number; weekday: number }[];
    }[],
  });
}
