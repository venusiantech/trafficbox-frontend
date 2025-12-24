'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PrevDetailsIcon from "@/svg/blogs_icon/PrevDetailsIcon";
import NextDetailsIcon from "@/svg/blogs_icon/NextDetailsIcon";
import Image from "next/image";
import PostComments from "./PostComments";
import SocialLinks from "@/components/common/social-links";
import CommentForm from "@/components/forms/CommentForm";
import BlogSidebar from "@/components/inner-pages/blog-sidebar";
import { blogService, Blog } from "@/services/blogService";
import BreadcrumbTen from "@/components/common/breadcrumb/breadcrumb-10";


const BlogDetailsPostboxArea = () => {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) {
        setError("No blog slug provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const blogData = await blogService.getBlogBySlug(slug);
        if (blogData) {
          setBlog(blogData);
          setError(null);
        } else {
          setError("Blog not found");
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Failed to load blog. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  // Helper function to get author full name
  const getAuthorName = () => {
    if (!blog || !blog.author) return "Anonymous";
    return `${blog.author.firstName || "Unknown"} ${blog.author.lastName || "Author"}`;
  };

  // Helper function to get author initials
  const getAuthorInitials = () => {
    if (!blog || !blog.author) return "A";
    const firstName = blog.author.firstName || "U";
    const lastName = blog.author.lastName || "A";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };
  return (
    <>
      <section className="postbox-area mt-40 pb-120">
        <div className="container">
          {!loading && blog ? (
            <BreadcrumbTen 
              author={getAuthorName()} 
              time={blogService.formatDate(blog.createdAt)} 
              views={blogService.calculateReadTime(blog.content)} 
              title={blog.title}
            />
          ) : loading ? (
            <div className="mb-4">
              <div className="skeleton" style={{ height: '60px', width: '100%', borderRadius: '8px', marginBottom: '20px' }} />
            </div>
          ) : null}
          <div className="row">
            <div className="col-lg-8">
              {/* Loading State - Skeleton */}
              {loading && (
                <div className="postbox-area-wrap">
                  <div className="postbox-main">
                    {/* Blog Image Skeleton */}
                    <div className="mb-40">
                      <div className="skeleton" style={{ height: '450px', width: '100%', borderRadius: '8px' }} />
                    </div>

                    {/* Blog Title Skeleton */}
                    <div className="mb-30">
                      <div className="skeleton mb-2" style={{ height: '40px', width: '100%', borderRadius: '8px' }} />
                      <div className="skeleton" style={{ height: '40px', width: '80%', borderRadius: '8px' }} />
                    </div>

                    {/* Blog Summary Skeleton */}
                    <div className="mb-30" style={{
                      background: '#f8f9fa',
                      padding: '20px 24px',
                      borderRadius: '8px',
                      borderLeft: '4px solid #e0e0e0'
                    }}>
                      <div className="skeleton mb-2" style={{ height: '20px', width: '100%', borderRadius: '4px' }} />
                      <div className="skeleton mb-2" style={{ height: '20px', width: '100%', borderRadius: '4px' }} />
                      <div className="skeleton" style={{ height: '20px', width: '70%', borderRadius: '4px' }} />
                    </div>

                    {/* Blog Content Skeleton */}
                    <div className="mb-40">
                      <div className="skeleton mb-3" style={{ height: '20px', width: '100%', borderRadius: '4px' }} />
                      <div className="skeleton mb-3" style={{ height: '20px', width: '100%', borderRadius: '4px' }} />
                      <div className="skeleton mb-3" style={{ height: '20px', width: '100%', borderRadius: '4px' }} />
                      <div className="skeleton mb-3" style={{ height: '20px', width: '95%', borderRadius: '4px' }} />
                      <div className="skeleton mb-3" style={{ height: '20px', width: '100%', borderRadius: '4px' }} />
                      <div className="skeleton mb-3" style={{ height: '20px', width: '100%', borderRadius: '4px' }} />
                      <div className="skeleton mb-3" style={{ height: '20px', width: '90%', borderRadius: '4px' }} />
                      <div className="skeleton mb-3" style={{ height: '20px', width: '100%', borderRadius: '4px' }} />
                      <div className="skeleton mb-3" style={{ height: '20px', width: '100%', borderRadius: '4px' }} />
                      <div className="skeleton" style={{ height: '20px', width: '85%', borderRadius: '4px' }} />
                    </div>

                    {/* Navigation Skeleton */}
                    <div className="row align-items-center mt-60 mb-60">
                      <div className="col-md-6">
                        <div className="d-flex align-items-center gap-3">
                          <div className="skeleton" style={{ height: '40px', width: '40px', borderRadius: '8px' }} />
                          <div className="flex-grow-1">
                            <div className="skeleton mb-2" style={{ height: '16px', width: '120px', borderRadius: '4px' }} />
                            <div className="skeleton" style={{ height: '14px', width: '150px', borderRadius: '4px' }} />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex align-items-center gap-3 justify-content-md-end">
                          <div className="flex-grow-1 text-end">
                            <div className="skeleton mb-2 ms-auto" style={{ height: '16px', width: '100px', borderRadius: '4px', marginLeft: 'auto' }} />
                            <div className="skeleton ms-auto" style={{ height: '14px', width: '130px', borderRadius: '4px', marginLeft: 'auto' }} />
                          </div>
                          <div className="skeleton" style={{ height: '40px', width: '40px', borderRadius: '8px' }} />
                        </div>
                      </div>
                    </div>

                    {/* Author Box Skeleton */}
                    <div className="d-flex gap-4 mb-5">
                      <div className="skeleton" style={{ 
                        width: '100px', 
                        height: '100px', 
                        borderRadius: '50%',
                        flexShrink: 0
                      }} />
                      <div className="flex-grow-1">
                        <div className="skeleton mb-2" style={{ height: '14px', width: '120px', borderRadius: '4px' }} />
                        <div className="skeleton mb-3" style={{ height: '24px', width: '180px', borderRadius: '4px' }} />
                        <div className="skeleton mb-2" style={{ height: '16px', width: '100%', borderRadius: '4px' }} />
                        <div className="skeleton mb-2" style={{ height: '16px', width: '100%', borderRadius: '4px' }} />
                        <div className="skeleton mb-3" style={{ height: '16px', width: '80%', borderRadius: '4px' }} />
                        <div className="d-flex gap-2">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="skeleton" style={{ height: '32px', width: '32px', borderRadius: '50%' }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {/* Blog Content */}
              {!loading && !error && blog && (
                <div className="postbox-area-wrap">
                  <div className="postbox-main">
                    {/* Blog Image */}
                    {blog.imageUrl && (
                      <div className="postbox-img mb-40">
                        <Image 
                          src={blog.imageUrl} 
                          alt={blog.title}
                          width={800}
                          height={450}
                          style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                        />
                      </div>
                    )}

                    {/* Blog Summary */}
                    {blog.summary && (
                      <div className="postbox-single-box mb-30" style={{
                        background: '#f8f9fa',
                        padding: '20px 24px',
                        borderRadius: '8px',
                        borderLeft: '4px solid #667eea'
                      }}>
                        <p style={{ fontSize: '16px', lineHeight: '1.7', margin: 0, fontStyle: 'italic' }}>
                          {blog.summary}
                        </p>
                      </div>
                    )}

                    {/* Blog Content */}
                    <div 
                      className="postbox-content blog-content"
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                      style={{
                        fontSize: '17px',
                        lineHeight: '1.8',
                        color: '#333'
                      }}
                    />
                  </div>

                  {/* Navigation - Previous/Next */}
                  <div className="row align-items-center mt-60">
                    <div className="col-md-6">
                      <div className="postbox-more-left mb-55">
                        <div className="postbox-more-icon">
                          <Link href="/blog-classic">
                            <span>
                              <PrevDetailsIcon />
                            </span>
                            Previous
                          </Link>
                        </div>
                        <div className="postbox-more-content">
                          <span>
                            <Link href="/blog-classic">
                              Back to Blog List
                            </Link>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="postbox-more-right mb-55">
                        <div className="postbox-more-icon text-md-end">
                          <Link href="/blog">
                            Next
                            <span>
                              <NextDetailsIcon />
                            </span>
                          </Link>
                        </div>
                        <div className="postbox-more-content d-flex align-items-center justify-content-md-end">
                          <span className="text-end">
                            <Link href="/blog">
                              View All Blogs
                            </Link>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Author Box */}
                  <div className="postbox-author d-flex">
                    <div className="postbox-author-thumb">
                      <div style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: '32px',
                        fontWeight: '600'
                      }}>
                        {getAuthorInitials()}
                      </div>
                    </div>
                    <div className="postbox-author-content">
                      <span>About Author</span>
                      <h4 className="postbox-author-title">{getAuthorName()}</h4>
                      <p>
                        Content creator and digital marketing expert sharing insights about 
                        web development, SEO, and online marketing strategies.
                      </p>
                      <div className="postbox-author-social">
                        <SocialLinks />
                      </div>
                    </div>
                  </div>

                  {/* Comments */}
                  {/* <div className="postbox-comment mb-100">
                    <h3 className="postbox-comment-title mb-35">3 Comments</h3>
                    <PostComments />
                  </div> */}

                  {/* Comment Form */}
                  {/* <div className="postbox-comment-form">
                    <h3 className="postbox-comment-form-title">
                      Leave a Comment
                    </h3>
                    <p>
                      Your email address will not be published. Required fields
                      are marked *
                    </p>
                    <CommentForm />
                  </div> */}
                </div>
              )}
            </div>
            <BlogSidebar />
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetailsPostboxArea;