export function UnderConstruction() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
      <span className="text-5xl">🚧</span>
      <h1 className="text-2xl font-semibold tracking-tight">Developing</h1>
      <p className="text-muted-foreground">
        This page is under construction. Please check back later.
      </p>
    </div>
  );
}
