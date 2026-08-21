"use client";

import { useState } from "react";

import type { Project } from "@/data/projects";

import { ProjectCard } from "./project-card";
import { ProjectModal } from "./project-modal";

export function ProjectContainer({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ProjectCard project={project} onClick={() => setOpen(true)} />
      <ProjectModal project={project} open={open} onOpenChange={setOpen} />
    </>
  );
}
