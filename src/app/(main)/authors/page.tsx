import Image from "next/image";

import avatarRickImage from "public/images/avatar-rick.png";
import avatarImage from "public/images/avatar.png";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/page-header";
import { Shell } from "~/components/shells/shell";
import { authorsConfig } from "~/config/authors";

export default async function AuthorsPage() {
  return (
    <Shell className="min-h-screen">
      <PageHeader separated>
        <PageHeaderHeading>Meet the team</PageHeaderHeading>
        <PageHeaderDescription className="mt-4">
          We&apos;re a dynamic group of individuals who are passionate about
          what we do and dedicated to delivering the best results for our
          readers.
        </PageHeaderDescription>
      </PageHeader>
      <ul className="relative mt-10 grid grid-cols-1 gap-16 text-center md:grid-cols-3">
        {authorsConfig.items.map((author, i) => (
          <li key={i}>
            <div className="relative mx-auto h-24 w-24 rounded-full">
              <Image
                alt="avatar"
                src={
                  author.name === "Zhangaliev Sanzhar"
                    ? avatarRickImage
                    : avatarImage
                }
                className="rounded-full"
              />
            </div>
            <h3 className="mt-6 text-xl font-bold">{author.name}</h3>
            <p className="text-foreground/80">{author.role}</p>
          </li>
        ))}
      </ul>
    </Shell>
  );
}
