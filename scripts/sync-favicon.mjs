/**
 * Downloads the favicon from WordPress and updates local copies used by Next.js.
 * Run: node scripts/sync-favicon.mjs
 */
import { writeFileSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const apiBase = (process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://kal.cse.mybluehost.me').replace(/\/+$/, '');
const apiUrl = `${apiBase}/wp-json/wp/v2/favicon?slug=favicon&acf_format=standard`;

const res = await fetch(apiUrl);
if (!res.ok) {
  console.error('Failed to fetch favicon:', res.status, res.statusText);
  process.exit(1);
}

const data = await res.json();
const imageUrl = data?.[0]?.acf?.favicon?.url;
if (!imageUrl) {
  console.error('No favicon URL in WordPress response');
  process.exit(1);
}

const imageRes = await fetch(imageUrl);
if (!imageRes.ok) {
  console.error('Failed to download favicon image:', imageRes.status);
  process.exit(1);
}

const buffer = Buffer.from(await imageRes.arrayBuffer());
const publicPath = join(root, 'public', 'favicon.ico');
const appIconPath = join(root, 'src', 'app', 'icon.png');

writeFileSync(publicPath, buffer);
copyFileSync(publicPath, appIconPath);

console.log('Favicon synced from', imageUrl);
