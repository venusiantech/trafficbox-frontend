"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { blogService, Blog } from "@/services/blogService";

// Fallback images
import blog_thumb_fallback from "@/assets/img/blog/blog-1-bg-1.jpg";
import avatar_placeholder from "@/assets/img/blog/comments/blog-avatar-1.png";

const categories = [
  "All",
  "Technology",
  "Web Development",
  "Programming",
  "Design",
];

const ModernBlogArea = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
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


  // Show all blogs in the grid
  const filteredPosts = blogs;
  
  // Debug logging
  console.log("Total blogs:", blogs.length);
  console.log("Filtered posts:", filteredPosts.length);
  // Handle blog click - navigate to blog details page
  const handleBlogClick = (blog: Blog) => {
    router.push(`/blog-details?slug=${blog.slug}`);
  };

  return (
    <section className="modern-blog-area pt-60 pb-120">
      <div className="container">
        {/* Loading State - Skeleton */}
        {loading && (
          <>
            {/* Header Skeleton */}
            <div className="row mb-40">
              <div className="col-12">
                <div className="blog-section-header">
                  <div 
                    className="skeleton"
                    style={{
                      height: "50px",
                      width: "150px",
                      marginBottom: "10px",
                      borderRadius: "8px",
                    }}
                  />
                  <div 
                    className="skeleton"
                    style={{
                      height: "20px",
                      width: "400px",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Filter & Sort Bar Skeleton */}
            <div className="row mb-50">
              <div className="col-12">
                <div
                  className="d-flex justify-content-between align-items-center flex-wrap gap-3"
                >
                  {/* Categories Skeleton */}
                  <div className="d-flex gap-2 flex-wrap">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="skeleton"
                        style={{
                          height: "40px",
                          width: "120px",
                          borderRadius: "50px",
                        }}
                      />
                    ))}
                  </div>

                  {/* Sort Skeleton */}
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="skeleton"
                      style={{
                        height: "20px",
                        width: "60px",
                        borderRadius: "8px",
                      }}
                    />
                    <div
                      className="skeleton"
                      style={{
                        height: "36px",
                        width: "120px",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Grid Skeleton */}
            <div className="row g-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="col-xl-4 col-lg-4 col-md-6">
                  <article
                    className="blog-card"
                    style={{
                      background: "#fff",
                      borderRadius: "16px",
                      overflow: "hidden",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Image Skeleton */}
                    <div
                      className="skeleton"
                      style={{
                        height: "240px",
                        width: "100%",
                        borderRadius: "0",
                      }}
                    />

                    {/* Content Skeleton */}
                    <div
                      style={{
                        padding: "24px",
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                      }}
                    >
                      {/* Meta Skeleton */}
                      <div className="d-flex gap-3 mb-3">
                        <div
                          className="skeleton"
                          style={{
                            height: "16px",
                            width: "100px",
                            borderRadius: "4px",
                          }}
                        />
                        <div
                          className="skeleton"
                          style={{
                            height: "16px",
                            width: "80px",
                            borderRadius: "4px",
                          }}
                        />
                      </div>

                      {/* Title Skeleton */}
                      <div
                        className="skeleton mb-3"
                        style={{
                          height: "24px",
                          width: "100%",
                          borderRadius: "4px",
                        }}
                      />
                      <div
                        className="skeleton mb-3"
                        style={{
                          height: "24px",
                          width: "80%",
                          borderRadius: "4px",
                        }}
                      />

                      {/* Excerpt Skeleton */}
                      <div
                        className="skeleton mb-2"
                        style={{
                          height: "16px",
                          width: "100%",
                          borderRadius: "4px",
                        }}
                      />
                      <div
                        className="skeleton mb-2"
                        style={{
                          height: "16px",
                          width: "100%",
                          borderRadius: "4px",
                        }}
                      />
                      <div
                        className="skeleton"
                        style={{
                          height: "16px",
                          width: "60%",
                          borderRadius: "4px",
                        }}
                      />
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Error State */}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {/* Content - Only show when not loading */}
        {!loading && blogs.length > 0 && (
          <>
            {/* Blog Header */}
            <div className="row mb-40">
              <div className="col-12">
                <div className="blog-section-header">
                  <h2
                    className="blog-section-title"
                    style={{
                      fontSize: "50px",
                      fontWeight: "700",
                      marginBottom: "10px",
                    }}
                  >
                    Blog
                  </h2>
                  <p
                    className="blog-section-subtitle"
                    style={{
                      color: "#666",
                      fontSize: "16px",
                    }}
                  >
                    Here, we share tips, guides, and stories that inspire your
                    next journey.
                  </p>
                </div>
              </div>
            </div>

            {/* Filter & Sort Bar */}
            <div className="row mb-50">
              <div className="col-12">
                <div
                  className="blog-filter-bar"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "20px",
                  }}
                >
                  {/* Categories */}
                  <div
                    className="blog-categories"
                    style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
                  >
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`category-btn ${activeCategory === category ? "active" : ""}`}
                        style={{
                          padding: "10px 24px",
                          borderRadius: "50px",
                          border:
                            activeCategory === category
                              ? "none"
                              : "1px solid #ddd",
                          background:
                            activeCategory === category ? "#667eea" : "#fff",
                          color: activeCategory === category ? "#fff" : "#333",
                          fontSize: "14px",
                          fontWeight: "500",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                      >
                        {category}
                      </button>
                    ))}
                  </div>

                  {/* Sort By */}
                  <div
                    className="blog-sort"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span style={{ fontSize: "14px", color: "#666" }}>
                      Sort by:
                    </span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      style={{
                        padding: "8px 16px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        fontSize: "14px",
                        cursor: "pointer",
                        background: "#fff",
                      }}
                    >
                      <option>Newest</option>
                      <option>Oldest</option>
                      <option>Most Popular</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Grid */}
            <div className="row g-4">
              {filteredPosts.map((post) => (
                <div key={post._id} className="col-xl-4 col-lg-4 col-md-6">
                  <article
                    className="blog-card"
                    style={{
                      background: "#fff",
                      borderRadius: "16px",
                      overflow: "hidden",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-8px)";
                      e.currentTarget.style.boxShadow =
                        "0 12px 40px rgba(0,0,0,0.12)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 20px rgba(0,0,0,0.08)";
                    }}
                  >
                    {/* Image */}
                    <div
                      className="blog-card-image"
                      style={{
                        position: "relative",
                        height: "240px",
                        overflow: "hidden",
                        background: "#f0f0f0",
                        cursor: "pointer",
                      }}
                      onClick={() => handleBlogClick(post)}
                    >
                      <Image
                        src={post.imageUrl || blog_thumb_fallback}
                        alt={post.title}
                        fill
                        style={{ objectFit: "cover" }}
                        onError={(e) => {
                          // Fallback to placeholder if image fails to load
                          e.currentTarget.src = blog_thumb_fallback.src;
                        }}
                      />
                      <span
                        className="blog-card-category"
                        style={{
                          position: "absolute",
                          top: "16px",
                          left: "16px",
                          background: "rgba(255,255,255,0.95)",
                          padding: "6px 16px",
                          borderRadius: "50px",
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#333",
                        }}
                      >
                        Article
                      </span>
                    </div>

                    {/* Content */}
                    <div
                      className="blog-card-content"
                      style={{
                        padding: "24px",
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                      }}
                    >
                      <div
                        className="blog-card-meta"
                        style={{
                          display: "flex",
                          gap: "16px",
                          marginBottom: "12px",
                          fontSize: "13px",
                          color: "#666",
                        }}
                      >
                        <span>{blogService.formatDate(post.createdAt)}</span>
                        <span>•</span>
                        <span>
                          {blogService.calculateReadTime(post.content)}
                        </span>
                      </div>

                      <h3
                        className="blog-card-title"
                        style={{
                          fontSize: "18px",
                          fontWeight: "700",
                          lineHeight: "1.4",
                          marginBottom: "12px",
                          color: "#1a1a1a",
                          cursor: "pointer",
                        }}
                        onClick={() => handleBlogClick(post)}
                      >
                        {post.title}
                      </h3>

                      <p
                        className="blog-card-excerpt"
                        style={{
                          fontSize: "14px",
                          color: "#666",
                          lineHeight: "1.6",
                          marginBottom: "20px",
                          flexGrow: 1,
                        }}
                      >
                        {blogService.getExcerpt(
                          post.summary || post.content,
                          120
                        )}
                      </p>

                      {/* Author */}
                      {/* <div
                        className="blog-card-author"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          paddingTop: "16px",
                          borderTop: "1px solid #f0f0f0",
                        }}
                      >
                        <div
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            overflow: "hidden",
                            position: "relative",
                            background: "#667eea",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            fontWeight: "600",
                            fontSize: "14px",
                          }}
                        >
                          {getAuthorInitials(post)}
                        </div>
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#333",
                          }}
                        >
                          {getAuthorName(post)}
                        </span>
                      </div> */}
                    </div>
                  </article>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="row mt-60">
              <div className="col-12">
                <div
                  className="blog-pagination"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  {[1].map((page) => (
                    <button
                      key={page}
                      className="active"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "8px",
                        border: "none",
                        background: "#667eea",
                        color: "#fff",
                        fontSize: "14px",
                        fontWeight: "500",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Sections */}
            <div className="row g-4" style={{ marginTop: "60px" }}>
              <div className="col-lg-6">
                <div
                  className="blog-cta-card h-100"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: "20px",
                    padding: "50px 40px",
                    color: "#fff",
                    minHeight: "320px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div className="mb-3">
                    <span
                      style={{
                        fontSize: "48px",
                        fontWeight: "700",
                        color: "#fff",
                      }}
                    >
                      📊
                    </span>
                  </div>
                  <h3
                    style={{
                      fontSize: "28px",
                      fontWeight: "700",
                      marginBottom: "20px",
                      color: "#fff",
                    }}
                  >
                    Get Detailed SEO Reports & Analytics
                  </h3>
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#fff",
                      opacity: "0.9",
                      marginBottom: "30px",
                      lineHeight: "1.6",
                    }}
                  >
                    Track your website's performance with comprehensive SEO reports, keyword rankings, and traffic analytics.
                  </p>
                  <Link
                    href="https://app.trafficboxes.com/en/auth/register"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tp-btn"
                    style={{
                      display: "inline-block",
                      background: "#fff",
                      color: "#667eea",
                      padding: "14px 32px",
                      borderRadius: "10px",
                      fontWeight: "600",
                      textDecoration: "none",
                      width: "fit-content",
                      transition: "all 0.3s ease",
                    }}
                  >
                    Start Free Trial →
                  </Link>
                </div>
              </div>
              <div className="col-lg-6">
                <div
                  className="blog-cta-card h-100"
                  style={{
                    background:
                      "linear-gradient(135deg, #2d3436 0%, #000000 100%)",
                    borderRadius: "20px",
                    padding: "50px 40px",
                    color: "#fff",
                    minHeight: "320px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div className="mb-3">
                    <span
                      style={{
                        fontSize: "48px",
                        fontWeight: "700",
                        color: "#fff",
                      }}
                    >
                      🚀
                    </span>
                  </div>
                  <h3
                    style={{
                      fontSize: "28px",
                      fontWeight: "700",
                      marginBottom: "20px",
                      color: "#fff",
                    }}
                  >
                    Boost Your Website Traffic Today
                  </h3>
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#fff",
                      opacity: "0.9",
                      marginBottom: "30px",
                      lineHeight: "1.6",
                    }}
                  >
                    Discover powerful SEO strategies and marketing tools to increase your organic traffic and improve search rankings.
                  </p>
                  <div className="d-flex align-items-center gap-3">
                    <div>
                      <div style={{ fontSize: "32px", fontWeight: "700", color: "#fff" }}>
                        {blogs.length}+
                      </div>
                      <div style={{ fontSize: "14px", color: "#fff", opacity: "0.8" }}>
                        SEO Guides Available
                      </div>
                    </div>
                    <div className="ms-auto">
                      <Link
                        href="https://app.trafficboxes.com/en/auth/register"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tp-btn"
                        style={{
                          display: "inline-block",
                          background: "#fff",
                          color: "#000",
                          padding: "14px 32px",
                          borderRadius: "10px",
                          fontWeight: "600",
                          textDecoration: "none",
                          transition: "all 0.3s ease",
                        }}
                      >
                        Get Started →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Empty State */}
        {!loading && blogs.length === 0 && !error && (
          <div className="text-center py-5">
            <h3>No blogs available at the moment</h3>
            <p className="text-muted">
              Please check back later for new content.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ModernBlogArea;
