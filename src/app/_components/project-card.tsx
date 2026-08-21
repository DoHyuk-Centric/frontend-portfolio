import Image from "next/image";
import { ImageIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

function HeroImage({ project }: { project: Project }) {
  if (project.logo) {
    return (
      <div className="relative aspect-video bg-muted p-6">
        <Image
          src={project.logo}
          alt={`${project.title} 로고`}
          fill
          className="object-contain"
        />
      </div>
    );
  }

  return (
    <div className="flex aspect-video items-center justify-center bg-muted text-muted-foreground">
      <ImageIcon className="size-8" />
    </div>
  );
}

export function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick?: () => void;
}) {
  return (
    <Card
      onClick={onClick}
      className="cursor-pointer gap-3 overflow-hidden pt-0 transition-shadow hover:shadow-md hover:ring-foreground/20 active:shadow-none"
    >
      <HeroImage project={project} />
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardAction>
          <Badge
            className={cn(
              "border-transparent",
              project.team
                ? "bg-blue-500/10 text-blue-600"
                : "bg-gray-500/10 text-gray-600"
            )}
          >
            {project.team ? "Team" : "Personal"}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <CardDescription>{project.description}</CardDescription>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
