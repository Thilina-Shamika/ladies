import React from 'react';
import Image from 'next/image';
import { getPage } from '@/lib/wordpress';

interface SchoolHymnACF {
  sub_heading?: string | null;
  heading?: string | null;
  cover?: {
    url: string;
    alt: string;
  } | null;
  school_hymn?: string | null;
  hymn_video?: string | null;
}

export default async function SchoolHymnPage() {
  const pageData = await getPage('school-hymn');
  const acf = (pageData?.acf || {}) as SchoolHymnACF;

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = acf.hymn_video ? getYouTubeId(acf.hymn_video) : null;

  return (
    <main className="pb-8">
      {/* Cover Section */}
      {acf.cover?.url && (
        <section className="relative min-h-[40vh] flex items-center justify-center bg-gray-900">
          <div className="absolute inset-0 w-full h-full z-0">
            <Image
              src={acf.cover.url}
              alt={acf.cover.alt || acf.heading || 'School Hymn'}
              className="object-cover object-center w-full h-full"
              style={{ position: 'absolute', inset: 0 }}
              fill
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-8 w-full">
            {acf.sub_heading && (
              <div className="text-white text-sm md:text-sm font-semibold mb-3 tracking-widest uppercase drop-shadow">
                {acf.sub_heading}
              </div>
            )}
            {acf.heading && (
              <h1 className="text-3xl md:text-6xl text-white mb-4 drop-shadow-lg">
                {acf.heading}
              </h1>
            )}
          </div>
        </section>
      )}

      {/* Hymn Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl text-[#9d0202] font-bold text-center mb-8">School Hymn</h2>
            {acf.school_hymn && (
              <div className="border-2 border-[#9d0202] shadow-lg rounded-xl p-8 bg-white text-center mx-auto wysiwyg-content" 
                dangerouslySetInnerHTML={{ __html: acf.school_hymn }}
              />
            )}
          </div>
        </div>
      </section>

      {/* Video Section */}
      {videoId && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl text-[#9d0202] text-center mb-8">School Hymn Video</h2>
              <div className="relative w-full pt-[56.25%] rounded-xl overflow-hidden shadow-xl">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="School Hymn Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
} 