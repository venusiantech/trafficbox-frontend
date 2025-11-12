"use client";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import PrevBlogIcon from "@/svg/inner-pages-icons/PrevBlogIcon";
import NextBlogIcon from "@/svg/inner-pages-icons/NextBlogIcon";
import VideoPopup from "@/components/modals/video-popup";
import BlogSidebar from "@/components/inner-pages/blog-sidebar";
import { blogService, Blog } from "@/services/blogService";

import blog_thumb_1 from "@/assets/img/blog/blog-big-3.jpg";
import blog_thumb_2 from "@/assets/img/blog/blog-big-2.jpg";
import blog_slider_1 from "@/assets/img/blog/blog-big-4.jpg";
import blog_slider_2 from "@/assets/img/blog/blog-big-5.jpg";
import blog_slider_3 from "@/assets/img/blog/blog-big-6.jpg";

// blog article data type
interface blog_article_type {
  id: number;
  cls_1?: string;
  cls_2?: string;
  img?: StaticImageData;
  time?: string;
  post_writer?: string;
  comments?: string;
  title?: JSX.Element;
  article?: JSX.Element;

  blockquote_text?: string;
  cite_text?: string;
  audio_src?: string;
  slider?: StaticImageData[];
}
[];

// blog article data
const blog_article: blog_article_type[] = [
  {
    id: 1,
    cls_1: "format-image",
    cls_2: "",
    img: blog_thumb_1,
    time: "July 21, 2023",
    post_writer: "MR Tanvir",
    comments: "02",
    title: <>Perfect From Beginning to End Faster and More Efficiently</>,
    article: (
      <>
        Voluptate ipsum dolor sit amet, consectetur adipisicing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
        sint occaecat […]
      </>
    ),
  },
  {
    id: 2,
    cls_1: "format-video",
    cls_2: "tp-postbox-video p-relative",
    img: blog_thumb_2,
    time: "July 24, 2023",
    post_writer: "RJ Salman",
    comments: "05",
    title: <>Six Ways to Improve Conversions and Makes Employes Happy </>,
    article: (
      <>
        Voluptate ipsum dolor sit amet, consectetur adipisicing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
        sint occaecat […]
      </>
    ),
  },
  {
    id: 3,
    cls_1: "format-quote",
    cls_2: "tp-postbox-quote",
    blockquote_text:
      "There are only two ways to live your life. One is as though nothing is a miracle. The other is as though everything is a miracle.",
    cite_text: "MR Tanvir",
  },
  {
    id: 4,
    cls_1: "format-audio",
    cls_2: "tp-postbox-audio p-relative",
    audio_src:
      "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/316547873&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
    time: "July 14, 2023",
    post_writer: "RJ Tutul",
    comments: "07",
    title: (
      <>Complete Link Building Guide for Beginners From the Professionals</>
    ),
    article: (
      <>
        Voluptate ipsum dolor sit amet, consectetur adipisicing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
        sint occaecat […]
      </>
    ),
  },
  {
    id: 5,
    cls_1: "format-image",
    cls_2: "tp-postbox-audio p-relative",
    slider: [blog_slider_1, blog_slider_2, blog_slider_3],
    time: "July 18, 2023",
    post_writer: "RJ Farabi",
    comments: "07",
    title: <>Getting Ready to Chase Google Sitelinks</>,
    article: (
      <>
        Voluptate ipsum dolor sit amet, consectetur adipisicing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
        sint occaecat […]
      </>
    ),
  },
];

const setting = {
  slidesPerView: 1,
  spaceBetween: 0,
  autoplay: {
    delay: 3000,
  },
  navigation: {
    nextEl: ".tp-postbox-slider-button-next",
    prevEl: ".tp-postbox-slider-button-prev",
  },
  breakpoints: {
    "1200": {
      slidesPerView: 1,
    },
    "992": {
      slidesPerView: 1,
    },
    "768": {
      slidesPerView: 1,
    },
    "576": {
      slidesPerView: 1,
    },
    "0": {
      slidesPerView: 1,
    },
  },
};

const BlogPostboxArea = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await blogService.getPublicBlogs();
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

  // Helper function to get author full name
  const getAuthorName = (blog: Blog) => {
    return `${blog.author.firstName} ${blog.author.lastName}`;
  };

  return (
    <>
      <section className="tp-postbox-area pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-8">
              {/* Loading State */}
              {loading && (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3">Loading blogs...</p>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {/* Blog Posts */}
              {!loading && !error && (
                <div className="tp-postbox-wrapper">
                  {blogs.map((blog, i) => (
                    <article
                      key={blog._id}
                      className={`tp-postbox-item format-image mb-50 transition-3`}
                    >
                      {/* Blog Thumbnail */}
                      <div className="tp-postbox-thumb w-img">
                        <Link href={`/blog-details?slug=${blog.slug}`}>
                          <Image
                            src={blog.imageUrl || blog_thumb_1}
                            alt={blog.title}
                            width={800}
                            height={450}
                            style={{ width: "100%", height: "auto" }}
                          />
                        </Link>
                      </div>

                      {/* Blog Content */}
                      <div className="tp-postbox-content">
                        <div className="tp-postbox-meta">
                          <span>
                            <i className="far fa-calendar-check"></i>{" "}
                            {blogService.formatDate(blog.createdAt)}
                          </span>
                          <span>
                            <a href="#">
                              <i className="far fa-user"></i>{" "}
                              {getAuthorName(blog)}
                            </a>
                          </span>
                          <span>
                            <a href="#">
                              <i className="fal fa-clock"></i>{" "}
                              {blogService.calculateReadTime(blog.content)}
                            </a>
                          </span>
                        </div>
                        <h3 className="tp-postbox-title">
                          <Link href={`/blog-details?slug=${blog.slug}`}>
                            {blog.title}
                          </Link>
                        </h3>
                        <div className="tp-postbox-text">
                          <p>
                            {blogService.getExcerpt(
                              blog.summary || blog.content,
                              200
                            )}
                          </p>
                        </div>
                        <div className="tp-postbox-read-more">
                          <Link
                            href={`/blog-details?slug=${blog.slug}`}
                            className="tp-btn"
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}

                  {/* Pagination */}
                  <div className="basic-pagination mt-30 mb-30">
                    <nav>
                      <ul>
                        <li>
                          {" "}
                          <Link href="/blog">
                            {" "}
                            <i>
                              {" "}
                              <PrevBlogIcon />{" "}
                            </i>{" "}
                          </Link>{" "}
                        </li>
                        <li>
                          {" "}
                          <span className="current">
                            {" "}
                            Next page{" "}
                            <i>
                              {" "}
                              <NextBlogIcon />{" "}
                            </i>{" "}
                          </span>{" "}
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              )}

              {/* Empty State */}
              {!loading && !error && blogs.length === 0 && (
                <div className="text-center py-5">
                  <h3>No blogs available at the moment</h3>
                  <p className="text-muted">
                    Please check back later for new content.
                  </p>
                </div>
              )}
            </div>
            <BlogSidebar />
          </div>
        </div>
      </section>

      {/* video modal start */}
      <VideoPopup
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        videoId={"TYYf8zYjP5k"}
      />
      {/* video modal end */}
    </>
  );
};

export default BlogPostboxArea;
