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

      <div className="flex flex-col gap-2">
        <h3 className="font-medium text-foreground">개요</h3>
        <p className="text-sm text-muted-foreground">작성 중입니다.</p>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-medium text-foreground">핵심 기능</h3>
        <p className="text-sm text-muted-foreground">작성 중입니다.</p>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-medium text-foreground">문제 해결</h3>
        <div className="flex flex-col gap-1 pl-2">
          <h4 className="text-sm font-medium text-foreground">
            작성 중입니다.
          </h4>
          <p className="text-sm text-muted-foreground">작성 중입니다.</p>
        </div>
      </div>
    </div>
  );
}
