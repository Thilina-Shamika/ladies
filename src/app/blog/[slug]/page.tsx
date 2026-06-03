import { getPost } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import { BlogPostClient } from '@/components/home/BlogPostClient';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata({ params }: { params: any }) {
  const post = await getPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title.rendered,
    description: post.excerpt.rendered.replace(/<[^>]*>/g, ''),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function BlogPost({ params }: { params: any }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
} 