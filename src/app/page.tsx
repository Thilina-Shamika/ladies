import { getPosts } from '@/lib/wordpress';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedPosts } from '@/components/home/FeaturedPosts';

export default async function Home() {
  const posts = await getPosts(1, 3);

  return (
    <div className="space-y-20">
      <HeroSection />
      <FeaturedPosts posts={posts} />
    </div>
  );
}
