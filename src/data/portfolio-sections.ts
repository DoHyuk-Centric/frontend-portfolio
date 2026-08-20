export type PortfolioLeaf = {
  title: string;
  slug: string;
};

export type PortfolioSection = PortfolioLeaf & {
  items: PortfolioLeaf[];
};

export const portfolioSections: PortfolioSection[] = [
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
