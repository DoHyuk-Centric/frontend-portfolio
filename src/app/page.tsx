import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const projects = [
  {
    title: "프론트엔드 기본기",
    description: "Props Drilling, ",
    tags: ["가독성", "예측 가능성", "응집도", "결합도"],
  },
  {
    title: "Project Two",
    description: "A short description of what this project does.",
    tags: ["React", "Tailwind CSS"],
  },
  {
    title: "Project Three",
    description: "A short description of what this project does.",
    tags: ["Node.js", "PostgreSQL"],
  },
];

export default function PortfolioPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">목차</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.title}>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
