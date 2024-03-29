"use server";

import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

export async function getCounts() {
  const session = await getServerAuthSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  if (session.user.role === "USER") {
    throw new Error("Unauthorized");
  }

  const releasesCount = await db.release.count();
  const articlesCount = await db.article.count({
    where: {
      authorId: session.user.id,
    },
  });

  return { releasesCount, articlesCount };
}

export async function getReleases() {
  const session = await getServerAuthSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  if (session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const releases = await db.release.findMany({
    select: {
      id: true,
      date: true,
      createdAt: true,
    },
  });

  return { releases };
}

export async function getArticles() {
  const session = await getServerAuthSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  if (session.user.role === "USER") {
    throw new Error("Unauthorized");
  }

  const articles = await db.article.findMany({
    where: {
      authorId: session.user.id,
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
    },
  });

  return { articles };
}
