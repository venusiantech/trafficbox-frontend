"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import VideoPopup from "@/componentsmodals/video-popup";
import UserIcon from "@/svg/inner-pages-icons/UserIcon";
import ClockIcon from "@/svg/inner-pages-icons/ClockIcon";
import PrevBlogIcon from "@/svg/inner-pages-icons/PrevBlogIcon";
import NextBlogIcon from "@/svg/inner-pages-icons/NextBlogIcon";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { blogService, Blog } from "@/services/blogService";

const PostboxAreaMasonry = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await blogService.getPublicBlogs();
        setBlogs(data.blogs);
        setError(null);
      } catch (err) {
        setError('Failed to load blogs. Please try again later.');
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const getAuthorName = (blog: Blog) => {
    if (blog.author) {
      return `${blog.author.firstName} ${blog.author.lastName}`;
    }
    return 'Anonymous';
  };

  return (
    <>
      <section className="postbox__area pt-120 pb-90">
        <div className="container container-lagre-box">
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

          {/* Masonry Grid */}
          {!loading && !error && blogs.length > 0 && (
            <ResponsiveMasonry
              className="row blog-masonry-active"
              columnsCountBreakPoints={{ 0: 1, 750: 3, 992: 4 }}
            >
              <Masonry gutter="20px">
                {blogs.map((blog, i) => (
                  <div key={blog._id} className="blog-masonry-item-active">
                    <div className="tpblog-item-2 mb-30">
                      <div className="tpblog-thumb-2 masonry_video">
                        <Link href={`/blog-details?slug=${blog.slug}`}>
                          {blog.imageUrl && (
                            <Image 
                              src={blog.imageUrl} 
                              alt={blog.title}
                              width={400}
                              height={300}
                              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                            />
                          )}
                        </Link>
                      </div>

                      <div className="tpblog-wrap">
                        <div className="tpblog-content-2">
                          <span>
                            <Link href={`/blog-details?slug=${blog.slug}`}>
                              {blog.summary ? blogService.getExcerpt(blog.summary, 20) : 'Blog'}
                            </Link>
                          </span>
                          <h4 className="tpblog-title-2">
                            <Link href={`/blog-details?slug=${blog.slug}`}>
                              {blog.title}
                            </Link>
                          </h4>
                        </div>
                        <div className="tpblog-meta-2">
                          <span>
                            <i>
                              <ClockIcon />{" "}
                            </i>
                            {blogService.formatDate(blog.createdAt)}
                          </span>
                          <span>
                            <a href="#">
                              <i>
                                <UserIcon />{" "}
                              </i>
                              {getAuthorName(blog)}
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          )}

          {/* Empty State */}
          {!loading && !error && blogs.length === 0 && (
            <div className="text-center py-5">
              <p>No blogs found.</p>
            </div>
          )}
          <div className="row">
            <div className="col-lg-12">
              <div className="basic-pagination text-center pt-30">
                <nav>
                  <ul>
                    <li>
                      <Link href="/blog">
                        <i>
                          <PrevBlogIcon />
                        </i>
                      </Link>
                    </li>
                    <li>
                      <span className="current">
                        Next page{" "}
                        <i>
                          <NextBlogIcon />
                        </i>
                      </span>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
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

export default PostboxAreaMasonry;
