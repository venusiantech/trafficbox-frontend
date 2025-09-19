
import TeamDetailsDynamic from '@/components/inner-pages/team-details-dynamic';
import team_data from '@/data/team';
import ScrollToTop from '@/components/common/scroll-to-top';
import Wrapper from '@/layout/Wrapper';
import FooterFour from '@/layout/footers/FooterFour';
import HeaderFour from '@/layout/headers/HeaderFour'; 

export const metadata = {
    title: "Team Details - SEO Marketing - Digital Marketing & SEO Agency Next js Template", 
};

const index = ({ params }: any) => {
    const { id } = params;
    const single_member = team_data.find((item) => Number(item.id) === Number(id));
    return (
        <Wrapper>
            <HeaderFour />
            <main>
                <TeamDetailsDynamic single_member={single_member} />
            </main>
            <FooterFour />
            <ScrollToTop style={false} />te
        </Wrapper>
    );
};

export default index;