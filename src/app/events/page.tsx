import React from 'react';
import EventsCalendarAndList from '@/components/events/EventsCalendarAndList';
import Image from 'next/image';

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

async function getEventsPageData() {
  try {
    const res = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/pages?slug=events`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data && data.length > 0 ? data[0] : null;
  } catch {
    return null;
  }
}

export default async function EventsPage() {
  const eventsPageData = await getEventsPageData();
  const acf = eventsPageData?.acf || {};
  return (
    <main className="pb-8">
      {/* Cover Section */}
      <section className="relative min-h-[35vh] flex items-center justify-center bg-gray-900">
        <div className="absolute inset-0 w-full h-full z-0">
          {acf.events_cover?.url && (
            <Image
              src={acf.events_cover.url}
              alt={acf.events_heading || 'Events'}
              className="object-cover object-center w-full h-full"
              style={{ position: 'absolute', inset: 0 }}
              width={1920}
              height={1080}
            />
          )}
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-8 w-full">
          <div className="text-white text-sm md:text-sm font-semibold mb-3 tracking-widest uppercase drop-shadow">
            {acf.events_subheading ?? ''}
          </div>
          <h1 className="text-3xl md:text-6xl text-white mb-8 drop-shadow-lg">
            {acf.events_heading ?? ''}
          </h1>
        </div>
      </section>
      <EventsCalendarAndList />
    </main>
  );
} 