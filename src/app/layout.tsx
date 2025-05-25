import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getHeader } from "@/lib/wordpress";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ladies Headless",
  description: "A headless WordPress site built with Next.js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let headerData = null;
  
  // Check if WordPress API URL is configured
  const wpApiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  if (!wpApiUrl) {
    console.error('WordPress API URL is not configured. Please set NEXT_PUBLIC_WORDPRESS_API_URL in .env.local');
  } else {
    console.log('WordPress API URL:', wpApiUrl);
    try {
      headerData = await getHeader();
    } catch (error) {
      console.error('Error in layout:', error);
    }
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header headerData={headerData} />
        <main className="min-h-screen pt-32 pb-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
