import FooterFour from "@/layout/footers/FooterFour";
import HeaderFour from "@/layout/headers/HeaderFour";
import ContactArea from "./ContactArea";
import GoogleMapArea from "./GoogleMapArea";



const Contact = () => {
    return (
        <>
            <HeaderFour />
            <main>
                <ContactArea />
                <GoogleMapArea />
            </main>
            <FooterFour />
        </>
    );
};

export default Contact;