import ScrollToTop from "@/components/common/scroll-to-top";
import Pricing from "@/components/inner-pages/pricing";
import Wrapper from "@/layout/Wrapper";

export const metadata = {
    title: "Organic Traffic & AI SEO Audit Pricing | TrafficBoxes",
    description: "Transparent pricing for premium organic traffic packages and AI-powered SEO audits. Affordable plans for high-quality website traffic and comprehensive artificial intelligence SEO analysis.",
    keywords: [
        'organic traffic pricing',
        'AI SEO audit pricing',
        'website traffic packages',
        'organic traffic cost',
        'SEO audit pricing',
        'buy organic traffic price',
        'AI-powered SEO audit cost',
        'TrafficBoxes pricing',
        'organic visitor packages',
        'SEO services pricing'
    ],
    openGraph: {
        title: 'Organic Traffic & AI SEO Audit Pricing | TrafficBoxes',
        description: 'Transparent pricing for premium organic traffic and AI-powered SEO audit services.',
        url: 'https://trafficboxes.com/pricing',
        type: 'website',
    },
    alternates: {
        canonical: 'https://trafficboxes.com/pricing',
    },
};

const index = () => {
    return (
        <Wrapper>
            <Pricing />
            <ScrollToTop />
        </Wrapper>
    );
};

export default index;