import "server-only";

import { db } from "~/server/db";

export async function getRelease({ id }: { id: string }) {
  const release = await db.query.releases.findFirst({
    where: (model, { eq }) => eq(model.id, id),
    columns: {
      date: true,
      coverImage: true,
      coverImageKey: true,
      embedUrl: true,
    },
  });

  return { release };
}

export async function getEmbedUrl({ id }: { id: string }) {
  const release = await db.query.releases.findFirst({
    where: (model, { eq }) => eq(model.id, id),
    columns: {
      embedUrl: true,
    },
  });

  return { release };
}

export async function getReleases() {
  const releases = await db.query.releases.findMany({
    columns: {
      id: true,
      date: true,
      coverImage: true,
    },
    orderBy: (model, { desc }) => desc(model.createdAt),
  });

  return { releases };
}
