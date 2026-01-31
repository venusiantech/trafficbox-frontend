 
import Blog from '@/components/blogs/blog';
import ScrollToTop from '@/components/common/scroll-to-top';
import Wrapper from '@/layout/Wrapper';
export const metadata = {
    title: "SEO & Organic Traffic Blog - AI-Powered Insights | TrafficBoxes",
    description: "Read expert insights on organic traffic generation, AI-powered SEO audits, and advanced website optimization strategies. Latest tips and guides from TrafficBoxes SEO experts.",
    keywords: [
        'SEO blog',
        'organic traffic tips',
        'AI SEO insights',
        'website optimization blog',
        'SEO audit guides',
        'organic traffic strategies',
        'AI-powered SEO tips',
        'TrafficBoxes blog',
        'SEO marketing insights',
        'website traffic blog'
    ],
    openGraph: {
        title: 'SEO & Organic Traffic Blog - AI-Powered Insights | TrafficBoxes',
        description: 'Expert insights on organic traffic generation and AI-powered SEO audits from TrafficBoxes.',
        url: 'https://trafficboxes.com/blog',
        type: 'website',
    },
    alternates: {
        canonical: 'https://trafficboxes.com/blog',
    },
};
const index = () => {
    return (
        <Wrapper>
            <Blog />
            <ScrollToTop />            
        </Wrapper>
    );
};

export default index;