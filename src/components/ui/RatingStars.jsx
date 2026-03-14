import React from 'react';
import { Star } from 'lucide-react';

export function RatingStars({ rating, onRate, size = 20, max = 5, interactive = false }) {
  const stars = Array.from({ length: max }, (_, i) => i + 1);

  return (
    <div className="flex flex-col items-center gap-2">
      {interactive ? (
        <div className="flex justify-center gap-4">
          {stars.map(n => (
            <button 
              key={n} 
              type="button" 
              onClick={() => onRate(n)}
              className={`text-4xl transition-all duration-300 hover:scale-125 ${rating >= n ? 'grayscale-0' : 'grayscale brightness-150 opacity-40 hover:opacity-100'}`}
            >
              {n <= 2 ? '☹️' : n <= 3 ? '😐' : n <= 4 ? '🙂' : '🤩'}
            </button>
          ))}
        </div>
      ) : null}
      
      <div className="flex gap-1 text-amber-400">
        {stars.map(n => (
          <Star 
            key={n} 
            fill={rating >= n ? 'currentColor' : 'none'} 
            size={size} 
            className={`${interactive ? 'cursor-pointer hover:scale-110' : ''} transition-transform`}
            onClick={() => interactive && onRate(n)}
          />
        ))}
      </div>
    </div>
  );
}
