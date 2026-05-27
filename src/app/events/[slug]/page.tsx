import React from 'react';
import ForceNativeImage from '@/components/ui/ForceNativeImage';
import { notFound } from 'next/navigation';

interface EventData {
  id: number;
  title: { rendered: string };
  acf: {
    event_name?: string | null;
    event_start_date?: string | null;
    event_start_time?: string | null;
    event_end_date?: string | null;
    event_end_time?: string | null;
    event_location?: string | null;
    event_description?: string | null;
    event_image?: { url: string; alt?: string };
  };
}

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

function safeText(value: string | null | undefined) {
  return typeof value === 'string' ? value : '';
}

async function getEventBySlug(slug: string): Promise<EventData | null> {
  const res = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/event?slug=${slug}&acf_format=standard`);
  const data = await res.json();
  if (!data || !Array.isArray(data) || data.length === 0) return null;
  return data[0];
}

export default async function EventPage({ params }: { params: { slug: string } }) {
  const event = await getEventBySlug(params.slug);
  if (!event) return notFound();
  const acf = event.acf;
  const eventName = safeText(acf.event_name).trim() || 'Untitled Event';

  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl md:text-5xl mb-6 text-[#9d0202]">{eventName}</h1>
      {acf.event_image?.url && (
        <div className="mb-8 w-full rounded-xl overflow-hidden shadow-lg bg-white flex items-center justify-center">
          <ForceNativeImage
            src={acf.event_image.url}
            alt={acf.event_image.alt || eventName}
            className="w-full object-contain object-center"
            style={{ maxHeight: 600 }}
            loading="eager"
          />
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-6 mb-6 text-gray-700">
        <div>
          <div className="font-semibold">Date & Time:</div>
          <div>
            {safeText(acf.event_start_date)} {acf.event_start_time && `| ${acf.event_start_time}`}
            {acf.event_end_date && (
              <>
                {' '} - {acf.event_end_date} {acf.event_end_time && `| ${acf.event_end_time}`}
              </>
            )}
          </div>
        </div>
        {acf.event_location && (
          <div>
            <div className="font-semibold">Location:</div>
            <div>{acf.event_location}</div>
          </div>
        )}
      </div>
      <div className="prose max-w-none text-gray-800" dangerouslySetInnerHTML={{ __html: safeText(acf.event_description) }} />
    </main>
  );
} 