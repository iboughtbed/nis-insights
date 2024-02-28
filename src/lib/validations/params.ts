import { z } from "zod";

export const searchParamsSchema = z.object({
  page: z.string().default("1"),
  per_page: z.string().default("10"),
});

export const articlesSearchParamsSchema = searchParamsSchema;
