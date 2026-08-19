import { notFound } from "next/navigation";

const sectionTitles: Record<string, string> = {
  basics: "프론트엔드 기본",
  "basics/readability": "가독성",
  "basics/predictability": "예측 가능성",
  "basics/cohesion": "응집도",
  "basics/coupling": "결합도",
  kanto: "Kanto",
  "kanto/structure": "구조",
  "kanto/tech-stack": "기술 선택",
  "kanto/problem-solving": "문제해결",
  "dohyuk-dev": "DoHyuk.dev",
  "dohyuk-dev/structure": "구조",
  "dohyuk-dev/tech-stack": "기술 선택",
  "dohyuk-dev/problem-solving": "문제해결",
  "dohyuk-dev/accessibility": "접근성",
};

export function generateStaticParams() {
  return Object.keys(sectionTitles).map((key) => ({
    slug: key.split("/"),
  }));
}

export default async function PortfolioSectionPage(
  props: PageProps<"/[...slug]">
) {
  const { slug } = await props.params;
  const title = sectionTitles[slug.join("/")];

  if (!title) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="text-sm text-muted-foreground">작성 중입니다.</p>
    </div>
  );
}
