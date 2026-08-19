import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 px-4">
      <Link href="/" className="flex items-center gap-2">
        <div className="flex aspect-square size-6 items-center justify-center rounded-lg bg-sidebar-primary text-xs font-semibold text-sidebar-primary-foreground">
          P
        </div>
        <span className="text-sm font-medium text-muted-foreground">
          도혁&rsquo;s 포트폴리오
        </span>
      </Link>
    </header>
  );
}
