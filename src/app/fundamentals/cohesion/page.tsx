import { SectionStub } from "@/components/section-stub";

import { FieldVsFormUnitSection } from "./_components/field-vs-form-unit-section";
import { FolderClassificationSection } from "./_components/folder-classification-section";

export default function CohesionPage() {
  return (
    <SectionStub title="응집도">
      <section className="flex flex-col gap-6 px-2">
        <FolderClassificationSection />
      </section>
      <section className="flex flex-col gap-6 px-2 mt-4">
        <FieldVsFormUnitSection />
      </section>
    </SectionStub>
  );
}
