import Link from "next/link";

import { CodeBlock } from "@/components/code-block";
import { CollapsibleSection } from "@/components/collapsible-section";

export function FolderClassificationSection() {
  return (
    <CollapsibleSection title="폴더 분류">
      <aside className="rounded-lg border bg-muted/50 p-4 text-sm text-muted-foreground">
        💬 컴포넌트와 훅이 서로 다른 폴더에 나뉘어 있어 하나의 도메인을
        수정할 때 폴더를 오가야 했던 문제를, FSD 레이어 구조에서 영감을 받아
        도메인 기준 폴더로 통합해 해결했습니다.
      </aside>

      <div className="flex flex-col gap-2">
        <div className="px-2">
          <h3 className="font-medium text-foreground">문제 상황</h3>
          <p className="text-sm text-muted-foreground px-4">
            관리자 관리 페이지는 어드민 목록 탭, 어드민 추가 탭, 팀 관리 탭
            컴포넌트가 _components 폴더에 나열되어 있었고, 각 탭의
            상태·뮤테이션 로직을 담은 훅은 _hooks 폴더에 별도로 타입
            기준으로만 모여 있었습니다.
          </p>
          <CodeBlock
            lang="md"
            code={`permissions/
├── _components/
│   ├── AdminListTab.tsx
│   ├── CreateAdminTab.tsx
│   ├── TeamsTab.tsx
│   └── constants.ts
└── _hooks/
    ├── useAdminListTab.ts
    ├── useCreateAdminForm.ts
    ├── useTeamDetailView.ts
    ├── useTeamListView.ts
    ├── useTeamSearch.ts
    └── useUserSearch.ts`}
          />
          <p className="text-sm text-muted-foreground px-4 mt-2">
            이러한 폴더 구조 때문에 CreateAdminTab.tsx 파일은 자신이
            사용하는 훅을 참조하기 위해 상위 폴더를 두 번씩 거슬러 올라가야
            하며, 동시에 파일별로 명확하게 어떤 도메인이 메인인지 코드와
            이름을 연관 지어야만 확인이 가능한 형태였습니다.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 px-2">
        <h3 className="font-medium text-foreground">원칙과 기준</h3>
        <p className="text-sm text-muted-foreground px-4">
          함께 수정될 가능성이 높은 파일(컴포넌트와 훅)을 한데 모으기
          위해서, FSD(Feature-Sliced Design)의 레이어 구조에서 영감을 받아
          도메인 기준으로 분리하는 방식을 기준으로 삼았습니다.
          <br />
          <br />
          참고 링크:{" "}
          <Link
            className="text-blue-500"
            href="https://feature-sliced.design/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Feature-Sliced Design
          </Link>
        </p>
      </div>

      <div className="flex flex-col gap-2 px-2">
        <h3 className="font-medium text-foreground">개선</h3>
        <p className="text-sm text-muted-foreground px-4">
          각각의 도메인에 맞게 관련된 훅과 컴포넌트만을 담는 폴더를 나눠주는
          방식으로 개선했습니다.
        </p>
        <CodeBlock
          lang="md"
          code={`permissions/
└── _components/
    ├── PermissionsClient.tsx
    ├── constants.ts
    ├── list/
    │   ├── AdminListTab.tsx
    │   └── useAdminListTab.ts
    ├── create/
    │   ├── CreateAdminTab.tsx
    │   ├── useCreateAdminForm.ts
    │   ├── useTeamSearch.ts
    │   └── useUserSearch.ts
    └── teams/
        ├── TeamsTab.tsx
        ├── TeamListView.tsx
        ├── TeamDetailView.tsx
        ├── useTeamListView.ts
        └── useTeamDetailView.ts`}
        />
      </div>

      <div className="flex flex-col gap-2 px-2">
        <h3 className="font-medium text-foreground">결과</h3>
        <p className="text-sm text-muted-foreground px-4">
          한 도메인을 수정할 때 필요한 파일이 폴더 하나 안에 모여,
          컴포넌트와 훅을 오가며 찾을 필요가 없어졌습니다.
          <br />
          <br />
          코드를 유지보수 할 때 참조하는 경로가 간단해 도메인별로 보다
          손쉽게 유지보수 관리하기에 용이한 형태로 개선되었습니다.
        </p>
        <h3 className="font-medium text-foreground mt-2">느낀점</h3>
        <p className="text-sm text-muted-foreground px-4">
          코드 레벨에서 응집도, 결합도, 예측 가능성, 가독성의 측면에서
          고려한 방식을 선대에서 고민한 방식들을 다시 한번 대단함을 느낄 수
          있었습니다.
          <br />
          <br />
          AI가 코드를 대신 작성해주는 시대가 오고 있지만 결국 코드는 사람이
          결정해야하기 때문에 유지보수를 위해서 구조에 대한 고민은 멈추지
          않아야겠다는 생각을 할 수 있었습니다.
        </p>
      </div>
    </CollapsibleSection>
  );
}
