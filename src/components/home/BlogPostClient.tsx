'use client';
import { motion } from 'framer-motion';
import { WordPressPost, decodeHtmlEntitiesSafe } from '@/lib/utils';

interface BlogPostClientProps {
  post: WordPressPost;
}

export function BlogPostClient({ post }: BlogPostClientProps) {
  return (
    <article className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-3xl md:text-5xl text-black mb-6">{decodeHtmlEntitiesSafe(post.title.rendered)}</h1>

        <div
          className="prose text-black prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </motion.div>
    </article>
  );
} 