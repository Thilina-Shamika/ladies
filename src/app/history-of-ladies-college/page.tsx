import React from 'react';
import Image from 'next/image';
import { getPage, WORDPRESS_API_URL } from '@/lib/wordpress';
import PastPrincipals from '@/components/home/PastPrincipals';

interface HistoryACF {
  subheading?: string;
  heading?: string;
  content_subheading?: string;
  content_heading?: string;
  "1st_paragraph"?: string;
  facinated_issues?: Array<{
    acf_fc_layout: string;
    issues: string;
  }>;
  cover_image?: {
    url: string;
    alt: string;
  };
}

// Helper function to extract year from term string
function extractStartYear(term: string): number {
  const match = term.match(/(\d{4})/);
  return match ? parseInt(match[1]) : 9999;
}

export default async function HistoryPage() {
  const pageData = await getPage('history-of-ladies-college');
  const acf = (pageData?.acf || {}) as HistoryACF;

  // Fetch principals data
  let principals = [];
  try {
    console.log('Fetching principals from:', `${WORDPRESS_API_URL}/wp-json/wp/v2/principal?per_page=100`);
    
    const principalsResponse = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/principal?per_page=100`);
    
    if (!principalsResponse.ok) {
      console.error('Failed to fetch principals:', principalsResponse.status, principalsResponse.statusText);
    } else {
      const principalsData = await principalsResponse.json();
      console.log('Raw principals data:', principalsData);
      
      principals = Array.isArray(principalsData) ? principalsData : [];
      console.log('Principals array length:', principals.length);
      
      // Sort principals chronologically by their term start year
      principals.sort((a, b) => {
        const yearA = extractStartYear(a.acf?.term || '');
        const yearB = extractStartYear(b.acf?.term || '');
        return yearA - yearB;
      });
      
      console.log('Sorted principals:', principals.map(p => ({ name: p.title.rendered, term: p.acf?.term })));
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
          {acf.cover_image?.url && (
            <Image
              src={acf.cover_image.url}
              alt={acf.cover_image.alt || acf.heading || 'History of Ladies College'}
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
            {acf.subheading ?? 'ABOUT US'}
          </div>
          <h1 className="text-3xl md:text-6xl text-white mb-4 drop-shadow-lg">
            {acf.heading ?? 'History of Ladies College'}
          </h1>
          <p className="text-white/80 text-sm italic">
            Quoting Ladies' College a centennial narrative 1900-2000
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Content Heading Section */}
          <div className="max-w-4xl mx-auto mb-16">
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
            {acf["1st_paragraph"] && (
              <div 
                className="wysiwyg-content"
                dangerouslySetInnerHTML={{ __html: acf["1st_paragraph"] }}
              />
            )}
          </div>

          {/* Fascinated Issues Section */}
          {acf.facinated_issues && acf.facinated_issues.length > 0 && (
            <div className="max-w-4xl mx-auto mb-16">
              <h3 className="text-2xl md:text-3xl text-gray-900 mb-8 text-center">
                Several Issues Fascinates Us
              </h3>
              <div className="space-y-6">
                {acf.facinated_issues.map((issue, index) => (
                  <div 
                    key={index}
                    className="bg-gray-50/50 p-6 rounded-lg border-l-4 border-[#9d0202]"
                  >
                    <div 
                      className="wysiwyg-content"
                      dangerouslySetInnerHTML={{ __html: issue.issues }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Past Principals Section */}
      <PastPrincipals principals={principals} />
    </main>
  );
} 