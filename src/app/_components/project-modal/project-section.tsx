import Image from "next/image";
import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

// ==================== 섹션 뼈대: 모달 안의 큰 주제 묶기 ====================

export function ModalSection({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="group my-6 flex flex-col gap-3 px-4">
      <h3 className="flex items-center gap-2 text-xl font-bold text-foreground">
        <Icon className="size-6 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100" />
        {title}
      </h3>
      <div className="flex flex-col gap-4 px-2 text-base text-muted-foreground sm:px-12">
        {children}
      </div>
    </section>
  );
}

// ==================== 링크 영역: 서비스·저장소 바로가기 ====================

export type ProjectLink = { label: string; href: string };

export function ProjectLinks({
  links,
  note,
}: {
  links: ProjectLink[];
  /** Extra line under the links, e.g. a demo account. */
  note?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap justify-center gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {link.label}
          </Link>
        ))}
      </div>
      {note && (
        <div className="flex justify-center text-sm text-muted-foreground">
          {note}
        </div>
      )}
    </div>
  );
}

// ==================== 서비스 소개: 한 줄 요약과 대상 ====================

export function ServicePitch({
  headline,
  children,
}: {
  headline: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-lg font-semibold text-foreground">{headline}</p>
      <div className="flex flex-col gap-2 leading-relaxed">{children}</div>
    </div>
  );
}

// ==================== 주요 기능: 화면과 함께 보여주기 ====================

export type ServiceFeature = {
  title: string;
  description: string;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    /** "contain" keeps very wide or tall screenshots uncropped. */
    fit?: "cover" | "contain";
  };
};

export function FeatureGrid({ features }: { features: ServiceFeature[] }) {
  return (
    <div className="grid items-start gap-4 sm:grid-cols-2">
      {features.map((feature) => (
        <article
          key={feature.title}
          className="flex flex-col overflow-hidden rounded-xl border bg-card"
        >
          {feature.image && (
            <Image
              src={feature.image.src}
              alt={feature.image.alt}
              width={feature.image.width}
              height={feature.image.height}
              className={cn(
                "aspect-video w-full border-b",
                feature.image.fit === "contain"
                  ? "bg-muted object-contain p-3"
                  : "object-cover object-top",
              )}
            />
          )}
          <div className="flex flex-col gap-1 p-4">
            <h4 className="font-semibold text-foreground">{feature.title}</h4>
            <p className="text-sm leading-relaxed">{feature.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

// ==================== 이용 흐름: 사용자가 거치는 단계 ====================

export function FlowSteps({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-2">
      {steps.map((step, index) => (
        <li key={step} className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-sm text-foreground">
            <span className="text-xs font-semibold text-blue-600">
              {index + 1}
            </span>
            {step}
          </span>
          {index < steps.length - 1 && (
            <ChevronRight className="size-4 shrink-0" aria-hidden />
          )}
        </li>
      ))}
    </ol>
  );
}

// ==================== 강점: 다른 서비스와 다른 점 ====================

export type ServiceStrength = { title: string; description: string };

export function StrengthList({
  strengths,
  className,
}: {
  strengths: ServiceStrength[];
  className?: string;
}) {
  return (
    <div className={cn("grid gap-3 sm:grid-cols-2", className)}>
      {strengths.map((strength) => (
        <div
          key={strength.title}
          className="flex flex-col gap-1 rounded-lg border-l-4 border-blue-500 bg-blue-500/5 px-4 py-3"
        >
          <span className="font-semibold text-foreground">
            {strength.title}
          </span>
          <p className="text-sm leading-relaxed">{strength.description}</p>
        </div>
      ))}
    </div>
  );
}

// ==================== 본문 조각: 목록과 강조 표기 ====================

export function BulletList({
  items,
  className,
}: {
  items: React.ReactNode[];
  className?: string;
}) {
  return (
    <ul className={cn("flex list-disc flex-col gap-1 pl-5", className)}>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <strong className="font-semibold text-foreground">{children}</strong>
  );
}
