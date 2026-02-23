import { useCallback } from 'preact/hooks';
import Accordion from '../ui/Accordion';
import { trackEvent } from '../../lib/analytics';

interface FaqAccordionIslandProps {
  items: { title: string; content: string }[];
}

export default function FaqAccordionIsland({ items }: FaqAccordionIslandProps) {
  const handleExpand = useCallback(
    (index: number) => {
      trackEvent({
        name: 'faq_expanded',
        params: {
          question_text: items[index].title.slice(0, 100),
          question_index: index,
        },
      });
    },
    [items],
  );

  return <Accordion items={items} onExpand={handleExpand} />;
}
