'use client';
import { motion } from 'framer-motion';

interface BlogPostClientProps {
  post: any;
  featuredImage?: any;
}

export function BlogPostClient({ post, featuredImage }: BlogPostClientProps) {
  return (
    <article className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        {featuredImage && (
          <div className="aspect-video relative mb-8 rounded-lg overflow-hidden">
            <img
              src={featuredImage.source_url}
              alt={featuredImage.alt_text}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <h1 className="text-4xl font-bold mb-6">{post.title.rendered}</h1>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </motion.div>
    </article>
  );
} 