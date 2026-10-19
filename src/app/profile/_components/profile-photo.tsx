import Image from "next/image";

import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

export function ProfilePhoto({ className }: { className?: string }) {
  return (
    <Image
      src={profile.photo}
      alt={`${profile.name} 프로필 사진`}
      width={227}
      height={303}
      className={cn("object-cover object-[50%_35%]", className)}
    />
  );
}
