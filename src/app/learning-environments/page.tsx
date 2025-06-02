import React from 'react';
import { LeftImageRightContent } from '@/components/home/LeftImageRightContent';
import Image from 'next/image';

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

async function getLearningEnvironmentsData() {
  try {
    const res = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/pages?slug=learning-environments`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data && data.length > 0 ? data[0] : null;
  } catch {
    return null;
  }
}

async function getIntroductionData() {
  try {
    const res = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/pages?slug=introduction`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data && data.length > 0 ? data[0] : null;
  } catch {
    return null;
  }
}

export default async function LearningEnvironmentsPage() {
  const pageData = await getLearningEnvironmentsData();
  const acf = pageData?.acf || {};
  const introPageData = await getIntroductionData();
  const introAcf = introPageData?.acf || {};
  return (
    <main className="pb-8">
      {/* Cover Section */}
      <section className="relative min-h-[35vh] flex items-center justify-center bg-gray-900">
        <div className="absolute inset-0 w-full h-full z-0">
          {acf.learning_cover?.url && (
            <Image
              src={acf.learning_cover.url}
              alt={acf.learning_heading || 'Learning Environments'}
              className="object-cover object-center w-full h-full"
              style={{ position: 'absolute', inset: 0 }}
              fill
            />
          )}
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-8 w-full">
          <div className="text-white text-sm md:text-sm font-semibold mb-3 tracking-widest uppercase drop-shadow">
            {acf.learning_sub_heading ?? 'LEARNING ENVIRONMENTS'}
          </div>
          <h1 className="text-3xl md:text-6xl text-white mb-8 drop-shadow-lg">
            {acf.learning_heading ?? 'Learning Environments'}
          </h1>
        </div>
      </section>
      {/* Image Left, Content Right Section */}
      <LeftImageRightContent
        imageUrl={acf.learning_cover?.url || ''}
        imageAlt={acf.learning_heading || 'Learning Environments'}
        heading={introAcf.learning_heading || ''}
        subheading={introAcf.learning_sub_heading || ''}
        content={introAcf.content || ''}
      />
    </main>
  );
} 