"use server";

import { revalidatePath } from "next/cache";

import { db } from "~/server/db";

export async function createArticle(title: string) {
  const article = await db.article.create({
    data: {
      title,
    },
  });

  revalidatePath("/prisma");

  return article;
}
