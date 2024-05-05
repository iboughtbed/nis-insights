"use server";

import { eq } from "drizzle-orm";
import { z } from "zod";

import { categories } from "~/lib/constants";
import { protectedAction } from "~/lib/safe-action";
import { generateId, slugify } from "~/lib/utils";
import { db } from "~/server/db";
import { articles } from "~/server/db/schema";
import { utapi } from "~/server/uploadthing";

const createArticleSchema = z.object({
  category: z.enum(categories),
  title: z.string().trim().min(1).max(60),
  introduction: z.string().trim().min(1).max(120),
  content: z.string().trim().min(1),
  coverImage: z.string().url(),
  coverImageKey: z.string(),
});

export const createArticle = protectedAction(
  createArticleSchema,
  async ({ ...input }, { session }) => {
    if (session.user.role === "user") {
      throw new Error("Permission denied");
    }

    const id = `${slugify(input.title)}-${generateId()}`;

    await db.insert(articles).values({
      id,
      authorId: session.user.id,
      ...input,
    });

    return { id };
  },
);

const updateArticleSchema = createArticleSchema
  .partial()
  .extend({ id: z.string() });

export const updateArticle = protectedAction(
  updateArticleSchema,
  async ({ id, ...input }, { session }) => {
    const article = await db.query.articles.findFirst({
      where: (model, { eq }) => eq(model.id, id),
      columns: {
        authorId: true,
        coverImageKey: true,
      },
    });

    if (article?.authorId !== session.user.id) {
      throw new Error("Permission denied");
    }

    await db.update(articles).set(input).where(eq(articles.id, id));

    if (article.coverImageKey !== input.coverImageKey) {
      await utapi.deleteFiles(article.coverImageKey);
    }
  },
);

const deleteArticleSchema = z.object({
  id: z.string(),
});

export const deleteArticle = protectedAction(
  deleteArticleSchema,
  async ({ id }, { session }) => {
    const article = await db.query.articles.findFirst({
      where: (model, { eq }) => eq(model.id, id),
      columns: {
        authorId: true,
        coverImageKey: true,
      },
    });

    if (article?.authorId !== session.user.id) {
      throw new Error("Permission denied");
    }

    await db.delete(articles).where(eq(articles.id, id));
    await utapi.deleteFiles(article.coverImageKey);
  },
);
