import Contact from "@/components/contact";
import ScrollToTop from "@/components/common/scroll-to-top";
import Wrapper from "@/layout/Wrapper";

export const metadata = {
    title: "Contact TrafficBoxes - Get AI SEO Audit & Organic Traffic Quote",
    description: "Contact TrafficBoxes for premium organic traffic packages and AI-powered SEO audits. Get personalized quotes for website traffic generation and artificial intelligence SEO analysis services.",
    keywords: [
        'contact TrafficBoxes',
        'organic traffic quote',
        'AI SEO audit quote',
        'website traffic consultation',
        'SEO audit consultation',
        'organic traffic inquiry',
        'AI-powered SEO consultation',
        'TrafficBoxes contact',
        'get organic traffic quote',
        'SEO services contact'
    ],
    openGraph: {
        title: 'Contact TrafficBoxes - Get AI SEO Audit & Organic Traffic Quote',
        description: 'Contact TrafficBoxes for premium organic traffic and AI-powered SEO audit services.',
        url: 'https://trafficboxes.com/contact',
        type: 'website',
    },
    alternates: {
        canonical: 'https://trafficboxes.com/contact',
    },
};

const index = () => {
    return (
        <Wrapper>
            <Contact />
            <ScrollToTop />
        </Wrapper>
    );
};

export default index;