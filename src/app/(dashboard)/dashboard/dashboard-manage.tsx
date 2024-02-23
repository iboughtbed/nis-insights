"use client";

import type { UserRole } from "@prisma/client";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Skeleton } from "~/components/ui/skeleton";
import { useMediaQuery } from "~/hooks/use-media-query";
import { useMounted } from "~/hooks/use-mounted";

interface DashboardManageProps {
  _count: {
    releases?: number;
    articles?: number;
    comments?: number;
  };
  role: UserRole;
}

export function DashboardManage({ _count, role }: DashboardManageProps) {
  const [open, setOpen] = useState(false);
  const mounted = useMounted();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // TODO: finish this bullshit

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (isDesktop) {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {role === "ADMIN" && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer">
                <CardHeader>
                  <CardTitle>
                    {_count.releases} releases have been released
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">View the list</div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent></DialogContent>
          </Dialog>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild className="cursor-pointer">
          <Card>
            <CardHeader>
              <CardTitle>You&apos;ve posted 2 articles</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle></DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
