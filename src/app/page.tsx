import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { portfolioSections } from "@/data/portfolio-sections";

const sectionDescriptions: Record<string, string> = {
  fundamentals: "Props Drilling, ",
};

export default function PortfolioPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Project</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {portfolioSections.map((section) => (
          <Card key={section.slug}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>
                {sectionDescriptions[section.slug] ?? "작성 중입니다."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {section.items.map((item) => (
                  <Badge key={item.slug} variant="outline">
                    {item.title}
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
