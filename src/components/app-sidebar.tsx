"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  FolderKanban,
  ListTodo,
  PanelLeftIcon,
} from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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

  const showContentPanel = activeItem.title === "Portfolio";

  if (isMobile) {
    return (
      <>
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

        {showContentPanel && (
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  size="icon"
                  className="fixed right-4 bottom-20 z-40 rounded-full shadow-lg"
                />
              }
            >
              <PanelLeftIcon />
              <span className="sr-only">{activeItem.title} 목록 열기</span>
            </SheetTrigger>
            <SheetContent side="bottom" className="max-h-[70vh]">
              <SheetHeader>
                <SheetTitle>{activeItem.title}</SheetTitle>
                <SheetDescription className="sr-only">
                  {activeItem.title} 목록
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-1 items-center justify-center p-4 text-sm text-muted-foreground">
                Coming soon
              </div>
            </SheetContent>
          </Sheet>
        )}
      </>
    );
  }

  return (
    <div
      className="contents"
      style={
        !showContentPanel
          ? ({
              "--sidebar-width": "var(--sidebar-width-icon)",
            } as CSSProperties)
          : undefined
      }
    >
      <Sidebar
        collapsible="icon"
        className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      >
        {/* Icon rail */}
        <Sidebar
          collapsible="none"
          className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
        >
          <SidebarContent className="mt-16">
            <SidebarGroup>
              <SidebarGroupContent className="px-1.5 lg:px-0">
                <SidebarMenu className="gap-6">
                  {navItems.map((item) => {
                    const isActive = activeItem.title === item.title;

                    return (
                      <SidebarMenuItem key={item.title}>
                        {isActive && (
                          <span className="absolute top-1/2 left-0 h-4 w-0.5 -translate-y-1/2 rounded-full bg-foreground" />
                        )}
                        <SidebarMenuButton
                          tooltip={{ children: item.title, hidden: false }}
                          isActive={isActive}
                          className="px-2.5 lg:px-2"
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
        {showContentPanel && (
          <Sidebar collapsible="none" className="hidden flex-1 lg:flex">
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
        )}
      </Sidebar>
    </div>
  );
}
