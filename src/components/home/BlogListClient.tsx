'use client';
import Link from 'next/link';
import SafeImage from '@/components/ui/SafeImage';
import { motion } from 'framer-motion';
import { WordPressPost } from '@/lib/utils';

interface BlogListClientProps {
  posts: WordPressPost[];
  currentPage: number;
}

export function BlogListClient({ posts, currentPage }: BlogListClientProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-12"
      >
        Blog
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            {post._embedded?.['wp:featuredmedia']?.[0] && (
              <div className="aspect-video relative">
                <SafeImage
                  src={post._embedded['wp:featuredmedia'][0].source_url}
                  alt={post._embedded['wp:featuredmedia'][0].alt_text}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">
                <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                  {post.title.rendered}
                </Link>
              </h2>
              <div
                className="text-gray-600 line-clamp-3 mb-4"
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              />
              <Link
                href={`/blog/${post.slug}`}
                className="text-primary hover:underline"
              >
                Read More
              </Link>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex justify-center">
        <div className="flex space-x-2">
          {currentPage > 1 && (
            <Link
              href={`/blog?page=${currentPage - 1}`}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
            >
              Previous
            </Link>
          )}
          <span className="px-4 py-2 bg-gray-200 rounded">
            Page {currentPage}
          </span>
          {posts.length === 9 && (
            <Link
              href={`/blog?page=${currentPage + 1}`}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
            >
              Next
            </Link>
          )}
        </div>
      </div>
    </div>
  );
} 