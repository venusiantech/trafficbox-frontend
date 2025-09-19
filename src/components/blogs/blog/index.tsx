import BreadcrumbNine from "@/components/common/breadcrumb/breadcrumb-9";
import FooterFour from "@/layout/footers/FooterFour";
import HeaderFour from "@/layout/headers/HeaderFour";
import BlogPostboxArea from "./BlogPostboxArea";


const Blog = () => {
    return (
        <>
            <HeaderFour />
            <main>
                <BreadcrumbNine top_title="Blog" title="Blog" />
                <BlogPostboxArea />
            </main>
            <FooterFour />
        </>
    );
};

export default Blog;