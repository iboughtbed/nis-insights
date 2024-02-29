"use server";

import { z } from "zod";

import { protectedAction } from "~/lib/safe-action";
import { createId, formatDateToLocale } from "~/lib/utils";
import { db } from "~/server/db";

const createReleaseSchema = z.object({
  date: z.date(),
  coverImage: z.string().url(),
  coverImageKey: z.string(),
  embedUrl: z.string().url(),
});

export const createRelease = protectedAction(
  createReleaseSchema,
  async ({ date, coverImage, coverImageKey, embedUrl }, { session }) => {
    if (session.user.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    const id = `${formatDateToLocale(date)}-${createId()}`;

    const newRelease = await db.release.create({
      data: {
        id,
        date,
        coverImage,
        coverImageKey,
        embedUrl,
      },
      select: {
        id: true,
      },
    });

    return { newRelease };
  },
);

const updateReleaseSchema = z.object({
  id: z.string(),
  date: z.date().optional(),
  coverImage: z.string().url().optional(),
  coverImageKey: z.string().optional(),
  embedUrl: z.string().url().optional(),
});

export const updateRelease = protectedAction(
  updateReleaseSchema,
  async ({ id, date, coverImage, coverImageKey, embedUrl }, { session }) => {
    if (session.user.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    const updatedRelease = await db.release.update({
      where: {
        id,
      },
      data: {
        date,
        coverImage,
        coverImageKey,
        embedUrl,
      },
      select: {
        id: true,
      },
    });

    return { updatedRelease };
  },
);
