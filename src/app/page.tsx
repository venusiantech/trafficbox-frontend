import HomeOne from "@/components/homes/home-4";
import ScrollToTop from "@/components/common/scroll-to-top";
import Wrapper from "@/layout/Wrapper";
import Script from "next/script";

export const metadata = {
  title: "TrafficBoxes - Buy Organic Traffic & AI-Powered SEO Audits",
  description: "Purchase high-quality organic website traffic and get comprehensive AI-powered SEO audits. Advanced artificial intelligence technology for deep website analysis and targeted organic visitor generation.",
  keywords: [
    'buy organic traffic',
    'organic website traffic for sale',
    'AI SEO audit',
    'AI-powered SEO analysis',
    'purchase organic visitors',
    'targeted website traffic',
    'artificial intelligence SEO audit',
    'deep SEO analysis',
    'organic traffic marketplace',
    'TrafficBoxes'
  ],
  openGraph: {
    title: 'TrafficBoxes - Buy Organic Traffic & AI SEO Audits',
    description: 'Purchase high-quality organic website traffic and get comprehensive AI-powered SEO audits with advanced artificial intelligence technology.',
    url: 'https://trafficboxes.com',
    type: 'website',
    images: [
      {
        url: 'https://trafficboxes.com/logo/TrafficBoxes_Logo.png',
        width: 1200,
        height: 630,
        alt: 'TrafficBoxes - Organic Traffic & AI SEO Audits',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrafficBoxes - Buy Organic Traffic & AI SEO Audits',
    description: 'Purchase organic traffic and get AI-powered SEO audits with advanced AI technology.',
  },
  alternates: {
    canonical: 'https://trafficboxes.com',
  },
};
const index = () => {
  return (
    <Wrapper> 
       <HomeOne />
       <ScrollToTop style={false} />
       <Script
         id="tawk-to-script"
         strategy="afterInteractive"
         dangerouslySetInnerHTML={{
           __html: `
             var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
             (function(){
               var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
               s1.async=true;
               s1.src='https://embed.tawk.to/69623e3da17050197cae77b0/1jejs68pc';
               s1.charset='UTF-8';
               s1.setAttribute('crossorigin','*');
               s0.parentNode.insertBefore(s1,s0);
             })();
           `,
         }}
       />
    </Wrapper>
  );
};

export default index;