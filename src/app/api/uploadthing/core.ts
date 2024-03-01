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

      if (!session?.user) throw new UploadThingError("Unauthorized");

      if (session.user.role === "USER")
        throw new UploadThingError("Unauthorized");

      return {};
    })
    .onUploadComplete(({ file }) => {
      return { file };
    }),

  releaseCoverUploader: f({
    image: { maxFileSize: "8MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      const session = await getServerAuthSession();

      if (!session?.user) throw new UploadThingError("Unauthorized");

      if (session.user.role !== "ADMIN")
        throw new UploadThingError("Unauthorized");

      return {};
    })
    .onUploadComplete(({ file }) => {
      return { file };
    }),
} satisfies FileRouter;

export type AppFileRouter = typeof appFileRouter;
