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
    title: "이력서",
    description: "요약, 경력 및 활동, 핵심 역량, 학력",
    href: "/resume",
    icon: FileText,
  },
  {
    title: "포트폴리오",
    description: "기본기, 문제해결, 성능개선, 접근성",
    href: "/portfolio",
    icon: FolderKanban,
  },
  {
    title: "Google Task",
    description: "일정 관리",
    href: "/task",
    icon: ListTodo,
  },
];

export default function Home() {
  return (
    <div className="lg:mx-8 flex w-full flex-col items-center gap-10 text-center lg:items-stretch lg:text-start">
      <div className="flex flex-col gap-3 mt-16">
        <h1 className="text-5xl lg:text-6xl font-bold tracking-tight">
          FrontEnd <br className="hidden lg:block"/> <span className="lg:ml-8">Developer</span>
        </h1>
        <div className="mt-8 text-xl lg:text-2xl font-semibold text-muted-foreground">
          <p className="font-bold">좋은 코드란,</p>
          <p className="text-lg lg:text-xl lg:ml-4">유지보수가 용이하며 안정성이 높은 코드를 의미합니다.</p>
        </div>
      </div>

      <div className="flex w-full max-w-100 text-start flex-col gap-4 lg:max-w-120">
        {links.map((link) => (
          <Card
            key={link.title}
            className="[--card-spacing:--spacing(3)] lg:[--card-spacing:--spacing(4)]"
          >
            <CardHeader>
              <link.icon className="size-4 text-muted-foreground lg:size-5" />
              <CardTitle className="text-sm lg:text-base">
                {link.title}
              </CardTitle>
              <CardDescription className="text-xs lg:text-sm">
                {link.description}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link
                href={link.href}
                className={cn(
                  buttonVariants({ variant: "secondary", size: "sm" }),
                  "w-full lg:h-8 lg:text-sm"
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
