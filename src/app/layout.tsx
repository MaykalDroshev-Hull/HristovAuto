import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Христов АУТО - Премиум авточасти и аксесоари',
  description: 'Получете желаните части за превозното си средство от комфорта на вашия дом. Премиум авточасти, аксесоари и инструменти за всички модели коли.',
  keywords: 'авточасти, автомобилни аксесоари, части за превозни средства, автомобилна индустрия, поддръжка на коли, автомобилен ремонт',
  authors: [{ name: 'Христов АУТО' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Христов АУТО - Премиум авточасти и аксесоари',
    description: 'Получете желаните части за превозното си средство от комфорта на вашия дом.',
    type: 'website',
    locale: 'bg_BG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Христов АУТО - Премиум авточасти и аксесоари',
    description: 'Получете желаните части за превозното си средство от комфорта на вашия дом.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
          integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <script
          src="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js"
          async
        />
      </body>
    </html>
  );
}
