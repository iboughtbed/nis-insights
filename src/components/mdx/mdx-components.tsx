import { useMDXComponent } from "next-contentlayer/hooks";

import { components } from "~/components/mdx/markdown";

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <div className="prose overflow-hidden dark:prose-invert">
      <Component components={components} />
    </div>
  );
}
