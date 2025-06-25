'use client';
import SafeImage from '@/components/ui/SafeImage';
import { motion } from 'framer-motion';
import { WordPressPost } from '@/lib/utils';

interface BlogPostClientProps {
  post: WordPressPost;
  featuredImage?: { source_url: string; alt_text: string };
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
            <SafeImage
              src={featuredImage.source_url}
              alt={featuredImage.alt_text}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        <h1 className="text-3xl md:text-5xl text-black mb-6">{post.title.rendered}</h1>

        <div
          className="prose text-black prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </motion.div>
    </article>
  );
} 