import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getHeader, getFavicon } from "@/lib/wordpress";
import "yet-another-react-lightbox/styles.css";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export async function generateMetadata(): Promise<Metadata> {
  const favicon = await getFavicon();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ladiescollege.lk';
  
  return {
    title: {
      default: "Ladies' College Colombo - Premier Girls' School in Sri Lanka | HAEC VICTORIA NOSTRA FIDES 1900",
      template: "%s | Ladies' College Colombo"
    },
    description: "Ladies' College Colombo is one of Sri Lanka's premier girls' schools, established in 1900. Offering excellence in education from kindergarten to advanced level with modern facilities, dedicated teachers, and a rich heritage.",
    keywords: [
      "Ladies' College Colombo",
      "girls' school Sri Lanka",
      "private school Colombo",
      "premier girls' education",
      "Sri Lanka girls' school",
      "Colombo private school",
      "kindergarten to advanced level",
      "excellence in education",
      "HAEC VICTORIA NOSTRA FIDES",
      "1900 established school"
    ],
    authors: [{ name: "Ladies' College Colombo" }],
    creator: "Ladies' College Colombo",
    publisher: "Ladies' College Colombo",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteUrl,
      title: "Ladies' College Colombo - Premier Girls' School in Sri Lanka",
      description: "Ladies' College Colombo is one of Sri Lanka's premier girls' schools, established in 1900. Offering excellence in education from kindergarten to advanced level.",
      siteName: "Ladies' College Colombo",
      images: [
        {
          url: `${siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "Ladies' College Colombo - Premier Girls' School",
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: "Ladies' College Colombo - Premier Girls' School in Sri Lanka",
      description: "Ladies' College Colombo is one of Sri Lanka's premier girls' schools, established in 1900. Offering excellence in education from kindergarten to advanced level.",
      images: [`${siteUrl}/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
    icons: {
      icon: favicon?.url || '/favicon.ico',
      shortcut: favicon?.url || '/favicon.ico',
      apple: favicon?.url || '/apple-touch-icon.png',
    },
    manifest: '/manifest.json',
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
  let headerData = null;
  
  // Check if WordPress API URL is configured
  const wpApiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  if (!wpApiUrl) {
    console.error('WordPress API URL is not configured. Please set NEXT_PUBLIC_WORDPRESS_API_URL in .env.local');
  } else {
    try {
      headerData = await getHeader();
    } catch (error) {
      console.error('Error in layout:', error);
    }
  }

  return (
    <html lang="en">
      <body className={poppins.className}>
        {!isMaintenanceMode && <Header headerData={headerData} />}
        <main>
          {children}
        </main>
        {!isMaintenanceMode && <Footer />}
      </body>
    </html>
  );
}
