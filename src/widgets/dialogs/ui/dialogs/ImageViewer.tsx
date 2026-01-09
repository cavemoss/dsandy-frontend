'use client';

import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@shadcd/carousel';
import { useCallback, useEffect, useState } from 'react';

import { ImageWithFallback } from '@/shared/shadcd/figma/ImageWithFallback';

import { DialogEnum, useDialogsStore } from '../..';

export default function ImageViewer() {
  const dialogsStore = useDialogsStore();

  const isOpen = useDialogsStore((state) => state[DialogEnum.IMAGE_VIEWER]);
  const images = useDialogsStore((state) => state.images);
  const imageIndex = useDialogsStore((state) => state.imageIndex);

  const [api, setApi] = useState<CarouselApi>();

  const setImageIndex = (index: number) => {
    dialogsStore.setState((state) => (state.imageIndex = index));
  };

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  useEffect(() => {
    if (!api) return;

    scrollTo(imageIndex);

    api.on('select', () => {
      setImageIndex(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    scrollTo(imageIndex);
  }, [imageIndex]);

  if (!isOpen) return <></>;
  return (
    <div className="fixed bg-black/60 inset-0 flex z-100" onClick={() => dialogsStore.viewImages()}>
      <div className="relative h-[80vh] aspect-square m-auto" onClick={(e) => e.stopPropagation()}>
        <Carousel setApi={setApi} className="h-[80vh] rounded-xl md:overflow-hidden">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <ImageWithFallback
                  src={image}
                  className="h-full mx-auto md:rounded-xl overflow-hidden object-cover brightness-95"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 bg-card/80 backdrop-blur-sm border-border hover:bg-card shadow-thumbnail" />
          <CarouselNext className="right-4 bg-card/80 backdrop-blur-sm border-border hover:bg-card shadow-thumbnail" />
        </Carousel>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-foreground/80 backdrop-blur-sm text-primary-foreground px-3 py-1.5 rounded-full text-sm font-medium tracking-wide">
          {imageIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}
