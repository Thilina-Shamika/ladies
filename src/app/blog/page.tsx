import { getPosts } from '@/lib/wordpress';
import { BlogListClient } from '@/components/home/BlogListClient';

export const metadata = {
  title: 'Blog',
  description: 'Read our latest blog posts',
};

export default async function BlogPage({ searchParams }: { searchParams?: { [key: string]: string | string[] } }) {
  const currentPage = Number(searchParams?.page) || 1;
  const posts = await getPosts(currentPage, 9);

  return <BlogListClient posts={posts} currentPage={currentPage} />;
} 