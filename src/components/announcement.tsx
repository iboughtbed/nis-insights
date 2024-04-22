import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";

export function Announcement() {
  return (
    <Link
      href="/releases"
      className="inline-flex items-center rounded-full border border-purple-600 border-opacity-0 bg-muted py-1 pl-1 pr-3 text-sm font-medium outline-none ring-0 ring-purple-600 ring-opacity-0 transition-all duration-500 ease-out hover:border-opacity-100 hover:ring-[3px] hover:ring-opacity-30 focus:ring-[3px] focus:ring-opacity-30 active:border-opacity-100 active:ring-[1px] active:ring-opacity-30"
    >
      <Badge>New</Badge>{" "}
      <Separator className="mx-1 h-4" orientation="vertical" />{" "}
      <span>Read our latest release</span>
      <ChevronRightIcon className="ml-1 size-4" />
    </Link>
  );
}
