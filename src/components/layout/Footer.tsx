import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
};

async function getFooterData() {
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || '';
  const res = await fetch(`${apiUrl}/wp-json/wp/v2/footer?slug=footer`);
  if (!res.ok) return null;
  const data = await res.json();
  return data && data.length > 0 ? data[0] : null;
}

export default async function Footer() {
  const pageData = await getFooterData();
  const acf = pageData?.acf;
  if (!acf) return null;

  return (
    <footer className="bg-white border-t border-gray-200 pt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center space-x-4 mb-6 md:mb-0">
            {acf.logo?.url && (
              <SafeImage 
                src={acf.logo.url} 
                alt={acf.logo.alt || 'Logo'} 
                width={acf.logo.width || 120} 
                height={acf.logo.height || 40} 
                className="h-auto w-auto" 
              />
            )}
          </div>
          <div className="flex space-x-4">
            {acf.social_media?.map((item: any, idx: number) => {
              const name = item.social_media_name?.toLowerCase();
              const Icon = socialIcons[name as keyof typeof socialIcons];
              return (
                <Link key={idx} href={item.social_media_link} target="_blank" rel="noopener noreferrer">
                  <span className="sr-only">{item.social_media_name}</span>
                  {Icon ? <Icon className="w-6 h-6 text-[#9d0101]" /> : <span className="text-2xl text-[#9d0101]">{item.social_media_name[0]}</span>}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-gray-200 pt-8">
          {/* Contact Information */}
          <div>
            <div className="font-semibold mb-2 text-[#9d0101]">Contact Information</div>
            <div className="text-gray-700 text-sm whitespace-pre-line mb-2">{acf.address}</div>
            <div className="text-gray-700 text-sm mb-1">{acf.phone_numnber_1}</div>
            <div className="text-gray-700 text-sm mb-1">{acf.phone_number_2}</div>
            <div className="text-gray-700 text-sm mb-1">{acf.principals_email}</div>
          </div>
          {/* Old Girls' Association */}
          <div>
            <div className="font-semibold mb-2 text-[#9d0101]">Old Girls' Association</div>
            <div className="text-gray-700 text-sm mb-1">{acf.oga_email}</div>
            <div className="text-gray-700 text-sm mb-1">{acf.oga_phone}</div>
            <div className="text-gray-700 text-sm mb-1">
              <Link href={acf.oga_website || '#'} target="_blank" className="hover:underline text-gray-700">
                {acf.oga_website?.replace(/^https?:\/\//, '')}
              </Link>
            </div>
          </div>
          {/* LCIPS */}
          <div>
            <div className="font-semibold mb-2 text-[#9d0101]">LCIPS</div>
            <div className="text-gray-700 text-sm mb-1">{acf.licps_email}</div>
            <div className="text-gray-700 text-sm mb-1">{acf.licps_phone}</div>
            <div className="text-gray-700 text-sm mb-1">
              <Link href={acf.licps || '#'} target="_blank" className="hover:underline text-gray-700">
                {acf.licps?.replace(/^https?:\/\//, '')}
              </Link>
            </div>
          </div>
          {/* Resources */}
          <div>
            <div className="font-semibold mb-2 text-[#9d0101]">Resources</div>
            <div className="grid grid-cols-2 gap-x-4">
              {acf.resources?.map((item: any, idx: number) => {
                // Convert full URL to path for Next.js routing
                let href = item.page_link.url.replace(/^https?:\/\/[^/]+/, '');
                if (!href.startsWith('/')) href = '/' + href;
                return (
                  <Link key={idx} href={href} className="text-gray-700 text-sm mb-1 hover:underline">
                    {item.page_name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        {/* Copyright and Designed By */}
        <div className="border-t border-gray-200 mt-8 pt-6 pb-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
          <div>{acf.copyright}</div>
          {/* <div className="md:text-right">Designed & Developed by Jerry<span className="font-semibold"></span></div> */}
        </div>
      </div>
    </footer>
  );
} 