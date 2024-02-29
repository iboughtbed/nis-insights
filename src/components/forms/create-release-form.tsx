"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Form,
  FormControl,
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
import { UploadDropzone } from "~/lib/utils/uploadthing";
import { createRelease } from "~/server/actions/release";

const formSchema = z.object({
  date: z.date(),
  coverImage: z.string().url(),
  coverImageKey: z.string(),
  embedUrl: z.string().url(),
});

type FormData = z.infer<typeof formSchema>;

export function CreateReleaseForm() {
  const router = useRouter();

  const { isPending, mutate } = useMutation({
    mutationFn: async (formData: FormData) => {
      const { data, serverError, validationErrors } =
        await createRelease(formData);

      if (serverError ?? validationErrors) {
        toast.error("Something went wrong");
        throw new Error("Something went wrong");
      }

      return data;
    },
    onSuccess: (data) => {
      toast.success("Successfully created a new release");
      router.push(`/release/${data?.newRelease.id}`);
    },
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      embedUrl: "",
    },
  });

  function onSubmit(data: FormData) {
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
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start gap-4">
              <FormLabel>Release date</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      <CalendarIcon className="mr-2 size-4" />
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        if (date) form.setValue("date", date);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="embedUrl"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start gap-4">
              <FormLabel>Release date</FormLabel>
              <FormControl>
                <Input placeholder="Canva embed url" {...field} />
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
