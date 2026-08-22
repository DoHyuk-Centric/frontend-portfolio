import { Code2, Lightbulb, Wrench } from "lucide-react";

import type { Project } from "@/data/projects";
import Link from "next/link";
import { ProjectImageCarousel } from "../project-image-carousel";
import { ProjectModalHeader } from "../project-modal-header";

export function GentleLionModalContent({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-6">
      <ProjectImageCarousel
        images={[
          {
            src: "/project/gentle-lion/gentlelion-main.webp",
            alt: "GentleLion 대표 이미지 1",
          },
          {
            src: "/project/gentle-lion/gentlelion-admin.webp",
            alt: "GentleLion 대표 이미지 2",
          },
        ]}
      />

      <ProjectModalHeader project={project} />

      <div className="flex flex-col gap-2">
        <div className="flex gap-4 justify-center">
          <Link
            href="https://gentlelion.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            서비스 페이지
          </Link>
          <Link
            href="https://gentlelion-adminmin.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            관리자 페이지
          </Link>
          <Link
            href="https://github.com/FRONTENDBOOTCAMP-17th/gentlelion"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Github
          </Link>
        </div>
        <div className="flex justify-center text-muted-foreground">
          임시 계정: admin@gentlemonster.com / admin123
        </div>
      </div>

      <div className="group flex flex-col gap-2 px-4 mt-4">
        <h3 className="flex items-center gap-2 font-bold text-xl text-foreground">
          <Lightbulb className="size-6 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100" />
          Mono Repo
        </h3>
        <div className="text-base text-muted-foreground px-12">
          <ul className="flex list-disc flex-col gap-3 pl-4">
            <li>
              <h4>
                npm Workspaces 모노레포로 사용자/관리자 페이지를 분리해 서비스별
              독립 배포
              </h4>
              <ul className="flex list-[circle] flex-col gap-2 pl-4 mt-2">
                <li>
                  사용자 페이지와 관리자 페이지는 서로의 존재를 모르도록 구현해 사용자 페이지에서 관리자 페이지에 대한 접근이 불가해 보안적 이점을 취득
                </li>
                <li>
                  공통 API를 구현해 관리자와 유저페이지에서 사용되는 API 호출 파일을 줄여 프로젝트 경량화
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div className="group flex flex-col gap-2 px-4 my-8">
        <h3 className="flex items-center gap-2 font-bold text-xl text-foreground">
          <Code2 className="size-6 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100" />
          기여
        </h3>
        <div className="px-12 text-base text-muted-foreground">
          작성 중입니다.
        </div>
      </div>

      <div className="group flex flex-col gap-2 px-4 my-8">
        <h3 className="flex items-center gap-2 font-bold text-xl text-foreground">
          <Wrench className="size-6 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100" />
          문제 해결
        </h3>
        <div className="px-12 text-base text-muted-foreground">
          작성 중입니다.
        </div>
      </div>

      <div className="group flex flex-col gap-2 px-4 my-8">
        <h3 className="flex items-center gap-2 font-bold text-xl text-foreground">
          <Wrench className="size-6 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100" />
          기능
        </h3>
        <div className="px-12 text-base text-muted-foreground">
          작성 중입니다.
        </div>
      </div>
    </div>
  );
}
