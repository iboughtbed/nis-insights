import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

interface MarkdownProps {
  source: string;
}

export function Markdown({ source }: MarkdownProps) {
  return (
    <ReactMarkdown
      disallowedElements={["img"]}
      remarkPlugins={[remarkGfm, remarkBreaks]}
      rehypePlugins={[rehypeHighlight]}
    >
      {source}
    </ReactMarkdown>
  );
}
