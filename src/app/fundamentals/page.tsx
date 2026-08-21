import { SectionStub } from "@/components/section-stub";
import ListSection from "@/app/fundamentals/_components/list-section";

export default function FundamentalsPage() {
  return (
    <SectionStub title="Fundamentals">
      <div>
        <h2 className="text-2xl pl-2 font-semibold text-gray-700">목차</h2>
        <p className="pl-2 mt-2 text-gray-500">
          좋은 코드란 유지보수가 용이하며 안정성이 높은 코드라고 배웠고, 4가지 기준을 세워 코드를 개선했습니다.
        </p>
        <ul className="mt-8 ml-8 flex flex-col gap-3">
          <ListSection
            title={"가독성"}
            href="/fundamentals/readability"
            content={["코드 맥락 최소화", "코드 읽힘 순서"]}
          />
          <ListSection
            title={"예측 가능성"}
            href="/fundamentals/predictability"
            content={["이름으로 동작 예측"]}
          />
          <ListSection
            title={"응집도"}
            href="/fundamentals/cohesion"
            content={["폴더 분류", "필드 단위 vs 폼 전체 단위"]}
          />
          <ListSection
            title={"결합도"}
            href="/fundamentals/coupling"
            content={["매직넘버 7 기준으로 필드단위 책임분리"]}
          />
        </ul>
      </div>
    </SectionStub>
  );
}
