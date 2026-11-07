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

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const login = usernameFromUrl(siteConfig.github);

  if (!token) {
    return NextResponse.json({ error: "GITHUB_TOKEN is not configured" }, { status: 501 });
  }

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
