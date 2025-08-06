'use client';

import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/shared/shadcd/components/ui/button';
import { ImageWithFallback } from '@/shared/shadcd/figma/ImageWithFallback';

interface Props {
  images: string[];
}

export function ProductImageGallery({ images }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative group bg-gray-50 rounded-lg overflow-hidden aspect-square">
        <ImageWithFallback
          src={images[selectedImage]}
          alt={`Image ${selectedImage + 1}`}
          className="w-full h-full object-cover brightness-95"
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="sm"
              className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-sm"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-sm"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Zoom Icon */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white/80 backdrop-blur-sm rounded-full p-2">
            <ZoomIn className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`flex-shrink-0 rounded-md overflow-hidden border-2 transition-colors ${
                selectedImage === index ? 'border-primary' : 'border-transparent'
              }`}
            >
              <ImageWithFallback
                src={image}
                alt={`thumbnail ${index + 1}`}
                className="w-16 h-16 object-cover brightness-95"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
