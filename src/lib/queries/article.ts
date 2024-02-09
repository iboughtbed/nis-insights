import "server-only";

import { db } from "~/lib/db";

export async function getArticles() {
  const articles = await db.user.findMany();

  return { articles };
}
