export type LifeStageKey =
  | "high"
  | "univ"
  | "grad"
  | "army"
  | "discharge"
  | "business"
  | "bootcamp"
  | "now";

export type LifeStage = {
  key: LifeStageKey;
  title: string;
  /** Leave empty when the date is not decided yet; the caption hides it. */
  period?: string;
  description: string;
};

export const lifeStages: LifeStage[] = [
  {
    key: "high",
    title: "고등학교를 졸업하다",
    description: "졸업장을 손에 쥐고 다음 길을 고민했습니다.",
  },
  {
    key: "univ",
    title: "대학교에 진학하다",
    period: "2017.03",
    description: "세명대학교 컴퓨터학부에서 개발을 처음 배우기 시작했습니다.",
  },
  {
    key: "grad",
    title: "대학교를 졸업하다",
    period: "2022.02",
    description: "학사모를 쓰고, ROTC 60기로 임관을 준비했습니다.",
  },
  {
    key: "army",
    title: "군대에 가다",
    period: "2022.03",
    description: "ROTC 장교로 육군에서 복무했습니다.",
  },
  {
    key: "discharge",
    title: "중위로 전역하다",
    period: "2024.06",
    description: "무사히 임무를 마치고 육군 중위로 전역했습니다.",
  },
  {
    key: "business",
    title: "사업에 도전하다",
    description: "처음으로 사업을 시작했고, 쉽지 않은 시간도 겪었습니다.",
  },
  {
    key: "bootcamp",
    title: "부트캠프에서 다시 시작하다",
    period: "2025.12",
    description:
      "멋쟁이사자처럼 프론트엔드 부트캠프에서 개발을 다시 시작했고, Kanto로 파이널 프로젝트 대상을 받았습니다.",
  },
  {
    key: "now",
    title: "개발하는 지금의 나",
    period: "NOW",
    description: "오늘도 어제의 나를 리팩토링하며 성장하고 있습니다.",
  },
];
