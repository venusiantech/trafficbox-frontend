import ScrollToTop from "@/components/common/scroll-to-top";
import Wrapper from "@/layout/Wrapper";
import MarketingAnalysis from "@/components/services/marketing-analysis";

export const metadata = {
    title: "AI Marketing Analysis & Website Insights | TrafficBoxes",
    description: "Comprehensive AI-powered marketing analysis and website performance insights. Advanced artificial intelligence technology for competitive analysis and marketing optimization.",
    keywords: [
        'AI marketing analysis',
        'website performance analysis',
        'AI-powered marketing insights',
        'competitive marketing analysis',
        'artificial intelligence marketing',
        'marketing optimization AI',
        'website analytics AI',
        'marketing intelligence platform',
        'AI marketing tools',
        'automated marketing analysis'
    ],
    openGraph: {
        title: 'AI Marketing Analysis & Website Insights | TrafficBoxes',
        description: 'Comprehensive AI-powered marketing analysis and website performance insights with advanced artificial intelligence.',
        url: 'https://trafficboxes.com/marketing-analysis',
        type: 'website',
    },
    alternates: {
        canonical: 'https://trafficboxes.com/marketing-analysis',
    },
};
const index = () => {
    return (
        <Wrapper>
            <MarketingAnalysis />
            <ScrollToTop  />            
        </Wrapper>
    );
};

export default index;