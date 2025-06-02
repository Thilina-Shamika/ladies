"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface TileItem {
  tile_image: { url: string; alt: string };
  tile_heading: string;
  tile_link: { title: string; url: string; target?: string };
}

interface TilesProps {
  items: TileItem[];
}

const getGridCols = (count: number) => {
  if (count >= 5) return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5";
  if (count === 4) return "grid-cols-2 sm:grid-cols-2 md:grid-cols-4";
  if (count === 3) return "grid-cols-2 sm:grid-cols-3";
  return "grid-cols-2";
};

const Tiles: React.FC<TilesProps> = ({ items }) => {
  const gridCols = getGridCols(items.length);
  return (
    <section className="pt-0 pb-12">
      <div
        className={`grid ${gridCols} gap-0 bg-[#9d0202] rounded-lg overflow-hidden border border-white`}
      >
        {items.map((item, idx) => {
          // Convert WordPress absolute URLs to relative paths for Next.js Link
          const nextHref = typeof item.tile_link.url === 'string' ? item.tile_link.url.replace(/^https?:\/\/[^/]+/, '') : '#';
          if (nextHref.startsWith('mailto:') || nextHref.startsWith('tel:')) {
            return (
              <a
                key={idx}
                href={nextHref}
                target={item.tile_link.target || undefined}
                rel={item.tile_link.target === '_blank' ? 'noopener noreferrer' : undefined}
                className="flex flex-col items-center justify-center px-4 py-8 border-white border-b border-r last:border-r-0 md:last:border-b-0 md:border-b-0 md:border-r"
                style={{ minHeight: 180 }}
              >
                <div className="mb-4">
                  <Image
                    src={item.tile_image.url}
                    alt={item.tile_image.alt || item.tile_heading}
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <div className="text-white text-center text-base font-semibold leading-tight">
                  {item.tile_heading}
                </div>
              </a>
            );
          }
          return (
            <Link
              key={idx}
              href={nextHref}
              className="flex flex-col items-center justify-center px-4 py-8 border-white border-b border-r last:border-r-0 md:last:border-b-0 md:border-b-0 md:border-r"
              style={{ minHeight: 180 }}
            >
              <div className="mb-4">
                <Image
                  src={item.tile_image.url}
                  alt={item.tile_image.alt || item.tile_heading}
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
              <div className="text-white text-center text-base font-semibold leading-tight">
                {item.tile_heading}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Tiles; 