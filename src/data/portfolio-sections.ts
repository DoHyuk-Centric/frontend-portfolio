export type PortfolioLeaf = {
  title: string;
  slug: string;
};

export type PortfolioSection = PortfolioLeaf & {
  items: PortfolioLeaf[];
};

export const portfolioSections: PortfolioSection[] = [
  {
    title: "Kanto",
    slug: "kanto",
    items: [
      { title: "구조", slug: "structure" },
      { title: "기술 선택", slug: "tech-stack" },
      { title: "문제해결", slug: "problem-solving" },
    ],
  },
  {
    title: "DoHyuk.dev",
    slug: "dohyuk-dev",
    items: [
      { title: "구조", slug: "structure" },
      { title: "기술 선택", slug: "tech-stack" },
      { title: "문제해결", slug: "problem-solving" },
      { title: "접근성", slug: "accessibility" },
    ],
  },
  {
    title: "Fundamentals",
    slug: "fundamentals",
    items: [
      { title: "가독성", slug: "readability" },
      { title: "예측 가능성", slug: "predictability" },
      { title: "응집도", slug: "cohesion" },
      { title: "결합도", slug: "coupling" },
    ],
  },
];
