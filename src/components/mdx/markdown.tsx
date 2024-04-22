import * as React from "react";
import ReactMarkdown, { type Options } from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

import { cn } from "~/lib/utils";
import { components } from "./mdx-components";

function Markdown({ className, ...props }: Options) {
  return (
    <ReactMarkdown
      className={cn("prose overflow-hidden dark:prose-invert", className)}
      components={components}
      remarkPlugins={[remarkGfm, remarkBreaks]}
      rehypePlugins={[
        rehypeSlug,
        rehypeHighlight,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ["subheading-anchor"],
              ariaLabel: "Link to section",
            },
          },
        ],
      ]}
      {...props}
    />
  );
}

export const MemoizedReactMarkdown: React.FC<Options> = React.memo(
  Markdown,
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.className === nextProps.className,
);
