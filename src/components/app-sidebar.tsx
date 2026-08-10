"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, FolderKanban, ListTodo } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Resume", url: "/resume", icon: FileText },
  { title: "Portfolio", url: "/portfolio", icon: FolderKanban },
  { title: "Task", url: "/task", icon: ListTodo },
];

export function AppSidebar() {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const activeItem =
    navItems.find((item) =>
      item.url === "/" ? pathname === "/" : pathname.startsWith(item.url)
    ) ?? navItems[0];

  if (isMobile) {
    return (
      <nav className="fixed inset-x-0 bottom-0 z-40 flex h-16 items-center justify-around border-t bg-sidebar">
        {navItems.map((item) => {
          const isActive = activeItem.title === item.title;

          return (
            <Link
              key={item.title}
              href={item.url}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs font-medium",
                isActive
                  ? "text-sidebar-primary"
                  : "text-sidebar-foreground/60"
              )}
            >
              <item.icon className="size-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
    >
      {/* Icon rail */}
      <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="md:h-8 md:p-0"
                render={<Link href="/" />}
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground">
                  P
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="mt-16">
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu className="gap-6">
                {navItems.map((item) => {
                  const isActive = activeItem.title === item.title;

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        tooltip={{ children: item.title, hidden: false }}
                        isActive={isActive}
                        className="px-2.5 md:px-2"
                        render={<Link href={item.url} />}
                      >
                        <item.icon />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Content panel */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="border-b p-4">
          <span className="text-base font-medium text-foreground">
            {activeItem.title}
          </span>
        </SidebarHeader>
        <SidebarContent>
          <div className="flex flex-1 items-center justify-center p-4 text-sm text-muted-foreground">
            Coming soon
          </div>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
