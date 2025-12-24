import Contact from "@/components/contact";
import ScrollToTop from "@/components/common/scroll-to-top";
import Wrapper from "@/layout/Wrapper";

export const metadata = {
    title: "Contact Trafficboxes Team - The Most Advanced Traffic Generator", 
};

const index = () => {
    return (
        <Wrapper>
            <Contact />
            <ScrollToTop />
        </Wrapper>
    );
};

export default index;