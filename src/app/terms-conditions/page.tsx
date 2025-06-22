'use client';

import { getPage } from '@/lib/wordpress';
import { useEffect, useState } from 'react';

export default function TermsConditionsPage() {
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getPage('terms-conditions');
      setPageData(data);
    }
    fetchData();
  }, []);

  if (!pageData) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div>Loading...</div>
      </main>
    );
  }

  return (
    <main className="bg-white">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-light text-black mb-8 text-center">
            Terms & Conditions
          </h1>
          <div
            className="max-w-none text-black [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-5 [&_p]:mb-6 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_li]:mb-2 [&_strong]:font-bold"
            dangerouslySetInnerHTML={{ __html: pageData.content.rendered }}
          />
        </div>
      </div>
    </main>
  );
} 