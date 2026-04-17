import { NextResponse } from "next/server";
//https://remotive.com/api/remote-jobs
export async function GET() {
  try {
    const res = await fetch("https://indianapi.in/jobs-api?hl=en-US", {
      next: { revalidate: 3600 }, // cache for 1 hour
    });

    const data = await res.json();

    const jobs = data.jobs.slice(0, 20).map((job) => ({
      id: job.id,
      title: job.title,
      company: job.company_name,
      location: job.candidate_required_location,
      url: job.url,
    }));

    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}