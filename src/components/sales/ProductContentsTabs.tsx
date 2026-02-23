import { useState } from 'preact/hooks';
import type { PromptCategory } from '../../data/prompt-categories';

interface ProductContentsTabsProps {
  categories: PromptCategory[];
}

export default function ProductContentsTabs({ categories }: ProductContentsTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      {/* Tab buttons */}
      <div class="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((cat, index) => (
          <button
            key={cat.id}
            type="button"
            class={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer ${
              activeTab === index
                ? 'bg-primary text-white'
                : 'bg-card/50 text-text-secondary hover:text-text-primary hover:bg-card'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {cat.name}
            <span class={`ml-2 text-xs ${activeTab === index ? 'text-white/80' : 'text-text-muted'}`}>
              ({cat.count})
            </span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      {categories.map((cat, index) => (
        <div
          key={cat.id}
          class={activeTab === index ? 'block' : 'hidden'}
        >
          <div class="grid sm:grid-cols-2 gap-4">
            {cat.subcategories.map((sub) => (
              <div class="bg-card/30 border border-card-border/20 rounded-xl p-5">
                <h4 class="font-semibold text-text-primary mb-3">{sub.name}</h4>
                <ul class="space-y-2">
                  {sub.samplePrompts.map((prompt) => (
                    <li class="flex gap-2 items-start text-sm text-text-secondary">
                      <span class="text-primary-light flex-shrink-0 mt-0.5">{'>'}</span>
                      {prompt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
