import { useState, useEffect, useRef } from 'preact/hooks';

interface PromptPreviewProps {
  promptText: string;
  responseText: string;
  isActive: boolean;
}

export default function PromptPreview({ promptText, responseText, isActive }: PromptPreviewProps) {
  const [displayedPrompt, setDisplayedPrompt] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  }, []);

  useEffect(() => {
    if (!isActive) {
      setDisplayedPrompt('');
      setShowResponse(false);
      setIsTyping(false);
      return;
    }

    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion.current) {
      setDisplayedPrompt(promptText);
      setShowResponse(true);
      return;
    }

    setIsTyping(true);
    setShowResponse(false);
    setDisplayedPrompt('');

    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex < promptText.length) {
        setDisplayedPrompt(promptText.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval as unknown as number);
        setIsTyping(false);
        // Show response after typing completes
        setTimeout(() => setShowResponse(true), 300);
      }
    }, 50);

    return () => clearInterval(typeInterval as unknown as number);
  }, [isActive, promptText]);

  return (
    <div class="bg-[#0d1117] border border-card-border/30 rounded-xl overflow-hidden font-mono text-sm">
      {/* Terminal chrome */}
      <div class="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-card-border/30">
        <span class="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span class="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span class="w-3 h-3 rounded-full bg-[#28c840]" />
        <span class="ml-2 text-text-muted text-xs">ChatGPT / Claude</span>
      </div>

      {/* Terminal body */}
      <div class="p-4 space-y-4 min-h-[200px]">
        {/* Prompt */}
        <div>
          <span class="text-success">{'> '}</span>
          <span class="text-text-primary">
            {displayedPrompt}
            {isTyping && <span class="animate-pulse">▊</span>}
          </span>
        </div>

        {/* Response */}
        {showResponse && (
          <div class="text-text-secondary animate-fade-in border-l-2 border-accent/30 pl-3">
            {responseText}
          </div>
        )}
      </div>
    </div>
  );
}
