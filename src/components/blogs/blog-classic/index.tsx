import BreadcrumbNine from "@/components/common/breadcrumb/breadcrumb-9";
import FooterFour from "@/layout/footers/FooterFour";
import HeaderFour from "@/layout/headers/HeaderFour";
import BlogPostboxArea from "../blog/BlogPostboxArea";

const BlogClassic = () => {
  return (
    <>
      <HeaderFour />
      <main>
        <BreadcrumbNine top_title="Blog Classic" title="Blog Classic" />
        <BlogPostboxArea />
      </main>
      <FooterFour />
    </>
  );
};

export default BlogClassic;
