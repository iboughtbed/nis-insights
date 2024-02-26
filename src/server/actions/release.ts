"use server";

import { z } from "zod";

import { protectedAction } from "~/lib/safe-action";
import { createId, formatDateToLocale } from "~/lib/utils";
import { db } from "~/server/db";

const createReleaseSchema = z.object({
  date: z.date(),
  coverImage: z.string().url(),
  embedUrl: z.string().url(),
});

export const createRelease = protectedAction(
  createReleaseSchema,
  async ({ date, coverImage, embedUrl }, { session }) => {
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

    const id = `${formatDateToLocale(date)}-${createId()}`;

    const newRelease = await db.release.create({
      data: {
        id,
        date,
        coverImage,
        embedUrl,
      },
    });

    return { newRelease };
  },
);
