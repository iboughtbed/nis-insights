import { ExternalLinkIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Shell } from "~/components/shells/shell";
import { Separator } from "~/components/ui/separator";
import { siteConfig } from "~/config/site";
import { absoluteUrl } from "~/lib/utils";
import { db } from "~/server/db";
import { getReleaseEmbed } from "~/server/queries/release";

export async function generateMetadata({
  params,
}: {
  params: { releaseId: string };
}): Promise<Metadata> {
  const release = await db.release.findUnique({
    where: {
      id: params.releaseId,
    },
    select: {
      date: true,
    },
  });

  if (!release) {
    return {};
  }

  const date = format(release.date, "dd/MM/yy");

  return {
    title: `${date} - release`,
    description: `Read the ${date} release`,
    openGraph: {
      title: `${date} - release`,
      description: `Read the ${date} release`,
      type: "article",
      url: absoluteUrl(`/release/${params.releaseId}`),
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${date} - release`,
      description: `Read the ${date} release`,
      images: [siteConfig.ogImage],
      creator: "@iboughtbed",
    },
  };
}

export default async function ReleasePage({
  params,
}: {
  params: { releaseId: string };
}) {
  const { data } = await getReleaseEmbed({ id: params.releaseId });

  if (!data?.release) {
    notFound();
  }

  const embedUrl = data.release.embedUrl + "?embed";

  return (
    <Shell className="min-h-screen">
      <span className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium">
        <InfoCircledIcon className="mr-1 size-4" />
        <Separator className="mr-2 h-4" orientation="vertical" />
        <span className="inline">
          Zoom is not supported in full screen mode. Just zoom without using
          full screen mode.{" "}
          <Link
            href={data.release.embedUrl}
            className="inline-flex underline underline-offset-4"
          >
            View original canva
            <ExternalLinkIcon className="size-3" />
          </Link>
        </span>
      </span>
      <div className="relative h-full w-full">
        <iframe
          src={encodeURI(embedUrl)}
          allowFullScreen
          className="relative h-[80vh] w-full"
        ></iframe>
      </div>
    </Shell>
  );
}
