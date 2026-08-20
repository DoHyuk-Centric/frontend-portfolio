import { codeToHtml } from "shiki";

export async function highlightCode(code: string, lang: string) {
  return codeToHtml(code, {
    lang,
    theme: "light-plus",
  });
}
