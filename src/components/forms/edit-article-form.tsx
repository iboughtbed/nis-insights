"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
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
import { updateArticle } from "~/server/actions/article";

interface EditArticleFormProps {
  id: string;
  title: string;
  introduction: string;
  content: string;
  coverImage: string | null;
}

const formSchema = z.object({
  title: z.string().trim().min(1).optional(),
  introduction: z.string().trim().min(1).optional(),
  content: z.string().trim().min(1).optional(),
  coverImage: z.string().url().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function EditArticleForm({
  id,
  coverImage,
  ...props
}: EditArticleFormProps) {
  const { isPending, mutate } = useMutation({
    mutationFn: async (data: FormData) => {
      const result = await updateArticle({
        id,
        coverImage: coverImage ?? undefined,
        ...data,
      });

      if (!result.data?.updatedArticle) {
        throw new Error("Something went wrong");
      }

      if (result.serverError ?? result.validationErrors) {
        toast.error("Something went wrong");
        throw new Error("Something went wrong");
      }

      return result.data;
    },
    onSuccess: (data) => {
      console.log(data.updatedArticle);
      toast.success("Successfully created an article");
    },
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coverImage: coverImage ?? undefined,
      ...props,
    },
  });

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
                <Editor setValue={(value) => form.setValue("content", value)} />
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
