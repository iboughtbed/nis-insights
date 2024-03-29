"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { updateUser } from "~/server/actions/user";

interface UserProfileProps {
  user?: {
    name?: string | null;
    username: string;
  };
}

const userProfileSchema = z.object({
  name: z.string().trim().min(1).optional(),
  username: z.string().trim().min(1).max(20).optional(),
});

type FormData = z.infer<typeof userProfileSchema>;

export function UserProfile({ user }: UserProfileProps) {
  const { isPending, mutate } = useMutation({
    mutationFn: async (formData: FormData) => {
      const { data, serverError, validationErrors } =
        await updateUser(formData);

      if (serverError ?? validationErrors) {
        toast.error("Something went wrong");
        throw new Error("Something went wrong");
      }

      return data;
    },
    onSuccess: () => {
      toast.success("Updated your data");
    },
  });

  const form = useForm<FormData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: user?.name ?? undefined,
      username: user?.username,
    },
  });

  function onSubmit(data: FormData) {
    mutate(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 rounded-md border p-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Rick" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="artistic_octopus" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending}>Submit</Button>
      </form>
    </Form>
  );
}
