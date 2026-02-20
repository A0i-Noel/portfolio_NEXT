import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/sass/global.scss"
import { LanguageProvider } from "@/contexts/languageCtx";
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'Aoi Kuriki — Developer & Startup',
    template: '%s | Aoi Kuriki',
  },
  description: 'Portfolio of Aoi Kuriki — building thoughtful digital experiences.',
  keywords: ['developer', 'portfolio', 'frontend', 'fullstack'],
  authors: [{ name: 'Aoi Kuriki' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ja_JP',
    siteName: 'Aoi Kuriki Portfolio',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <LanguageProvider>
          <Toaster />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}