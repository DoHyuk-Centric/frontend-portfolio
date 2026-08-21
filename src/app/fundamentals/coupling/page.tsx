import { SectionStub } from "@/components/section-stub";

import { MagicNumberSevenSection } from "./_components/magic-number-seven-section";

export default function CouplingPage() {
  return (
    <SectionStub title="결합도">
      <section className="flex flex-col gap-6 px-2">
        <MagicNumberSevenSection />
      </section>
    </SectionStub>
  );
}
