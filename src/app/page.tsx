import Link from "next/link";
import { ArrowRight, FileText, FolderKanban, ListTodo } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const links = [
  {
    title: "Resume",
    description: "Work history, skills, and education.",
    href: "/resume",
    icon: FileText,
  },
  {
    title: "Portfolio",
    description: "Selected projects and case studies.",
    href: "/portfolio",
    icon: FolderKanban,
  },
  {
    title: "Task",
    description: "What I'm currently working on.",
    href: "/task",
    icon: ListTodo,
  },
];

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          Hi, I&apos;m your name.
        </h1>
        <p className="max-w-xl text-muted-foreground">
          Welcome to my portfolio. Browse my resume, projects, and current
          tasks using the sidebar.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {links.map((link) => (
          <Card key={link.title}>
            <CardHeader>
              <link.icon className="text-muted-foreground" />
              <CardTitle>{link.title}</CardTitle>
              <CardDescription>{link.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Link
                href={link.href}
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  "w-full"
                )}
              >
                View {link.title}
                <ArrowRight />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
