import Script from 'next/script';

interface StructuredDataProps {
  type: 'organization' | 'school' | 'article' | 'event';
  data: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "Ladies' College Colombo",
          "alternateName": "Ladies' College",
          "url": "https://ladiescollege.lk",
          "logo": "https://ladiescollege.lk/logo.png",
          "description": "Ladies' College Colombo is one of Sri Lanka's premier girls' schools, established in 1900. Offering excellence in education from kindergarten to advanced level.",
          "foundingDate": "1900",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": data.address || "Maradana Road",
            "addressLocality": "Colombo",
            "addressRegion": "Western Province",
            "addressCountry": "LK"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": data.phone || "+94-11-269-1111",
            "contactType": "customer service",
            "areaServed": "LK",
            "availableLanguage": "English"
          },
          "sameAs": [
            "https://www.facebook.com/ladiescollegecolombo",
            "https://www.instagram.com/ladiescollegecolombo"
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Educational Programs",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "EducationalProgram",
                  "name": "Kindergarten",
                  "description": "Early childhood education program"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "EducationalProgram",
                  "name": "Primary School",
                  "description": "Primary education program"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "EducationalProgram",
                  "name": "Upper School",
                  "description": "Secondary education program"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "EducationalProgram",
                  "name": "Advanced Level",
                  "description": "Advanced level education program"
                }
              }
            ]
          }
        };
      
      case 'school':
        return {
          "@context": "https://schema.org",
          "@type": "School",
          "name": "Ladies' College Colombo",
          "description": "Premier girls' school in Sri Lanka offering education from kindergarten to advanced level",
          "url": "https://ladiescollege.lk",
          "telephone": data.phone || "+94-11-269-1111",
          "email": data.email || "info@ladiescollege.lk",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": data.address || "Maradana Road",
            "addressLocality": "Colombo",
            "addressRegion": "Western Province",
            "addressCountry": "LK"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 6.9271,
            "longitude": 79.8612
          },
          "openingHours": "Mo-Fr 07:30-14:00",
          "curriculum": "Sri Lankan National Curriculum",
          "numberOfStudents": "3000+",
          "foundingDate": "1900",
          "motto": "HAEC VICTORIA NOSTRA FIDES"
        };
      
      default:
        return null;
    }
  };

  const structuredData = getStructuredData();
  
  if (!structuredData) return null;

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
