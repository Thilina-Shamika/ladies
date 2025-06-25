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
    past_principal_image: {
      url: string;
      alt: string;
    };
  };
}

interface PastPrincipalsProps {
  principals: Principal[];
}

const PastPrincipals: React.FC<PastPrincipalsProps> = ({ principals }) => {
  return (
    <section className="pt-8 pb-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-[#9d0202] text-2xl md:text-3xl font-semibold mb-12">
          Past Principals<br />of Ladies' College
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {principals.map((principal) => (
            <Link 
              href={`/principal/${principal.slug}`} 
              key={principal.id}
              className="group"
            >
              <div className="flex flex-col items-center">
                <div className="relative w-full aspect-[3/4] mb-4 overflow-hidden rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  {principal.acf.past_principal_image?.url && (
                    <SafeImage
                      src={principal.acf.past_principal_image.url}
                      alt={principal.acf.past_principal_image.alt || principal.title.rendered}
                      className="object-cover object-center w-full h-full group-hover:scale-105 transition-transform duration-300"
                      fill
                    />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 text-center group-hover:text-[#9d0202] transition-colors duration-300">
                  {principal.title.rendered}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PastPrincipals; 