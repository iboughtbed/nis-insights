"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/utils";
import { UploadDropzone } from "~/lib/utils/uploadthing";
import { createArticle } from "~/server/actions/article";
import { categories } from "~/server/db/schema";

const formSchema = z.object({
  category: z.enum(categories.enumValues),
  title: z.string().trim().min(1).max(60),
  introduction: z.string().trim().min(1).max(120),
  content: z.string().trim().min(1),
  coverImage: z.string().url(),
  coverImageKey: z.string(),
});

export function CreateArticleForm() {
  const router = useRouter();

  const { execute, status } = useAction(createArticle, {
    onSuccess: ({ id }) => {
      toast.success("Successfully created a new article, redirecting...");
      router.push(`/article/${id}`);
    },
    onError: () => {
      toast.error("Something went wrong, try again");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "insights",
      title: "",
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
      toast.success("Successfully uploaded the cover image");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="How to create a website..." {...field} />
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
                        ? categories.enumValues.find(
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
                      {categories.enumValues.map((category) => (
                        <CommandItem
                          value={category}
                          key={category}
                          onSelect={() => {
                            form.setValue("category", category);
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
            toast.error("Something went wrong while uploading the cover image")
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

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormDescription>Markdown supported</FormDescription>
              <FormControl>
                <Textarea
                  placeholder="To build web application you can use Next.js..."
                  className="min-h-[400px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="outline"
          className="w-full"
          disabled={status === "executing" || status === "hasSucceeded"}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
