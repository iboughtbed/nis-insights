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
    const user = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        role: true,
      },
    });

    if (user?.role === "USER") {
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
