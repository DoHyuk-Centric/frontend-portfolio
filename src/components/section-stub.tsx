export function SectionStub({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      {children ?? (
        <p className="text-sm text-muted-foreground">작성 중입니다.</p>
      )}
    </div>
  );
}
