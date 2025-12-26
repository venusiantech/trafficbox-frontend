
import EmailIconContact from "@/svg/contact_icon/EmailIconContact";
import PhoneIconContact from "@/svg/contact_icon/PhoneIconContact";
import RightArrowIconContact from "@/svg/contact_icon/RightArrowIconContact";
import { SocialLinksTwo } from "../common/social-links";
import ContactUs from "../forms/ContactUs";

type ContactContentType = {
    title: string;
    sm_info: JSX.Element;
    email: string;
    phone: string;
    btn_text: string;
}

const contactContent: ContactContentType = {
    title: "Get in Touch",
    sm_info: <>If you need help with your account or have questions about credit sesame, please visit our Help center.</>,
    email: "connect@trafficboxes.com",
    phone: "+38 267 627 722",
    btn_text: "Contact Us",
}

const { title, sm_info, email, phone, btn_text } = contactContent;

const ContactArea = () => {
    return (
        <section className="contact-area pb-200 pt-150">
            <div className="container">
                <div className="row g-4 justify-content-between">
                    <div className="col-lg-5">
                        <div className="contact-content">
                            <h4 className="contact-title mb-4">{title}</h4>
                            <p className="mb-4">{sm_info}</p>
                            
                            <div className="contact-info mb-4">
                                <a href={`mailto:${email}`} className="contact-mail d-flex align-items-center mb-3">
                                    <span className="contact-icon me-3"><EmailIconContact /></span>
                                    <span className="flex-grow-1">{email}</span>
                                    <i className="arrow-icon"><RightArrowIconContact /></i>
                                </a>
                                <a href={`tel:${phone}`} className="contact-mail d-flex align-items-center">
                                    <span className="contact-icon me-3"><PhoneIconContact /></span>
                                    <span className="flex-grow-1">{phone}</span>
                                    <i className="arrow-icon"><RightArrowIconContact /></i>
                                </a>
                            </div>
                            
                            <div className="contact-social mt-4">
                                <SocialLinksTwo />
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-6">
                        <div className="contact-form p-4 rounded">
                            <h4 className="contact-form-title mb-4">{btn_text}</h4>
                            <ContactUs />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactArea;