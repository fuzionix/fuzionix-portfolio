import { NextResponse } from "next/server";

const GH_USERNAME = process.env.GH_USERNAME ?? "fuzionix";
const GH_ACCESS_TOKEN    = process.env.GH_ACCESS_TOKEN;

const QUERY = `
  query($login: String!) {
    user(login: $login) {
      login
      name
      bio
      followers { totalCount }
      repositories(privacy: PUBLIC, first: 1) { totalCount }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              weekday
            }
          }
        }
      }
    }
  }
`;

export async function GET() {
  if (!GH_ACCESS_TOKEN) {
    return NextResponse.json(
      { error: "GH_ACCESS_TOKEN is not configured in environment variables." },
      { status: 500 }
    );
  }

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GH_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent":   "fuzionix-portfolio",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { login: GH_USERNAME },
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`GitHub API responded with HTTP ${res.status}`);
    }

    const json = await res.json();

    if (json.errors?.length) {
      throw new Error(json.errors[0]?.message ?? "GraphQL error");
    }

    return NextResponse.json(json.data.user);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}