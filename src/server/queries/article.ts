import "server-only";

import { count } from "drizzle-orm";
import { z } from "zod";

import { db } from "~/server/db";
import { articles } from "~/server/db/schema";

export async function getArticle({ id }: { id: string }) {
  const article = await db.query.articles.findFirst({
    where: (model, { eq }) => eq(model.id, id),
    with: {
      author: {
        columns: {
          name: true,
          username: true,
        },
      },
    },
  });

  return { article };
}

const getArticlesSchema = z.object({
  limit: z.number().min(1).max(10).default(10),
  offset: z.number().default(0),
});

export async function getArticles(input: { limit: number; offset: number }) {
  try {
    const { limit, offset } = getArticlesSchema.parse(input);

    const data = await db.query.articles.findMany({
      limit,
      offset,
      columns: {
        id: true,
        title: true,
        introduction: true,
        coverImage: true,
        createdAt: true,
      },
      with: {
        author: {
          columns: {
            username: true,
          },
        },
      },
      orderBy: (model, { desc }) => [desc(model.createdAt)],
    });

    const total = await db
      .select({ count: count(articles.id) })
      .from(articles)
      .then((res) => res[0]?.count ?? 0);

    const pageCount = Math.ceil(total / limit);

    return {
      articles: data,
      pageCount,
    };
  } catch (err) {
    return {
      articles: [],
      pageCount: 0,
    };
  }
}
