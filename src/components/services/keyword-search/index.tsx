import BreadcrumbTwo from "@/components/common/breadcrumb/breadcrumb-2"; 
import FeatureAreaHomeFour from "@/components/homes/home-4/FeatureAreaHomeFour";
import TestimonialAreaHomeFour from "@/components/homes/home-4/TestimonialAreaHomeFour";
import HeaderFour from "@/layout/headers/HeaderFour";
import KeywordArea from "./KeywordArea";
import KeywordCtaArea from "./KeywordCtaArea";
import KeywordDetailsArea from "./KeywordDetailsArea";
import KeywordFeatureArea from "./KeywordFeatureArea";
import FooterFour from "@/layout/footers/FooterFour";


const KeywordSearch = () => {
    return (
        <>
            <HeaderFour />
            <main>
                <BreadcrumbTwo />
                <KeywordDetailsArea />
                <KeywordFeatureArea />
                <KeywordArea />
                <FeatureAreaHomeFour />
                <TestimonialAreaHomeFour />
                <KeywordCtaArea />
            </main>
            <FooterFour />
        </>
    );
};

export default KeywordSearch;