import HomeOne from "@/components/homes/home-4";
import ScrollToTop from "@/components/common/scroll-to-top";
import Wrapper from "@/layout/Wrapper";

export const metadata = {
  title: "Trafficboxes.com - Digital Marketing & SEO Agency", 
};
const index = () => {
  return (
    <Wrapper> 
       <HomeOne />
       <ScrollToTop style={false} />
    </Wrapper>
  );
};

export default index;