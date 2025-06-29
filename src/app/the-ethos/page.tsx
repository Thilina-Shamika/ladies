import React from 'react';
import Image from 'next/image';
import { getPage, WORDPRESS_API_URL } from '@/lib/wordpress';
import PrincipalsList from '@/components/home/PrincipalsList';

interface EthosACF {
  sub_heading?: string;
  heading?: string;
  cover?: {
    url: string;
    alt: string;
  };
  content_subheading?: string;
  content_heading?: string;
  "1st_paragraph"?: string;
}

// Helper function to extract year from term string
function extractStartYear(term: string): number {
  const match = term.match(/(\d{4})/);
  return match ? parseInt(match[1]) : 9999;
}

export default async function EthosPage() {
  const pageData = await getPage('the-ethos');
  const acf = (pageData?.acf || {}) as EthosACF;

  // Fetch principals data with chronological ordering
  let principals = [];
  try {
    const principalsResponse = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/principal?per_page=100`);
    
    if (!principalsResponse.ok) {
      console.error('Failed to fetch principals:', principalsResponse.status, principalsResponse.statusText);
    } else {
      const principalsData = await principalsResponse.json();
      principals = Array.isArray(principalsData) ? principalsData : [];
      
      // Sort principals chronologically by their term start year
      principals.sort((a, b) => {
        const yearA = extractStartYear(a.acf?.term || '');
        const yearB = extractStartYear(b.acf?.term || '');
        return yearA - yearB;
      });
    }
  } catch (error) {
    console.error('Error fetching principals:', error);
    principals = [];
  }

  return (
    <main className="pb-8">
      {/* Cover Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-gray-900">
        <div className="absolute inset-0 w-full h-full z-0">
          {acf.cover?.url && (
            <Image
              src={acf.cover.url}
              alt={acf.cover.alt || acf.heading || 'The ETHOS'}
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
            {acf.sub_heading ?? 'ABOUT US'}
          </div>
          <h1 className="text-3xl md:text-6xl text-white mb-4 drop-shadow-lg">
            {acf.heading ?? 'The ETHOS'}
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Content Subheading and Heading */}
            {acf.content_subheading && (
              <div className="text-[#9d0202] text-sm md:text-sm font-semibold mb-3 tracking-widest uppercase">
                {acf.content_subheading}
              </div>
            )}
            {acf.content_heading && (
              <h2 className="text-2xl md:text-3xl text-gray-900 mb-8">
                {acf.content_heading}
              </h2>
            )}
            {/* First Paragraph */}
            {acf["1st_paragraph"] && (
              <div 
                className="wysiwyg-content"
                dangerouslySetInnerHTML={{ __html: acf["1st_paragraph"] }}
              />
            )}
          </div>
        </div>
      </section>

      {/* Principals List Section */}
      <PrincipalsList principals={principals} />
    </main>
  );
} 