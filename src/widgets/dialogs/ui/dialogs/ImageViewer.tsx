'use client';

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@shadcd/carousel';
import { useCallback, useEffect, useState } from 'react';

import { ImageWithFallback } from '@/shared/shadcd/figma/ImageWithFallback';

import { DialogEnum, useDialogsStore } from '../..';

export default function ImageViewer() {
  const dialogsStore = useDialogsStore();

  const isOpen = useDialogsStore((state) => state[DialogEnum.IMAGE_VIEWER]);
  const images = useDialogsStore((state) => state.imageViewerData.images);
  const imageIndex = useDialogsStore((state) => state.imageViewerData.index);

  const [api, setApi] = useState<CarouselApi>();

  const setImageIndex = (index: number) => {
    dialogsStore.setState((state) => (state.imageViewerData.index = index));
  };

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api],
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
    <div className="fixed bg-black/60 inset-0 flex z-100" onClick={() => dialogsStore.useImageViewer()}>
      <div className="m-auto w-full flex flex-col items-center transition-opacity">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <ImageWithFallback
                  src={image}
                  className="h-[80vh] w-auto mx-auto rounded-xl overflow-hidden  brightness-95"
                  bgClass="bg-neutral-800/30"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="absolute bottom-4 bg-foreground/80 text-primary-foreground px-3 py-1.5 rounded-full text-sm font-medium">
          {imageIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}
