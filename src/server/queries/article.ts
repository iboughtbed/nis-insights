"use server";

import { z } from "zod";

import { action } from "~/lib/safe-action";
import { db } from "~/server/db";

const getArticleSchema = z.object({
  id: z.string(),
});

export const getArticle = action(getArticleSchema, async ({ id }) => {
  const article = await db.article.findUnique({
    where: {
      id,
    },
    select: {
      title: true,
      introduction: true,
      content: true,
      coverImage: true,
      createdAt: true,
      author: {
        select: {
          name: true,
          username: true,
        },
      },
    },
  });

  return { article };
});

const getArticlesSchema = z.object({
  limit: z.number().min(1).max(10).default(10),
  offset: z.number().default(0),
});

export const getArticles = action(
  getArticlesSchema,
  async ({ limit, offset }) => {
    const articles = await db.article.findMany({
      skip: offset,
      take: limit,
      select: {
        id: true,
        title: true,
        introduction: true,
        createdAt: true,
        author: {
          select: {
            username: true,
          },
        },
      },
    });

    const count = await db.article.count();

    return { articles, count };
  },
);
