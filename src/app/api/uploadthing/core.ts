import { type FileRouter } from "uploadthing/next";

// const f = createUploadthing();

export const appFileRouter = {} satisfies FileRouter;

export type AppFileRouter = typeof appFileRouter;
