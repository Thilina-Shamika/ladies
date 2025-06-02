"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  slug: string;
  categories?: string[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
  };
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sort, setSort] = useState<string>("date-desc");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/posts?_embed&per_page=50`);
      const data = await res.json();
      setPosts(data);
      setFilteredPosts(data);
      // Fetch categories
      const catRes = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/categories?per_page=50&_embed`);
      setCategories(await catRes.json());
      // Fetch recent posts
      setRecentPosts(data.slice(0, 5));
    }
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = posts;
    if (search) {
      filtered = filtered.filter(
        (post) =>
          post.title.rendered.toLowerCase().includes(search.toLowerCase()) ||
          post.excerpt.rendered.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((post) => post.categories?.includes(selectedCategory));
    }
    // Sorting
    if (sort === "date-desc") {
      filtered = filtered.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sort === "date-asc") {
      filtered = filtered.slice().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (sort === "title-asc") {
      filtered = filtered.slice().sort((a, b) => a.title.rendered.localeCompare(b.title.rendered));
    } else if (sort === "title-desc") {
      filtered = filtered.slice().sort((a, b) => b.title.rendered.localeCompare(a.title.rendered));
    }
    setFilteredPosts(filtered);
  }, [search, posts, selectedCategory, sort]);

  // Helper: get post count for a category
  const getCategoryCount = (catId: string) => posts.filter((post) => post.categories?.includes(catId)).length;

  return (
    <div className="container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
      {/* Left: Search + Blog List */}
      <div className="md:col-span-9">
        <div className="mb-8 bg-white rounded-xl shadow p-6">
          <input
            type="text"
            placeholder="Search blog posts or categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9d0202] text-lg bg-white mb-4"
          />
          {/* Sorting options */}
          <div className="flex flex-wrap gap-4 items-center mb-4">
            <label className="font-semibold text-black">Sort by:</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-2 rounded border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9d0202]"
            >
              <option value="date-desc">Newest</option>
              <option value="date-asc">Oldest</option>
              <option value="title-asc">Title A-Z</option>
              <option value="title-desc">Title Z-A</option>
            </select>
          </div>
        </div>
        {/* Blog Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => {
            const featured = post._embedded?.["wp:featuredmedia"]?.[0];
            const nextHref = `/blog/${post.slug}`;
            return (
              <a
                key={post.id}
                href={nextHref}
                className="block group relative aspect-video rounded-xl overflow-hidden shadow border border-gray-200 hover:shadow-lg transition-all"
              >
                {featured && (
                  <Image
                    src={featured.source_url}
                    alt={featured.alt_text || post.title.rendered}
                    fill
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                  <h3 className="text-sm text-white font-semibold mb-0" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                </div>
              </a>
            );
          })}
        </div>
      </div>
      {/* Right: Sidebar */}
      <div className="md:col-span-3 md:sticky md:top-24 h-fit">
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h3 className="text-lg font-bold mb-4 text-[#9d0202]">Categories</h3>
          <ul className="space-y-2">
            <li
              className={`flex items-center justify-between text-gray-700 hover:text-[#9d0202] cursor-pointer transition-colors ${selectedCategory === 'all' ? 'font-bold' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              <span>All</span>
              <span className="ml-2 bg-gray-100 rounded-full px-2 py-0.5 text-xs font-semibold">{getCategoryCount('all')}</span>
            </li>
            {categories.map((cat) => (
              <li
                key={cat.id}
                className={`flex items-center justify-between text-gray-700 hover:text-[#9d0202] cursor-pointer transition-colors ${selectedCategory === cat.slug ? 'font-bold' : ''}`}
                onClick={() => setSelectedCategory(cat.slug)}
              >
                <span>{cat.name}</span>
                <span className="ml-2 bg-gray-100 rounded-full px-2 py-0.5 text-xs font-semibold">{getCategoryCount(cat.slug)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-bold mb-4 text-[#9d0202]">Recent Posts</h3>
          <ul className="space-y-4">
            {recentPosts.map((post) => {
              const featured = post._embedded?.["wp:featuredmedia"]?.[0];
              return (
                <li key={post.id} className="flex items-center gap-3">
                  {featured && (
                    <Image
                      src={featured.source_url}
                      alt={featured.alt_text || post.title.rendered}
                      width={56}
                      height={40}
                      className="rounded object-cover"
                    />
                  )}
                  <a href={`/blog/${post.slug}`} className="text-gray-700 hover:text-[#9d0202] transition-colors line-clamp-2">
                    {post.title.rendered}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
} 