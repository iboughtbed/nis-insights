import type { Metadata } from "next";

import { Articles } from "~/components/articles";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/page-header";
import { Shell } from "~/components/shells/shell";
import { Separator } from "~/components/ui/separator";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Explore articles from our team members, uncover something fresh and intriguing, and share your thoughts.",
};

export default function ArticlesPage(
  {
    // searchParams,
  }: {
    searchParams: Record<string, string | string[] | undefined>;
  },
) {
  // console.log({ searchParams });

  const mock = [
    {
      id: "random_id",
      title: "Don't close your eyes",
      introduction:
        "Eternal-return ascetic gains love passion zarathustra noble suicide intentions enlightenment grandeur deceptions mountains. Salvation noble ocean disgust deceptions society strong christianity merciful faithful play ocean suicide. Reason chaos endless revaluation mountains decieve hope. Snare gains joy noble reason law noble merciful grandeur dead. Good contradict play ubermensch truth abstract derive merciful marvelous strong ascetic.",
      createdAt: new Date("02.02.2023"),
      author: {
        username: "iboughtbed",
      },
    },
    {
      id: "random_id1",
      title: "Don't close your eyes",
      introduction:
        "Eternal-return ascetic gains love passion zarathustra noble suicide intentions enlightenment grandeur deceptions mountains. Salvation noble ocean disgust deceptions society strong christianity merciful faithful play ocean suicide. Reason chaos endless revaluation mountains decieve hope. Snare gains joy noble reason law noble merciful grandeur dead. Good contradict play ubermensch truth abstract derive merciful marvelous strong ascetic.",
      createdAt: new Date("02.02.2023"),
      author: {
        username: "iboughtbed",
      },
    },
  ];

  return (
    <Shell variant="markdown">
      <PageHeader>
        <PageHeaderHeading size="sm">Articles</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Read and search articles from out best writers in the world!
        </PageHeaderDescription>
      </PageHeader>
      <Separator />
      <Articles articles={mock} pageCount={1} />
    </Shell>
  );
}
