const basePath = process.env.GITHUB_ACTIONS === "true" ? "/frontend-portfolio" : "";

export default function githubPagesLoader({ src }: { src: string }) {
  return `${basePath}${src}`;
}
