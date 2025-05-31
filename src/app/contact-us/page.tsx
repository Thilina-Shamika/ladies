import React from 'react';
import Image from 'next/image';
import ContactForm from '@/components/contact/ContactForm';
import GoogleMap from '@/components/contact/GoogleMap';

interface Address {
  acf_fc_layout: string;
  address_heading: string;
  address: string;
  email_address: string;
  phone: string;
}

interface ContactUsData {
  acf: {
    contact_cover: {
      url: string;
      alt: string;
    };
    contact_subheading: string;
    contact_heading: string;
    main_address: string;
    addresses: Address[];
    stakeholder_heading: string;
    stakeholder_description: string;
  };
}

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

async function getContactUsData(): Promise<ContactUsData | null> {
  try {
    const res = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/pages?slug=contact-us`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data && data.length > 0 ? data[0] : null;
  } catch {
    return null;
  }
}

export default async function ContactUsPage() {
  const data = await getContactUsData();
  const acf = data?.acf || {} as ContactUsData['acf'];

  return (
    <>
      <section className="relative min-h-[35vh] flex items-center justify-center bg-gray-900">
        {/* Background image */}
        <div className="absolute inset-0 w-full h-full z-0">
          {acf.contact_cover?.url && (
            <Image
              src={acf.contact_cover.url}
              alt={acf.contact_cover.alt || acf.contact_heading}
              fill
              className="object-cover object-center w-full h-full"
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/60" />
        </div>
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-8 w-full">
          <div className="text-white text-sm md:text-sm mb-3 tracking-widest uppercase drop-shadow">
            {acf.contact_subheading ?? ''}
          </div>
          <h1 className="text-3xl md:text-6xl text-white mb-8 drop-shadow-lg">
            {acf.contact_heading ?? ''}
          </h1>
        </div>
      </section>

      {/* Two Columns Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Left Column */}
            <div>
              <h2 className="text-2xl md:text-5xl  mb-4 text-gray-900">Get in touch</h2>
              <p className="text-gray-700 text-base md:text-sm max-w-md mb-8">
                Should you have any concern or clarifications, feel free to email us and we will get in touch with you.
              </p>
              <ContactForm />
            </div>
            {/* Right Column: Google Map */}
            <div>
              <GoogleMap address={acf.main_address ?? ''} />
            </div>
          </div>
        </div>
      </section>

      {/* Addresses Section */}
      {acf.addresses && acf.addresses.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {acf.addresses.map((item, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl shadow p-6 h-full flex flex-col">
                  <h3 className="text-lg font-bold text-[#9d0202] mb-2">{item.address_heading}</h3>
                  {item.address && (
                    <div className="text-gray-700 whitespace-pre-line mb-2 text-sm">{item.address}</div>
                  )}
                  {item.email_address && (
                    <div className="text-gray-700 mb-2 text-sm">
                      <span className="font-semibold">Email: </span>{item.email_address}
                    </div>
                  )}
                  {item.phone && (
                    <div className="text-gray-700 mb-2 text-sm">
                      <span className="font-semibold">Phone: </span>{item.phone}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stakeholder Section */}
      {(acf.stakeholder_heading || acf.stakeholder_description) && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            {acf.stakeholder_heading && (
              <h2 className="text-2xl md:text-3xl  text-[#9d0202] mb-4">{acf.stakeholder_heading}</h2>
            )}
            {acf.stakeholder_description && (
              <div className="prose mx-auto text-gray-700 whitespace-pre-line text-base md:text-lg">
                {acf.stakeholder_description}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
} 