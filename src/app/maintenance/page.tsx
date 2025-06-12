'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Poppins } from "next/font/google";
import { WORDPRESS_API_URL } from '@/lib/wordpress';

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export default function MaintenancePage() {
  const [logo, setLogo] = useState<{ url: string; alt: string; width: number; height: number } | null>(null);

  useEffect(() => {
    async function fetchLogo() {
      try {
        const response = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/top-bar-header?_embed&acf=true`);
        const data = await response.json();
        if (data && data[0]?.acf?.main_logo) {
          setLogo(data[0].acf.main_logo);
        }
      } catch (error) {
        console.error('Error fetching logo:', error);
      }
    }
    fetchLogo();
  }, []);

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gray-50 ${poppins.className}`}>
      <div className="max-w-2xl mx-auto text-center px-4">
        <div className="mb-8">
          {logo ? (
            <Image
              src={logo.url}
              alt={logo.alt || "Ladies' College Logo"}
              width={logo.width}
              height={logo.height}
              className="mx-auto h-16 w-auto"
            />
          ) : (
            <div className="h-16 w-16 mx-auto bg-gray-200 animate-pulse rounded-full" />
          )}
        </div>
        <h1 className="text-4xl  text-gray-900 mb-4">
          Site Under Maintenance
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          We are currently performing scheduled maintenance to improve our website.
          We'll be back shortly!
        </p>
        <div className="text-gray-500">
          <p>Expected duration: 1-2 hours</p>
          <p className="mt-2">Thank you for your patience.</p>
        </div>
      </div>
    </div>
  );
} 