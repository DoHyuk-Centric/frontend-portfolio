import { CollapsibleSection } from "@/components/collapsible-section";

export function ReadingOrderSection() {
  return (
    <CollapsibleSection title="코드 읽힘 순서">
      <aside className="rounded-lg border bg-muted/50 p-4 text-sm text-muted-foreground">
        💬 하나의 파일과 코드에서 너무 많은 맥락을 다루면 읽기 힘들어집니다.
        따라서 맥락을 줄이기 위해서 Wrapper 또는 HOC로 해결하곤 합니다.
      </aside>
      <div>공사중</div>
    </CollapsibleSection>
  );
}
