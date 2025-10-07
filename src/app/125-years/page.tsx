import React from 'react';
import ForceNativeImage from '@/components/ui/ForceNativeImage';
import { getPage } from '@/lib/wordpress';
 

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
  "125_years_notices"?: Array<{
    acf_fc_layout: string;
    notices_heading?: string;
    notices_description?: string;
    notices_image?: {
      url: string;
      alt: string;
    };
    notices_button_text?: string;
    notices_button_link?: {
      title: string;
      url: string;
      target: string;
    };
  }>;
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
            <ForceNativeImage
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
                <ForceNativeImage
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

          

          {/* Anthem Video */}
          {videoId && (
            <div className="max-w-4xl mx-auto mb-16">
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

          {/* Celebrations Section - At the very end */}
          {acf["125_years_notices"] && acf["125_years_notices"].length > 0 && (
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl text-[#9d0202] font-bold text-center mb-8">Celebrations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {acf["125_years_notices"].map((notice, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                    {notice.notices_heading && (
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">
                        {notice.notices_heading}
                      </h4>
                    )}
                    {notice.notices_description && (
                      <div 
                        className="text-gray-700 text-sm mb-4 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: notice.notices_description }}
                      />
                    )}
                    {notice.notices_image?.url && (
                      <div className="mb-4">
                        <ForceNativeImage
                          src={notice.notices_image.url}
                          alt={notice.notices_image.alt || notice.notices_heading || 'Notice image'}
                          className="w-full h-auto rounded"
                        />
                      </div>
                    )}
                    {notice.notices_button_text && notice.notices_button_link?.url && (
                      <a
                        href={notice.notices_button_link.url}
                        target={notice.notices_button_link.target || '_blank'}
                        rel={notice.notices_button_link.target === '_blank' ? 'noopener noreferrer' : undefined}
                        className="inline-block bg-[#9d0202] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#7a0101] transition-colors"
                      >
                        {notice.notices_button_text}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
} 