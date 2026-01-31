import "../styles/index.scss";
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'TrafficBoxes - Buy Organic Traffic & AI SEO Audits',
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
        <link rel="canonical" href="https://trafficboxes.com" />
        <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" />
        <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" />
        <meta name="yandex-verification" content="YOUR_YANDEX_VERIFICATION_CODE" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
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
              "alternateName": "TrafficBoxes.com",
              "url": "https://trafficboxes.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://trafficboxes.com/logo/TrafficBoxes_Logo.png",
                "width": 400,
                "height": 400
              },
              "description": "AI-powered SEO audit platform and organic traffic marketplace. Advanced artificial intelligence technology for deep website analysis and targeted organic visitor generation.",
              "foundingDate": "2023",
              "areaServed": "Worldwide",
              "serviceType": ["SEO Audit", "Organic Traffic Generation", "AI-Powered Website Analysis"],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "TrafficBoxes Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "AI-Powered SEO Audit",
                      "description": "Comprehensive website analysis using artificial intelligence technology"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Organic Traffic Generation",
                      "description": "High-quality targeted organic website visitors"
                    }
                  }
                ]
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "areaServed": "Worldwide",
                "availableLanguage": ["English"]
              },
              "sameAs": [
                "https://www.facebook.com/trafficboxes",
                "https://www.linkedin.com/company/trafficboxes",
                "https://twitter.com/trafficboxes"
              ]
            })
          }}
        />

        {/* Website Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "TrafficBoxes",
              "url": "https://trafficboxes.com",
              "description": "Buy organic traffic and get AI-powered SEO audits",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://trafficboxes.com/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        {/* Service Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "AI-Powered SEO Audit and Organic Traffic Services",
              "description": "Professional AI-powered SEO audits and high-quality organic traffic generation services",
              "provider": {
                "@type": "Organization",
                "name": "TrafficBoxes",
                "url": "https://trafficboxes.com"
              },
              "areaServed": "Worldwide",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "SEO and Traffic Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "AI SEO Audit",
                      "description": "Comprehensive AI-powered website analysis and SEO audit"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Organic Traffic",
                      "description": "High-quality targeted organic website visitors"
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
