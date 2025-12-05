'use client'
import Link from 'next/link';
import Image from 'next/image';

import banner_img from "@/assets/img/about/about-inner-1.jpg";

type BreadcrumbContentType = {
    top_title: string;
    title: string;
    sub_title: string;
    inner_title: string;
    inner_info: JSX.Element;
}

const breadcrumb_content: BreadcrumbContentType = {
    top_title: "About Us",
    title: "About Us",
    sub_title: "At TrafficBoxes, we are",
    inner_title: "Working Hard to Make SEO Easy. Together",
    inner_info: <>Empowering your business to grow with smarter, <br /> simpler SEO solutions.</>,
}

const {top_title, title, sub_title, inner_title, inner_info} = breadcrumb_content;

const Breadcrumb = () => { 
    return (
        <>
            {/* <!-- breadcrumb-area-start --> */}
            <section className="breadcrumb-area pt-80 pb-80">
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-8 col-xl-10">
                            <div className="breadcrumb__content">
                                <h3 className="breadcrumb__title">{top_title}</h3>
                                <div className="breadcrumb__list">
                                    <span><Link href="/">Home</Link></span>
                                    <span className="dvdr"></span>
                                    <span>{title}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- breadcrumb-area-end --> */}
            
            {/* <!-- about-area-start --> */}
            <section className="about-area">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="row align-items-center">
                                <div className="col-lg-7">
                                    <div className="about-inner-thumb mb-4 mb-lg-0">
                                        <Image 
                                            src={banner_img} 
                                            alt="TrafficBox" 
                                            className="img-fluid rounded"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-5">
                                    <div className="about-inner-content">
                                        <span className="subtitle">{sub_title}</span>
                                        <h4 className="about-inner-title">{inner_title}</h4>
                                        <p>{inner_info}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- about-area-end --> */}
        </>
    );
};

export default Breadcrumb;