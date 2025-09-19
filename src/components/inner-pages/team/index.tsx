import BreadcrumbFive from "@/components/common/breadcrumb/breadcrumb-5";
import TestimonialAreaHomeFour from "@/components/homes/home-4/TestimonialAreaHomeFour";
import FooterFour from "@/layout/footers/FooterFour";
import HeaderFour from "@/layout/headers/HeaderFour";
import KeywordCtaArea from "@/componentsservices/keyword-search/KeywordCtaArea";
import AboutArea from "./AboutArea";

 

 
 const Team = () => {
    return (
        <>
            <HeaderFour />
            <main>
                <BreadcrumbFive />
                <AboutArea />
                <TestimonialAreaHomeFour />
                <KeywordCtaArea />
            </main>
            <FooterFour />
        </>
    );
 };
 
 export default Team;