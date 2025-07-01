const fs = require('fs');
const path = require('path');

const pages = [
  '',
  '/about',
  '/projects',
  '/contact'
];

const locales = ['en', 'ja'];
const baseUrl = 'https://yourwebsite.com';

function generateSitemap() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map(page => 
  locales.map(locale => `
  <url>
    <loc>${baseUrl}/${locale}${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
    ${locales.map(altLocale => `
    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${baseUrl}/${altLocale}${page}"/>`).join('')}
  </url>`).join('')
).join('')}
</urlset>`;

  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully!');
}

generateSitemap();