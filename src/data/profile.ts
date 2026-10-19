export type ProfileTimelineItem = {
  title: string;
  period: string;
  note?: string;
};

export type ProfileContact = {
  label: string;
  value: string;
  href: string;
};

export const profile = {
  name: "김도혁",
  role: "FRONT-END DEVELOPER",
  photo: "/profile/dohyuk.webp",
  tagline: "어제의 나를 리팩토링하는 개발자",
  introduction: [
    "겸손과 배움을 가치관으로 삼아, 모든 행동에는 배울 점이 있다고 믿으며 존중하는 태도를 중요하게 생각합니다.",
    "다양한 실패를 양분 삼아 더 나은 해결책을 찾아낸 경험이 있습니다.",
    "자료를 기반으로 문제에 접근하고, 더 나은 결과를 내고 싶은 욕심이 있습니다.",
  ],
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind",
    "shadcn/ui",
    "Node.js",
    "PostgreSQL",
  ],
  education: [
    {
      title: "멋쟁이사자처럼 프론트엔드 부트캠프",
      period: "2025.12 ~ 2026.07",
      note: "Kanto 팀 프로젝트로 파이널 프로젝트 대상",
    },
    {
      title: "ROTC 60기 · 육군 중위 전역",
      period: "2022.03 ~ 2024.06",
    },
    {
      title: "세명대학교 컴퓨터학부",
      period: "2017.03 ~ 2022.02",
    },
  ] satisfies ProfileTimelineItem[],
  awards: [
    {
      title: "AI 바이브톤 최우수상 (멋쟁이사자처럼)",
      period: "2026.09",
      note: "팀장 · 레시피 URL 기반 원가 산출 서비스 레시비",
    },
  ] satisfies ProfileTimelineItem[],
  contacts: [
    {
      label: "Email",
      value: "clzlsdlwhgdk12@gmail.com",
      href: "mailto:clzlsdlwhgdk12@gmail.com",
    },
    {
      label: "GitHub",
      value: "github.com/DoHyuk-Centric",
      href: "https://github.com/DoHyuk-Centric",
    },
  ] satisfies ProfileContact[],
};
