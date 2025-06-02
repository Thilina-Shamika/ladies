import React from 'react';
import AboutUs from '@/components/home/AboutUs';
import { getPage } from '@/lib/wordpress';
import { PrincipalMessage } from '@/components/home/PrincipalMessage';
import History from '@/components/home/History';
import VisionMission from '@/components/home/VisionMission';
import Values from '@/components/home/Values';
import Image from 'next/image';

interface ACFData {
  about_cover?: { url?: string; alt?: string };
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
  principals_name?: string;
  principal?: string;
  designation_or_qualifications?: string;
  principals_message_subheading?: string;
  principals_message_heading?: string;
  principals_message?: string;
  principals_section_button_text?: string;
  principals_section_button_link?: string;
  [key: string]: unknown;
}

export default async function AboutPage() {
  const aboutPageData = await getPage('about-us');
  const aboutAcf: ACFData = aboutPageData?.acf || {};
  const homePage = await getPage('home');
  const homeAcf: ACFData = homePage?.acf || {};

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
      <VisionMission
        mission={aboutAcf.mission ?? ''}
        vision={aboutAcf.vision ?? ''}
        missionLabel="Our Mission"
        visionLabel="Our Vision"
      />
      <Values
        subheading={aboutAcf.our_values_sub_heading ?? ''}
        heading={aboutAcf.our_values_heading ?? ''}
        content={aboutAcf.our_values ?? ''}
      />
      <PrincipalMessage
        image={typeof homeAcf.principal === 'string' ? { url: homeAcf.principal, alt: homeAcf.principals_name || '' } : { url: '', alt: '' }}
        name={homeAcf.principals_name || ''}
        designation={homeAcf.designation_or_qualifications || ''}
        subheading={homeAcf.principals_message_subheading || ''}
        heading={homeAcf.principals_message_heading || ''}
        message={homeAcf.principals_message || ''}
        buttonText={homeAcf.principals_section_button_text || ''}
        buttonLink={homeAcf.principals_section_button_link ? { url: homeAcf.principals_section_button_link } : undefined}
        anniversaryImage={typeof homeAcf["125_years"] === 'string' ? { url: homeAcf["125_years"], alt: '125 Years Anniversary' } : undefined}
      />
      {/* About Us Section below the cover, using home page ACF data */}
      <AboutUs
        subheading={String(homeAcf.about_us_subhaeding ?? '')}
        heading={String(homeAcf.about_heading ?? '')}
        description={String(homeAcf.about_description ?? '')}
        buttonText={String(homeAcf.about_button_text ?? '')}
        buttonLink={String(homeAcf.about_button_link ?? '')}
      />
    </main>
  );
} 