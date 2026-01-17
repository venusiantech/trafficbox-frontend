import "../styles/index.scss";
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'TrafficBoxes - Professional SEO & Digital Marketing Agency',
    template: '%s | TrafficBoxes'
  },
  description: 'Buy high-quality organic traffic and get comprehensive AI-powered SEO audits with TrafficBoxes. Advanced SEO analysis using artificial intelligence to boost your website rankings and drive targeted organic visitors.',
  keywords: [
    'buy organic traffic',
    'organic website traffic',
    'AI SEO audit',
    'AI-powered SEO analysis',
    'deep SEO audit',
    'artificial intelligence SEO',
    'TrafficBoxes',
    'organic traffic for sale',
    'targeted organic visitors',
    'SEO audit with AI',
    'automated SEO analysis',
    'machine learning SEO',
    'AI website audit',
    'organic traffic generation',
    'SEO intelligence platform'
  ],
  authors: [{ name: 'TrafficBox Team' }],
  creator: 'TrafficBox',
  publisher: 'TrafficBox',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://trafficboxes.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'TrafficBoxes - Buy Organic Traffic & AI SEO Audits',
    description: 'Purchase high-quality organic traffic and get AI-powered deep SEO audits. Advanced artificial intelligence technology for comprehensive website analysis and organic visitor generation.',
    siteName: 'TrafficBoxes',
    images: [
      {
        url: '/logo/TrafficBoxes_Logo.png',
        width: 1200,
        height: 630,
        alt: 'TrafficBox - SEO & Digital Marketing Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrafficBoxes - Buy Organic Traffic & AI SEO Audits',
    description: 'Purchase organic traffic and get AI-powered SEO audits with advanced artificial intelligence technology.',
    images: ['/logo/TrafficBoxes_Logo.png'],
    creator: '@trafficboxes',
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
  manifest: '/manifest.json',
  category: 'business',
}

export const viewport: Viewport = {
  themeColor: '#667eea',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head> 
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/logo/TrafficBoxes_Logo.png" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&family=Urbanist:wght@300;400;500;600;700;800&display=swap"
        />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "TrafficBoxes",
              "url": "https://trafficboxes.com",
              "logo": "https://trafficboxes.com/logo/TrafficBoxes_Logo.png",
              "description": "AI-powered SEO audit platform and organic traffic marketplace. Advanced artificial intelligence technology for deep website analysis and targeted organic visitor generation."
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
