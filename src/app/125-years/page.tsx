import React from 'react';
import Image from 'next/image';
import { getPage } from '@/lib/wordpress';
import EventsCalendarAndList from '@/components/events/EventsCalendarAndList';

interface YearsACF {
  subheading?: string;
  heading?: string;
  cover?: {
    url: string;
    alt: string;
  };
  years_logo?: {
    url: string;
    alt: string;
  };
  paragraph?: string;
  anthem?: string;
}

export default async function YearsPage() {
  const pageData = await getPage('125-years');
  const acf = (pageData?.acf || {}) as YearsACF;

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = acf.anthem ? getYouTubeId(acf.anthem) : null;

  return (
    <main className="pb-8">
      {/* Cover Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gray-900">
        <div className="absolute inset-0 w-full h-full z-0">
          {acf.cover?.url && (
            <Image
              src={acf.cover.url}
              alt={acf.cover.alt || acf.heading || '125 Years'}
              className="object-cover object-center w-full h-full"
              style={{ position: 'absolute', inset: 0 }}
              fill
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-12 w-full">
          <div className="text-white text-sm md:text-base font-semibold mb-4 tracking-widest uppercase drop-shadow">
            {acf.subheading ?? 'ABOUT US'}
          </div>
          <h1 className="text-4xl md:text-7xl text-white mb-8 drop-shadow-lg font-light">
            {acf.heading ?? '125 Years'}
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Logo */}
          {acf.years_logo?.url && (
            <div className="max-w-4xl mx-auto mb-16">
              <div className="flex justify-center">
                <Image
                  src={acf.years_logo.url}
                  alt={acf.years_logo.alt || '125 Years Logo'}
                  width={500}
                  height={500}
                  className="w-64 h-64 object-contain"
                />
              </div>
            </div>
          )}

          {/* Paragraph */}
          {acf.paragraph && (
            <div className="max-w-4xl mx-auto mb-16">
              <div
                className="prose max-w-none text-gray-700 text-sm md:text-sm prose-p:mb-8 prose-p:leading-relaxed [&_p]:mb-8"
                dangerouslySetInnerHTML={{ __html: acf.paragraph }}
              />
            </div>
          )}

          {/* Events Section */}
          <div className="max-w-7xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl text-[#9d0202] font-bold text-center mb-8">Upcoming Events</h2>
            <EventsCalendarAndList />
          </div>

          {/* Anthem Video */}
          {videoId && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl text-[#9d0202] text-center mb-8">125 Years Anthem</h2>
              <div className="relative w-full pt-[56.25%] rounded-xl overflow-hidden shadow-xl">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="125 Years Anthem"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
} 