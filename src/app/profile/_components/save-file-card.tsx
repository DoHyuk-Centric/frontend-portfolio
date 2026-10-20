"use client";

import { useState, type ReactNode } from "react";

import { profile, type ProfileSentence } from "@/data/profile";
import { dotGothic } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import { HandheldConsole } from "./pixel-journey/handheld-console";
import { PixelJourney } from "./pixel-journey/pixel-journey";
import { PlayerSprite } from "./pixel-journey/player-sprite";

/** Highlights listed as achievements: notes on the education entries, then the awards. */
const achievements = [
  ...profile.education.flatMap((item) => (item.note ? [item.note] : [])),
  ...profile.awards.map((award) => award.title),
];

/** What the screen shows below the save file's header. */
type Mode = "save" | "introduce" | "timeline";

const SCREEN_CLASS = "flex flex-col gap-4 rounded-sm border-[3px] border-[#0b2613] bg-[#eaf7cc] p-4 text-[#0b2613]";

/**
 * The profile card, drawn as a Game Boy "load save file" screen. TIME LINE
 * keeps the save file's header and swaps everything below it for the life
 * timeline, which plays as the card scrolls inside itself; SAVE FILE swaps it back.
 */
export function SaveFileCard() {
  const [mode, setMode] = useState<Mode>("save");
  const show = (next: Mode) => () => setMode(next);

  return (
    <HandheldConsole title="DOHYUK:LIFE">
      {mode === "save" && <SaveScreen onShow={setMode} />}
      {mode === "introduce" && <IntroduceScreen onShow={setMode} />}
      {mode === "timeline" && (
        <PixelJourney
          header={
            <div className={SCREEN_CLASS}>
              <SaveFileHeader status="TIME LINE" />
              <Menu>
                <MenuButton label="SAVE FILE" hint="세이브 화면으로" onClick={show("save")} />
              </Menu>
            </div>
          }
        />
      )}
    </HandheldConsole>
  );
}

// ==================== 세이브 화면: 머리말 → 능력치 → 메뉴 ====================

function SaveScreen({ onShow }: { onShow: (mode: Mode) => void }) {
  return (
    <div className={SCREEN_CLASS}>
      <SaveFileHeader status="NOW" />
      <ExpBar />

      <SaveSection label="ITEMS">
        <ul className="flex flex-wrap gap-1.5">
          {profile.skills.map((skill) => (
            <li key={skill} className="border-2 border-[#0b2613] px-1.5 text-xs">
              {skill}
            </li>
          ))}
        </ul>
      </SaveSection>

      <Menu>
        <MenuButton label="INTRODUCE" hint="자기소개 보기" onClick={() => onShow("introduce")} />
        <MenuButton label="TIME LINE" hint="인생 타임라인 보기" onClick={() => onShow("timeline")} />
      </Menu>
    </div>
  );
}

/** The introduction under the save file's header, with the way back and on to the timeline. */
function IntroduceScreen({ onShow }: { onShow: (mode: Mode) => void }) {
  return (
    <div className={SCREEN_CLASS}>
      <SaveFileHeader status="INTRODUCE" />
      <SaveSection label="INTRODUCE">
        <Introduction />
      </SaveSection>

      <SaveSection label="ACHIEVEMENTS">
        <ul className="flex flex-col gap-1 text-[13px]">
          {achievements.map((achievement) => (
            <li key={achievement}>★ {achievement}</li>
          ))}
        </ul>
      </SaveSection>

      <SaveSection label="CONTACT">
        <ul className="flex flex-col gap-1 text-[13px]">
          {profile.contacts.map((contact) => (
            <li key={contact.label} className="flex gap-2">
              <span className={cn(dotGothic.className, "w-14 shrink-0 text-xs opacity-70")}>{contact.label}</span>
              <a
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="min-w-0 break-all underline-offset-4 hover:underline"
              >
                {contact.value}
              </a>
            </li>
          ))}
        </ul>
      </SaveSection>

      <Menu>
        <MenuButton label="SAVE FILE" hint="세이브 화면으로" onClick={() => onShow("save")} />
        <MenuButton label="TIME LINE" hint="인생 타임라인 보기" onClick={() => onShow("timeline")} />
      </Menu>
    </div>
  );
}

/** The save file's title row and the player, shared by every screen. */
function SaveFileHeader({ status }: { status: string }) {
  return (
    <>
      <div className={cn(dotGothic.className, "flex justify-between text-xs tracking-[0.08em]")}>
        <span>SAVE FILE 01</span>
        <span>{status}</span>
      </div>
      <div className="flex items-center gap-4">
        <PlayerSprite className="w-16 shrink-0" />
        <div className="flex min-w-0 flex-col gap-0.5">
          <h1 className="text-xl font-bold">{profile.name}</h1>
          <span className={cn(dotGothic.className, "text-xs tracking-[0.12em]")}>{profile.role}</span>
          <span className="text-[13px]">칭호 · {profile.tagline}</span>
        </div>
      </div>
    </>
  );
}

/** The menu at the bottom of a screen, set off by a dashed line. */
function Menu({ children }: { children: ReactNode }) {
  return <nav className="flex flex-col gap-2 border-t-2 border-dashed border-[#0b2613]/40 pt-3">{children}</nav>;
}

/**
 * A menu line in the game's style: on hover or keyboard focus a ▶ cursor
 * appears on its left and the label is underlined, like picking a menu item.
 */
function MenuButton({
  label,
  hint,
  onClick,
}: {
  label: string;
  hint: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        dotGothic.className,
        "group flex items-center justify-between text-left text-sm tracking-[0.08em] outline-none",
      )}
    >
      <span className="flex items-center gap-1.5">
        <span aria-hidden className="w-3 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100">
          ▶
        </span>
        <span className="underline-offset-4 group-hover:underline group-focus-visible:underline">{label}</span>
      </span>
      <span className="text-xs opacity-70 group-hover:opacity-100 group-focus-visible:opacity-100">{hint}</span>
    </button>
  );
}

/** A decorative experience bar: always growing, never full. */
function ExpBar() {
  return (
    <div className="flex flex-col gap-1">
      <span className={cn(dotGothic.className, "text-xs tracking-[0.08em]")}>EXP · NEXT LEVEL</span>
      <div className="h-2.5 border-2 border-[#0b2613]">
        <div className="h-full w-[72%] bg-[#2f6a3b]" />
      </div>
    </div>
  );
}

function SaveSection({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-1.5">
      <h2 className={cn(dotGothic.className, "text-xs tracking-[0.12em] opacity-80")}>{label}</h2>
      {children}
    </section>
  );
}

// ==================== 글: 세이브 화면 안의 자기소개 ====================

/** The introduction as a short list, one sentence per line with a pixel bullet. */
function Introduction() {
  return (
    <ul className="flex flex-col gap-2 text-[13px] leading-relaxed">
      {profile.introduction.map((sentence) => (
        <li key={sentence.text} className="flex gap-2">
          <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 bg-[#0b2613]" />
          <p className="min-w-0">
            <PointedSentence sentence={sentence} />
          </p>
        </li>
      ))}
    </ul>
  );
}

/** The sentence with its point drawn inverted, like the selected line of a game menu. */
function PointedSentence({ sentence }: { sentence: ProfileSentence }) {
  const [before, after] = sentence.text.split(sentence.point);
  if (after === undefined) return sentence.text;

  return (
    <>
      {before}
      <strong className="bg-[#0b2613] px-1 font-bold text-[#eaf7cc] [box-decoration-break:clone]">
        {sentence.point}
      </strong>
      {after}
    </>
  );
}
