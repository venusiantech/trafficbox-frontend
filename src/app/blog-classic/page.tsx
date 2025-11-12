import BlogClassic from "@/components/blogs/blog-classic";
import ScrollToTop from "@/components/common/scroll-to-top";
import Wrapper from "@/layout/Wrapper";

export const metadata = {
  title: "Blog Classic - TrafficBox - Digital Marketing & SEO Agency",
};

const BlogClassicPage = () => {
  return (
    <Wrapper>
      <BlogClassic />
      <ScrollToTop />
    </Wrapper>
  );
};

export default BlogClassicPage;
