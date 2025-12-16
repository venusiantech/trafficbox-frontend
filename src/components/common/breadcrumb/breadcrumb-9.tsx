'use client'
import Image from "next/image";
import Link from "next/link";

import shape from '@/assets/img/shape/inner-dots-shape.png';
import breadcrumbBg from '/assets/img/breadcrumb/breadcrumb-bg-1.jpg';

type breadcrumb_9_content_type = {
    top_title?: string;
    title?: string;
}

const BreadcrumbNine = ({title, top_title}: breadcrumb_9_content_type) => {
    return (
        <>
            {/* Breadcrumb Header Section */}
            <section className="breadcrumb-area pt-100 pb-60 mt-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-6 col-lg-6">
                            <div className="breadcrumb__content">
                                <h3 className="breadcrumb__title mb-3">{top_title}</h3>
                                <div className="breadcrumb__list">
                                    <span><Link href="/" className="text-decoration-none">Home</Link></span>
                                    <span className="dvdr mx-2">/</span>
                                    <span className="text-muted">{title}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6">
                            <div className="breadcrumb__image text-end">
                                <div className="position-relative d-inline-block">
                                    <Image 
                                        src="/assets/img/breadcrumb/breadcrumb-bg-1.jpg"
                                        alt="Breadcrumb Banner" 
                                        width={500}
                                        height={300}
                                        className="img-fluid rounded-3 shadow-lg"
                                        style={{
                                            objectFit: 'cover',
                                            maxHeight: '300px'
                                        }}
                                    />
                                    <div className="breadcrumb__overlay position-absolute top-0 start-0 w-100 h-100 rounded-3 d-flex align-items-center justify-content-center">
                                        <div className="inner-shape-dots position-absolute" style={{ top: '20px', right: '20px' }}>
                                            <Image 
                                                src={shape} 
                                                alt="decorative shape" 
                                                width={60}
                                                height={60}
                                                className="opacity-75"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BreadcrumbNine;