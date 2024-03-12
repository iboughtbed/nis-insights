import "~/styles/mdx.css";

import { allPages } from "contentlayer/generated";
import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { Mdx } from "~/components/mdx/mdx-components";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/page-header";
import { Shell } from "~/components/shells/shell";
import { Separator } from "~/components/ui/separator";
import { siteConfig } from "~/config/site";
import { absoluteUrl } from "~/lib/utils";

interface PageProps {
  params: {
    slug: string[];
  };
}

function getPageFromParams(params: PageProps["params"]) {
  const slug = params?.slug?.join("/") ?? "";
  const page = allPages.find(
    (page: { slugAsParams: string }) => page.slugAsParams === slug,
  );

  if (!page) {
    null;
  }

  return page;
}

export function generateMetadata({ params }: PageProps): Metadata {
  const page = getPageFromParams(params);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: "article",
      url: absoluteUrl(page.slug),
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [siteConfig.ogImage],
    },
  };
}

export function generateStaticParams(): PageProps["params"][] {
  return allPages.map((page) => ({
    slug: page.slugAsParams.split("/"),
  }));
}

export default function Page({ params }: PageProps) {
  const page = getPageFromParams(params);

  if (!page) {
    notFound();
  }

  return (
    <Shell as="article" variant="markdown">
      <PageHeader>
        <PageHeaderHeading>{page.title}</PageHeaderHeading>
        <PageHeaderDescription>{page.description}</PageHeaderDescription>
      </PageHeader>
      <Separator />
      <Mdx code={page.body.code} />
    </Shell>
  );
}
