import "~/styles/mdx.css";

import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import Image from "next/image";
import Link from "next/link";

import { Markdown } from "~/components/mdx/markdown";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/page-header";
import { Shell } from "~/components/shells/shell";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Separator } from "~/components/ui/separator";
import { formatDate } from "~/lib/utils";

export default function ArticlePage() {
  const source = `# Hello, this is a heading
  I'm testing the **question creation**
  
  Sea virtues fearful snare passion good war prejudice. Law aversion eternal-return chaos decieve superiority convictions ideal ultimate free enlightenment. Free ascetic love oneself ultimate contradict transvaluation will christian. Dead mountains value holiest zarathustra god war pious. Oneself decrepit inexpedient victorious philosophy christian ocean virtues prejudice. Sea passion ocean victorious holiest depths. Contradict justice god pious convictions enlightenment moral good superiority abstract transvaluation.

  ---
  ## Really 

  > "The individual has always had to struggle to keep from being overwhelmed by the tribe. If you try it, you will be lonely often, and sometimes frightened. But no price is too high to pay for the privilege of owning yourself."
  >
  > by Friedrich Nietzsche


  ---

  Here is the code:
  \`\`\`ts
    async function onSubmit(data: FormData) {
      const result = await createQuestion(data);
      if (result.data?.question) {
        toast.success("Successfully created a new question");
      } else if (result.serverError) {
        toast.error(\`Error: \${result.serverError}\`);
      }
    }
  \`\`\`

  Endless ubermensch of overcome will. Spirit virtues victorious contradict strong selfish snare endless war endless contradict. Abstract selfish against derive decrepit convictions ideal victorious decrepit society moral. Ascetic virtues inexpedient virtues ubermensch. Salvation love virtues intentions ascetic burying law justice salvation inexpedient deceptions noble virtues snare. Revaluation evil disgust law transvaluation. Depths free ultimate victorious against. Contradict ultimate of philosophy marvelous zarathustra convictions pinnacle dead sea. Insofar dead christian faith depths. Prejudice enlightenment overcome oneself abstract justice free ultimate good ascetic justice. Ascetic endless deceptions merciful dead faith god self.
  `;

  return (
    <Shell variant="markdown">
      <article>
        <PageHeader>
          <PageHeaderHeading size="lg">
            How did I create this website?
          </PageHeaderHeading>
          <PageHeaderDescription size="sm" className="pt-4">
            Eternal-return ascetic gains love passion zarathustra noble suicide
            intentions enlightenment grandeur deceptions mountains. Salvation
            noble ocean disgust deceptions society strong christianity merciful
            faithful play ocean suicide. Reason chaos endless revaluation
            mountains decieve hope. Snare gains joy noble reason law noble
            merciful grandeur dead. Good contradict play ubermensch truth
            abstract derive merciful marvelous strong ascetic.
          </PageHeaderDescription>
        </PageHeader>
        <div className="mb-2 flex items-center gap-2 pt-6">
          <Image
            alt="avatar"
            src="/images/avatar.png"
            className="h-8 w-8 rounded-full"
            width={64}
            height={64}
          />
          <span className="flex flex-col">
            <span className="text-foreground transition-colors hover:text-foreground/80">
              iboughtbed
            </span>
            <span className="flex items-center gap-1 text-sm">
              <span>{formatDate(new Date("02.02.2023"))}</span>
              <span>
                (
                {formatDistanceToNow(new Date("02.02.2023"), {
                  addSuffix: true,
                })}
                )
              </span>
            </span>
          </span>
        </div>
        <Separator className="my-4" />
        <div className="relative mt-6">
          <AspectRatio ratio={16 / 9}>
            <Image
              alt="cover"
              src="/images/dont-close-your-eyes.webp"
              className="rounded-lg object-cover"
              sizes="(max-width: 768px) 90vw, 50vw"
              fill
            />
          </AspectRatio>
        </div>
        <Separator className="my-8" />
        <div className="prose dark:prose-invert">
          <Markdown source={source} />
        </div>
      </article>
    </Shell>
  );
}
