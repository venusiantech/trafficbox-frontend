import ScrollToTop from "@/components/common/scroll-to-top";
import Portfolio from "@/components/inner-pages/portfolio";
import Wrapper from "@/layout/Wrapper";

export const metadata = {
    title: "Portfolio - The Most Advanced Traffic Generator", 
};
const index = () => {
    return (
        <Wrapper>
            <Portfolio />  
            <ScrollToTop />                     
        </Wrapper>
    );
};

export default index;