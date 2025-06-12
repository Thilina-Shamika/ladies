import React from 'react';
import Image from 'next/image';
import { getPage } from '@/lib/wordpress';
import History from '@/components/home/History';
import AboutUs from '@/components/home/AboutUs';

interface AboutACF {
  about_cover?: { url: string; alt: string };
  about_heading?: string;
  about_subheading?: string;
  history_subheading?: string;
  history_heading?: string;
  history_description?: string;
  history_button_text?: string;
  history_button_link?: { url?: string };
  history_image?: { url?: string; alt?: string };
  history_image2?: { url?: string; alt?: string };
  mission?: string;
  vision?: string;
  our_values_sub_heading?: string;
  our_values_heading?: string;
  our_values?: string;
  pillars_of_success?: { url: string; alt: string };
}

interface HomeACF {
  about_us_subhaeding?: string;
  about_heading?: string;
  about_description?: string;
  about_button_text?: string;
  about_button_link?: { url?: string };
  about_image?: { url?: string; alt?: string };
  about_image2?: { url?: string; alt?: string };
  about_background_image?: { url?: string };
  [key: string]: any;
}

export default async function AboutPage() {
  const aboutPageData = await getPage('about-us');
  const aboutAcf = (aboutPageData?.acf || {}) as AboutACF;
  const homePageData = await getPage('home');
  const homeAcf = (homePageData?.acf || {}) as HomeACF;

  return (
    <main className="min-h-screen">
      {/* Cover Section using about page data */}
      <section className="relative min-h-[35vh] flex items-center justify-center bg-gray-900">
        <div className="absolute inset-0 w-full h-full z-0">
          {aboutAcf.about_cover?.url && (
            <Image
              src={aboutAcf.about_cover.url}
              alt={aboutAcf.about_cover.alt || aboutAcf.about_heading || ''}
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
            {aboutAcf.about_subheading ?? ''}
          </div>
          <h1 className="text-sm md:text-6xl text-white mb-8 drop-shadow-lg">
            {aboutAcf.about_heading ?? ''}
          </h1>
        </div>
      </section>
      {/* History Section below the cover, using about page ACF data */}
      <History
        subheading={aboutAcf.history_subheading ?? ''}
        heading={aboutAcf.history_heading ?? ''}
        description={aboutAcf.history_description ?? ''}
        buttonText={aboutAcf.history_button_text ?? ''}
        buttonLink={aboutAcf.history_button_link?.url ?? ''}
        imageUrl={aboutAcf.history_image?.url ?? ''}
        imageAlt={aboutAcf.history_image?.alt ?? ''}
        image2Url={aboutAcf.history_image2?.url ?? ''}
        image2Alt={aboutAcf.history_image2?.alt ?? ''}
      />
      {/* About Us Section from home page */}
      <AboutUs
        subheading={homeAcf.about_us_subhaeding ?? ''}
        heading={homeAcf.about_heading ?? ''}
        description={homeAcf.about_description ?? ''}
        buttonText={homeAcf.about_button_text ?? ''}
        buttonLink={homeAcf.about_button_link?.url ?? ''}
        imageUrl={homeAcf.about_image?.url ?? ''}
        imageAlt={homeAcf.about_image?.alt ?? ''}
        image2Url={homeAcf.about_image2?.url ?? ''}
        image2Alt={homeAcf.about_image2?.alt ?? ''}
        backgroundImageUrl={homeAcf.about_background_image?.url ?? ''}
      />
      {/* Pillars of Success Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-sm md:text-sm text-gray-600 mb-3 tracking-widest uppercase">
              {aboutAcf.our_values_sub_heading ?? ''}
            </div>
            <h2 className="text-3xl md:text-5xl text-gray-900">
              {aboutAcf.our_values_heading ?? ''}
            </h2>
          </div>
          
          {/* Pillars Image */}
          {aboutAcf.pillars_of_success?.url && (
            <div className="flex justify-center mb-6">
              <div className="relative w-full max-w-4xl aspect-[16/9] rounded-xl overflow-hidden">
                <Image
                  src={aboutAcf.pillars_of_success.url}
                  alt={aboutAcf.pillars_of_success.alt || 'Pillars of Success'}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )}

          {/* Our Values Content */}
          {aboutAcf.our_values && (
            <div className="max-w-4xl text-sm text-center mx-auto text-black prose prose-lg prose-p:text-center">
              <div dangerouslySetInnerHTML={{ __html: aboutAcf.our_values }} />
            </div>
          )}
        </div>
      </section>
    </main>
  );
} 