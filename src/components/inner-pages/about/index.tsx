import AboutBrandArea from './AboutBrandArea';
import AboutCounterArea from './AboutCounterArea';
import AboutCompanyArea from './AboutCompanyArea';
import AboutMissionArea from './AboutMissionArea';
import HeaderFour from "@/layout/headers/HeaderFour";
import Breadcrumb from '@/components/common/breadcrumb/breadcrumb';
import AwardAreaHomeFour from '@/components/homes/home-4/AwardAreaHomeFour';
import CounterAreaHomeFour from '@/components/homes/home-4/CounterAreaHomeFour';
import FeatureAreaHomeFour from '@/components/homes/home-4/FeatureAreaHomeFour';
import FooterFour from "@/layout/footers/FooterFour";

const About = () => {
	return (
		<>
			<HeaderFour />
			<main>
				<Breadcrumb />
				<AboutBrandArea />
				<FeatureAreaHomeFour />
				<AboutMissionArea />
				<AboutCounterArea />
				<AboutCompanyArea />
				<AwardAreaHomeFour />
				<CounterAreaHomeFour />
			</main>
			<FooterFour />
		</>
	);
};

export default About;