# Headless WordPress with Next.js

A modern, performant, and SEO-friendly headless WordPress site built with Next.js.

## Features

- 🚀 Next.js 14 with App Router
- 💅 Tailwind CSS for styling
- 🎨 shadcn/ui components
- 📱 Fully responsive design
- 🖼️ Image optimization with Sharp
- 🔍 SEO optimized
- 🎭 Framer Motion animations
- 📸 Yet Another React Lightbox
- 📱 Swiper for sliders
- 🔄 WordPress REST API integration
- 📝 ACF support

## Prerequisites

- Node.js 18+ and pnpm
- WordPress site with REST API enabled
- ACF plugin installed and configured

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_WORDPRESS_API_URL=your-wordpress-site-url
NEXT_PUBLIC_WORDPRESS_NONCE=your-wordpress-nonce
```

4. Start the development server:

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## WordPress Setup

1. Install and activate the following plugins:

   - Advanced Custom Fields (ACF)
   - ACF to REST API (if needed)

2. Configure your WordPress site:
   - Enable REST API
   - Set up your ACF fields
   - Configure permalinks (recommended: Post name)

## Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/         # React components
├── lib/               # Utility functions and configurations
└── styles/            # Global styles
```

## Development

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript type checking

## Deployment

The project can be deployed to any platform that supports Next.js applications, such as Vercel, Netlify, or a custom server.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.
