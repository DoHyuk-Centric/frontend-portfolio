import { fraunces } from "@/lib/fonts";
import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";

import styles from "./home.module.css";
import { homeColors } from "./theme";

const skills = Array.from(
  new Set(projects.flatMap((project) => project.techStack))
);

export function SkillsSection() {
  return (
    <section
      id="skills"
      className={`flex min-h-screen w-full snap-start flex-col items-center justify-center px-6 ${styles.section3}`}
    >
      <div className="flex w-full max-w-2xl flex-col gap-6">
        <h2
          className={`${fraunces.className} text-3xl font-semibold tracking-tight sm:text-4xl`}
          style={{ color: homeColors.ink }}
        >
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className="h-8 border-none px-3 text-sm"
              style={{
                backgroundColor: homeColors.chipBg,
                borderColor: homeColors.chipBorder,
                color: homeColors.ink,
              }}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
