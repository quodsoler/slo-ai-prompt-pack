import { useState } from 'preact/hooks';

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  onExpand?: (index: number) => void;
}

export default function Accordion({ items, onExpand }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    const isOpening = openIndex !== index;
    setOpenIndex(isOpening ? index : null);
    if (isOpening && onExpand) {
      onExpand(index);
    }
  }

  return (
    <div class="divide-y divide-card-border/30">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const triggerId = `accordion-trigger-${index}`;
        const panelId = `accordion-panel-${index}`;
        return (
          <div key={index}>
            <button
              type="button"
              id={triggerId}
              class="w-full flex items-center justify-between py-5 px-1 text-left text-text-primary font-medium hover:text-primary-light transition-colors duration-200 cursor-pointer"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(index)}
            >
              <span class="pr-4">{item.title}</span>
              <svg
                class={`w-5 h-5 flex-shrink-0 text-text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              class={`overflow-hidden transition-all duration-200 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 pb-5' : 'max-h-0 opacity-0'}`}
            >
              <p class="text-text-secondary leading-relaxed px-1">{item.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
