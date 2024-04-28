import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import type { categories } from "~/server/db/schema";

type Draft = {
  category?: (typeof categories.enumValues)[number];
  title?: string;
  introduction?: string;
  content?: string;
  coverImage?: string;
  coverImageKey?: string;
};

const draftAtom = atomWithStorage<Draft>("draft", {
  title: "",
  introduction: "",
  content: "## Edit the content here...",
});

export function useDraft() {
  return useAtom(draftAtom);
}
