"use server";

import { z } from "zod";

import { protectedAction } from "~/lib/safe-action";
import { db } from "~/server/db";

const createArticleSchema = z.object({
  title: z.string().trim().min(1),
  introduction: z.string().trim().min(1),
  content: z.string().trim().min(1),
  coverImage: z.string().url(),
});

export const createArticle = protectedAction(
  createArticleSchema,
  async ({ title, introduction, content, coverImage }, { session }) => {
    if (session.user.role === "USER") {
      throw new Error("Unauthorized");
    }

    const filteredContent = content
      .split("\n")
      .map((line) => line.trim())
      .join("\n");

    const newArticle = await db.article.create({
      data: {
        title,
        introduction,
        content: filteredContent,
        coverImage,
        author: {
          connect: {
            id: session.user.id,
          },
        },
      },
      select: {
        id: true,
      },
    });

    return { newArticle };
  },
);

const updateArticleSchema = z.object({
  id: z.string(),
  title: z.string().trim().min(1).optional(),
  introduction: z.string().trim().min(1).optional(),
  content: z.string().trim().min(1).optional(),
  coverImage: z.string().url().optional(),
});

export const updateArticle = protectedAction(
  updateArticleSchema,
  async ({ id, title, introduction, content, coverImage }, { session }) => {
    const article = await db.article.findUnique({
      where: {
        id,
      },
      select: {
        authorId: true,
      },
    });

    if (article?.authorId !== session.user.id) {
      throw new Error("Unauthorized");
    }

    const updatedArticle = await db.article.update({
      where: {
        id,
      },
      data: {
        title,
        introduction,
        content,
        coverImage,
      },
      select: {
        id: true,
      },
    });

    return { updatedArticle };
  },
);
