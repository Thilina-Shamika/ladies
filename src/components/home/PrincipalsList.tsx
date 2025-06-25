import React from 'react';
import Link from 'next/link';
import SafeImage from '@/components/ui/SafeImage';

interface Principal {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  acf: {
    term: string;
    country: string;
    short_description_about_principal: string;
    past_principal_image: {
      url: string;
      alt: string;
    };
  };
}

interface PrincipalsListProps {
  principals: Principal[];
}

// Helper to strip HTML and limit to 40 words
function getShortText(html: string, wordLimit: number = 40) {
  if (!html) return '';
  const text = html.replace(/<[^>]+>/g, '');
  const words = text.split(/\s+/).filter(Boolean);
  return words.slice(0, wordLimit).join(' ') + (words.length > wordLimit ? '…' : '');
}

const PrincipalsList: React.FC<PrincipalsListProps> = ({ principals }) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 space-y-8">
        {principals.map((principal) => (
          <Link 
            href={`/principal/${principal.slug}`} 
            key={principal.id}
            className="block group"
          >
            <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden p-6 md:p-8 cursor-pointer border border-gray-100 hover:-translate-y-1">
              {/* Image */}
              <div className="w-full md:w-64 flex-shrink-0 mb-4 md:mb-0 md:mr-8">
                <div className="relative w-full aspect-[4/3.5] rounded-xl overflow-hidden">
                  {principal.acf.past_principal_image?.url && (
                    <SafeImage
                      src={principal.acf.past_principal_image.url}
                      alt={principal.acf.past_principal_image.alt || principal.title.rendered}
                      className="object-cover object-top w-full h-full group-hover:scale-105 transition-transform duration-300"
                      fill
                    />
                  )}
                </div>
              </div>
              {/* Content */}
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2 group-hover:text-[#9d0202] transition-colors duration-300">
                  {principal.title.rendered}
                </h3>
                <div className="text-[#9d0202] text-sm font-semibold mb-3">
                  {principal.acf.term}
                </div>
                <div className="text-gray-600 text-sm mb-3">
                  Country: {principal.acf.country}
                </div>
                {principal.acf.short_description_about_principal && (
                  <div 
                    className="text-gray-700 text-sm leading-relaxed line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: principal.acf.short_description_about_principal }}
                  />
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PrincipalsList; 