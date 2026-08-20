import { SectionStub } from "@/components/section-stub";
import { CodeBlock } from "@/components/code-block";
import { CollapsibleSection } from "@/components/collapsible-section";
import Link from "next/link";

export default function PredictabilityPage() {
  return (
    <SectionStub title="예측 가능성">
      <section className="flex flex-col gap-6 px-2">
        <CollapsibleSection title="같은 종류의 함수 반환 타입 통일">
          <aside className="rounded-lg border bg-muted/50 p-4 text-sm text-muted-foreground">
            💬 하나의 파일과 코드에서 너무 많은 맥락을 다루면 읽기 힘들어집니다.
            따라서 맥락을 줄이기 위해서 Wrapper 또는 HOC로 해결하곤 합니다.
          </aside>

          <div className="flex flex-col gap-2">
            <div className="px-2">
              <h3 className="font-medium text-foreground">문제 상황</h3>
              <p className="text-sm text-muted-foreground px-4">공사중</p>
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

          <div className="flex flex-col gap-2 px-2">
            <p className="text-sm text-muted-foreground">
              예시 코드에서는 로그인된 사용자인지, 관리자 권한이 있는지, 신고
              대기 건수가 몇 건인지를 확인하는 로직이 추상화 없이 그대로
              노출되어 있습니다. 그래서 <code>user</code>,{" "}
              <code>userRow?.role</code>, <code>count</code>과 같은 변수와 값을
              모두 읽어야만 이 코드가 무슨 역할을 하는지 알 수 있었습니다.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              이 코드와 더불어서 실제로 레이아웃을 렌더링하는 JSX까지 같은 함수
              안에 이어지는데, 읽는 사람이 <code>AdminLayout</code>이 무슨
              역할을 하는지 한 번에 이해하기 위해서 파악해야 하는 맥락이
              많았습니다.
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
              렌더링보다 먼저 실행되도록 구조적으로 강제&rdquo;할 수 있다는
              장점이 있다고 설명했고, fail-fast가 보장되지 않을 수 있다는 문제를
              근거로 HOC 방식을 권장했습니다.
            </p>
            <p className="mt-2 text-sm font-medium text-foreground px-4">
              내가 선택한 방식과 이유
            </p>
            <p className="text-sm text-muted-foreground px-4">
              Wrapper(<code>AdminGuard</code>)를 선택했습니다. AI가 우려한
              fail-fast 문제는 사실 &ldquo;검증 로직이 렌더링 대상의 부모 위치에
              있는가&rdquo;만 지키면 되고, 이는 HOC냐 Wrapper냐와 무관하게
              동일하게 만족됩니다. 반면 HOC는 감싸는 지점이{" "}
              <code>export default withAdminGuard(AdminLayout)</code>처럼
              export문 쪽에 있어서, JSX 렌더 트리만 봐서는 어디까지 보호되는
              범위인지 보이지 않습니다. fail-fast 문제가 해소된 이상, 한눈에
              보기 불편한 HOC를 쓸 이유가 없었습니다.
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
          </div>
        </CollapsibleSection>
      </section>
      <section className="flex flex-col gap-6 px-2 mt-4">
        <CollapsibleSection title="이름으로 동작 예측">
          <aside className="rounded-lg border bg-muted/50 p-4 text-sm text-muted-foreground">
            💬 책임에 따라 함수의 이름이 정해지지만 때론 다양한 내용들을
            포함했다는 것을 표시해야할 때도 있습니다. <br /> 그럴때 더 포괄적인
            이름을 지어주기 위해서 고민한 내용입니다.
          </aside>
          <div className="flex flex-col gap-2">
            <div className="px-2">
              <h3 className="font-medium text-foreground">문제 상황</h3>
              <p className="text-sm text-muted-foreground px-4">
                <Link
                  href="/fundamentals/readability"
                  className="text-foreground underline underline-offset-2 hover:no-underline"
                >
                  가독성
                </Link>
                에 이어서 인증 검증을 관리하는 AdminGuard와 관리자 페이지의
                Aside와 main 영역을 담당하는 컴포넌트를 분리하는데 적절한 이름을
                지어주고 싶었습니다.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 px-2">
            <div>
              <h3 className="font-medium text-foreground">AI가 권장한 방식</h3>
              <CodeBlock
                lang="tsx"
                code={`// AdminSidebarContainer.tsx
  export default async function AdminSidebarContainer() {
    const admin = createAdminClient();
    const { count } = await admin
      .from(REPORTS_TABLE)
      .select("*", { count: "exact", head: true })
      .eq("status", REPORT_STATUS.PENDING);
  
    return <AdminSidebar pendingCount={count ?? 0} />;
  }`}
              />
              <p className="text-sm text-muted-foreground mt-2 px-2">
                신고 대기 건수 조회를 별도 컴포넌트로 분리해 layout.tsx는 이를
                렌더링 하도록 제안했습니다. 결과적으로 layout.tsx에선
                AsideContainer 하위에서 모든 관리자 페이지의 하위 항목들이 자식
                요소로 들어오는 형태가 되었습니다.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-foreground">
                내가 선택한 방식과 이유
              </h3>
              <p className="text-sm text-muted-foreground px-2">
                AI가 제안한 방식은 Container 하나에서 신고 대기 건수 조회 로직과
                모든 관리자 페이지의 UI 렌더링을 함께 담당하고 있었고, AI가 말한
                Container라는 네이밍과는 어울리지 않다고 판단했습니다.
                <br />
                <br />
                관리자의 하위 컴포넌트와 Aside 로직과 그에 따른 데이터 조회
                함수를 모두 포함하기에 알맞다고 생각한 내용은 Shell이라는
                이름이었습니다. Container보다 Shell이 보다 넓은 영역을 포함하는
                골격에 해당되기 때문에 선택한 이름이며, 읽는 사람에게 있어서도
                골격을 의미하는 컴포넌트구나 라는 생각이 들 수 있도록
                고민했습니다.
              </p>
              <CodeBlock
                lang="tsx"
                code={`// After: (admin)/layout.tsx
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <AdminShell>{children}</AdminShell>
    </AdminGuard>
    );
}`}
              />
              <CodeBlock
                lang="tsx"
                code={`// After: (admin)/_components/AdminShell.tsx
export default async function AdminShell({ children }: { children: React.ReactNode }) {
  const admin = createAdminClient();
  const { count } = await admin
    .from(REPORTS_TABLE)
    .select("*", { count: "exact", head: true })
    .eq("status", REPORT_STATUS.PENDING);

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

          <div className="flex flex-col gap-2 px-2">
            <h3 className="font-medium text-foreground">결과</h3>
            <p className="text-sm text-muted-foreground px-4">
              layout.tsx는 이제 AdminGuard와 AdminShell을 조합하는 코드만 남아
              layout이라는 이름에 걸맞게 프로젝트 전반의 큰 구조를 시각적으로
              확인할 수 있도록 가독성이 눈에 띄게 증가했습니다.
              <br />
              <br />
              Shell이라는 이름을 활용함으로써 Aside와 관련된 로직뿐만 아니라
              함수 로직과 프로젝트의 전반적인 내용과 관련된 내용이 함유
              되어있다는것을 예측이 가능하도록 구현할 수 있었습니다.
            </p>
          </div>
        </CollapsibleSection>
      </section>
    </SectionStub>
  );
}
