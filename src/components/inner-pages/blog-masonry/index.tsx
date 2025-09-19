import BreadcrumbNine from "@/components/common/breadcrumb/breadcrumb-9";
import FooterFour from "@/layout/footers/FooterFour";
import HeaderFour from "@/layout/headers/HeaderFour";
import PostboxAreaMasonry from "./PostboxAreaMasonry";


const BlogMasonry = () => {
    return (
        <>
            <HeaderFour />
            <main>
                <BreadcrumbNine top_title="Blog Masonry" title="Blog Masonry" />
                <PostboxAreaMasonry />
            </main>
            <FooterFour />
        </>
    );
};

export default BlogMasonry;