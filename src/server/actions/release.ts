"use server";

import { z } from "zod";

import { protectedAction } from "~/lib/safe-action";
import { db } from "~/server/db";

const createReleaseSchema = z.object({
  date: z.date(),
  coverImage: z.string().url(),
});

export const createRelease = protectedAction(
  createReleaseSchema,
  async ({ date, coverImage }, { session }) => {
    const user = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        role: true,
      },
    });

    if (user?.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    const newRelease = await db.release.create({
      data: {
        date,
        coverImage,
      },
    });

    return { newRelease };
  },
);
