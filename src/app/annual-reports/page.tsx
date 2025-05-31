import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

// Helper to fetch posts from the 'annual report' category
async function getAnnualReportPosts() {
  // Use the correct category slug for Annual Reports
  const categorySlug = 'annual-reports';
  const resCat = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/categories?slug=${categorySlug}`);
  const cats = await resCat.json();
  const catId = cats[0]?.id;
  if (!catId) return [];
  const res = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/posts?_embed&categories=${catId}&per_page=12`);
  return await res.json();
}

async function getAnnualReportsData() {
  try {
    const res = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/pages?slug=annual-reports`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data && data.length > 0 ? data[0] : null;
  } catch {
    return null;
  }
}

export default async function AnnualReportsPage() {
  const pageData = await getAnnualReportsData();
  const acf = pageData?.acf || {};
  const posts = await getAnnualReportPosts();
  return (
    <main className="pb-8">
      {/* Cover Section */}
      <section className="relative min-h-[35vh] flex items-center justify-center bg-gray-900">
        <div className="absolute inset-0 w-full h-full z-0">
          {acf.reports_cover?.url && (
            <img
              src={acf.reports_cover.url}
              alt={acf.reports_heading || 'Annual Reports'}
              className="object-cover object-center w-full h-full"
              style={{ position: 'absolute', inset: 0 }}
            />
          )}
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-8 w-full">
          <div className="text-white text-sm md:text-sm font-semibold mb-3 tracking-widest uppercase drop-shadow">
            {acf.reorts_sub_heading ?? 'ANNUAL REPORTS'}
          </div>
          <h1 className="text-3xl md:text-6xl text-white mb-8 drop-shadow-lg">
            {acf.reports_heading ?? 'Annual Reports'}
          </h1>
        </div>
      </section>
      {/* Annual Report Posts Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          
          {posts.length === 0 ? (
            <div className="text-center py-12 text-gray-400">No annual reports found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any) => {
                const featured = post._embedded?.["wp:featuredmedia"]?.[0];
                const nextHref = `/blog/${post.slug}`;
                return (
                  <div key={post.id} className="relative aspect-square rounded-xl overflow-hidden shadow-sm border border-gray-200 group">
                    <Link href={nextHref} className="block w-full h-full relative">
                      {featured && (
                        <Image
                          src={featured.source_url}
                          alt={featured.alt_text || post.title.rendered}
                          fill
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                        <h3 className="text-lg text-white font-semibold mb-0" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
} 