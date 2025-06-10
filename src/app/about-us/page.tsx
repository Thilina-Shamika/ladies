import React from 'react';
import Image from 'next/image';
import { getPage } from '@/lib/wordpress';
import History from '@/components/home/History';
import { PrincipalMessage } from '@/components/home/PrincipalMessage';
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
}

interface HomeACF {
  principal?: { url: string; alt: string } | string;
  principals_name?: string;
  designation_or_qualifications?: string;
  principals_message_subheading?: string;
  principals_message_heading?: string;
  principals_message?: string;
  principals_section_button_text?: string;
  principals_section_button_link?: { url?: string };
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
      {/* Principal's Message Section */}
      <PrincipalMessage
        image={
          typeof homeAcf.principal === 'string'
            ? { url: homeAcf.principal, alt: homeAcf.principals_name || '' }
            : homeAcf.principal && homeAcf.principal.url
              ? { url: homeAcf.principal.url, alt: homeAcf.principal.alt || homeAcf.principals_name || '' }
              : { url: '', alt: '' }
        }
        name={homeAcf.principals_name || ''}
        designation={homeAcf.designation_or_qualifications || ''}
        subheading={homeAcf.principals_message_subheading || ''}
        heading={homeAcf.principals_message_heading || ''}
        message={homeAcf.principals_message || ''}
        buttonText={homeAcf.principals_section_button_text || ''}
        buttonLink={
          homeAcf.principals_section_button_link && homeAcf.principals_section_button_link.url
            ? { url: homeAcf.principals_section_button_link.url }
            : undefined
        }
        anniversaryImage={homeAcf["125_years"]}
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
    </main>
  );
} 