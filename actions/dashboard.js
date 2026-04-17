"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export const generateAIInsights = async (industry) => {
  const prompt = `
Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
{
  "salaryRanges": [
    { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
  ],
  "growthRate": number,
  "demandLevel": "High" | "Medium" | "Low",
  "topSkills": ["skill1", "skill2"],
  "marketOutlook": "Positive" | "Neutral" | "Negative",
  "keyTrends": ["trend1", "trend2"],
  "recommendedSkills": ["skill1", "skill2"]
}

IMPORTANT: Return ONLY the JSON. No extra text.
`;

  try {
    const result = await model.generateContent(prompt);
    const text = await result.response.text();
    const cleanedText = text.replace(/```(?:json)?/g, "").trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Error generating AI insights:", error);
    throw error;
  }
};


// ===============================
// Get or Create Industry Insights
// ===============================
export async function getIndustryInsights() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: { industry: true },
  });

  if (!user) throw new Error("User not found");

  // 1. Check existing insight
  const existingInsight = await db.industryInsight.findUnique({
    where: { industry: user.industry },
  });

  // 2. If exists → return immediately
  if (existingInsight) return existingInsight;

  // 3. Else generate AI insight (slow work outside DB)
  const insights = await generateAIInsights(user.industry);

  // 4. Store safely using upsert (avoids duplicates)
  const industryInsight = await db.industryInsight.upsert({
    where: { industry: user.industry },
    update: {}, 
    create: {
      industry: user.industry,
      ...insights,
      nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return industryInsight;
}
