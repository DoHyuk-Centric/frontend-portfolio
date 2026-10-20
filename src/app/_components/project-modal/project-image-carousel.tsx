"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export type CarouselImage = {
  src?: string;
  alt: string;
  /** Set to "video" to render `src` as a playable video instead of an image. */
  kind?: "image" | "video";
  /** Still frame shown before a video slide starts playing. */
  poster?: string;
};

// ==================== 슬라이드 전환: 화면에서 벗어난 영상 정지하기 ====================

function pauseHiddenVideos(api: NonNullable<CarouselApi>) {
  const selectedIndex = api.selectedScrollSnap();
  api.slideNodes().forEach((slide, index) => {
    if (index === selectedIndex) return;
    slide.querySelectorAll("video").forEach((video) => video.pause());
  });
}

// ==================== 슬라이드 렌더링: 이미지·영상·빈 자리 그리기 ====================

function CarouselSlide({
  image,
  aspectRatio,
}: {
  image: CarouselImage;
  aspectRatio: string;
}) {
  if (!image.src) {
    return (
      <div
        style={{ aspectRatio }}
        className="flex w-full flex-col items-center justify-center gap-2 rounded-lg bg-muted text-muted-foreground"
      >
        <ImageIcon className="size-8" />
        <span className="text-xs">{image.alt}</span>
      </div>
    );
  }

  if (image.kind === "video") {
    return (
      <video
        src={image.src}
        poster={image.poster}
        aria-label={image.alt}
        controls
        playsInline
        preload="metadata"
        style={{ aspectRatio }}
        className="w-full rounded-lg bg-black object-contain"
      />
    );
  }

  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={2560}
      height={1600}
      style={{ aspectRatio }}
      className="w-full rounded-lg object-cover"
    />
  );
}

export function ProjectImageCarousel({
  images,
  aspectRatio = "2560/1600",
}: {
  images: CarouselImage[];
  /** CSS aspect-ratio value for each slide, e.g. "1920/1080". */
  aspectRatio?: string;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
      pauseHiddenVideos(api);
    });
  }, [api]);

  return (
    <>
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <CarouselSlide image={image} aspectRatio={aspectRatio} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious className="left-2 cursor-pointer" />
            <CarouselNext className="right-2 cursor-pointer" />
          </>
        )}
      </Carousel>

      {images.length > 1 && (
        <div className="mt-2 flex items-center justify-center gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`${index + 1}번째 슬라이드로 이동`}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "size-1.5 rounded-full transition-colors cursor-pointer",
                index === current ? "bg-foreground" : "bg-accent-foreground/20",
              )}
            ></button>
          ))}
        </div>
      )}
    </>
  );
}
