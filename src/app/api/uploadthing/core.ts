import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

import { getServerAuthSession } from "~/server/auth";

const f = createUploadthing();

export const appFileRouter = {
  articleCoverUploader: f({
    image: { maxFileSize: "8MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      const session = await getServerAuthSession();

      if (session?.user.role === "user")
        throw new UploadThingError("Unauthorized");

      return {};
    })
    .onUploadComplete(({ file }) => {
      return {
        url: file.url,
        key: file.key,
      };
    }),

  releaseCoverUploader: f({
    image: { maxFileSize: "8MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      const session = await getServerAuthSession();

      if (session?.user.role !== "admin")
        throw new UploadThingError("Unauthorized");

      return {};
    })
    .onUploadComplete(({ file }) => {
      return {
        url: file.url,
        key: file.key,
      };
    }),
} satisfies FileRouter;

export type AppFileRouter = typeof appFileRouter;
