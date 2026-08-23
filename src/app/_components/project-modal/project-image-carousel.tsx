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
};

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
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <>
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              {image.src ? (
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={2560}
                  height={1600}
                  style={{ aspectRatio }}
                  className="w-full rounded-lg object-cover"
                />
              ) : (
                <div
                  style={{ aspectRatio }}
                  className="flex w-full flex-col items-center justify-center gap-2 rounded-lg bg-muted text-muted-foreground"
                >
                  <ImageIcon className="size-8" />
                  <span className="text-xs">{image.alt}</span>
                </div>
              )}
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
              aria-label={`${index + 1}번째 이미지로 이동`}
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
