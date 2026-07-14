"use client";

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

interface HorizontalCardRailProps {
  id: string;
  title: string;
  children: ReactNode;
  variant?: 'overlay' | 'surface';
  className?: string;
}

export default function HorizontalCardRail({
  id,
  title,
  children,
  variant = 'surface',
  className = '',
}: HorizontalCardRailProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(false);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    setCanScrollBack(track.scrollLeft > 4);
    setCanScrollForward(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateScrollState();
    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(track);

    return () => resizeObserver.disconnect();
  }, [children, updateScrollState]);

  const scroll = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    track.scrollBy({
      left: direction * Math.min(track.clientWidth * 0.85, 440),
      behavior: 'smooth',
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      scroll(-1);
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      scroll(1);
    }
  };

  const containerStyle = variant === 'overlay'
    ? 'border-white/25 bg-transparent'
    : 'border-white/10 bg-white/[0.025]';

  return (
    <section
      aria-labelledby={`${id}-heading`}
      className={`rounded-[1.75rem] border p-3 md:p-4 ${containerStyle} ${className}`}
    >
      <div className="mb-2 flex items-center justify-between gap-4 px-1 md:mb-3">
        <div className="min-w-0">
          <h2
            id={`${id}-heading`}
            className="text-sm font-semibold tracking-wide text-white drop-shadow-lg md:text-lg"
          >
            {title}
          </h2>
          <p className="mt-0.5 text-[0.68rem] text-white/65 md:text-xs">
            Swipe, use arrow keys, or select the controls
          </p>
        </div>

        <div className="flex flex-none gap-2">
          <button
            type="button"
            onClick={() => scroll(-1)}
            disabled={!canScrollBack}
            aria-label={`Scroll ${title} backward`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/15 text-white transition hover:border-white/60 hover:bg-black/30 disabled:cursor-default disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            disabled={!canScrollForward}
            aria-label={`Scroll ${title} forward`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/15 text-white transition hover:border-white/60 hover:bg-black/30 disabled:cursor-default disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        tabIndex={0}
        role="region"
        aria-label={`${title} carousel`}
        onScroll={updateScrollState}
        onKeyDown={handleKeyDown}
        className="horizontal-card-rail flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain rounded-2xl bg-transparent pb-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:gap-4"
      >
        {children}
      </div>
    </section>
  );
}
