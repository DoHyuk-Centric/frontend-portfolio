import type { Metadata } from "next";

import { SaveFileCard } from "./_components/save-file-card";

export const metadata: Metadata = {
  title: "Profile",
  description: "프론트엔드 개발자 김도혁이 걸어온 길",
};

export default function ProfilePage() {
  return (
    <div className="flex w-full flex-col items-center pt-6 pb-16">
      <SaveFileCard />
    </div>
  );
}
