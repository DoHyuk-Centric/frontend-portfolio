import { SectionStub } from "@/components/section-stub";

import { NamingPredictsBehaviorSection } from "./_components/naming-predicts-behavior-section";

export default function PredictabilityPage() {
  return (
    <SectionStub title="예측 가능성">
      <section className="flex flex-col gap-6 px-2">
        <NamingPredictsBehaviorSection />
      </section>
    </SectionStub>
  );
}
