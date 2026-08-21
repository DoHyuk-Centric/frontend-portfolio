import Image from "next/image";
import { ImageIcon } from "lucide-react";

import type { Project } from "@/data/projects";

function ProjectLogo({ project }: { project: Project }) {
  if (project.logo) {
    return (
      <Image
        src={project.logo}
        alt={`${project.title} 로고`}
        width={56}
        height={56}
        className="size-14 shrink-0 rounded-lg object-cover"
      />
    );
  }

  return (
    <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
      <ImageIcon className="size-6" />
    </div>
  );
}

export function ProjectModalHeader({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-2 px-2">
      <div className="flex items-center gap-4">
        <ProjectLogo project={project} />
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-foreground">
            {project.title}
          </h2>
          <span className="text-sm text-muted-foreground">
            {project.period}
          </span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground px-2">{project.description}</p>
    </div>
  );
}
