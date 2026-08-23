import { Wrench } from "lucide-react";

import type { Project } from "@/data/projects";
import Link from "next/link";

import { ProjectImageCarousel } from "../project-image-carousel";
import { ProjectModalHeader } from "../project-modal-header";

export function EslintKrModalContent({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-6">
      <ProjectImageCarousel
        aspectRatio="1920/1080"
        images={[
          {
            src: "/project/eslint-kr/eslint-kr-main.webp",
            alt: "ESLint-KR 대표 이미지 1",
          },
          {
            src: "/project/eslint-kr/eslint-kr-what.webp",
            alt: "ESLint-KR 대표 이미지 2",
          },
          {
            src: "/project/eslint-kr/eslint-kr-rules.webp",
            alt: "ESLint-KR 대표 이미지 3",
          },
        ]}
      />

      <ProjectModalHeader project={project} />

      <div className="flex flex-col gap-2">
        <div className="flex gap-4 justify-center">
          <Link
            href="https://dohyuk-centric.github.io/eslint-kr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            서비스 페이지
          </Link>
          <Link
            href="https://github.com/DoHyuk-Centric/eslint-kr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Github
          </Link>
        </div>
      </div>

      <div className="group flex flex-col gap-2 px-4 my-8">
        <h3 className="flex items-center gap-2 font-bold text-xl text-foreground">
          <Wrench className="size-6 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100" />
          개요
        </h3>
        <div className="px-12 text-base text-muted-foreground">
          <ul className="flex list-[circle] flex-col gap-2 pl-4 mt-2">
            <li>
              ESLint-KR 한국어 커뮤니티
              <ul className="list-[square] pl-4 text-sm mt-1 flex flex-col gap-1">
                <li>
                  ESLint 공식 홈페이지에서 한국어 지원을 하지 않았고, 한국어
                  기여를 위해서 ESLint 깃허브를 확인해본 결과 한국어는 수요가
                  많지 않고 오버헤드가 발생한다는 이유로 PR을 거부하는 것을
                  확인했습니다.
                </li>
                <li>
                  모국어가 주는 학습 효과는 무시할 수 없다고 생각했고, ESLint를
                  처음 접하는 개발자들을 위한 오픈형 커뮤니티를 만들어봐야겠다고
                  생각해 시작하게 된 프로젝트입니다.
                </li>
              </ul>
            </li>
            <li>
              React 정적 홈페이지
              <ul className="list-[square] pl-4 text-sm mt-1 flex flex-col gap-1">
                <li>
                  가이드 특성상 문서마다 반복되는 레이아웃, 네비게이션, 코드블록
                  UI를 재사용하고 문서 간 탐색 흐름을 구성하는 데 유리한 React를
                  활용했습니다.
                </li>
                <li>
                  오픈소스라는 특성상 TypeScript를 활용해 컴포넌트 Props와 코드
                  예제 UI의 데이터 구조를 명시해 코드 안정성과 가독성을
                  확보해야겠다고 생각했습니다.
                </li>
              </ul>
            </li>
            <li>
              이슈 템플릿 제공
              <ul className="list-[square] pl-4 text-sm mt-1 flex flex-col gap-1">
                <li>
                  오픈소스 특성을 참고해 이슈 템플릿을 제작해 사용했습니다.
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
