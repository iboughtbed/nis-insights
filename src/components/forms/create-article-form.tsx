"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
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

interface CreateArticleFormProps {
  content?: string;
}

const formSchema = z.object({
  content: z.string().trim().min(1),
});

type FormData = z.infer<typeof formSchema>;

export function CreateArticleForm({ content }: CreateArticleFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content,
    },
  });

  function onSubmit(data: FormData) {
    startTransition(async () => {
      const content = data.content
        .split("\n")
        .map((line) => line.trim())
        .join("\n");
      console.log(content);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormDescription>Using markdown</FormDescription>
              <FormControl>
                <Editor
                  initialContent={field.value}
                  setValue={(value) => form.setValue("content", value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="secondary" disabled={isPending}>
          Publish
        </Button>
      </form>
    </Form>
  );
}
