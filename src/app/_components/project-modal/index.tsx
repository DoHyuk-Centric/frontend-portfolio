"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Project } from "@/data/projects";
import { dancingScript } from "@/lib/fonts";

import { DohyukDevModalContent } from "./content/dohyuk-dev-modal-content";
import { EslintKrModalContent } from "./content/eslint-kr-modal-content";
import { GentleLionModalContent } from "./content/gentle-lion-modal-content";
import { KantoModalContent } from "./content/kanto-modal-content";

const modalContentBySlug: Record<
  string,
  React.ComponentType<{ project: Project }>
> = {
  kanto: KantoModalContent,
  "dohyuk-dev": DohyukDevModalContent,
  "gentle-lion": GentleLionModalContent,
  "eslint-kr": EslintKrModalContent,
};

export function ProjectModal({
  project,
  open,
  onOpenChange,
}: {
  project: Project;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const ModalContent = modalContentBySlug[project.slug];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[90vh] w-[95vw] max-w-6xl flex-col gap-0 overflow-hidden bg-background p-0 sm:max-w-6xl">
        <DialogHeader className="sr-only">
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription>{project.description}</DialogDescription>
        </DialogHeader>
        <div
          className={`${dancingScript.className} h-10 shrink-0 border-b flex items-center pl-6 text-lg text-[#111111]`}
        >
          Project Details
        </div>
        <div className="flex-1 overflow-y-auto px-6 pb-6 pt-6">
          {ModalContent && <ModalContent project={project} />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
