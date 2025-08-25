import React from 'react';
import { getPrincipal } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import PrincipalPageClient from '@/components/principal/PrincipalPageClient';

interface PrincipalImage {
  url: string;
  alt: string;
}

interface PrincipalACF {
  sub_heading: string;
  heading: string;
  qualifications: string;
  cover_image: PrincipalImage;
  term: string;
  country: string;
  content_heading: string;
  '1st_paragraph': string;
  past_principal_image: PrincipalImage;
  '2nd_paragraph': string;
  block_quote: string;
  images: {
    acf_fc_layout: string;
    principals_images: PrincipalImage;
    caption: string;
  }[];
  '3rd_paragraph': string;
  '2nd_block_quote': string;
  gallery: PrincipalImage[];
}

interface PrincipalPageProps {
  params: { slug: string };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PrincipalPageProps): Promise<Metadata> {
  const principal = await getPrincipal(params.slug);
  
  if (!principal) {
    return {
      title: 'Principal Not Found | Ladies College',
      description: 'The requested principal information could not be found.',
    };
  }

  const acf = principal.acf as PrincipalACF;
  const principalName = acf.heading;
  const term = acf.term;
  const qualifications = acf.qualifications;
  const country = acf.country;
  
  // Create a rich description
  const description = `${principalName} served as Principal of Ladies College ${term}. ${qualifications} from ${country}. Learn about their leadership, achievements, and contributions to Ladies College.`;

  // Create keywords for better search visibility
  const keywords = [
    principalName,
    'Ladies College Principal',
    'Ladies College Colombo',
    term,
    qualifications,
    country,
    'Sri Lanka Education',
    'School Leadership'
  ].filter(Boolean).join(', ');

  return {
    title: `${principalName} - Principal of Ladies College ${term} | Ladies College`,
    description,
    keywords,
    openGraph: {
      title: `${principalName} - Principal of Ladies College ${term}`,
      description,
      type: 'article',
      images: acf.cover_image?.url ? [
        {
          url: acf.cover_image.url,
          alt: acf.cover_image.alt || `${principalName} - Ladies College Principal`,
          width: 1200,
          height: 630,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${principalName} - Principal of Ladies College ${term}`,
      description,
      images: acf.cover_image?.url ? [acf.cover_image.url] : [],
    },
    alternates: {
      canonical: `/principal/${params.slug}`,
    },
  };
}

// Generate structured data for better search engine understanding
function generateStructuredData(principal: any, acf: PrincipalACF) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ladiescollege.lk';
  
  // Breadcrumb structured data
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Principal",
        "item": `${baseUrl}/principal`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": acf.heading,
        "item": `${baseUrl}/principal/${principal.slug}`
      }
    ]
  };

  // Person structured data
  const personData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": acf.heading,
    "jobTitle": "Principal",
    "worksFor": {
      "@type": "EducationalOrganization",
      "name": "Ladies College",
      "url": baseUrl,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Colombo",
        "addressCountry": "LK"
      }
    },
    "description": `${acf.heading} served as Principal of Ladies College ${acf.term}. ${acf.qualifications} from ${acf.country}.`,
    "url": `${baseUrl}/principal/${principal.slug}`,
    "image": acf.past_principal_image?.url || acf.cover_image?.url,
    "sameAs": [],
    "knowsAbout": ["Education", "School Leadership", "Academic Administration"],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": acf.qualifications
    }
  };

  return [breadcrumbData, personData];
}

export default async function PrincipalPage({ params }: PrincipalPageProps) {
  const principal = await getPrincipal(params.slug);
  
  if (!principal) {
    notFound();
  }

  const acf = principal.acf as PrincipalACF;
  const structuredDataArray = generateStructuredData(principal, acf);

  return (
    <>
      {/* Structured Data for SEO */}
      {structuredDataArray.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      
      <PrincipalPageClient principal={principal} acf={acf} />
    </>
  );
} 