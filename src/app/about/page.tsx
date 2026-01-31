import About from "@/components/inner-pages/about";
import Wrapper from "@/layout/Wrapper";
import ScrollToTop from "@/components/common/scroll-to-top";

export const metadata = {
    title: "About TrafficBoxes - AI-Powered SEO Audit & Organic Traffic Platform",
    description: "Learn about TrafficBoxes, the leading platform for purchasing high-quality organic traffic and conducting AI-powered deep SEO audits. Advanced artificial intelligence technology for website optimization.",
    keywords: [
        'about TrafficBoxes',
        'AI SEO audit platform',
        'organic traffic marketplace',
        'artificial intelligence SEO',
        'website traffic company',
        'SEO audit service',
        'organic traffic provider',
        'AI-powered website analysis'
    ],
    openGraph: {
        title: 'About TrafficBoxes - AI SEO Audit & Organic Traffic Platform',
        description: 'Learn about TrafficBoxes, the leading platform for AI-powered SEO audits and organic traffic generation.',
        url: 'https://trafficboxes.com/about',
        type: 'website',
    },
    alternates: {
        canonical: 'https://trafficboxes.com/about',
    },
};
const index = () => {
    return (
        <Wrapper>
            <About />
            <ScrollToTop />
        </Wrapper>
    );
};

export default index;