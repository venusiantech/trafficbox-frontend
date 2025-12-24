import BlogList from '@/components/blogs/blog-list';
import ScrollToTop from '@/components/common/scroll-to-top';
import Wrapper from '@/layout/Wrapper';

export const metadata = {
    title: "Blog List - SEO Marketing - The Most Advanced Traffic Generator",
};

const index = () => {
    return (
        <Wrapper>
            <BlogList />
            <ScrollToTop />
        </Wrapper>
    );
};

export default index;