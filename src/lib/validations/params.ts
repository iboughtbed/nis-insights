import { z } from "zod";

import { categories } from "~/server/db/schema";

export const searchParamsSchema = z.object({
  page: z.string().default("1"),
  per_page: z.string().default("10"),
});

export const articlesSearchParamsSchema = searchParamsSchema.extend({
  category: z.enum(categories.enumValues).optional().catch(undefined),
});
