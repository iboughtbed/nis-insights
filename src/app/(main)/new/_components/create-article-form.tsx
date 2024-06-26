"use client";

import "~/styles/mdx.css";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Editor } from "~/components/editor";
import { MemoizedReactMarkdown } from "~/components/mdx/markdown";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import { Textarea } from "~/components/ui/textarea";
import { useDraft } from "~/hooks/use-draft";
import { categories } from "~/lib/constants";
import { cn } from "~/lib/utils";
import { UploadDropzone } from "~/lib/utils/uploadthing";
import { createArticle } from "~/server/actions/article";

const formSchema = z.object({
  category: z.enum(categories),
  title: z.string().trim().min(1).max(60),
  introduction: z.string().trim().min(1).max(120),
  content: z.string().trim().min(1),
  coverImage: z.string().url(),
  coverImageKey: z.string(),
});

export function CreateArticleForm() {
  const router = useRouter();

  const [draft, setDraft] = useDraft();

  const { execute, status } = useAction(createArticle, {
    onSuccess: ({ id }) => {
      setDraft({});
      toast.success("Successfully created a new article, redirecting...");
      router.push(`/article/${id}`);
    },
    onError: () => {
      toast.error("Something went wrong, try again");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      category: draft.category ?? "insights",
      title: draft.title ?? "",
      introduction: draft.introduction ?? "",
      content: draft.content ?? "",
      coverImage: draft.coverImage ?? "",
      coverImageKey: draft.coverImageKey ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    execute(values);
  }

  function onUpload(files: { key: string; url: string }[]) {
    const file = files[0];

    if (file) {
      form.setValue("coverImage", file.url);
      form.setValue("coverImageKey", file.key);

      setDraft((draft) => ({
        ...draft,
        coverImage: file.url,
        coverImageKey: file.key,
      }));

      toast.success("Successfully uploaded the cover image");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="mx-auto max-w-3xl space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="How to create a website..."
                    {...field}
                    onChange={(e) => {
                      setDraft((draft) => ({
                        ...draft,
                        title: e.target.value,
                      }));
                    }}
                  />
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
                <FormControl>
                  <Textarea
                    placeholder="You can use frameworks like Next.js..."
                    {...field}
                    onChange={(e) => {
                      setDraft((draft) => ({
                        ...draft,
                        introduction: e.target.value,
                      }));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Category</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? categories.find(
                              (category) => category === field.value,
                            )
                          : "Select category"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search category..." />
                      <CommandEmpty>No cateogries found.</CommandEmpty>
                      <CommandGroup>
                        {categories.map((category) => (
                          <CommandItem
                            value={category}
                            key={category}
                            onSelect={() => {
                              form.setValue("category", category);
                              setDraft((draft) => ({
                                ...draft,
                                category,
                              }));
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                category === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {category}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

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
            className="border border-input"
            onClientUploadComplete={onUpload}
            onUploadError={() =>
              toast.error(
                "Something went wrong while uploading the cover image",
              )
            }
          />

          {form.watch("coverImage") && (
            <AspectRatio ratio={16 / 9}>
              <Image
                src={form.watch("coverImage")}
                alt=""
                className="rounded-xl object-cover"
                sizes="(max-width: 768px) 90vw, 50vw"
                fill
              />
            </AspectRatio>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={status === "executing" || status === "hasSucceeded"}
          >
            Submit
          </Button>
        </div>

        <FormField
          control={form.control}
          name="content"
          render={() => (
            <FormItem className="h-full">
              <FormLabel>Content</FormLabel>
              <FormDescription>Markdown supported</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={50} className="border">
            <Editor
              onChange={(value) => {
                form.setValue("content", value);
                setDraft((draft) => ({
                  ...draft,
                  content: value,
                }));
              }}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel
            defaultSize={50}
            minSize={30}
            maxSize={70}
            className="border"
          >
            <MemoizedReactMarkdown className="px-14 py-3">
              {form.watch("content")}
            </MemoizedReactMarkdown>
          </ResizablePanel>
        </ResizablePanelGroup>
      </form>
    </Form>
  );
}
