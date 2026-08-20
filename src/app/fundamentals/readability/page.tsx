import Link from "next/link";

import { CodeBlock } from "@/components/code-block";
import { CollapsibleSection } from "@/components/collapsible-section";
import { SectionStub } from "@/components/section-stub";

export default async function ReadabilityPage() {
  return (
    <SectionStub title="가독성">
      <section className="flex flex-col gap-6 px-2">
        <CollapsibleSection title="코드 맥락 최소화">
        <aside className="rounded-lg border bg-muted/50 p-4 text-sm text-muted-foreground">
          💬 하나의 파일과 코드에서 너무 많은 맥락을 다루면 읽기 힘들어집니다.
          따라서 맥락을 줄이기 위해서 Wrapper 또는 HOC로 해결하곤 합니다.
        </aside>

        <div className="flex flex-col gap-2">
          <div className="px-2">
            <h3 className="font-medium text-foreground">문제 상황</h3>
            <p className="text-sm text-muted-foreground px-4">
              관리자 <code>layout.tsx</code>에서 인증에대한 검증, 레이아웃 셸
              구성, 사이드바 전용 데이터(신고 대기 건수) 조회까지 세 책임을 한
              함수 안에서 처리하고 있었습니다.
            </p>
            <CodeBlock
              lang="tsx"
              code={`export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: userRow } = await supabase ...
  // { ... 관리자 인증에 대한 검증 로직 }

  const admin = createAdminClient();
  const { count } = await admin ...
  // { ... 신고 대기 건수 조회 로직}

  return (
    <div>
      <AdminSidebar pendingCount={count ?? 0} />
      <main>
        {children}
      </main>
    </div>
  );
}`}
            />
          </div>
        </div>

        <div className="px-4">
          <p className="text-sm text-muted-foreground">
            예시 코드에서는 로그인된 사용자인지, 관리자 권한이 있는지, 신고 대기
            건수가 몇 건인지를 확인하는 로직이 추상화 없이 그대로 노출되어
            있습니다. 그래서 <code>user</code>, <code>userRow?.role</code>,{" "}
            <code>count</code>과 같은 변수와 값을 모두 읽어야만 이 코드가 무슨
            역할을 하는지 알 수 있었습니다.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            이 코드와 더불어서 실제로 레이아웃을 렌더링하는 JSX까지 같은 함수
            안에 이어지는데, 읽는 사람이 <code>AdminLayout</code>이 무슨 역할을
            하는지 한 번에 이해하기 위해서 파악해야 하는 맥락이 많았습니다.
          </p>
        </div>

        <div className="flex flex-col gap-2 px-2">
          <h3 className="font-medium text-foreground">
            개선: 인증 검증 - Wrapper vs HOC
          </h3>
          <p className="text-sm font-medium text-foreground px-4">
            AI가 권장한 방식
          </p>
          <p className="text-sm text-muted-foreground px-4">
            HOC(<code>withAdminGuard</code>)는 &ldquo;검증 로직이 항상
            렌더링보다 먼저 실행되도록 구조적으로 강제&rdquo;할 수 있다는 장점이
            있다고 설명했고, fail-fast가 보장되지 않을 수 있다는 문제를 근거로
            HOC 방식을 권장했습니다.
          </p>
          <p className="mt-2 text-sm font-medium text-foreground px-4">
            내가 선택한 방식과 이유
          </p>
          <p className="text-sm text-muted-foreground px-4">
            Wrapper(<code>AdminGuard</code>)를 선택했습니다. AI가 우려한
            fail-fast 문제는 사실 &ldquo;검증 로직이 렌더링 대상의 부모 위치에
            있는가&rdquo;만 지키면 되고, 이는 HOC냐 Wrapper냐와 무관하게
            동일하게 만족됩니다. 반면 HOC는 감싸는 지점이{" "}
            <code>export default withAdminGuard(AdminLayout)</code>처럼 export문
            쪽에 있어서, JSX 렌더 트리만 봐서는 어디까지 보호되는 범위인지
            보이지 않습니다. fail-fast 문제가 해소된 이상, 한눈에 보기 불편한
            HOC를 쓸 이유가 없었습니다.
          </p>
          <CodeBlock
            lang="tsx"
            code={`// After: (admin)/_components/AdminGuard.tsx
export default async function AdminGuard({ children }: { children: React.ReactNode }) {
  try {
    await requireAdmin();
  } catch (e) {
    redirect((e as Error).message === "UNAUTHORIZED" ? "/login" : "/");
  }

  return <>{children}</>;
}`}
          />
          <p className="text-sm text-muted-foreground px-4">
            AdminGuard라는 컴포넌트로 분리해 layout.tsx를 읽는 사람이 알아야할
            맥락을 줄여 코드의 가독성을 높일 수 있었습니다.
          </p>
          <p className="text-sm text-muted-foreground px-4">
            layout.tsx가 AdminGaurd와 AdminShell을 조합하는 코드만 남으면서,
            인증 검증 로직과 신고 대기 건수 조회 로직이 서로의 존재를 몰라도
            되는 상태가 됐습니다. 한쪽 로직이 바뀌어도 다른 쪽에 영향을 주지
            않으니, 두 로직 사이의 결합도가 낮아진 셈입니다.
          </p>
          <p className="text-sm text-muted-foreground px-4">
            AdminShell의 네이밍 과정은{" "}
            <Link
              href="/fundamentals/predictability"
              className="text-foreground underline underline-offset-2 hover:no-underline"
            >
              예측 가능성
            </Link>
            의 이름으로 동작 예측과 이어져 있습니다.
          </p>
        </div>
        </CollapsibleSection>
      </section>
      <section className="flex flex-col gap-6 px-2 mt-4">
        <CollapsibleSection title="코드 읽힘 순서">
        <aside className="rounded-lg border bg-muted/50 p-4 text-sm text-muted-foreground">
          💬 하나의 파일과 코드에서 너무 많은 맥락을 다루면 읽기 힘들어집니다.
          따라서 맥락을 줄이기 위해서 Wrapper 또는 HOC로 해결하곤 합니다.
        </aside>
        </CollapsibleSection>
      </section>
    </SectionStub>
  );
}
