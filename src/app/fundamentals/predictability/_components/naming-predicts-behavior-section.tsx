import Link from "next/link";

import { CodeBlock } from "@/components/code-block";
import { CollapsibleSection } from "@/components/collapsible-section";

export function NamingPredictsBehaviorSection() {
  return (
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
  );
}
