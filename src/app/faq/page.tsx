import ScrollToTop from "@/components/common/scroll-to-top";
import FAQ from "@/components/inner-pages/faq";
import Wrapper from "@/layout/Wrapper";


export const metadata = {
    title: "FAQ - SEO Marketing - The Most Advanced Traffic Generator", 
};

const index = () => {
    return (
        <Wrapper>
            <FAQ />
            <ScrollToTop />            
        </Wrapper>
    );
};

export default index;