import { getPosts } from '@/lib/wordpress';
import { BlogListClient } from '@/components/home/BlogListClient';

export const metadata = {
  title: 'Blog',
  description: 'Read our latest blog posts',
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const posts = await getPosts(currentPage, 9);

  return <BlogListClient posts={posts} currentPage={currentPage} />;
} 