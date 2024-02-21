"use client";

import type { UserRole } from "@prisma/client";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { useMediaQuery } from "~/hooks/use-media-query";

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
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const dashboardContent = [
    {
      template: "Published %d releases",
      display: role === "ADMIN",
    },
    {
      template: "You have %d articles",
      display: role === "ADMIN" || role === "WRITER",
    },
    {
      title: "You posted %d comments",
      display: true,
    },
  ];

  if (isDesktop) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Card>
              <CardHeader>
                <CardTitle>You&apos;ve posted 2 articles</CardTitle>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </DialogTrigger>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
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
