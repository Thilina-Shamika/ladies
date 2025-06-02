import React from 'react';
import Image from 'next/image';

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

async function getClassroomData() {
  try {
    const res = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/pages?slug=in-the-classroom`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data && data.length > 0 ? data[0] : null;
  } catch {
    return null;
  }
}

export default async function InTheClassroomPage() {
  const pageData = await getClassroomData();
  const acf = pageData?.acf || {};
  return (
    <main className="pb-8">
      {/* Cover Section */}
      <section className="relative min-h-[35vh] flex items-center justify-center bg-gray-900">
        <div className="absolute inset-0 w-full h-full z-0">
          {acf.classroom_cover?.url && (
            <Image
              src={acf.classroom_cover.url}
              alt={acf.classroom_heading || 'In the Classroom'}
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
            {acf.classroom_sub_heading ?? 'IN THE CLASSROOM'}
          </div>
          <h1 className="text-3xl md:text-6xl text-white mb-8 drop-shadow-lg">
            {acf.classroom_heading ?? 'In the Classroom'}
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Left: Content Heading and Content Subheading */}
            <div>
              {acf.content_heading && (
                <h2 className="text-3xl md:text-5xl text-gray-900 mb-8">
                  {acf.content_heading}
                </h2>
              )}
              {acf.content_subheading && (
                <div className="text-lg md:text-lg text-[#9d0202] font-semibold mb-6 whitespace-pre-line">
                  {acf.content_subheading}
                </div>
              )}
            </div>
            {/* Right: Content */}
            <div>
              {acf.content && (
                <div className="prose max-w-none text-gray-700 text-base md:text-lg prose-p:mb-6 force-paragraph-space" dangerouslySetInnerHTML={{ __html: acf.content }} />
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 