"use client";

import { Button, type ButtonProps } from "~/components/ui/button";
import { cn } from "~/lib/utils";

type ClientButtonProps = ButtonProps;

export function ClientButton({ className, ...props }: ClientButtonProps) {
  return <Button className={cn(className)} {...props}></Button>;
}
