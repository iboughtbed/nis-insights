"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
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
import { updateUser } from "~/lib/actions/user";

interface UserProfileProps {
  user?: {
    name?: string | null;
    username: string;
  };
}

const userProfileSchema = z.object({
  name: z.string().trim().optional(),
  username: z.string().trim().max(20).optional(),
});

type FormData = z.infer<typeof userProfileSchema>;

export function UserProfile({ user }: UserProfileProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: user?.name ?? undefined,
      username: user?.username,
    },
  });

  function onSubmit(data: FormData) {
    startTransition(async () => {
      const result = await updateUser(data);

      if (result.data?.updatedUser.id) {
        toast.success("Updated the profile data");
      }

      if (result.serverError) {
        toast.error("Something went wrong");
      }
    });
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
        <Button disabled={isPending || !form.formState.isDirty}>Submit</Button>
      </form>
    </Form>
  );
}
