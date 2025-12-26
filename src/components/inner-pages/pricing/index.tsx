import BreadcrumbSix from "@/components/common/breadcrumb/breadcrumb-6";
// import FeatureAreaHomeFour from "@/components/homes/home-4/FeatureAreaHomeFour";
import FooterFour from "@/layout/footers/FooterFour";
import HeaderFour from "@/layout/headers/HeaderFour";
// import BrandArea from "./BrandArea";
import ComparisonArea from "./ComparisonArea";
import PricingArea from "./PricingArea";

const Pricing = () => {
    return (
        <>
            <HeaderFour />
            <main>
                <BreadcrumbSix />
                <PricingArea />
                <ComparisonArea />
                {/* <BrandArea /> */}
                {/* <FeatureAreaHomeFour /> */}
            </main>
            <FooterFour />
        </>
    );
};

export default Pricing;