import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage = '/og-image.jpg',
  canonicalUrl
}) => {
  const router = useRouter();
  const { locale, asPath } = router;
  
  const baseUrl = 'https://aoikuriki.com';
  const fullUrl = `${baseUrl}${asPath}`;
  const canonical = canonicalUrl || fullUrl;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Your Name" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Hreflang for multilingual SEO */}
      <link rel="alternate" hrefLang="en" href={`${baseUrl}/en${asPath}`} />
      <link rel="alternate" hrefLang="ja" href={`${baseUrl}/ja${asPath}`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/en${asPath}`} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={`${baseUrl}${ogImage}`} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={locale === 'ja' ? 'ja_JP' : 'en_US'} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={`${baseUrl}${ogImage}`} />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content={locale} />
      <meta httpEquiv="Content-Language" content={locale} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* Structured Data for Portfolio */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://aoikuriki.com",
            "@type": "Person",
            "name": "Aoi Kuriki",
            "jobTitle": "Full Stack Developer",
            "url": baseUrl,
            "sameAs": [
              "https://www.linkedin.com/in/aoi-kuriki-6aa160233/",
              "https://github.com/A0i-Noel",
              "https://www.instagram.com/noel_glue/"
            ],
            "knowsAbout": [
              "JavaScript",
              "TypeScript",
              "React",
              "Next.js",
              "Node.js",
              "Web Development",
              "React Native",
              "Mobile App Development"
            ]
          })
        }}
      />
    </Head>
  );
};

export default SEOHead;