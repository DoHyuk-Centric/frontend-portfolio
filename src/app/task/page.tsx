import { CheckCircle2, Circle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const tasks = [
  { title: "Set up project structure", done: true },
  { title: "Design the sidebar navigation", done: true },
  { title: "Write resume content", done: false },
  { title: "Add portfolio projects", done: false },
];

export default function TaskPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Task</h1>
        <p className="text-muted-foreground">
          What I&apos;m currently working on.
        </p>
      </div>

      <Card>
        <CardContent className="flex flex-col divide-y divide-border">
          {tasks.map((task) => (
            <div
              key={task.title}
              className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
            >
              {task.done ? (
                <CheckCircle2 className="size-4 shrink-0 text-primary" />
              ) : (
                <Circle className="size-4 shrink-0 text-muted-foreground" />
              )}
              <span
                className={
                  task.done
                    ? "text-sm text-muted-foreground line-through"
                    : "text-sm"
                }
              >
                {task.title}
              </span>
              <Badge
                variant={task.done ? "secondary" : "outline"}
                className="ml-auto"
              >
                {task.done ? "Done" : "In progress"}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
