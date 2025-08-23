import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ladiescollege.lk'
  
  // Static pages
  const staticPages = [
    '',
    '/about-us',
    '/contact-us',
    '/news',
    '/events',
    '/blog',
    '/principal',
    '/administration',
    '/kindergarten',
    '/primary-middle-school',
    '/upper-school',
    '/advance-level-choices',
    '/special-education-unit',
    '/sports-complex',
    '/science-laboratory',
    '/lilian-nixon-library',
    '/mabel-simon-hall',
    '/information-technology',
    '/hostel-and-day-care',
    '/career-guidance',
    '/college-profile',
    '/annual-reports',
    '/archives',
    '/resources',
    '/school-hymn',
    '/the-ethos',
    '/vision-mission',
    '/history-of-ladies-college',
    '/125-years',
    '/in-the-classroom',
    '/learning-environments',
    '/lcips',
    '/privacy-policy',
    '/terms-conditions',
  ]

  // Generate static page entries
  const staticEntries = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: page === '' ? 'daily' : 'weekly' as const,
    priority: page === '' ? 1 : 0.8,
  }))

  // Dynamic blog posts (if you have them)
  let blogEntries: MetadataRoute.Sitemap = []
  try {
    const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL
    if (apiUrl) {
      const response = await fetch(`${apiUrl}/wp-json/wp/v2/posts?per_page=100&_embed`)
      if (response.ok) {
        const posts = await response.json()
        blogEntries = posts.map((post: any) => ({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: new Date(post.modified),
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        }))
      }
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error)
  }

  // Dynamic events (if you have them)
  let eventEntries: MetadataRoute.Sitemap = []
  try {
    const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL
    if (apiUrl) {
      const response = await fetch(`${apiUrl}/wp-json/wp/v2/events?per_page=100&_embed`)
      if (response.ok) {
        const events = await response.json()
        eventEntries = events.map((event: any) => ({
          url: `${baseUrl}/events/${event.slug}`,
          lastModified: new Date(event.modified),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        }))
      }
    }
  } catch (error) {
    console.error('Error fetching events for sitemap:', error)
  }

  return [...staticEntries, ...blogEntries, ...eventEntries]
}
