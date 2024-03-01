"use server";

import { z } from "zod";

import { action, protectedAction } from "~/lib/safe-action";
import { db } from "~/server/db";

const getReleaseSchema = z.object({
  id: z.string(),
});

export const getRelease = protectedAction(getReleaseSchema, async ({ id }) => {
  const release = await db.release.findUnique({
    where: {
      id,
    },
    select: {
      date: true,
      coverImage: true,
      coverImageKey: true,
      embedUrl: true,
    },
  });

  return { release };
});

const getReleaseEmbedSchema = z.object({
  id: z.string(),
});

export const getReleaseEmbed = action(getReleaseEmbedSchema, async ({ id }) => {
  const release = await db.release.findUnique({
    where: {
      id,
    },
    select: {
      embedUrl: true,
    },
  });

  return { release };
});

export const getReleases = action(z.object({}), async () => {
  const releases = await db.release.findMany({
    select: {
      id: true,
      date: true,
      coverImage: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  return { releases };
});
