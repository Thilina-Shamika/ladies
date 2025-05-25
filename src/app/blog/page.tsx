import { getPosts } from '@/lib/wordpress';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const metadata = {
  title: 'Blog',
  description: 'Read our latest blog posts',
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;
  const posts = await getPosts(currentPage, 9);

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
                <img
                  src={post._embedded['wp:featuredmedia'][0].source_url}
                  alt={post._embedded['wp:featuredmedia'][0].alt_text}
                  className="object-cover w-full h-full"
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
      <div className="mt-12 flex justify-center gap-4">
        {currentPage > 1 && (
          <Link
            href={`/blog?page=${currentPage - 1}`}
            className="px-4 py-2 border rounded hover:bg-gray-100 transition-colors"
          >
            Previous
          </Link>
        )}
        {posts.length === 9 && (
          <Link
            href={`/blog?page=${currentPage + 1}`}
            className="px-4 py-2 border rounded hover:bg-gray-100 transition-colors"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
} 