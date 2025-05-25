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
    openGraph: {
      images: post._embedded?.['wp:featuredmedia']?.[0]?.source_url
        ? [post._embedded['wp:featuredmedia'][0].source_url]
        : [],
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function BlogPost({ params }: { params: any }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];

  return <BlogPostClient post={post} featuredImage={featuredImage} />;
} 