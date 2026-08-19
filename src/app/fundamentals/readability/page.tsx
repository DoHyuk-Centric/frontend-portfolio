import Link from "next/link";

import { SectionStub } from "@/components/section-stub";

export default function ReadabilityPage() {
  return (
    <SectionStub title="가독성">
      <section className="flex flex-col gap-6">
        <aside className="rounded-lg border bg-muted/50 p-4 text-sm text-muted-foreground">
          💡 인증 검증을 별도 컴포넌트로 감쌀 때, &ldquo;감싼 뒤에도 그 안에
          무엇이 있는지 파고들지 않고 한눈에 알 수 있는가&rdquo;를 기준으로
          HOC 대신 Wrapper를 선택했습니다.
        </aside>

        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-foreground">
            코드 맥락 최소화
          </h2>
          <h3 className="font-medium text-foreground">문제 상황</h3>
          <p className="text-sm text-muted-foreground">
            <code>(admin)/layout.tsx</code> 하나가 인증 검증, 레이아웃 셸
            구성, 사이드바 전용 데이터(신고 대기 건수) 조회까지 세 책임을 한
            함수 안에서 처리하고 있었습니다.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-medium text-foreground">
            인증 검증 — Wrapper vs HOC
          </h3>

          <p className="text-sm font-medium text-foreground">
            AI가 권장한 방식
          </p>
          <p className="text-sm text-muted-foreground">
            HOC(<code>withAdminGuard</code>)는 &ldquo;검증 로직이 항상
            렌더링보다 먼저 실행되도록 구조적으로 강제&rdquo;할 수 있다는
            장점이 있다고 설명했고, fail-fast가 보장되지 않을 수 있다는
            문제를 근거로 HOC 방식을 권장했습니다.
          </p>

          <p className="mt-2 text-sm font-medium text-foreground">
            내가 선택한 방식과 이유
          </p>
          <p className="text-sm text-muted-foreground">
            Wrapper(<code>AdminGuard</code>)를 선택했습니다. AI가 우려한
            fail-fast 문제는 사실 &ldquo;검증 로직이 렌더링 대상의 부모
            위치에 있는가&rdquo;만 지키면 되고, 이는 HOC냐 Wrapper냐와
            무관하게 동일하게 만족됩니다. 반면 HOC는 감싸는 지점이{" "}
            <code>export default withAdminGuard(AdminLayout)</code>처럼
            export문 쪽에 있어서, JSX 렌더 트리만 봐서는 어디까지 보호되는
            범위인지 보이지 않습니다. fail-fast 문제가 해소된 이상, 한눈에
            보기 불편한 HOC를 쓸 이유가 없었습니다.
          </p>

          <pre className="mt-2 overflow-x-auto rounded-lg bg-muted p-4 text-xs">
            <code>{`// After: (admin)/_components/AdminGuard.tsx
export default async function AdminGuard({ children }: { children: React.ReactNode }) {
  try {
    await requireAdmin();
  } catch (e) {
    redirect((e as Error).message === "UNAUTHORIZED" ? "/login" : "/");
  }

  return <>{children}</>;
}`}</code>
          </pre>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-medium text-foreground">체득한 것</h3>
          <p className="text-sm text-muted-foreground">
            추상화를 걸 때 이름과 감싸는 위치가 그 자체로 문서 역할을
            하는지를 먼저 따지게 됐습니다. 같은 리팩터링에서 컴포넌트 이름이
            내부 구현을 얼마나 정확히 예측하게 하는가는{" "}
            <Link
              href="/fundamentals/predictability"
              className="text-foreground underline underline-offset-2 hover:no-underline"
            >
              예측 가능성
            </Link>
            에서 이어집니다.
          </p>
        </div>
      </section>
    </SectionStub>
  );
}
