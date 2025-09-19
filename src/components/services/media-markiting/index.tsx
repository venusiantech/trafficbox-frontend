// image import 
import banner_service from "@/assets/img/services/social-media/services-social-media-bg-2.jpg";


import BreadcrumbThree from "@/components/common/breadcrumb/breadcrumb-3";
import ContactAreaHomeFour from "@/components/homes/home-4/ContactAreaHomeFour";
import FooterFour from "@/layout/footers/FooterFour";
import HeaderFour from "@/layout/headers/HeaderFour";
import MediaFeaturesArea from "./MediaFeaturesArea";
import MediaOptimizeArea from "./MediaOptimizeArea";
import MediaServices from "./MediaServices";
import MediaServicesArea from "./MediaServicesArea";
import MediaVideoArea from "./MediaVideoArea";


const MediaMarkiting = () => {
    return (
        <>
            <HeaderFour />
            <main>
                <BreadcrumbThree sub_title="Social Media Marketing"
                    title={<>Enabling your {'brand’s'} Success via social media</>} img={banner_service} style={true} />
                <MediaFeaturesArea />
                <MediaServicesArea />
                <MediaOptimizeArea />
                <MediaVideoArea />
                <MediaServices />
                <ContactAreaHomeFour />
            </main>
            <FooterFour />
        </>
    );
};

export default MediaMarkiting;