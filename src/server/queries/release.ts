"use server";

import { db } from "~/server/db";

export async function getReleasesCount() {
  const count = await db.user.count();

  return { count };
}
