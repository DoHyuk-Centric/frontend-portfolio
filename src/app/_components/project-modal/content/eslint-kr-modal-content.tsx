import { Code2, Lightbulb, Wrench } from "lucide-react";

import type { Project } from "@/data/projects";

import { ProjectImageCarousel } from "../project-image-carousel";
import { ProjectModalHeader } from "../project-modal-header";

export function EslintKrModalContent({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-6">
      <ProjectImageCarousel images={[{ alt: "ESLint-KR 대표 이미지" }]} />

      <ProjectModalHeader project={project} />

      <div className="flex flex-col gap-2">
        <p className="flex justify-center text-muted-foreground">
          작성 중입니다.
        </p>
      </div>

      <div className="group flex flex-col gap-2 px-4 mt-4">
        <h3 className="flex items-center gap-2 font-bold text-xl text-foreground">
          <Lightbulb className="size-6 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100" />
          기술 선택
        </h3>
        <div className="px-12 text-base text-muted-foreground">
          작성 중입니다.
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
