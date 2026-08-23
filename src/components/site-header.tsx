import Image from "next/image";
import Link from "next/link";

import { dancingScript } from "@/lib/fonts";

export function SiteHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 px-4">
      <Link href="/" className="flex items-center gap-2">
        <div className="flex aspect-square size-8 items-center justify-center rounded-full">
          <Image
            src="/favicon-light.png"
            alt="도혁's 포트폴리오 아이콘"
            width={16}
            height={16}
            className="size-5"
          />
        </div>
        <span
          className={`${dancingScript.className} text-2xl leading-none text-black`}
        >
          DoHyuk
        </span>
      </Link>
    </header>
  );
}
