import BreadcrumbNine from "@/components/common/breadcrumb/breadcrumb-9";
import FooterFour from "@/layout/footers/FooterFour";
import HeaderFour from "@/layout/headers/HeaderFour";
import PostboxArea from "./PostboxArea";

const BlogGrid = () => {
    return (
        <>
            <HeaderFour />
            <main>
                <BreadcrumbNine title={"Blog Grid"} top_title={"Blog Grid"} />
                <PostboxArea />
            </main>
            <FooterFour />
        </>
    );
};

export default BlogGrid;