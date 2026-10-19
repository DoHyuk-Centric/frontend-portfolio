export type Project = {
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  team: boolean;
  /** Number of people on the project, shown next to the title in the modal header (e.g. "Kanto(4인)"). Omit if unknown. */
  teamSize?: number;
  /** Project duration, formatted as "YYYY.MM ~ YYYY.MM". */
  period: string;
  /** Path to the project logo image shown on the project card. */
  logo?: string;
  /** Path to the project favicon shown next to the title in the modal header. */
  icon?: string;
};

export const projects: Project[] = [
  {
    slug: "kanto",
    title: "Kanto",
    description:
      "필리핀 거주 한인을 위한 커뮤니티 플랫폼 · 파이널 프로젝트 대상",
    techStack: ["TypeScript", "Next.js", "Supabase", "Zustand", "TanStack Query"],
    team: true,
    teamSize: 4,
    period: "2026.05 ~ 2026.10",
    logo: "/project/kanto/kantoLogo.webp",
    icon: "/project/kanto/kanto-icon-192.webp",
  },
  {
    slug: "frontie",
    title: "Frontie",
    description: "최신 프론트엔드 학습 질문에도 답하는 AI 채팅 서비스",
    techStack: ["TypeScript", "Next.js", "Zustand", "Shiki"],
    team: false,
    period: "2026.05 ~ 2026.10",
    logo: "/project/frontie/frontie-logo.webp",
    icon: "/project/frontie/frontie-icon.webp",
  },
  {
    slug: "markdown-block-preview",
    title: "markdown-block-preview",
    description: "변경된 블록만 다시 렌더링하는 마크다운 미리보기 npm 패키지",
    techStack: ["JavaScript", "marked", "npm"],
    team: false,
    period: "2026.03",
    logo: "/project/markdown-block-preview/before-after.webp",
  },
];
