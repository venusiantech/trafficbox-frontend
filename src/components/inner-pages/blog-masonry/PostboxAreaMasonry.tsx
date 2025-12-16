"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import VideoPopup from "@/componentsmodals/video-popup";
import UserIcon from "@/svg/inner-pages-icons/UserIcon";
import ClockIcon from "@/svg/inner-pages-icons/ClockIcon";
import PrevBlogIcon from "@/svg/inner-pages-icons/PrevBlogIcon";
import NextBlogIcon from "@/svg/inner-pages-icons/NextBlogIcon";
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

          {/* Blog Grid - 3 Cards per Row */}
          {!loading && !error && blogs.length > 0 && (
            <div className="row">
              {blogs.map((blog, i) => (
                <div key={blog._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                  <div className="tpblog-item-2 h-100 d-flex flex-column">
                    <div className="tpblog-thumb-2 flex-shrink-0">
                      <Link href={`/blog-details?slug=${blog.slug}`}>
                        {blog.imageUrl && (
                          <Image 
                            src={blog.imageUrl} 
                            alt={blog.title}
                            width={400}
                            height={250}
                            style={{ 
                              width: '100%', 
                              height: '250px', 
                              objectFit: 'cover',
                              borderRadius: '8px'
                            }}
                          />
                        )}
                      </Link>
                    </div>

                    <div className="tpblog-wrap flex-grow-1 d-flex flex-column">
                      <div className="tpblog-content-2 flex-grow-1">
                        <span className="blog-category mb-2 d-inline-block">
                          <Link href={`/blog-details?slug=${blog.slug}`}>
                            {blog.summary ? blogService.getExcerpt(blog.summary, 20) : 'Blog'}
                          </Link>
                        </span>
                        <h4 className="tpblog-title-2 mb-3" style={{ 
                          minHeight: '60px',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          <Link href={`/blog-details?slug=${blog.slug}`}>
                            {blog.title}
                          </Link>
                        </h4>
                      </div>
                      <div className="tpblog-meta-2 mt-auto">
                        <span className="me-3">
                          <i>
                            <ClockIcon />{" "}
                          </i>
                          {blogService.formatDate(blog.createdAt)}
                        </span>
                        <span>
                          <a href="#" className="text-decoration-none">
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
            </div>
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
