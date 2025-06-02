"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPosts } from '@/lib/wordpress';

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  slug: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string; alt_text: string }>;
    "wp:term"?: Array<Category[]>;
  };
}

const POSTS_PER_PAGE = 6;

const News: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPosts(currentPage, POSTS_PER_PAGE).then((data: Post[]) => {
      setPosts(data);
      // Set total pages based on the length of the data array
      setTotalPages(data.length < POSTS_PER_PAGE ? 1 : currentPage + 1); // fallback
      setLoading(false);
    });
  }, [currentPage]);

  return (
    <section className="py-16 px-4 md:px-8 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h3 className="text-lg md:text-sm text-gray-600 mb-3">News & Past Events</h3>
          <h2 className="text-3xl md:text-6xl  text-gray-900">Latest from Our Blog</h2>
        </div>
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => {
              const featured = post._embedded?.["wp:featuredmedia"]?.[0];
              const categories = post._embedded?.["wp:term"]?.[0] || [];
              // Always use /blog/${post.slug} for blog post links
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
                      <div className="flex flex-wrap gap-2 mb-2">
                        {categories.map((cat) => (
                          <span key={cat.id} className="bg-red-700 text-white text-xs px-3 py-1 rounded-full">
                            {cat.name}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-lg text-white font-semibold mb-0" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2">
            <button
              className="px-4 py-2 rounded border bg-white text-gray-700 disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-700">Page {currentPage} of {totalPages}</span>
            <button
              className="px-4 py-2 rounded border bg-white text-gray-700 disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default News; 