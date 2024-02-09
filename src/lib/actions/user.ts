"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "~/lib/db";
import { protectedAction } from "~/lib/safe-action";

const updateUserSchema = z.object({
  name: z.string().optional(),
  username: z.string().max(20).optional(),
});

export const updateUser = protectedAction(
  updateUserSchema,
  async ({ name, username }, { session }) => {
    const user = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      throw new Error("Session is not valid");
    }

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

    revalidatePath("/dashboard/account");

    return { updatedUser };
  },
);
