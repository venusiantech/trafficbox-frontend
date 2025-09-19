import BreadcrumbNine from "@/components/common/breadcrumb/breadcrumb-9";
import FooterFour from "@/layout/footers/FooterFour";
import HeaderFour from "@/layout/headers/HeaderFour";
import BlogListPostboxArea from "./BlogListPostboxArea";


const BlogList = () => {
    return (
        <>
            <HeaderFour />
            <main>
                <BreadcrumbNine top_title="Blog List" title="Blog List" />
                <BlogListPostboxArea />
            </main>
            <FooterFour />
        </>
    );
};

export default BlogList;