import { useState, useEffect, useRef } from 'preact/hooks';
import PromptPreview from '../ui/PromptPreview';
import type { PromptExample } from '../../data/prompt-examples';

interface PromptShowcaseCarouselProps {
  examples: PromptExample[];
}

export default function PromptShowcaseCarousel({ examples }: PromptShowcaseCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-rotate every 8 seconds (enough time for typewriter + response)
  useEffect(() => {
    if (isPaused) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % examples.length);
    }, 8000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, examples.length]);

  function goTo(index: number) {
    setActiveIndex(index);
    setIsPaused(true);
    // Resume auto-rotate after 15s of inactivity
    setTimeout(() => setIsPaused(false), 15000);
  }

  return (
    <div>
      {/* Category label */}
      <div class="flex items-center gap-2 mb-4">
        <span class="text-sm text-text-muted">Categoría:</span>
        <span class="text-sm font-medium text-primary-light">
          {examples[activeIndex].category}
        </span>
        <span class="text-text-muted mx-2">|</span>
        <span class="text-sm text-text-secondary font-medium">
          {examples[activeIndex].title}
        </span>
      </div>

      {/* Terminal preview */}
      {examples.map((example, index) => (
        <div key={index} class={index === activeIndex ? 'block' : 'hidden'}>
          <PromptPreview
            promptText={example.promptText}
            responseText={example.responsePreview}
            isActive={index === activeIndex}
          />
        </div>
      ))}

      {/* Navigation dots */}
      <div class="flex justify-center gap-3 mt-6">
        {examples.map((_, index) => (
          <button
            key={index}
            type="button"
            class={`w-3 h-3 rounded-full transition-colors duration-200 cursor-pointer ${
              index === activeIndex ? 'bg-primary' : 'bg-card-border hover:bg-text-muted'
            }`}
            onClick={() => goTo(index)}
            aria-label={`Ver ejemplo ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
