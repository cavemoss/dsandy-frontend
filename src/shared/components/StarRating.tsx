import { Star } from 'lucide-react';

interface Params {
  rating: number;
  size?: 'sm' | 'lg';
  withLabel?: true;
}

export default function StarRating({ rating, size = 'sm', withLabel }: Params) {
  const sizeToClass: { [K in typeof size]: string } = {
    ['sm']: 'h-4 w-4',
    ['lg']: 'h-5 w-5',
  };

  return (
    <div className="flex gap-1.5">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeToClass[size]} ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
      {withLabel && <span className="font-bold">{rating}</span>}
    </div>
  );
}
