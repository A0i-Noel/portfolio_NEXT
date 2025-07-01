import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./components/layouts/header/Header";
import Footer from "./components/layouts/footer/Footer";
import "../styles/sass/global.scss"
import { LanguageProvider } from "@/contexts/languageCtx";
import LanguageSwitch from "./components/elements/LanguageSwitch";
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
  title: "Aoi Kuriki",
  description: "Aoi Kuriki's Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <LanguageSwitch />
          <Toaster />
          <body 
            className={`${geistSans.variable} ${geistMono.variable} `} >
            {children}
          </body>
        </LanguageProvider>
      </body>
    </html>
  );
}
