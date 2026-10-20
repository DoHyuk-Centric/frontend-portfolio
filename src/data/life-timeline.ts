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
  /** Shown under the scene; a "\n" starts a new line. */
  description: string;
};

export const lifeStages: LifeStage[] = [
  {
    key: "high",
    title: "고등학교 졸업",
    description:
      "농구를 좋아하고 사교성이 좋아 다양한 친구들과 어울렸고, 군인과 컴퓨터 모두에 관심이 있어 ROTC를 병행할 수 있는 공대 진학을 목표로 했습니다.",
  },
  {
    key: "univ",
    title: "대학 진학",
    period: "2017.03",
    description:
      "1학년때는 과대표로 활동하며 C++로 코딩을 시작했고, 이론보다 실습에 강해 실습 위주로 수업을 들었습니다. 3학년부터는 ROTC와 병행해 바쁜 대학 생활을 보냈습니다.",
  },
  {
    key: "grad",
    title: "대학 졸업",
    period: "2022.02",
    description:
      "교수님의 제안으로 자율주행 자동차관련 연구와 ROTC 중 하나를 골라야 했고, ROTC를 택해 육군 장교로 임관했습니다.",
  },
  {
    key: "army",
    title: "군입대",
    period: "2022.03",
    description:
      "병과 학교에서 학생대표를 맡았고, 파주 1사단에서 작전 업무를 수행했습니다.",
  },
  {
    key: "discharge",
    title: "전역",
    period: "2024.06",
    description:
      "직접 무언가를 만드는 생산적인 일을 하고 싶어, 2년 4개월의 복무를 마치고 중위로 전역했습니다.",
  },
  {
    key: "business",
    title: "사업 도전과 실패",
    description:
      "친척의 제안으로 공간임대 사업을 시작해 운영·응대·마케팅을 맡았지만, 문제를 직접 풀지 않고 위탁한 탓에 첫 큰 실패를 겪었습니다.",
  },
  {
    key: "bootcamp",
    title: "부트캠프 입교",
    period: "2025.12",
    description:
      "직접 문제를 해결하는 개발자가 되고자 멋쟁이사자처럼 프론트엔드 부트캠프에 입교했고, Kanto로 팀 프로젝트 대상을 받았습니다.",
  },
  {
    key: "now",
    title: "?",
    period: "NOW",
    description:
      "오늘도 어제의 나를 리팩토링하며 성장 중입니다.\n외부 활동 수상을 목표로, 사람들을 직접 만나 실전 경험과 소통을 쌓아 가고 있습니다.",
  },
];
