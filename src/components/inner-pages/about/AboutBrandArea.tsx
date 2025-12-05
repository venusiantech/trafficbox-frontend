'use client'
import { useRef } from 'react';
import Image, { StaticImageData } from "next/image";
import Slider from 'react-slick';
import about_brand_img_1 from "@/assets/img/brand/inner-brand-1.png";
import about_brand_img_2 from "@/assets/img/brand/inner-brand-2.png";
import about_brand_img_3 from "@/assets/img/brand/inner-brand-3.png";
import about_brand_img_4 from "@/assets/img/brand/inner-brand-4.png";
import about_brand_img_5 from "@/assets/img/brand/inner-brand-5.png";
import about_brand_img_6 from "@/assets/img/brand/inner-brand-6.png"; 
import ScrollDownBtn from '@/svg/about_btn/ScrollDownBtn'; 

// about brand data type
type AboutBrandContentType = {
    scroll_btn: JSX.Element;
    about_brand: {
        id: number;
        img: StaticImageData;
    }[];
}

// about brand data
const about_brand_content: AboutBrandContentType = {
    scroll_btn: <>Scroll down <br /> to explore more</>,
    about_brand: [
        {id: 1, img: about_brand_img_1},
        {id: 2, img: about_brand_img_2},
        {id: 3, img: about_brand_img_3},
        {id: 4, img: about_brand_img_4},
        {id: 5, img: about_brand_img_5},
        {id: 6, img: about_brand_img_6},
        {id: 7, img: about_brand_img_1},
        {id: 8, img: about_brand_img_2},
        {id: 9, img: about_brand_img_3},
    ]
}

const {scroll_btn, about_brand} = about_brand_content;

const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1800,
            settings: {
                slidesToShow: 5,
            }
        },
        {
            breakpoint: 1600,
            settings: {
                slidesToShow: 4,
            }
        },
        {
            breakpoint: 1400,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                autoplay: true,
            }
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 1,
                autoplay: true,
            }
        }
    ],
};

const AboutBrandArea = () => {
    const sliderRef = useRef(null);
    
    return (
        <>
            <section className="brand-area py-4 mt-80 mb-80" style={{backgroundColor: '#f2f2f2'}}>
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-xl-3 col-lg-4 col-md-5 mb-4 mb-md-0">
                            <div className="brand-wrapper text-center text-md-start">
                                <div className="brand-inner-content">
                                    <h4 className="brand-inner-title mb-3">{scroll_btn}</h4>
                                    <a href="#our-misson" className="d-inline-block">
                                        <i className="scroll-btn-icon"><ScrollDownBtn /></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8 col-lg-8 col-md-7">
                            <div className="brand-slider-container">
                                <Slider 
                                    {...sliderSettings} 
                                    ref={sliderRef} 
                                    className="brand-inner-wrapper"
                                >
                                    {about_brand.map((item, i) => (
                                        <div key={i} className="brand-item px-2">
                                            <div className="brand-img-wrapper d-flex align-items-center justify-content-center">
                                                <Image 
                                                    src={item.img} 
                                                    alt="TrafficBox Partner" 
                                                    className="img-fluid"
                                                    style={{ maxHeight: '80px', width: 'auto' }}
                                                />
                                            </div>
                                        </div>                                
                                    ))}                                
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutBrandArea;