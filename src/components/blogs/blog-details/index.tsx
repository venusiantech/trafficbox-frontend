import FooterFour from "@/layout/footers/FooterFour";
import HeaderFour from "@/layout/headers/HeaderFour";
import BlogDetailsArticleArea from "./BlogDetailsArticleArea";
import BlogDetailsPostboxArea from "./BlogDetailsPostboxArea";


const BlogDetails = () => {
    return (
        <>
            <HeaderFour />
            <main> 
                <BlogDetailsPostboxArea />
                {/* <BlogDetailsArticleArea /> */}
            </main>
            <FooterFour />
        </>
    );
};

export default BlogDetails;