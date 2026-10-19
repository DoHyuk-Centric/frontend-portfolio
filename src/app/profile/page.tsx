import type { Metadata } from "next";

import { profile } from "@/data/profile";

import { PixelJourney } from "./_components/pixel-journey/pixel-journey";
import { TodayCard } from "./_components/today-card";

export const metadata: Metadata = {
  title: "Profile",
  description: "프론트엔드 개발자 김도혁이 걸어온 길",
};

export default function ProfilePage() {
  return (
    <div className="flex w-full flex-col items-center pt-6 pb-16">
      <TodayCard>
        <header className="flex w-full flex-col items-center gap-2 border-t pt-8">
          <span className="text-xs tracking-[0.3em] text-muted-foreground">
            LIFE
          </span>
          <h2 className="text-2xl font-semibold tracking-tight">
            {profile.name}이 걸어온 길
          </h2>
          <p className="text-sm text-muted-foreground">
            스크롤을 내리면 고등학교 졸업부터 지금까지 함께 걸어갑니다.
          </p>
        </header>

        <PixelJourney />
      </TodayCard>
    </div>
  );
}
