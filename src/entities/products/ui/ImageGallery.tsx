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
import { cn } from '@/shared/shadcd/lib/utils';

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
      {/* Thumbnail Strip - Left Side */}
      <div className="absolute flex flex-col gap-2 w-22 p-4 overflow-y-scroll h-full">
        {images.map((image, index) => (
          <div key={index}>
            <div
              onClick={() => scrollTo(index)}
              className={cn(
                'relative w-full aspect-square rounded-lg border-2 overflow-hidden transition-all',
                imageIndex === index ? 'border-primary ring-2 ring-primary ring-offset-2' : 'hover:border-primary'
              )}
              aria-label={`View ${index}`}
              aria-current={imageIndex === index ? 'true' : 'false'}
            >
              <ImageWithFallback src={image} className="w-full h-full object-cover" />

              {imageIndex === index && (
                <div className="absolute inset-0 ring-1 ring-inset ring-foreground/10 rounded-lg" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Main Image Carousel */}
      <div className="flex-1">
        <div className="relative ml-22">
          <Carousel setApi={setApi} className="w-full rounded-xl overflow-hidden">
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <ImageWithFallback
                    src={image}
                    className="w-full h-full aspect-square rounded-xl overflow-hidden object-cover brightness-95"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-card/80 backdrop-blur-sm border-border hover:bg-card shadow-thumbnail" />
            <CarouselNext className="right-4 bg-card/80 backdrop-blur-sm border-border hover:bg-card shadow-thumbnail" />
          </Carousel>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-foreground/80 backdrop-blur-sm text-primary-foreground px-3 py-1.5 rounded-full text-sm font-medium tracking-wide">
            {imageIndex + 1} / {images.length}
          </div>
        </div>
      </div>
    </div>
  );
}
