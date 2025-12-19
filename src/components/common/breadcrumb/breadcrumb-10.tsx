import Image from "next/image";
import ClockBlogIcon from "@/svg/blogs_icon/ClockBlogIcon";
import CommentBlogIcon from "@/svg/blogs_icon/CommentBlogIcon";
import ViewsBlogIcon from "@/svg/blogs_icon/ViewsBlogIcon";

import shape_dots from "@/assets/img/shape/inner-dots-shape.png";
import Link from "next/link";


type breadcrumb_content_type = {
    bg_img: string;
    top_title: string;
    title: JSX.Element;
    post_writer: string;
    time: string;
    comments: string;
}

// const breadcrumb_content: breadcrumb_content_type = {
//     bg_img: "/assets/img/blog/blog-details-banner-1.jpg",
//     top_title: "Technical SEO",
//     title: <>10 Quick Tips About <br /> Blogging</>,
//     post_writer: "Jim Séchen",
//     time: "Oct 16,2023",
//     comments: "05",
// }
// const { top_title, title, post_writer, time, comments } = breadcrumb_content

const BreadcrumbTen = ({ author, time, title, views }: { author: string, time: string, views: string, title: string }) => {
    return (
        <>
            <section 
                className="position-relative pb-5"
            >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="d-flex flex-column text-black py-5">                                
                                {/* Title */}
                                <h4 className="display-4 fw-bold mb-4 text-black">
                                    {title}
                                </h4>
                                
                                {/* Meta Information */}
                                <div className="d-flex flex-wrap align-items-center gap-3 text-black-50">
                                    {/* Author */}
                                    <span className="d-flex align-items-center gap-2">
                                        <a 
                                            href="#" 
                                            className="text-black-50 text-decoration-none d-flex align-items-center gap-2"
                                        >
                                            <img 
                                                src="assets/img/blog/comments/blog-details-avatar-1.png" 
                                                alt="theme-pure"
                                                className="rounded-circle"
                                                style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                                            />
                                            <span>{author}</span>
                                        </a>
                                    </span>
                                    
                                    {/* Time */}
                                    <span className="d-flex align-items-center gap-2">
                                        <i className="d-flex align-items-center">
                                            <ClockBlogIcon />
                                        </i>
                                        <span>{time}</span>
                                    </span>
                                    
                                    {/* <span className="d-flex align-items-center gap-2">
                                        <a 
                                            href="#" 
                                            className="text-black-50 text-decoration-none d-flex align-items-center gap-2"
                                        >
                                            <i className="d-flex align-items-center">
                                                <CommentBlogIcon />
                                            </i>
                                            <span>{comments} Comment</span>
                                        </a>
                                    </span> */}
                                    
                                    {/* Views */}
                                    <span className="d-flex align-items-center gap-2">
                                        <i className="d-flex align-items-center">
                                            <ViewsBlogIcon />
                                        </i>
                                        <span>{views}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Decorative Shape */}
                <div className="position-absolute bottom-0 end-0" style={{ zIndex: 1 }}>
                    <Image src={shape_dots} alt="theme-pure" />
                </div>
            </section>
        </>
    );
};

export default BreadcrumbTen;