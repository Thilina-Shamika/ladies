import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getHeader } from "@/lib/wordpress";
import "yet-another-react-lightbox/styles.css";
import { redirect } from 'next/navigation';

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "Ladies' College - HAEC VICTORIA NOSTRA FIDES 1900",
  description: "Private school for girls",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check for maintenance mode
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
  
  // If maintenance mode is enabled and we're not already on the maintenance page,
  // redirect to the maintenance page
  if (isMaintenanceMode && typeof children === 'object' && children !== null && !children.toString().includes('maintenance')) {
    redirect('/maintenance');
  }

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
