import { highlightCode } from "@/lib/highlight-code";

export async function CodeBlock({
  code,
  lang = "tsx",
}: {
  code: string;
  lang?: string;
}) {
  const html = await highlightCode(code, lang);

  return (
    <div className="relative mt-2 overflow-x-auto rounded-lg border text-xs [&_pre]:overflow-x-auto [&_pre]:p-4">
      <span className="absolute top-2 right-3 text-[10px] font-medium text-muted-foreground">
        {lang}
      </span>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
