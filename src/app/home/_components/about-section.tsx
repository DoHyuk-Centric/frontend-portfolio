import { fraunces } from "@/lib/fonts";

import styles from "./home.module.css";
import { homeColors } from "./theme";

export function AboutSection() {
  return (
    <section
      id="about"
      className={`flex min-h-screen w-full snap-start flex-col items-center justify-center px-6 ${styles.section2}`}
    >
      <div className="flex w-full max-w-2xl flex-col gap-4">
        <h2
          className={`${fraunces.className} text-3xl font-semibold tracking-tight sm:text-4xl`}
          style={{ color: homeColors.ink }}
        >
          About
        </h2>
        {/*
          TODO: 임시 자기소개 문구입니다. 준비되는 대로 실제 내용으로
          교체해주세요.
        */}
        <p
          className="text-base leading-relaxed sm:text-lg"
          style={{ color: homeColors.inkMuted }}
        >
          안녕하세요, 사용자 경험과 코드 품질을 함께 고민하는 프론트엔드
          개발자 도혁입니다. 팀과 함께 문제를 정의하고, 읽기 쉬운 코드로
          그 문제를 풀어가는 과정을 좋아합니다.
        </p>
      </div>
    </section>
  );
}
