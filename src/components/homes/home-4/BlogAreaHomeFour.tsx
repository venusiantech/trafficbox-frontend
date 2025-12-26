"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { blogService, Blog } from "@/services/blogService";

import blog_shape from "@/assets/img/shape/blog-4-shape-1.png";

// blog content data type
interface blog_content_type {
    sub_title: string;
    title: string;
}

// blog content 
const blog_content: blog_content_type = {
    sub_title: "What's Going On",
    title: "Company blog & Insights",
}
const { sub_title, title } = blog_content

const BlogAreaHomeFour = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch blogs from API
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const response = await blogService.getPublicBlogs();
                console.log("Fetched blogs:", response.blogs.length, "blogs");
                setBlogs(response.blogs);
                setError(null);
            } catch (err) {
                console.error("Error fetching blogs:", err);
                setError("Failed to load blogs. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);


    return (
        <>
            {error ? "" :<section className="blog-area pb-50 p-relative fix">
                <div className="tpblog-4-shape wow bounceIn d-none d-lg-block" data-wow-duration=".6s" data-wow-delay=".6s">
                    <Image src={blog_shape} alt="theme-pure" />
                </div>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-8 ">
                            <div className="section-wrapper mb-50">
                                <span>{sub_title}</span>
                                <h5 className="section-title-4 section-title-4-2">{title}</h5>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="blog-all-btn text-lg-end mb-40">
                                <Link href="/blog" className="blue-btn">More Articles</Link>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {blogs.slice(0, 2).map((item, i) =>
                            <div key={i} className="col-lg-6">
                                <div className="tpblog-4 p-relative mb-60">
                                    <div className="tpblog-4-thumb" style={{ backgroundImage: `url(${item.imageUrl})` }}></div>
                                    <div className="row justify-content-end">
                                        <div className="col-lg-7 col-md-7">
                                            <div className="tpblog-4-content">
                                                <h4 className="tpblog-4-content-title">
                                                    <Link href={`/blog-details?slug=${item.slug}`}>{item.title.slice(0, 50)}...</Link>
                                                </h4>
                                                <p>{blogService.getExcerpt(
                                                    item.summary || item.content,
                                                    80
                                                )}</p>
                                                <div className="tpblog-4-info">
                                                    <span>
                                                        <i className="far fa-calendar-check"></i>
                                                        {" "}
                                                        {blogService.formatDate(item.createdAt)}
                                                    </span>
                                                    <span>
                                                        <a href="#">
                                                            <i className="far fa-user"></i>
                                                            {" "}
                                                            {item.author?.firstName} {item.author?.lastName}
                                                        </a>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>}
        </>
    );
};

export default BlogAreaHomeFour;