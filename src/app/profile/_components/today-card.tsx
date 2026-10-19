import type { ReactNode } from "react";

import { profile } from "@/data/profile";
import { fraunces } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import { ProfilePhoto } from "./profile-photo";

/** The profile card: who I am today, with the life timeline (`children`) scrolling inside it. */
export function TodayCard({ children }: { children?: ReactNode }) {
  return (
    <article className="mx-auto flex w-full max-w-xl flex-col items-center gap-6 rounded-3xl border bg-white p-8 text-center shadow-sm sm:p-10">
      <span className={cn(fraunces.className, "text-sm text-muted-foreground")}>
        Hello, I’m
      </span>

      <div className="flex flex-col items-center gap-3">
        <ProfilePhoto className="size-28 rounded-full border-4 border-white shadow-md" />
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-foreground">
            {profile.name}
          </h1>
          <span className="text-xs tracking-[0.25em] text-muted-foreground">
            {profile.role}
          </span>
        </div>
        <p className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-700">
          {profile.tagline}
        </p>
      </div>

      <div className="flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground">
        {profile.introduction.map((sentence) => (
          <p key={sentence}>{sentence}</p>
        ))}
      </div>

      <ul className="flex flex-wrap justify-center gap-1.5">
        {profile.skills.map((skill) => (
          <li key={skill} className="rounded-full border px-2.5 py-0.5 text-xs">
            {skill}
          </li>
        ))}
      </ul>

      <ul className="flex w-full flex-col gap-2 border-t pt-6 text-sm">
        {profile.contacts.map((contact) => (
          <li key={contact.label}>
            <span className="mr-2 text-xs text-muted-foreground">
              {contact.label}
            </span>
            <a
              href={contact.href}
              target={contact.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="break-all text-foreground underline-offset-4 hover:underline"
            >
              {contact.value}
            </a>
          </li>
        ))}
      </ul>

      {children}
    </article>
  );
}
