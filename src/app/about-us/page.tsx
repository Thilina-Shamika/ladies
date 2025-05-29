import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AboutUs from '@/components/home/AboutUs';
import { getHomePage } from '@/lib/wordpress';
import { PrincipalMessage } from '@/components/home/PrincipalMessage';
import History from '@/components/home/History';
import VisionMission from '@/components/home/VisionMission';
import Values from '@/components/home/Values';

interface AboutUsData {
  acf: {
    about_cover: {
      url: string;
      alt: string;
    };
    about_heading: string;
    about_subheading: string;
    button_text: string;
    about_link: {
      url: string;
      title: string;
      target?: string;
    };
    about_us_subhaeding: string;
    about_description: string;
    about_button_text: string;
    about_button_link: {
      url: string;
    };
    about_image: {
      url: string;
      alt: string;
    };
    about_image2: {
      url: string;
      alt: string;
    };
    about_background_image: {
      url: string;
    };
    history_subheading: string;
    history_heading: string;
    history_description: string;
    history_button_text: string;
    history_button_link: {
      url: string;
    };
    history_image: {
      url: string;
      alt: string;
    };
    history_image2: {
      url: string;
      alt: string;
    };
    mission: string;
    vision: string;
    our_values_sub_heading: string;
    our_values_heading: string;
    our_values: string;
  };
}

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

async function getAboutUsData(): Promise<AboutUsData | null> {
  try {
    const res = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/pages?slug=about-us`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data && data.length > 0 ? data[0] : null;
  } catch {
    return null;
  }
}

export default async function AboutUsPage() {
  // Fetch about page data for the cover
  const aboutPageData = await getAboutUsData();
  const aboutAcf: any = aboutPageData?.acf || {};
  // Fetch home page data for the AboutUs component
  const homePage = await getHomePage();
  const homeAcf: any = homePage?.acf || {};
  return (
    <>
      {/* Cover Section using about page data */}
      <section className="relative min-h-[35vh] flex items-center justify-center bg-gray-900">
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src={aboutAcf.about_cover?.url}
            alt={aboutAcf.about_cover?.alt || aboutAcf.about_heading}
            className="object-cover object-center w-full h-full"
            style={{ position: 'absolute', inset: 0 }}
          />
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
        image={homeAcf.principal}
        name={homeAcf.principals_name}
        designation={homeAcf.designation_or_qualifications}
        subheading={homeAcf.principals_message_subheading}
        heading={homeAcf.principals_message_heading}
        message={homeAcf.principals_message}
        buttonText={homeAcf.principals_section_button_text}
        buttonLink={homeAcf.principals_section_button_link}
        anniversaryImage={homeAcf["125_years"]}
      />

      
      {/* About Us Section below the cover, using home page ACF data */}
      <AboutUs
        subheading={homeAcf.about_us_subhaeding ?? ''}
        heading={homeAcf.about_heading ?? ''}
        description={homeAcf.about_description ?? ''}
        buttonText={homeAcf.about_button_text ?? ''}
        buttonLink={homeAcf.about_button_link?.url?.replace('http://ladies.local', '') ?? ''}
        imageUrl={homeAcf.about_image?.url ?? ''}
        imageAlt={homeAcf.about_image?.alt || homeAcf.about_heading || ''}
        image2Url={homeAcf.about_image2?.url ?? ''}
        image2Alt={homeAcf.about_image2?.alt ?? ''}
        backgroundImageUrl={homeAcf.about_background_image?.url ?? ''}
      />
      
    </>
  );
} 