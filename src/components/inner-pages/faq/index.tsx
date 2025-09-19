import BreadcrumbSeven from "@/components/common/breadcrumb/breadcrumb-7";
import BrandAreaHomeFour from "@/components/homes/home-4/BrandAreaHomeFour";
import ContactAreaHomeFour from "@/components/homes/home-4/ContactAreaHomeFour";
import FeatureAreaHomeFour from "@/components/homes/home-4/FeatureAreaHomeFour";
import FooterFour from "@/layout/footers/FooterFour";
import HeaderFour from "@/layout/headers/HeaderFour";



const FAQ = () => {
    return (
        <>
            <HeaderFour />
            <main>
                <BreadcrumbSeven top_title="FAQ" title="FAQ" />
                <FeatureAreaHomeFour />
                <ContactAreaHomeFour />
                <BrandAreaHomeFour />
            </main>
            <FooterFour />
        </>
    );
};

export default FAQ;