import { socialShareText } from '../../data/thank-you-data';
import { trackEvent } from '../../lib/analytics';

interface SocialShareButtonsProps {
  shareUrl: string;
}

export default function SocialShareButtons({ shareUrl }: SocialShareButtonsProps) {
  const encodedUrl = encodeURIComponent(shareUrl);

  const platforms = [
    {
      id: 'linkedin' as const,
      label: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'bg-[#0077B5]',
    },
    {
      id: 'twitter' as const,
      label: 'Twitter/X',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(socialShareText.twitter)}&url=${encodedUrl}`,
      color: 'bg-[#1DA1F2]',
    },
    {
      id: 'whatsapp' as const,
      label: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(socialShareText.whatsapp + ' ' + shareUrl)}`,
      color: 'bg-[#25D366]',
    },
  ];

  function handleClick(platform: 'linkedin' | 'twitter' | 'whatsapp') {
    trackEvent({
      name: 'social_share_clicked',
      params: { platform, page_path: '/gracias' },
    });
  }

  return (
    <div class="flex flex-wrap gap-3 justify-center">
      {platforms.map((p) => (
        <a
          key={p.id}
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          class={`${p.color} text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity`}
          onClick={() => handleClick(p.id)}
        >
          {p.label}
        </a>
      ))}
    </div>
  );
}
