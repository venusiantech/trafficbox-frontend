import Link from "next/link";
import Image from "next/image";
import FooterCommonLinkItem from "./FooterCommonLinkItem";
import { SocialLinksTwo } from "@/components/common/social-links";
import SubcribeHomeFour from "@/components/forms/SubcribeHomeFour";

 const footer_content = {
    footer_info: <>trafficboxes.com is your trusted partner <br /> for digital marketing and <br /> SEO solutions</>,
    subcribe: "Subcribe.",
    title: "Only valuable resource no bullshit",

 }
 const {footer_info, subcribe, title}  = footer_content

const FooterFour = () => {
    return (
        <>
            <footer>
                <div className="footer-area footer-bg-4 pt-60 pb-20">
                    <div className="container">
                    <div className="footer-top">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="footer-widget footer-4-col-1 mb-30">
                                <div className="footer-widget-logo mb-15">
                                    <Link href="/">
                                        <span> <Image src="/logo/TrafficBoxes_Logo.png" alt="trafficboxes.com" width={180} height={45} /> </span>
                                    </Link>
                                </div>
                                <div className="footer-widget-content">
                                    <p className="footer-widget-text mb-15">{footer_info} </p>
                                    <div className="fooer-btn-4">
                                        <Link className="blue-btn" href="/keyword-search">Grow Traffic</Link>
                                    </div>
                                </div>
                                </div>
                            </div>
                            
                            <div className="col-lg-5 col-md-12">
                                <div className="row">
                                    <FooterCommonLinkItem /> 
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 col-sm-8">
                                <div className="footer-widget footer-4-col-4 mb-30">
                                    <h4 className="footer-widget-title mb-15">{subcribe}</h4>
                                    <div className="footer-widget-content mb-20">
                                        <p className="footer-widget-text mb-15">{title}</p>
                                            <SubcribeHomeFour />
                                    </div>
                                    <div className="footer-widget-social">
                                        {/* <SocialLinksTwo />  */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom-4">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="footer-widget-copyright footer-widget-copyright-4 text-center">
                                    <span>© {new Date().getFullYear()} <Link href="/">Trafficboxes.com</Link> All Rights Reserved.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default FooterFour;