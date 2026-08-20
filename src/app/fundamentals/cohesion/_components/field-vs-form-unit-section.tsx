import { CollapsibleSection } from "@/components/collapsible-section";
import { CodeBlock } from "@/components/code-block";
import Link from "next/link";

export function FieldVsFormUnitSection() {
  return (
    <CollapsibleSection title="필드 단위 vs 폼 전체 단위">
      <aside className="rounded-lg border bg-muted/50 p-4 text-sm text-muted-foreground">
        💬 이메일 중복확인 처럼 필드 하나의 값에만 의존하는 검증은 폼 전체 제출
        시점이 아니라 그 필드 자신에게 맡기는게 응집도 관점에서 맞다고
        판단했습니다.
      </aside>

      <div className="flex flex-col gap-2">
        <div className="px-2">
          <h3 className="font-medium text-foreground">문제 상황</h3>
          <p className="text-sm text-muted-foreground px-4">
            회원가입 폼은 팀원이 작업한 코드중 하나입니다.
            <br />
            <br />
            이를 리팩토링 하는 과정에서 이메일 중복확인 방식이 가입하기 버튼을
            눌러야지만 이메일이 사용가능한지 아닌지를 판단 할 수 있도록 구현이
            되어져 있었습니다.
            <br />
            <br />
            다른 이름, 비밀번호, 비밀번호 확인 체크는 필드별로 체크를 하는
            반면에 이메일은 전체 폼을 기준으로 체크를하고 있었으며 이메일 에러
            메시지도 폼 전체에서 처리를 하는 방식이었습니다.
          </p>
          <CodeBlock
            lang="ts"
            code={`// page.tsx (변경 전) — 이메일 중복은 여기서만 걸러졌다
const { data, error } = await supabase.auth.signUp({ email, password, /* ... */ });

if (error) {
  if (error.code === "user_already_exists") {
    setErrorMessage(t("emailExists")); // 폼 전체 에러로 표시, 이메일 필드와 분리되어 있음
  } else {
    setErrorMessage(t("signupFailed"));
  }
  return;
}`}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 px-2">
        <h3 className="font-medium text-foreground">원칙과 기준</h3>
        <p className="text-sm text-muted-foreground px-4">
          참고한 기준은 토스에서 발행한{" "}
          <Link
            className="text-blue-500"
            href="https://frontend-fundamentals.com/code-quality/code/examples/form-fields.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            폼 응집도에 대한 글
          </Link>
          입니다.
          <br />
          <br />
          이 글은 &quot;함께 수정되어야 할 코드가 함께 수정되도록&quot; 만드는게
          응집도의 핵심이며, 필드가 독립적으로 검증될 수 있다면 필드 단위로,
          필드 간 의존성이 있다면(비밀번호 확인처럼) 폼 전체 단위로 관리하라고
          제안합니다.
          <br />
          <br />
          이메일 중복확인은 이메일 값 하나에만 의존할 뿐 다른 필드와 관계가
          없으므로, 필드 단위로 옮기는게 이 기준에 맞다고 판단했습니다.
        </p>
      </div>

      <div className="flex flex-col gap-2 px-2">
        <h3 className="font-medium text-foreground">개선</h3>
        <p className="text-sm text-muted-foreground px-4">
          제출하기 버튼을 눌러야 작동되던 이메일 검증 방식을 onBlur가 되었을때
          동직하도록 handler를 분리해 폼 방식으로 변경했습니다.
        </p>
        <CodeBlock
          lang="tsx"
          code={`const handleEmailBlur = async () => {
    if (!email) return;
    setTouched((p) => ({ ...p, email: true }));
    if (!emailValid) return;

    const checkedEmail = email;
    const exists = await checkEmailDuplication(checkedEmail);
    if (latestEmailRef.current !== checkedEmail) return;
    setEmailDuplication(exists);
  };`}
        />
        <CodeBlock
          lang="tsx"
          code={`<FormField
        id="email"
        ref={emailRef}
        type="email"
        icon={Mail}
        ariaLabel={t("email")}
        placeholder={t("emailPlaceholder")}
        value={email}
        onChange={(e) => { setEmail(e.target.value); setEmailDuplication(false); onClearError(); }}
        onBlur={handleEmailBlur}
        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); passwordRef.current?.focus(); } }}
        errorMessage={
          touched.email &&
          (!emailValid ? t("emailError") : emailDuplication && tSignup("emailExists"))
        }
      />`}
        />
      </div>

      <div className="flex flex-col gap-2 px-2">
        <h3 className="font-medium text-foreground">결과</h3>
        <p className="text-sm text-muted-foreground px-4">
          나머지 필드를 모두 다 채운 뒤에 가입하기 버튼까지 눌러야지만 알 수
          있던 이메일 중복을 사용자는 이메일 입력란에서 포커스를 옮기는 죽시
          중복 여부를 알 수 있게 되었습니다.
        </p>
        <h3 className="font-medium text-foreground mt-2">트레이드 오프</h3>
        <p className="text-sm text-muted-foreground px-4">
          폼 단위 검증에선 없던 비동기 상태 관리 비용이 생겼습니다.
          <br />
          <br />
          <ul className="flex flex-col gap-4">
            <li>
              <h4 className="font-bold">레이스 컨디션 방지</h4>
              <p className="px-2 mt-2">
                사용자가 이메일A를 입력한 값이 서버로부터 응답이 오기전에
                이메일B로 사용자가 바꾸는 경우에 이메일A에 대한 검증 결과를 받을
                수 있다는 단점이 있었습니다.
                <br />
                <br />
                이를 해결하기 위해서 현재 최신 이메일 값을 항상 저장해두고,
                응답이 도착하는 시점에서 현재값과 체크한 값이 같지 않다면
                데이터를 버리는 방식을 채택했습니다.
              </p>
            </li>
            <li>
              <h4 className="font-bold">검증 로직의 중복</h4>
              <p className="px-2 mt-2">
                필드 단위에서 이메일 인증을 완료하더라도 제출 단계에서 해당
                이메일이 가입될 수 있다는 가정이 있었습니다.
                <br />
                <br />
                때문에 폼단위에서 검증을 하지만 필드 단위에서 한번 더 검증을
                해야하는 상황이 생겼습니다.
              </p>
            </li>
          </ul>
        </p>
      </div>
    </CollapsibleSection>
  );
}
