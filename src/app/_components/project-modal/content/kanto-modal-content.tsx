import { Code2, Hammer, Wrench } from "lucide-react";
import Link from "next/link";

import type { Project } from "@/data/projects";

import { ProjectImageCarousel } from "../project-image-carousel";
import { ProjectModalHeader } from "../project-modal-header";

export function KantoModalContent({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-6">
      <ProjectImageCarousel
        images={[
          { src: "/project/kanto/KantoMain.png", alt: "Kanto 대표 이미지 1" },
          { src: "/project/kanto/KantoLogin.png", alt: "Kanto 대표 이미지 2" },
          { src: "/project/kanto/KantoAdmin.png", alt: "Kanto 대표 이미지 3" },
        ]}
      />

      <ProjectModalHeader project={project} />

      <div className="flex flex-col group gap-2 px-4 mt-8">
        <h3 className="flex items-center gap-2 font-bold text-xl text-foreground">
          <Code2 className="size-6 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100" />
          기여
        </h3>
        <div className="text-base text-muted-foreground px-12">
          <ul className="flex list-disc flex-col gap-3 pl-4">
            <li>
              <p>
                메인, 프로필, 채팅, AI 챗봇, 관리자 운영관리 페이지 기능 개발 및
                공통 UI 유틸리티 제작
              </p>
            </li>
            <li>
              <p>공지사항 반응형 및 플로팅 버튼 UI 제작</p>
            </li>
            <li>
              <p>SEO 메타데이터 최적화 상세 페이지별 동적 OG 이미지 생성</p>
            </li>
            <li>
              <p>
                이용약관 페이지 Notion CMS 연동 로직 구현, 반복되는 API 호출
                문제를 클라이언트 캐싱으로 해결, 이후 팀 내에서 회의를 통해 ISR
                방식으로 개선
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div className="group flex flex-col gap-2 px-4 mt-16">
        <h3 className="flex items-center gap-2 font-bold text-xl text-foreground">
          <Wrench className="size-6 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100" />
          문제 해결
        </h3>
        <div className="text-base text-muted-foreground px-12">
          <ul className="flex list-disc flex-col gap-3 pl-4">
            <li>
              <h4>TanStack Query를 활용한 관리자 페이지 서버 상태 관리</h4>
              <ul className="flex list-[circle] flex-col gap-2 pl-4 mt-2">
                <li>
                  관리자 운영관리 페이지에서 탭을 이동할 때마다 매번 가져온
                  데이터를 재요청
                </li>
                <li>
                  불필요한 탭 전환으로 서버 요청을 갉아 먹고 있는 부분을
                  캐싱처리를 통해 개선
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div className="group flex flex-col gap-2 px-4 my-16">
        <h3 className="flex items-center gap-2 font-bold text-xl text-foreground">
          <Hammer className="size-6 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100" />
          리팩토링
        </h3>
        <div className="text-base text-muted-foreground px-12">
          <ul className="flex list-disc flex-col gap-3 pl-4">
            <li>
              <h4>가독성, 예측 가능성, 응집도, 결합도를 기준으로 리팩토링</h4>
              <ul className="flex list-[circle] flex-col gap-2 pl-4 mt-2">
                <li>
                  <Link
                    href="/fundamentals"
                    className="text-blue-500 hover:underline"
                  >
                    Fundamentals에서 상세하게 확인이 가능합니다.
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
