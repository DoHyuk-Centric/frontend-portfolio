import Link from "next/link";

import { CodeBlock } from "@/components/code-block";
import { CollapsibleSection } from "@/components/collapsible-section";

export function MagicNumberSevenSection() {
  return (
    <CollapsibleSection title="매직넘버 7 기준으로 필드단위 책임분리">
      <aside className="rounded-lg border bg-muted/50 p-4 text-sm text-muted-foreground">
        💬 사람이 최대로 기억할 수 있는 맥락의 갯수를 정의한 조지 밀러의 7의
        법칙을 고려해 개선한 구인구직 폼입니다.
      </aside>

      <div className="flex flex-col gap-2">
        <div className="px-2">
          <h3 className="font-medium text-foreground">문제 상황</h3>
          <p className="text-sm text-muted-foreground px-4">
            팀원과 함께 구현한 구인구직 글쓰기 페이지에서 컴포넌트 하나에
            Props가 28개, 27개씩 차지해 코드가 매우 지저분하다는 문제가
            있었습니다.
            <br />
            <br />
            나아가 하위 컴포넌트를 세세하게 분리해서 넘기게 될 경우 오히려 Props
            Drilling이 발생 할 수 있는 문제가 있었습니다.
          </p>
          <CodeBlock
            lang="tsx"
            code={`// CreateJobFormPage1.tsx (Before)
interface CreateJobFormPageOneProps {
  title: string;
  setTitle: (v: string) => void;
  employeeType: EmployeeType | "";
  setEmployeeType: (v: EmployeeType | "") => void;
  salary: string;
  setSalary: (v: string) => void;
  // {급여 유형, 근무지, 마감일, 근무 시간·요일, 협의 가능 여부, 주요 업무, 우대 사항 등 나머지 22개 필드 props}
  handleNextStep: () => void;
}

export function CreateJobFormPageOne({ title, setTitle, employeeType, /* ...나머지 25개 */ handleNextStep }: CreateJobFormPageOneProps) {
  // {28개 필드를 이 컴포넌트 안에서 Input/Select/Checkbox로 전부 직접 렌더링}
}`}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 px-2">
        <h3 className="font-medium text-foreground">원칙과 기준</h3>
        <div className="text-sm text-muted-foreground px-4">
          SOLID 원칙중에 SOI와 사람은 한 번에 최대 7개 내외의 정보만 기억할 수
          있다고 말한 조지 밀러 7의 법칙을 근거로 삼아 리팩토링을 진행했습니다.
          <ul className="flex flex-col gap-4 my-4">
            <li>
              <h4 className="font-medium">SRP - 단일 책임 원칙</h4>
              <p className="px-2">
                <code>CreateJobFormPageOne</code>은 1단계 레이아웃이라는 이름과
                달리, 서로 무관한 필드들을 렌더링 하는 책임까지 함께 갖고
                있었습니다.
              </p>
            </li>
            <li>
              <h4 className="font-medium">OCP - 개방-폐쇄 원칙</h4>
              <p className="px-2">
                필드 그룹이 하나 늘어날 때마다 <code>CreateJobFormPageOne</code>
                의 Props 인터페이스와 렌더링 로직을 직접 수행해야 했습니다.
              </p>
            </li>
            <li>
              <h4 className="font-medium">ISP - 인터페이스 분리 원칙</h4>
              <p className="px-2">
                Props 인터페이스 하나에 성격이 다른 필드가 전부 몰려 있어,
                레이아웃 역할만 하면 되는 컴포넌트가 필드 데이터까지 함께
                의존해야 했습니다.
              </p>
            </li>
            <li>
              <h4 className="font-medium">조지 밀러의 7의 법칙</h4>
              <p className="px-2">각 필드를 Props를 7개 이하로 담아 구성</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-2 px-2">
        <h3 className="font-medium text-foreground">개선</h3>
        <p className="text-sm text-muted-foreground px-4">
          필드별로 책임을 나눌 수 있도록 했습니다.
          <br />
          <br />
          1단계 폼에선 기본 정보 / 근무 시간 / 근무 날짜 / 주요 업무 / 우대 사항
          / 급여 / 근무지 / 마감일 필드로 나눴으며, 2단계 폼에선 회사 로고 /
          회사 기본 정보 / 회사 규모 / 회사 위치 / 담당자 정보 / 사진으로
          나눴습니다.
          <br />
          <br />
          하지만 이렇게 필드를 분리하게 되자 import가 총 14줄로 매우 길어지게
          되어서 한눈에 보기가 어려워졌습니다. 폴더 기준으로 분리해 각 폴더마다
          barrel 파일을 추가해 import 하도록 배럴패턴을 채택했습니다.
        </p>
        <CodeBlock
          lang="tsx"
          code={`<div>
  {form.step === 1 && (
     <FormStepBoundary heading={t("form.jobInfo")} onSubmit={form.handleNextStep}>
        // { ... 기본 정보 / 근무 시간 / 근무 날짜 / 주요 업무 / 우대사항 / 급여 / 근무지 / 마감일 컴포넌트}
      </FormStepBoundary>
   )}

   {form.step === 2 && (
      <FormStepBoundary onSubmit={form.handleSubmit}>
        // { ... 회사 로고 / 회사 기본 정보 / 회사 규모 / 회사 위치 / 담당자 정보 / 사진 컴포넌트}
      </FormStepBoundary>
   )}
</div>`}
        />
      </div>

      <div className="flex flex-col gap-2 px-2">
        <h3 className="font-medium text-foreground">결과</h3>
        <p className="text-sm text-muted-foreground px-4">
          각 하위 컴포넌트가 책임에 맞도록 개선되었으며 맥락이 7개를 넘지 않도록
          개선되어 관리하는데에 있어서 용이하도록 개선되었습니다.
        </p>
        <h3 className="font-medium text-foreground mt-2">느낀점</h3>
        <p className="text-sm text-muted-foreground px-4">
          팀원의 방식을 존중하며 동시에 더 나은 방향으로 바꾸기 위해선
          고려해야할게 많았습니다.
          <br />
          그럴때일수록 명확한 근거를 기반으로 행동해야 한다고 생각했습니다.
          <br />
          <br />
          따라서 SOLID 방식과 조지 밀러의 7가지 법칙 등과 같은 개념을 채택해
          해당 리팩토링 작업의 근거로 두었고, 코드를 읽기 좋게 만든다는 개념에서
          방향성을 잃지 않는 기준이 될 수 있었습니다.
        </p>
      </div>
    </CollapsibleSection>
  );
}
