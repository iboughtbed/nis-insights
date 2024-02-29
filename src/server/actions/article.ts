"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { protectedAction } from "~/lib/safe-action";
import { db } from "~/server/db";
import { utapi } from "~/server/uploadthing";

const createArticleSchema = z.object({
  title: z.string().trim().min(1),
  introduction: z.string().trim().min(1),
  content: z.string().trim().min(1),
  coverImage: z.string().url(),
  coverImageKey: z.string(),
});

export const createArticle = protectedAction(
  createArticleSchema,
  async (
    { title, introduction, content, coverImage, coverImageKey },
    { session },
  ) => {
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
        coverImageKey,
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
  coverImageKey: z.string().optional(),
});

export const updateArticle = protectedAction(
  updateArticleSchema,
  async (
    { id, title, introduction, content, coverImage, coverImageKey },
    { session },
  ) => {
    const article = await db.article.findUnique({
      where: {
        id,
      },
      select: {
        authorId: true,
        coverImageKey: true,
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
        coverImageKey,
      },
      select: {
        id: true,
      },
    });

    if (coverImageKey !== article.coverImageKey && article.coverImageKey) {
      await utapi.deleteFiles(article.coverImageKey);
    }

    revalidatePath("/edit/article");
    revalidatePath("/article");

    return { updatedArticle };
  },
);

const deleteArticleSchema = z.object({
  id: z.string(),
});

export const deleteArticle = protectedAction(
  deleteArticleSchema,
  async ({ id }, { session }) => {
    const article = await db.article.findUnique({
      where: {
        id,
      },
      select: {
        authorId: true,
      },
    });

    if (session.user.id !== article?.authorId) {
      throw new Error("Unauthorized");
    }

    const deletedArticle = await db.article.delete({
      where: {
        id,
      },
      select: {
        coverImageKey: true,
      },
    });

    if (deletedArticle.coverImageKey) {
      await utapi.deleteFiles(deletedArticle.coverImageKey);
    }

    revalidatePath("/edit/article");
    revalidatePath("/article");
  },
);
