"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Editor } from "~/components/editor";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { UploadDropzone } from "~/lib/utils/uploadthing";
import { createArticle } from "~/server/actions/article";

const formSchema = z.object({
  title: z.string().trim().min(1),
  introduction: z.string().trim().min(1),
  content: z.string().trim().min(1),
  coverImage: z.string().url(),
  coverImageKey: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export function CreateArticleForm() {
  const router = useRouter();

  const { isPending, mutate } = useMutation({
    mutationFn: async (formData: FormData) => {
      const { data, serverError, validationErrors } =
        await createArticle(formData);

      if (serverError ?? validationErrors) {
        toast.error("Something went wrong");
        throw new Error("Something went wrong");
      }

      return data;
    },
    onSuccess: (data) => {
      toast.success("Successfully created an article");
      router.push(`/article/${data?.newArticle.id}`);
    },
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      introduction: "",
    },
  });

  const setEditorContent = useCallback(
    (content: string) => {
      form.setValue("content", content);
    },
    [form],
  );

  async function onSubmit(data: FormData) {
    mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="coverImage"
          render={() => (
            <FormItem>
              <FormLabel>Cover image</FormLabel>
              <FormDescription>
                Upload images with 16:9 resolution for better experience
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <UploadDropzone
          endpoint="articleCoverUploader"
          onClientUploadComplete={(res) => {
            const file = res[0];
            if (file) {
              form.setValue("coverImage", file.url);
              form.setValue("coverImageKey", file.key);
              toast.success("Uploaded the cover image");
            }
          }}
          onUploadError={() => {
            toast.error(
              "Something went wrong. Couldn't upload the cover image",
            );
          }}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormDescription>
                Do I fucking need to explain what this is?
              </FormDescription>
              <FormControl>
                <Input placeholder="How to eat spoon" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="introduction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Introduction</FormLabel>
              <FormDescription>
                Introduction that will appear before your article&apos;s content
              </FormDescription>
              <FormControl>
                <Textarea
                  placeholder="I always wanted to eat spoons and now I'm gonna teach you how to eat it"
                  className="min-h-[200px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={() => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormDescription>Using markdown</FormDescription>
              <FormControl>
                <Editor setValue={setEditorContent} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-4 flex items-center justify-end">
          <Button type="submit" variant="secondary" disabled={isPending}>
            Publish
          </Button>
        </div>
      </form>
    </Form>
  );
}
