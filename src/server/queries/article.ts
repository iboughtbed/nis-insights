import "server-only";

import { db } from "~/server/db";

export async function getArticles() {
  const articles = await db.user.findMany();

  return { articles };
}
