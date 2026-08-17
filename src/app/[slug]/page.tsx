import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PageModules from '@/components/modular/PageModules';
import { getModularPage, RESERVED_PAGE_SLUGS } from '@/lib/wordpress';
import { decodeHtmlEntitiesSafe } from '@/lib/utils';

export const revalidate = 3600;

function getModules(page: Awaited<ReturnType<typeof getModularPage>>) {
  const modules = page?.acf?.page_modules;
  return Array.isArray(modules) ? modules : null;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  if (RESERVED_PAGE_SLUGS.has(params.slug)) {
    return { title: 'Page Not Found' };
  }

  const page = await getModularPage(params.slug);
  const modules = getModules(page);
  if (!page || !modules) {
    return { title: 'Page Not Found' };
  }

  const title = decodeHtmlEntitiesSafe(page.title?.rendered || params.slug);
  const description = page.excerpt?.rendered?.replace(/<[^>]*>/g, '').trim();

  return {
    title,
    ...(description ? { description } : {}),
  };
}

export default async function ModularCatchAllPage({
  params,
}: {
  params: { slug: string };
}) {
  if (RESERVED_PAGE_SLUGS.has(params.slug)) {
    notFound();
  }

  const page = await getModularPage(params.slug);
  const modules = getModules(page);

  if (!page || !modules) {
    notFound();
  }

  return (
    <main className="pb-8">
      <PageModules modules={modules} />
    </main>
  );
}
