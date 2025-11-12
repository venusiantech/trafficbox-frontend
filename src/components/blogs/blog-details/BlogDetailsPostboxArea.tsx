'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PrevDetailsIcon from "@/svg/blogs_icon/PrevDetailsIcon";
import NextDetailsIcon from "@/svg/blogs_icon/NextDetailsIcon";
import Image from "next/image";
import box_thumb from "@/assets/img/blog/post-box-thumb-1.jpg";
import PostComments from "./PostComments";
import SocialLinks from "@/components/common/social-links";
import CommentForm from "@/components/forms/CommentForm";
import BlogSidebar from "@/components/inner-pages/blog-sidebar";
import { blogService, Blog } from "@/services/blogService";

const BlogDetailsPostboxAreaContent = {
  des_1: (
    <>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit lobortis arcu enim
      urna adipiscing praesent velit viverra sit semper lorem eu cursus vel
      hendrerit elementum morbi curabitur etiam nibh justo, lorem aliquet donec
      sed sit mi dignissim at ante massa mattis.If you see whence all this born
      error is the pleasure of those who accuse and those who praise pain, I
      will open the whole matter, and I will explain the very things which were
      said by that discoverer of truth and, as it were, the architect of a happy
      life. For no one despises or hates or runs away from pleasure because it
      is pleasure, but because great pains result to those who do not know how
      to follow pleasure with reason.
    </>
  ),
  title_1: "Quidem Facere aut Veritatis Saepe Quia Molestias Voluptatem.",
  des_2: (
    <>
      I will explain. For no one despises or hates or runs away from pleasure
      because it is pleasure, because great pains result to those who do not
      know how to follow pleasure with reason. Nor, moreoveris there any one
      who, because he likes pain, pursues it, wants to gain it, but because such
      times never occur in which he seeks some great pleasure through labor and
      pain.
    </>
  ),
  quote_title:
    "“Success is the result of perfection, hard work, learning from failure, loyalty, and persistence”",
  title_2: " Set Up Google Search Console",
  des_3: (
    <>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit lobortis arcu enim
      urna adipiscing praesent velit viverra sit semper lorem eu cursus vel
      hendrerit elementum morbi curabitur etiam nibh justo, lorem aliquet donec
      sed sit mi dignissim at ante massa mattis.
    </>
  ),
  quote_writer: "Guy Hawkins",
  des_4: (
    <>
      Even if you don’t have directories you want to disallow from indexing,
      having a robots.txt file is a best practice since it also points crawl
      bots to your sitemap.Not sure if you already have a robots.txt file? Go to
      yourdomain.com/robots.txt. If you see a file, you’re all set. If not,
      Yoast can help you generate one, or you can manually create one using a
      text editor and upload it to the root of your domain. Once your file is in
      place, use Google’s tester tool to verify everything works correctly.
    </>
  ),
  title_3: "Set Up Google Search Console",
  des_5: (
    <>
      Pug twee fam pour-over seitan single-origin coffee crucifix blue bottle
      aesthetic flexitarian. Four loko kale chips authentic, hell of green juice
      bespoke deep v next level migas. Woke bushwick prism live edge austin tote
      bag.
    </>
  ),
  title_4: "Recommended Reading",
  fetures_list: [
    "Google Analytics Starter Guide — Best Beginner SEO Reports",
    "How To Add a User to Google Analytics",
    "How To Measure Website Traffic with Google Analytics",
    "How To Track SEO Conversions: 10 Metrics To Measure",
    "How To Set Up Google Analytics Goals",
  ],
  tags_list: [
    "Technology",
    "Envato",
    "Keywords",
    "SEO",
    "WordPress",
    "SEO Report",
  ],
};
const {
  des_1,
  title_1,
  des_2,
  quote_title,
  title_2,
  des_3,
  quote_writer,
  des_4,
  title_3,
  des_5,
  title_4,
  fetures_list,
  tags_list,
} = BlogDetailsPostboxAreaContent;

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
    if (!blog) return "";
    return `${blog.author.firstName} ${blog.author.lastName}`;
  };

  // Helper function to get author initials
  const getAuthorInitials = () => {
    if (!blog) return "";
    return `${blog.author.firstName.charAt(0)}${blog.author.lastName.charAt(0)}`;
  };
  return (
    <>
      <section className="postbox-area mt-90 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {/* Loading State */}
              {loading && (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3">Loading blog...</p>
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

                    {/* Blog Meta */}
                    <div className="postbox-meta mb-30">
                      <span style={{ marginRight: '20px' }}>
                        <i className="far fa-calendar-check"></i> {blogService.formatDate(blog.createdAt)}
                      </span>
                      <span style={{ marginRight: '20px' }}>
                        <i className="far fa-user"></i> {getAuthorName()}
                      </span>
                      <span>
                        <i className="fal fa-clock"></i> {blogService.calculateReadTime(blog.content)}
                      </span>
                    </div>

                    {/* Blog Title */}
                    <h2 className="postbox-title mb-30" style={{ fontSize: '36px', fontWeight: '700' }}>
                      {blog.title}
                    </h2>

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
                  <div className="postbox-author d-flex mb-95">
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
                  <div className="postbox-comment mb-100">
                    <h3 className="postbox-comment-title mb-35">3 Comments</h3>
                    <PostComments />
                  </div>

                  {/* Comment Form */}
                  <div className="postbox-comment-form">
                    <h3 className="postbox-comment-form-title">
                      Leave a Comment
                    </h3>
                    <p>
                      Your email address will not be published. Required fields
                      are marked *
                    </p>
                    <CommentForm />
                  </div>
                </div>
              )}
            </div>
            <BlogSidebar />
          </div>
        </div>
      </section>

      {/* Styles for blog content */}
      <style jsx>{`
        .blog-content h1 {
          font-size: 32px;
          font-weight: 700;
          margin: 40px 0 20px;
          color: #1a1a1a;
        }

        .blog-content h2 {
          font-size: 28px;
          font-weight: 700;
          margin: 35px 0 18px;
          color: #1a1a1a;
        }

        .blog-content h3 {
          font-size: 24px;
          font-weight: 600;
          margin: 30px 0 16px;
          color: #1a1a1a;
        }

        .blog-content p {
          margin-bottom: 20px;
          line-height: 1.8;
        }

        .blog-content ul,
        .blog-content ol {
          margin: 20px 0;
          padding-left: 30px;
        }

        .blog-content li {
          margin-bottom: 12px;
          line-height: 1.7;
        }

        .blog-content strong {
          font-weight: 600;
          color: #1a1a1a;
        }

        .blog-content a {
          color: #667eea;
          text-decoration: underline;
        }

        .blog-content a:hover {
          color: #764ba2;
        }

        .blog-content code {
          background: #f5f5f5;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 0.9em;
        }

        .blog-content pre {
          background: #f5f5f5;
          padding: 20px;
          border-radius: 8px;
          overflow-x: auto;
          margin: 24px 0;
        }

        .blog-content blockquote {
          border-left: 4px solid #667eea;
          padding-left: 20px;
          margin: 24px 0;
          color: #555;
          font-style: italic;
        }

        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          margin: 24px 0;
        }
      `}</style>
    </>
  );
};

export default BlogDetailsPostboxArea;
