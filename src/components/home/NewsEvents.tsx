"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { getPosts, getCategoriesByIds } from "@/lib/wordpress";
import { WordPressPost } from "@/lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function NewsEvents() {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    async function fetchData() {
      const fetchedPosts = await getPosts(1, 6);
      setPosts(fetchedPosts);
      // Collect all unique category IDs
      const catIds = Array.from(new Set(fetchedPosts.flatMap((p) => p.categories || [])));
      const fetchedCategories = await getCategoriesByIds(catIds);
      setCategories(fetchedCategories);
      setLoading(false);
    }
    fetchData();
  }, []);

  function getCategoryLabels(post: WordPressPost) {
    const cats = (post.categories || []).map((id: number) => categories.find((c) => c.id === id)?.name).filter(Boolean);
    return cats;
  }

  function NewsEventCard({ post, idx }: { post: WordPressPost; idx: number }) {
    // Always use /blog/${post.slug} for blog post links
    const nextHref = `/blog/${post.slug}`;
    return (
      <article
        key={post.id}
        className={
          `flex flex-col h-full transition-transform duration-200 hover:scale-[1.025] hover:shadow-xl px-6 py-8 ` +
          (idx !== 0 ? 'md:-ml-px' : '')
        }
      >
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {getCategoryLabels(post).map((cat, i) => (
            <span
              key={cat}
              className="inline-block bg-[#f3f4f6] text-[#9d0202] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider border border-[#e5e7eb] mr-2 mb-1"
            >
              {cat}
            </span>
          ))}
        </div>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-xl font-bold text-gray-900 leading-none">
            {new Date(post.date).toLocaleDateString(undefined, { day: "2-digit" })}
          </span>
          <span className="text-sm text-gray-500 font-medium uppercase">
            {new Date(post.date).toLocaleDateString(undefined, { month: "short" })}
          </span>
          <span className="text-xs text-gray-400 ml-auto">
            {new Date(post.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
        <h3 className="text-lg text-black mb-2 leading-snug">
          <Link href={nextHref} className="hover:text-[#9d0202] transition-colors">
            {post.title.rendered}
          </Link>
        </h3>
        <div
          className="text-gray-600 text-sm line-clamp-3 mb-4"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />
      </article>
    );
  }

  if (loading) return <div className="container mx-auto px-4 py-8">Loading...</div>;

  return (
    <section className="container mx-auto px-4 py-2 -mt-20 relative z-10">
      <h2 className="text-sm text-white mb-2 tracking-wide">News & Past Events</h2>
      {/* Mobile: Swiper slider */}
      <div className="block md:hidden relative">
        <Swiper
          spaceBetween={16}
          slidesPerView={1}
          modules={[Navigation, Autoplay]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
        >
          {posts.map((post, idx) => (
            <SwiperSlide key={post.id}>
              <NewsEventCard post={post} idx={idx} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Desktop: 3-column grid */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 bg-white rounded-lg shadow overflow-hidden">
        {posts.map((post, idx) => (
          <NewsEventCard post={post} idx={idx} key={post.id} />
        ))}
      </div>
    </section>
  );
} 