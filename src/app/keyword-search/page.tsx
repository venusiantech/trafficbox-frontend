import ScrollToTop from "@/components/common/scroll-to-top";
import KeywordSearch from "@/components/services/keyword-search";
import Wrapper from "@/layout/Wrapper";

export const metadata = {
    title: "AI-Powered Keyword Research & Analysis | TrafficBoxes",
    description: "Advanced AI-powered keyword research and analysis tools. Discover high-value keywords for organic traffic generation and SEO optimization with artificial intelligence technology.",
    keywords: [
        'AI keyword research',
        'keyword analysis tool',
        'AI-powered keyword tool',
        'organic traffic keywords',
        'SEO keyword research',
        'artificial intelligence keywords',
        'keyword opportunity analysis',
        'competitive keyword research',
        'long-tail keyword research',
        'keyword difficulty analysis'
    ],
    openGraph: {
        title: 'AI-Powered Keyword Research & Analysis | TrafficBoxes',
        description: 'Advanced AI-powered keyword research tools for organic traffic generation and SEO optimization.',
        url: 'https://trafficboxes.com/keyword-search',
        type: 'website',
    },
    alternates: {
        canonical: 'https://trafficboxes.com/keyword-search',
    },
};

const index = () => {
    return (
        <Wrapper>
            <KeywordSearch />
            <ScrollToTop style={false} />
        </Wrapper>
    );
};

export default index;