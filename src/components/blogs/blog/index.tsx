import FooterFour from "@/layout/footers/FooterFour";
import HeaderFour from "@/layout/headers/HeaderFour";
import ModernBlogArea from "./ModernBlogArea";


const Blog = () => {
    return (
        <>
            <HeaderFour />
            <main>
                <ModernBlogArea />
            </main>
            <FooterFour />
        </>
    );
};

export default Blog;