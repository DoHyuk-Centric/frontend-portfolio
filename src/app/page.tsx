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
    <div className="mx-auto my-auto flex w-full max-w-3xl flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h1 className="text-5xl text-center font-bold tracking-tight">
          FrontEnd Developer
        </h1>
        <div className="mt-8 mx-auto text-2xl font-semibold text-muted-foreground">
          <p className="text-start">좋은 코드란,</p>
          <p className="text-xl">유지보수가 용이하며 안정성이 높은 코드를 의미합니다.</p>
        </div>
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
