import type { Metadata } from "next";
import { DM_Sans, Noto_Sans_JP, JetBrains_Mono } from "next/font/google";
import "../styles/sass/global.scss"
import { LanguageProvider } from "@/contexts/languageCtx";
import { Toaster } from 'react-hot-toast';

// Fonts are self-hosted via next/font; SCSS reads them through these CSS variables
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-jp",
  weight: ["400", "500", "700"],
  preload: false, // large CJK font — only fetched when Japanese glyphs render
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
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
      <body className={`${dmSans.variable} ${notoSansJP.variable} ${jetBrainsMono.variable}`}>
        <LanguageProvider>
          <Toaster />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}