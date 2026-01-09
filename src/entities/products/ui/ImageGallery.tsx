'use client';

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@shadcd/carousel';
import { useCallback, useEffect, useState } from 'react';

import { ImageWithFallback } from '@/shared/shadcd/figma/ImageWithFallback';

import { useProductsStore } from '../model';

interface Props {
  images: string[];
}

export function ProductImageGallery({ images }: Props) {
  const productsStore = useProductsStore();

  const [api, setApi] = useState<CarouselApi>();
  const imageIndex = useProductsStore((state) => state.products.current.imageIndex);

  const setImageIndex = (index: number) => {
    productsStore.setState((state) => {
      state.products.current.imageIndex = index;
    });
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

  return (
    <div className="flex relative">
      <div className="flex-1">
        <div className="relative">
          <Carousel setApi={setApi} className="w-full rounded-xl md:overflow-hidden">
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <ImageWithFallback
                    src={image}
                    className="w-full h-full aspect-square md:rounded-xl overflow-hidden object-cover brightness-95"
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
    </div>
  );
}
