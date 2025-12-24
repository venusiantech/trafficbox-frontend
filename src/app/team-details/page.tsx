import ScrollToTop from "@/components/common/scroll-to-top";
import TeamDetails from "@/components/inner-pages/team-details";
import Wrapper from "@/layout/Wrapper";


export const metadata = {
    title: "Team Details - SEO Marketing - The Most Advanced Traffic Generator", 
  };
const index = () => {
    return (
        <Wrapper>
            <TeamDetails />
            <ScrollToTop style={false} />
        </Wrapper>
    );
};

export default index;