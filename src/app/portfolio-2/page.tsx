import ScrollToTop from "@/components/common/scroll-to-top";
import PortfolioTwo from "@/components/inner-pages/portfolio-2";
import Wrapper from "@/layout/Wrapper";

export const metadata = {
    title: "Portfolio Two - The Most Advanced Traffic Generator", 
};
const index = () => {
    return (
        <Wrapper>
            <PortfolioTwo />
            <ScrollToTop />
        </Wrapper>
    );
};

export default index;