
import ScrollToTop from '@/components/common/scroll-to-top';
import BlogMasonry from '@/components/inner-pages/blog-masonry';
import Wrapper from '@/layout/Wrapper';

export const metadata = {
    title: "Blog Masonry - SEO Marketing - The Most Advanced Traffic Generator",
};

const index = () => {
    return (
        <Wrapper>
            <BlogMasonry />
            <ScrollToTop />            
        </Wrapper>
    );
};

export default index;