import BreadcrumbEight from "@/components/common/breadcrumb/breadcrumb-8";
import FooterFour from "@/layout/footers/FooterFour";
import HeaderFour from "@/layout/headers/HeaderFour";
import PortfolioDetailsArea from "./PortfolioDetailsArea";



const PortfolioDetails = () => {
    return (
        <>
            <HeaderFour />
            <main>
                <BreadcrumbEight />
                <PortfolioDetailsArea />
            </main>
            <FooterFour />
        </>
    );
};

export default PortfolioDetails;