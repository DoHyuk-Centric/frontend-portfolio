import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const experience = [
  {
    role: "Software Engineer",
    company: "Company Name",
    period: "2023 — Present",
    description:
      "Describe your responsibilities and impact in this role.",
  },
  {
    role: "Frontend Developer",
    company: "Previous Company",
    period: "2021 — 2023",
    description:
      "Describe your responsibilities and impact in this role.",
  },
];

const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
];

export default function ResumePage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Resume</h1>
        <p className="text-muted-foreground">
          A summary of my work experience and skills.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-medium">Experience</h2>
        <div className="flex flex-col gap-4">
          {experience.map((item) => (
            <Card key={item.role}>
              <CardHeader>
                <CardTitle>{item.role}</CardTitle>
                <CardDescription>
                  {item.company} · {item.period}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-medium">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
