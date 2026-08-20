import { SectionStub } from "@/components/section-stub";

import { NamingPredictsBehaviorSection } from "./_components/naming-predicts-behavior-section";
import { ReturnTypeConsistencySection } from "./_components/return-type-consistency-section";

export default function PredictabilityPage() {
  return (
    <SectionStub title="예측 가능성">
      <section className="flex flex-col gap-6 px-2">
        <ReturnTypeConsistencySection />
      </section>
      <section className="flex flex-col gap-6 px-2 mt-4">
        <NamingPredictsBehaviorSection />
      </section>
    </SectionStub>
  );
}
