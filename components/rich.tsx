import type { ElementType } from "react";

/** Renders translation strings that carry simple markup such as <strong>. Only for text from messages/*.json, never user input. */
export function Rich({ html, as: Tag = "p", className = "" }: { html: string; as?: ElementType; className?: string }) {
  return <Tag className={`rich ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}
