import { format } from "date-fns";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Shell } from "~/components/shells/shell";
import { siteConfig } from "~/config/site";
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
      coverImage: true,
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
      url: `${process.env.NEXT_PUBLIC_APP_URL}${params.releaseId}`,
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
