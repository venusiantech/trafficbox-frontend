import ScrollToTop from "@/components/common/scroll-to-top";
import Pricing from "@/components/inner-pages/pricing";
import Wrapper from "@/layout/Wrapper";

export const metadata = {
    title: "Pricing - The Most Advanced Traffic Generator", 
};

const index = () => {
    return (
        <Wrapper>
            <Pricing />
            <ScrollToTop />
        </Wrapper>
    );
};

export default index;