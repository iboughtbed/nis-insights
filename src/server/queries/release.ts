"use server";

import { z } from "zod";
import { action } from "~/lib/safe-action";

import { db } from "~/server/db";

export async function getReleasesCount() {
  const count = await db.user.count();

  return { count };
}

const getReleaseSchema = z.object({
  id: z.string(),
});

export const getRelease = action(getReleaseSchema, async ({ id }) => {
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
