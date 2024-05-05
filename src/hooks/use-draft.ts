import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import type { categories } from "~/lib/constants";

type Draft = {
  category?: (typeof categories)[number];
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
