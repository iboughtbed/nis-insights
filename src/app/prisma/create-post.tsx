"use client";

import { Button } from "~/components/ui/button";
import { createArticle } from "~/server/actions/article";

export function CreatePost() {
  async function handleSubmit() {
    await createArticle("Fuck");
  }

  return <Button onClick={handleSubmit}>Create</Button>;
}
