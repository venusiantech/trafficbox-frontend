import ScrollToTop from "@/components/common/scroll-to-top";
import BlogGrid from "@/components/inner-pages/blog-grid";
import Wrapper from "@/layout/Wrapper";

export const metadata = {
    title: "Blog Grid - SEO Marketing - The Most Advanced Traffic Generator",
};
const index = () => {
    return (
        <Wrapper>
            <BlogGrid />
            <ScrollToTop />
        </Wrapper>
    );
};

export default index;