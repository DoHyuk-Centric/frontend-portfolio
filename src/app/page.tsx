import { ProjectContainer } from "./_components/project-container";
import { projects } from "@/data/projects";

export default function PortfolioPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">활동 프로젝트</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectContainer key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}
