"use client";

import * as React from "react";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { ScrollArea } from "~/components/ui/scroll-area";
import { useMediaQuery } from "~/hooks/use-media-query";
import { cn } from "~/lib/utils";

interface DashboardCardProps {
  title: string;
  description: string;
  isOpen: boolean;
}

const DashboardCard = React.forwardRef<
  HTMLDivElement,
  DashboardCardProps & React.HTMLAttributes<HTMLDivElement>
>(({ title, description, isOpen, ...props }, ref) => {
  return (
    <div ref={ref} className="group relative rounded-lg" {...props}>
      <div
        className={cn(
          "absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 blur transition-opacity duration-500 group-hover:opacity-100",
          isOpen && "opacity-100",
        )}
      />
      <Card className="relative h-full cursor-pointer">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
});
DashboardCard.displayName = "DashboardCard";

interface DashboardCardWrapperProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

function DashboardCardWrapper({
  children,
  ...props
}: DashboardCardWrapperProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <DashboardCard isOpen={open} {...props} />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogDescription>{props.description}</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[50vh]">{children}</ScrollArea>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <DashboardCard isOpen={open} {...props} />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{props.title}</DrawerTitle>
          <DrawerDescription>{props.description}</DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-[50vh] p-4">{children}</ScrollArea>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export { DashboardCardWrapper };
