// image import 
import banner_service from "@/assets/img/services/social-media/services-social-media-bg-4.jpg";

import BreadcrumbThree from "@/components/common/breadcrumb/breadcrumb-3";
import TestimonialAreaHomeFour from "@/components/homes/home-4/TestimonialAreaHomeFour";
import FooterFour from "@/layout/footers/FooterFour";
import HeaderFour from "@/layout/headers/HeaderFour";
import KeywordArea from "../keyword-search/KeywordArea";
import KeywordFeatureArea from "../keyword-search/KeywordFeatureArea";
import MarketingFeatureArea from "./MarketingFeatureArea";


const MarketingAnalysis = () => {
    return (
        <>
            <HeaderFour />
            <main>
                <BreadcrumbThree sub_title="Your free SEO analysis."
                    title={<>Why is Trafficboxes SEO analysis so much better?</>} img={banner_service} style={true} />
                <KeywordFeatureArea style={true} />
                <KeywordArea />
                <MarketingFeatureArea />
                <TestimonialAreaHomeFour />
            </main>
            <FooterFour />
        </>
    );
};

export default MarketingAnalysis;