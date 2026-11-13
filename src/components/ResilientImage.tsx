import { useState } from 'react';
import { Wheat } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ResilientImage({ src, alt, className = '', fallbackTitle }: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#f1ede7] to-[#e6e2dc] text-[#584237] p-4 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Wheat className="w-7 h-7 mb-2 text-[#556b2f]" />
        {fallbackTitle && (
          <span className="font-serif text-sm font-medium text-[#3e4e38] line-clamp-2">
            {fallbackTitle}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
