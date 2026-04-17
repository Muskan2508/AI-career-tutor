"use client";

import { useEffect, useState } from "react";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Failed to load jobs", error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading jobs...</p>;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6">Job Openings</h1>

      <div className="grid gap-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="p-5 border rounded-lg hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p className="text-sm text-muted-foreground">
              {job.company} • {job.location}
            </p>

            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium mt-2 inline-block"
            >
              View Job →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}