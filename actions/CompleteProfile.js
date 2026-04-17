"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function completeProfile(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const updateData = {
      state: data.state,
      city: data.city,
      role: data.currentRole,           // ✅ Map currentRole → role
      experience: parseInt(data.experience) || 0, // ✅ Convert to number
      targetRole: data.targetRole,
      targetLevel: data.targetLevel,
      isOnboarded: true,                // ✅ Mark as onboarded
    };

  await db.user.update({
    where: { clerkUserId: userId },
    data: {
      state: data.state,
      city: data.city,
      role: data.currentRole,
      experience: parseInt(data.experience),
      targetRole: data.targetRole,
      targetLevel: data.targetLevel,
      isOnboarded: true, // ✅ THIS IS THE KEY
    },
  });
}