import { SectionStub } from "@/components/section-stub";

import { CodeContextSection } from "./_components/code-context-section";
import { ReadingOrderSection } from "./_components/reading-order-section";

export default async function ReadabilityPage() {
  return (
    <SectionStub title="가독성">
      <section className="flex flex-col gap-6 px-2">
        <CodeContextSection />
      </section>
      <section className="flex flex-col gap-6 px-2 mt-4">
        <ReadingOrderSection />
      </section>
    </SectionStub>
  );
}
