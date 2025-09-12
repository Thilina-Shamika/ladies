"use client";

import { useEffect, useState } from 'react';

interface PopupApiResponseItem {
  acf?: {
    popup_image?: {
      url?: string;
      alt?: string;
      sizes?: Record<string, string>;
      width?: number;
      height?: number;
    };
    popup_image_link?: string;
  };
}

const POPUP_ENDPOINT =
  'https://kal.cse.mybluehost.me/wp-json/wp/v2/pop-up?per_page=1&_fields=acf';

export default function HomePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageAlt, setImageAlt] = useState<string>('');
  const [imageLink, setImageLink] = useState<string | null>(null);

  useEffect(() => {
    let timeoutId: number | undefined;

    const fetchPopup = async () => {
      try {
        const res = await fetch(POPUP_ENDPOINT, { cache: 'no-store' });
        if (!res.ok) return;
        const data: PopupApiResponseItem[] = await res.json();
        const item = data?.[0];
        const popup = item?.acf?.popup_image;
        const link = item?.acf?.popup_image_link || null;
        if (popup?.url) {
          // Prefer medium_large if present to avoid huge images
          const preferred =
            (popup as any).sizes?.medium_large || (popup as any).sizes?.large || popup.url;
          setImageUrl(preferred);
          setImageAlt(popup.alt || '');
          setImageLink(link);
          timeoutId = window.setTimeout(() => setIsOpen(true), 3000);
        }
      } catch (e) {
        // silent fail
      }
    };

    fetchPopup();

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  if (!isOpen || !imageUrl) return null;

  return (
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative max-h-[90vh] w-auto max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Close"
          className="absolute -right-3 -top-3 rounded-full bg-white px-2 py-1 text-sm shadow text-[#000000]"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>
        {imageLink ? (
          <a href={imageLink} target="_blank" rel="noopener noreferrer">
            <img
              src={imageUrl}
              alt={imageAlt}
              className="h-auto max-h-[85vh] w-full max-w-full rounded shadow-lg"
            />
          </a>
        ) : (
          <img
            src={imageUrl}
            alt={imageAlt}
            className="h-auto max-h-[85vh] w-full max-w-full rounded shadow-lg"
          />
        )}
      </div>
    </div>
  );
}


