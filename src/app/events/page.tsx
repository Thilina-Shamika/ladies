import React from 'react';
import EventsCalendarAndList from '@/components/events/EventsCalendarAndList';
import ForceNativeImage from '@/components/ui/ForceNativeImage';
import { getPage } from '@/lib/wordpress';

interface EventsACF {
  events_cover?: {
    url: string;
    alt: string;
  };
  events_heading?: string;
  events_subheading?: string;
}

export default async function EventsPage() {
  const eventsPageData = await getPage('events');
  const acf = (eventsPageData?.acf || {}) as EventsACF;
  return (
    <main className="pb-8">
      {/* Cover Section */}
      <section className="relative min-h-[35vh] flex items-center justify-center bg-gray-900">
        <div className="absolute inset-0 w-full h-full z-0">
          {acf.events_cover?.url && (
            <ForceNativeImage
              src={acf.events_cover.url}
              alt={acf.events_heading || 'Events'}
              className="object-cover object-center w-full h-full"
              style={{ position: 'absolute', inset: 0 }}
              fill
              priority
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