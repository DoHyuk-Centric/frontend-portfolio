import { Accessibility, LayoutGrid, Sparkles, Star } from "lucide-react";

import type { Project } from "@/data/projects";

import { ProjectImageCarousel } from "../project-image-carousel";
import { ProjectModalHeader } from "../project-modal-header";
import {
  BulletList,
  FeatureGrid,
  Highlight,
  ModalSection,
  ProjectLinks,
  ServicePitch,
  StrengthList,
  type ServiceFeature,
  type ServiceStrength,
} from "../project-section";

const features: ServiceFeature[] = [
  {
    title: "실시간으로 써 내려가는 답변",
    description:
      "질문하자마자 \"프론티가 펜을 고르는 중…\" 같은 상태와 AI의 생각 요약이 바뀌며 보여, 답변을 기다리는 동안에도 지금 무엇을 하고 있는지 알 수 있습니다.",
    image: {
      src: "/project/frontie/frontie-streaming.webp",
      alt: "질문 아래에 AI 생각 요약 소제목과 '프론티가 펜을 고르는 중' 상태가 표시된 화면",
      width: 1146,
      height: 242,
      fit: "contain",
    },
  },
  {
    title: "보기 좋은 코드 답변",
    description:
      "답변 속 코드는 언어별로 색이 구분된 코드 블록으로 보여, 학습 중인 코드를 바로 읽고 따라 할 수 있습니다.",
  },
  {
    title: "원할 때 멈추는 답변",
    description:
      "답변이 길어지면 ESC나 중지 버튼으로 언제든 멈출 수 있고, 그때까지 받은 내용은 그대로 남습니다.",
  },
  {
    title: "이미지로도 질문하기",
    description:
      "에러 화면이나 디자인 시안을 첨부해 이미지와 함께 질문할 수 있습니다.",
  },
  {
    title: "대화방 관리",
    description:
      "주제별로 대화방을 나눠 관리하고, 대화 기록은 브라우저에 저장되어 다시 열어도 이어서 볼 수 있습니다.",
  },
  {
    title: "다크 모드",
    description: "밤늦게 공부할 때도 눈이 편하도록 다크 모드를 지원합니다.",
  },
];

const strengths: ServiceStrength[] = [
  {
    title: "최신 기술에도 정확한 답변",
    description:
      "새로 바뀐 프론트엔드 기술의 변경점을 알고 답해, 옛 방식을 정답처럼 배우는 일을 줄입니다.",
  },
  {
    title: "기다림이 답답하지 않은 대화",
    description:
      "빈 화면을 보며 기다리는 대신, 질문 즉시 진행 상황을 확인하며 기다릴 수 있습니다.",
  },
  {
    title: "누구나 쓸 수 있는 AI 채팅",
    description:
      "스크린리더와 키보드만으로도 질문하고, 답변을 탐색하고, 다른 대화로 이동할 수 있습니다.",
  },
];

export function FrontieModalContent({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-6">
      <ProjectImageCarousel
        images={[
          {
            src: "/project/frontie/frontie-main.webp",
            alt: "Frontie 첫 화면, '프론티에게 물어보세요.' 안내와 메시지 입력창",
          },
        ]}
      />

      <ProjectModalHeader project={project} />
      <ProjectLinks
        links={[
          { label: "서비스 페이지", href: "https://frontie-topaz.vercel.app" },
          { label: "Github", href: "https://github.com/DoHyuk-Centric/frontie" },
        ]}
      />

      <ModalSection icon={Sparkles} title="어떤 서비스인가요?">
        <ServicePitch headline="최신 프론트엔드도 정확하게 답하는 AI 학습 도우미">
          <p>
            Frontie(프론티)는{" "}
            <Highlight>프론트엔드를 공부하는 사람을 위한 AI 채팅 서비스</Highlight>
            입니다.
          </p>
          <p>
            일반 AI에게 물어보면 Next.js 16에서 middleware가 proxy로 바뀐 것처럼
            최근 변경점을 모른 채 옛 방식을 정답처럼 알려주곤 합니다. 막 공부를
            시작한 개발자는 그 답을 그대로 믿기 쉽습니다. Frontie는 최신 변경점을
            기억하고 답하는 학습용 AI를 목표로 만들었습니다.
          </p>
        </ServicePitch>
      </ModalSection>

      <ModalSection icon={LayoutGrid} title="주요 기능">
        <FeatureGrid features={features} />
      </ModalSection>

      <ModalSection icon={Accessibility} title="스크린리더 사용자를 위한 기능">
        <FeatureGrid
          features={[
            {
              title: "접근성 설정",
              description:
                "필요한 안내만 켜고 끌 수 있고, 다른 프로그램과 겹치는 단축키는 직접 바꿀 수 있습니다. 사용법은 접근성 가이드 페이지에서 안내합니다.",
              image: {
                src: "/project/frontie/frontie-a11y-settings.webp",
                alt: "Frontie 접근성 설정 모달, 응답 진행 상태 안내·완료 알림·단축키 설정 항목",
                width: 589,
                height: 992,
                fit: "contain",
              },
            },
          ]}
        />
        <BulletList
          items={[
            <>
              <Highlight>답변 요약 안내</Highlight>: 긴 답변을 끝까지 듣지
              않아도 &quot;문단 N개, 코드 블록 M개&quot;처럼 구성을 먼저 알려줍니다.
            </>,
            <>
              <Highlight>제목으로 이동</Highlight>: 질문, 답변, 코드 블록마다
              제목이 있어 H 키만으로 원하는 곳에 바로 갈 수 있습니다.
            </>,
            <>
              <Highlight>단축키</Highlight>: Alt + J 마지막 답변 읽기, Alt + I
              입력창 이동, Alt + N 알림 온 대화로 이동
            </>,
            <>
              <Highlight>완료 알림</Highlight>: 다른 대화를 보고 있어도 답변이
              끝나면 알림음과 음성으로 알려줘, 기다리지 않고 다른 질문을 이어갈
              수 있습니다.
            </>,
          ]}
        />
      </ModalSection>

      <ModalSection icon={Star} title="Frontie의 강점">
        <StrengthList strengths={strengths} />
      </ModalSection>
    </div>
  );
}
