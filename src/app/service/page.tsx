import ScrollToTop from '@/components/common/scroll-to-top';
import Wrapper from '@/layout/Wrapper';
import Service from '@/components/inner-pages/service';

export const metadata = {
    title: "Organic Traffic & AI SEO Services | TrafficBoxes",
    description: "Explore our premium services: buy high-quality organic traffic and get AI-powered deep SEO audits. Advanced artificial intelligence technology for website optimization and traffic generation.",
    keywords: [
        'organic traffic services',
        'AI SEO services',
        'buy organic traffic',
        'AI-powered SEO audit',
        'website traffic services',
        'artificial intelligence SEO',
        'organic visitor generation',
        'SEO audit services',
        'targeted website traffic',
        'AI website analysis'
    ],
    openGraph: {
        title: 'Organic Traffic & AI SEO Services | TrafficBoxes',
        description: 'Premium organic traffic and AI-powered SEO audit services with advanced artificial intelligence technology.',
        url: 'https://trafficboxes.com/service',
        type: 'website',
    },
    alternates: {
        canonical: 'https://trafficboxes.com/service',
    },
};
const index = () => {
    return (
        <Wrapper>
            <Service />
            <ScrollToTop style={false} />
        </Wrapper>
    );
};

export default index;