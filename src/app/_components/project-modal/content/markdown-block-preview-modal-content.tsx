import { LayoutGrid, Package, Star, Terminal } from "lucide-react";

import type { Project } from "@/data/projects";

import { ProjectImageCarousel } from "../project-image-carousel";
import { ProjectModalHeader } from "../project-modal-header";
import {
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
    title: "블록 단위로 나누기",
    description:
      "마크다운을 문단·제목·목록·이미지 같은 블록으로 나눠, 미리보기도 블록마다 따로 관리합니다.",
  },
  {
    title: "바뀐 블록만 다시 그리기",
    description:
      "입력할 때마다 이전 글과 비교해 내용이 달라진 블록만 새로 그리고, 나머지와 이미지는 그대로 둡니다.",
  },
  {
    title: "이어 쓰기에 맞춘 갱신",
    description:
      "글 끝에 새 문단을 쓰면 기존 미리보기는 건드리지 않고 새 블록만 덧붙입니다.",
  },
  {
    title: "코드 블록 보호",
    description:
      "코드 블록 안의 빈 줄은 경계로 보지 않아, 코드가 중간에 잘리지 않습니다.",
  },
];

const strengths: ServiceStrength[] = [
  {
    title: "깜빡이지 않는 미리보기",
    description:
      "타이핑할 때마다 미리보기 전체가 깜빡이거나 이미지가 사라졌다 나타나며 글이 밀리는 일이 없습니다.",
  },
  {
    title: "긴 글에서도 빠르게",
    description:
      "글 길이와 거의 관계없이 1ms 안팎으로 갱신되어, 500블록 문서에서는 전체 교체보다 약 93배 빠릅니다.",
  },
  {
    title: "React 없이 바로 사용",
    description:
      "바닐라 JS 환경에서 입력창과 미리보기 영역만 연결하면 동작합니다.",
  },
  {
    title: "npm으로 배포",
    description:
      "직접 겪은 문제를 해결한 코드를 패키지로 만들어, 누구나 설치해 쓸 수 있습니다.",
  },
];

const usageCode = `npm install markdown-block-preview

import { setupMarkdownPreview } from "markdown-block-preview";

setupMarkdownPreview({
  textarea: document.getElementById("content"),
  preview: document.getElementById("preview"),
});`;

export function MarkdownBlockPreviewModalContent({
  project,
}: {
  project: Project;
}) {
  return (
    <div className="flex flex-col gap-6">
      <ProjectImageCarousel
        aspectRatio="1126/692"
        images={[
          {
            src: "/project/markdown-block-preview/before-after.webp",
            alt: "전체 교체(Before)와 블록 단위 갱신(After) 비교, 같은 입력에서 새로 만든 요소가 63개에서 7개로 줄어든 모습",
          },
        ]}
      />

      <ProjectModalHeader project={project} />
      <ProjectLinks
        links={[
          {
            label: "npm",
            href: "https://www.npmjs.com/package/markdown-block-preview",
          },
          {
            label: "Github",
            href: "https://github.com/DoHyuk-Centric/markdown-block-preview",
          },
        ]}
      />

      <ModalSection icon={Package} title="어떤 라이브러리인가요?">
        <ServicePitch headline="글을 쓰는 동안 깜빡이지 않는 마크다운 미리보기">
          <p>
            markdown-block-preview는{" "}
            <Highlight>변경된 부분만 다시 그리는 마크다운 실시간 미리보기 라이브러리</Highlight>
            입니다.
          </p>
          <p>
            개인 블로그의 글쓰기 화면에서 한 글자를 입력할 때마다 미리보기 전체가
            새로 그려져, 화면이 깜빡이고 이미지가 다시 불러와지며 글이 위아래로
            튀는 불편이 있었습니다. 이 문제를 해결하며 만든 코드를 누구나 쓸 수
            있도록 npm 패키지로 배포했습니다.
          </p>
        </ServicePitch>
      </ModalSection>

      <ModalSection icon={LayoutGrid} title="주요 기능">
        <FeatureGrid features={features} />
      </ModalSection>

      <ModalSection icon={Terminal} title="사용 방법">
        <p>설치한 뒤 입력창과 미리보기 영역을 연결하면 바로 동작합니다.</p>
        <pre className="overflow-x-auto rounded-lg border bg-muted p-4 text-xs text-foreground">
          <code>{usageCode}</code>
        </pre>
      </ModalSection>

      <ModalSection icon={Star} title="강점">
        <StrengthList strengths={strengths} />
      </ModalSection>
    </div>
  );
}
