"use server";

import { format } from "date-fns";
import { kk } from "date-fns/locale";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { protectedAction } from "~/lib/safe-action";
import { createId } from "~/lib/utils";
import { db } from "~/server/db";
import { utapi } from "~/server/uploadthing";

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

    const id = `${format(date, "dd-MM-yy", { locale: kk })}-${createId()}`;

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

    const release = await db.release.findUnique({
      where: {
        id,
      },
      select: {
        coverImageKey: true,
      },
    });

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

    if (release?.coverImageKey !== coverImageKey && release?.coverImageKey) {
      await utapi.deleteFiles(release.coverImageKey);
    }

    revalidatePath("/release");
    revalidatePath("/edit/release");

    return { updatedRelease };
  },
);

const deleteReleaseSchema = z.object({
  id: z.string(),
});

export const deleteRelease = protectedAction(
  deleteReleaseSchema,
  async ({ id }, { session }) => {
    if (session.user.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    const deletedRelease = await db.release.delete({
      where: {
        id,
      },
      select: {
        coverImageKey: true,
      },
    });

    if (deletedRelease.coverImageKey) {
      await utapi.deleteFiles(deletedRelease.coverImageKey);
    }

    revalidatePath("/release");
    revalidatePath("/edit/release");
  },
);
