import ScrollToTop from "@/components/common/scroll-to-top";
import Wrapper from "@/layout/Wrapper";
import SeoAudit from "@/components/services/seo-audit";

export const metadata = {
    title: "AI-Powered SEO Audit - Deep Website Analysis | TrafficBoxes",
    description: "Get comprehensive AI-powered SEO audits with advanced artificial intelligence technology. Deep website analysis, technical SEO insights, and actionable recommendations to boost your rankings.",
    keywords: [
        'AI SEO audit',
        'AI-powered SEO analysis',
        'deep SEO audit',
        'artificial intelligence SEO audit',
        'automated SEO analysis',
        'comprehensive SEO audit',
        'AI website audit',
        'intelligent SEO analysis',
        'machine learning SEO audit',
        'advanced SEO audit service'
    ],
    openGraph: {
        title: 'AI-Powered SEO Audit - Deep Website Analysis | TrafficBoxes',
        description: 'Get comprehensive AI-powered SEO audits with advanced artificial intelligence technology.',
        url: 'https://trafficboxes.com/seo-audit',
        type: 'website',
    },
    alternates: {
        canonical: 'https://trafficboxes.com/seo-audit',
    },
};
const index = () => {
    return (
        <Wrapper>
            <SeoAudit />
            <ScrollToTop style={false} />
        </Wrapper>
    );
};

export default index;