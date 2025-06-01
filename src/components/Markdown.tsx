import { cn } from "@/lib/utils";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export interface MarkdownProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: string;
}

function Markdown({ className, children, ...props }: MarkdownProps) {
  return (
    <div className={cn(className, "prose max-w-none", className)} {...props}>
      <ReactMarkdown skipHtml={false} rehypePlugins={[remarkGfm]}>
        {children}
      </ReactMarkdown>
    </div>
  );
}

// Markdown.displayName = "Markdown";

export default Markdown;
