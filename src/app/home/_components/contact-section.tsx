"use client";

import type { SVGProps } from "react";
import Link from "next/link";
import { ExternalLink, Mail } from "lucide-react";

import { fraunces } from "@/lib/fonts";
import { Button } from "@/components/ui/button";

import styles from "./home.module.css";
import { homeColors } from "./theme";

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.28 5.69.42.36.78 1.08.78 2.18 0 1.58-.01 2.85-.01 3.24 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5Z" />
    </svg>
  );
}

const links = [
  {
    label: "GitHub",
    href: "https://github.com/DoHyuk-Centric",
    icon: GithubIcon,
  },
  {
    label: "Email",
    href: "mailto:clzlsdlwhgdk12@gmail.com",
    icon: Mail,
  },
  {
    label: "Blog",
    href: "https://dohyuk.dev/",
    icon: ExternalLink,
  },
];

export function ContactSection() {
  return (
    <section
      id="contact"
      className={`flex min-h-screen w-full snap-start flex-col items-center justify-center gap-6 px-6 text-center ${styles.section4}`}
    >
      <h2
        className={`${fraunces.className} text-3xl font-semibold tracking-tight sm:text-4xl`}
        style={{ color: homeColors.ink }}
      >
        Contact
      </h2>
      <p style={{ color: homeColors.inkMuted }}>편하게 연락 주세요.</p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {links.map(({ label, href, icon: Icon }) => (
          <Button
            key={label}
            variant="outline"
            size="lg"
            nativeButton={false}
            className="border-none transition-opacity hover:opacity-80"
            style={{
              backgroundColor: homeColors.chipBg,
              borderColor: homeColors.chipBorder,
              color: homeColors.ink,
            }}
            render={
              <Link
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  href.startsWith("mailto:")
                    ? undefined
                    : "noopener noreferrer"
                }
              />
            }
          >
            <Icon className="size-4" />
            {label}
          </Button>
        ))}
      </div>
    </section>
  );
}
