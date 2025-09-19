import BreadcrumbFour from "@/components/common/breadcrumb/breadcrumb-4";
import TestimonialAreaHomeFour from "@/components/homes/home-4/TestimonialAreaHomeFour";
import ReviewAreaHomeFour from "@/components/homes/home-4/ReviewAreaHomeFour";
import FeatureAreaHomeFour from "@/components/homes/home-4/FeatureAreaHomeFour";
import PricingAreaHomeFour from "@/components/homes/home-4/PricingAreaHomeFour";
import FooterFour from "@/layout/footers/FooterFour";
import HeaderFour from "@/layout/headers/HeaderFour";
import KeywordCtaArea from "@/componentsservices/keyword-search/KeywordCtaArea";
import AuditServiceArea from "@/componentsservices/seo-audit/AuditServiceArea";
import ServiceAboutArea from "./ServiceAboutArea";
import Serviceabout from "./Serviceabout";


const Service = () => {
    return (
        <>
            <HeaderFour />
            <main>
                <BreadcrumbFour />
                <ServiceAboutArea />
                <AuditServiceArea style={true} />
                <Serviceabout />
                <FeatureAreaHomeFour />
                <PricingAreaHomeFour />
                <TestimonialAreaHomeFour /> 
                <ReviewAreaHomeFour style={true} service_style={true} />
                <KeywordCtaArea />
            </main>
            <FooterFour />
        </>
    );
};

export default Service