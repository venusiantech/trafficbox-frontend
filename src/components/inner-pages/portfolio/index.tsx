import BreadcrumbSeven from "@/components/common/breadcrumb/breadcrumb-7";
import FooterFour from "@/layout/footers/FooterFour";
import HeaderFour from "@/layout/headers/HeaderFour";
import PortfolioArea from "./PortfolioArea";


const Portfolio = () => {
	return (
		<>
			<HeaderFour />
			<main>
				<BreadcrumbSeven top_title="Case Studies" title="Case Studies" />
				<PortfolioArea />
			</main>
			<FooterFour />
		</>
	);
};

export default Portfolio;