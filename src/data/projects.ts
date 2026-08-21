export type Project = {
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  team: boolean;
  /** Project duration, formatted as "YYYY.MM ~ YYYY.MM". */
  period: string;
  /** Path to the project logo shown next to the title in the modal header. */
  logo?: string;
};

export const projects: Project[] = [
  {
    slug: "kanto",
    title: "Kanto",
    description: "필리핀 생활 플랫폼",
    techStack: ["TypeScript", "Next.js"],
    team: true,
    period: "2024.01 ~ 2024.06",
    logo: "/project/kanto/favicon.ico",
  },
  {
    slug: "dohyuk-dev",
    title: "DoHyuk.dev",
    description: "개인 블로그 프로젝트",
    techStack: ["JavaScript"],
    team: false,
    period: "2024.01 ~ 2024.06",
  },
  {
    slug: "gentle-lion",
    title: "GentleLion",
    description: "젠틀 몬스터 클론코딩",
    techStack: ["JavaScript", "monorepo"],
    team: true,
    period: "2024.01 ~ 2024.06",
  },
  {
    slug: "eslint-kr",
    title: "ESLint-KR",
    description: "ESLint 한국어 커뮤니티 / 정적 페이지",
    techStack: ["TypeaScript", "React"],
    team: false,
    period: "2024.01 ~ 2024.06",
  },
];
