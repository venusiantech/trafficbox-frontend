import ScrollToTop from "@/components/common/scroll-to-top";
import Wrapper from "@/layout/Wrapper";
import MarketingAnalysis from "@/components/services/marketing-analysis";

export const metadata = {
    title: "Marketing analysis - The Most Advanced Traffic Generator", 
};
const index = () => {
    return (
        <Wrapper>
            <MarketingAnalysis />
            <ScrollToTop  />            
        </Wrapper>
    );
};

export default index;