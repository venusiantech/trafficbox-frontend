import AuditFeatureTwo from "./AuditFeatureTwo";
import AuditServiceArea from "./AuditServiceArea";
import AuditFeatureArea from "./AuditFeatureArea";
import AuditKeywordArea from "./AuditKeywordArea";
import HeaderFour from "@/layout/headers/HeaderFour";
import QualityServicesArea from "./QualityServicesArea";
import FooterFour from "@/layout/footers/FooterFour";
import BreadcrumbThree from "@/components/common/breadcrumb/breadcrumb-3";

// image import 
import banner_service from "@/assets/img/services/social-media/services-social-media-bg-5.jpg";
const SeoAudit = () => {
    return (
        <>
             <HeaderFour />
             <main>
                <BreadcrumbThree sub_title="SEO Audit Services"  title={<>In-Deepth Site Audit for <br /> your website</>}
                img={banner_service} style={false} />
                 <AuditServiceArea />
                 <QualityServicesArea />
                 <AuditFeatureArea />
                 <AuditFeatureTwo />
                 <AuditKeywordArea />
             </main>
             <FooterFour />
        </>
    );
};

export default SeoAudit;