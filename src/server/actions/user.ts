"use server";

import { z } from "zod";

import { protectedAction } from "~/lib/safe-action";
import { db } from "~/server/db";

const updateUserSchema = z.object({
  name: z.string().optional(),
  username: z.string().max(20).optional(),
});

export const updateUser = protectedAction(
  updateUserSchema,
  async ({ name, username }, { session }) => {
    const updatedUser = await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name,
        username,
      },
      select: {
        id: true,
      },
    });

    return { updatedUser };
  },
);
