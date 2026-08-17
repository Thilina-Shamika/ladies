import React from 'react';
import ForceNativeImage from '@/components/ui/ForceNativeImage';
import UpperSchoolGallery from '@/components/upper-school/UpperSchoolGallery';
import { decodeHtmlEntitiesSafe } from '@/lib/utils';
import type {
  PageModule,
  WPFileField,
  WPLinkField,
  WPMediaField,
} from '@/lib/wordpress';

function mediaUrl(media: WPMediaField): string | undefined {
  return media && typeof media === 'object' && media.url ? media.url : undefined;
}

function mediaAlt(media: WPMediaField, fallback = ''): string {
  return (media && typeof media === 'object' && media.alt) || fallback;
}

function fileUrl(file: WPFileField): string | undefined {
  return file && typeof file === 'object' && file.url ? file.url : undefined;
}

function linkUrl(link: WPLinkField): string | undefined {
  return link && typeof link === 'object' && link.url ? link.url : undefined;
}

function ensureParagraphs(html: string) {
  if (/<p[\s>]/i.test(html)) return html;
  const parts = html
    .split(/(?:<br\s*\/?>\s*){2,}|\n{2,}/i)
    .map((s) => s.trim())
    .filter(Boolean);
  return parts.map((p) => `<p>${p}</p>`).join('');
}

function HeroModule({
  sub_heading,
  heading,
  cover,
}: Extract<PageModule, { acf_fc_layout: 'hero' }>) {
  const src = mediaUrl(cover);
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center bg-gray-900">
      <div className="absolute inset-0 w-full h-full z-0">
        {src && (
          <ForceNativeImage
            src={src}
            alt={mediaAlt(cover, heading || 'Page cover')}
            className="object-cover object-center w-full h-full"
            style={{ position: 'absolute', inset: 0 }}
            fill
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-12 w-full">
        {sub_heading && (
          <div className="text-white text-sm md:text-base font-semibold mb-4 tracking-widest uppercase drop-shadow">
            {sub_heading}
          </div>
        )}
        {heading && (
          <h1 className="text-4xl md:text-7xl text-white mb-8 drop-shadow-lg font-light">
            {decodeHtmlEntitiesSafe(heading)}
          </h1>
        )}
      </div>
    </section>
  );
}

function TextBlockModule({
  content_subheading,
  content_heading,
  content,
}: Extract<PageModule, { acf_fc_layout: 'text_block' }>) {
  if (!content_subheading && !content_heading && !content) return null;
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {content_subheading && (
            <div className="text-[#9d0202] text-sm font-semibold mb-3 tracking-widest uppercase">
              {content_subheading}
            </div>
          )}
          {content_heading && (
            <h2 className="text-2xl md:text-3xl text-gray-900 mb-8">
              {decodeHtmlEntitiesSafe(content_heading)}
            </h2>
          )}
          {content && (
            <div
              className="wysiwyg-content prose max-w-none text-gray-700 text-sm md:text-sm prose-p:mb-8 prose-p:leading-relaxed [&_p]:mb-8"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </div>
      </div>
    </section>
  );
}

function TwoColumnIntroModule({
  content_heading,
  content_subheading,
  content,
}: Extract<PageModule, { acf_fc_layout: 'two_column_intro' }>) {
  if (!content_heading && !content_subheading && !content) return null;
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            {content_heading && (
              <h2 className="text-3xl md:text-5xl text-gray-900 mb-8">
                {decodeHtmlEntitiesSafe(content_heading)}
              </h2>
            )}
            {content_subheading && (
              <div className="text-lg text-[#9d0202] font-semibold mb-6 whitespace-pre-line">
                {content_subheading}
              </div>
            )}
          </div>
          <div>
            {content && (
              <div
                className="prose max-w-none text-gray-700 text-base md:text-lg prose-p:mb-6 force-paragraph-space"
                dangerouslySetInnerHTML={{ __html: ensureParagraphs(content) }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function QuoteModule({ quote }: Extract<PageModule, { acf_fc_layout: 'quote' }>) {
  if (!quote) return null;
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-8">
          <div className="relative pl-8 border-l-4 border-[#9d0202] bg-gray-50/50 p-8 rounded-r-lg">
            <div className="wysiwyg-content" dangerouslySetInnerHTML={{ __html: quote }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ImageTextModule({
  image,
  image_position,
  subheading,
  heading,
  content,
  button,
}: Extract<PageModule, { acf_fc_layout: 'image_text' }>) {
  const src = mediaUrl(image);
  const href = linkUrl(button);
  const imageOnRight = image_position === 'right';

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className={imageOnRight ? 'md:order-2' : ''}>
            {src && (
              <div className="rounded-xl overflow-hidden shadow-xl w-full aspect-[4/3] flex-shrink-0 relative">
                <ForceNativeImage
                  src={src}
                  alt={mediaAlt(image, heading || '')}
                  className="object-cover object-center w-full h-full absolute inset-0"
                  fill
                />
              </div>
            )}
          </div>
          <div className={imageOnRight ? 'md:order-1' : ''}>
            {subheading && (
              <div className="text-xs md:text-sm text-[#9d0202] font-semibold uppercase mb-2 tracking-widest">
                {subheading}
              </div>
            )}
            {heading && (
              <h2 className="text-3xl md:text-5xl text-gray-900 mb-2">
                {decodeHtmlEntitiesSafe(heading)}
              </h2>
            )}
            {content && (
              <div
                className="prose max-w-none text-gray-700 text-base md:text-sm prose-p:mb-6 force-paragraph-space mt-8 mb-6"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}
            {href && (
              <a
                href={href}
                target={button && typeof button === 'object' && button.target ? button.target : undefined}
                rel={button && typeof button === 'object' && button.target === '_blank' ? 'noopener noreferrer' : undefined}
                className="inline-block bg-[#9d0202] text-white font-semibold px-8 py-3 rounded-lg shadow hover:bg-white hover:text-[#9d0202] border-2 border-[#9d0202] transition-colors duration-300 text-base uppercase tracking-wide"
              >
                {(button && typeof button === 'object' && button.title) || 'Read More'}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function GalleryModule({ gallery }: Extract<PageModule, { acf_fc_layout: 'gallery' }>) {
  const images = (gallery || []).filter((img) => img?.url);
  if (images.length === 0) return null;
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <UpperSchoolGallery gallery={images} />
        </div>
      </div>
    </section>
  );
}

function DownloadsModule({
  heading,
  files,
}: Extract<PageModule, { acf_fc_layout: 'downloads' }>) {
  const items = (files || []).filter((item) => fileUrl(item.file));
  if (!heading && items.length === 0) return null;
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {heading && (
            <h2 className="text-2xl md:text-3xl text-[#9d0202] font-bold text-center mb-8">
              {decodeHtmlEntitiesSafe(heading)}
            </h2>
          )}
          <div className="flex flex-wrap justify-center gap-4">
            {items.map((item, idx) => {
              const href = fileUrl(item.file);
              if (!href) return null;
              const label =
                item.title ||
                (item.file && typeof item.file === 'object' && (item.file.title || item.file.filename)) ||
                'Download';
              return (
                <a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#9d0202] hover:bg-[#7a0101] text-white px-8 py-3 rounded-lg font-semibold text-lg transition"
                >
                  {label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function PeopleGridModule({
  heading,
  intro,
  people,
}: Extract<PageModule, { acf_fc_layout: 'people_grid' }>) {
  const list = people || [];
  if (!heading && !intro && list.length === 0) return null;
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {heading && (
          <h2 className="text-2xl md:text-3xl text-[#9d0202] font-bold text-center mb-8">
            {decodeHtmlEntitiesSafe(heading)}
          </h2>
        )}
        {intro && (
          <div className="max-w-4xl mx-auto mb-8 wysiwyg-content text-center">
            <div dangerouslySetInnerHTML={{ __html: intro }} />
          </div>
        )}
        {list.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
            {list.map((person, idx) => {
              const src = mediaUrl(person.image);
              return (
                <div key={idx} className="w-full h-full flex flex-col items-center bg-white rounded-xl shadow p-6">
                  {src && (
                    <div className="w-full h-56 mb-4 rounded-lg overflow-hidden relative">
                      <ForceNativeImage
                        src={src}
                        alt={mediaAlt(person.image, person.name || '')}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  {person.name && (
                    <div className="text-lg font-semibold text-gray-900 mb-1 text-center">{person.name}</div>
                  )}
                  {person.role && (
                    <div className="text-[#9d0202] text-sm font-semibold text-center">{person.role}</div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function renderModule(module: PageModule, index: number) {
  switch (module.acf_fc_layout) {
    case 'hero':
      return <HeroModule key={index} {...module} />;
    case 'text_block':
      return <TextBlockModule key={index} {...module} />;
    case 'two_column_intro':
      return <TwoColumnIntroModule key={index} {...module} />;
    case 'quote':
      return <QuoteModule key={index} {...module} />;
    case 'image_text':
      return <ImageTextModule key={index} {...module} />;
    case 'gallery':
      return <GalleryModule key={index} {...module} />;
    case 'downloads':
      return <DownloadsModule key={index} {...module} />;
    case 'people_grid':
      return <PeopleGridModule key={index} {...module} />;
    default:
      return null;
  }
}

export default function PageModules({ modules }: { modules: PageModule[] }) {
  return <>{modules.map((module, index) => renderModule(module, index))}</>;
}
