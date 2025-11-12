"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { blogService, Blog } from "@/services/blogService";
import BlogModal from "./BlogModal";

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
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Get featured blog (first blog)
  const featuredBlog = blogs.length > 0 ? blogs[0] : null;

  // Filter blogs (skip featured blog in the grid)
  const gridBlogs = blogs.slice(1);

  const filteredPosts = gridBlogs;

  // Helper function to get author full name
  const getAuthorName = (blog: Blog) => {
    return `${blog.author.firstName} ${blog.author.lastName}`;
  };

  // Helper function to get author initials
  const getAuthorInitials = (blog: Blog) => {
    return `${blog.author.firstName.charAt(0)}${blog.author.lastName.charAt(0)}`;
  };

  // Handle blog click
  const handleBlogClick = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedBlog(null), 300); // Clear after animation
  };

  return (
    <section className="modern-blog-area pt-60 pb-120">
      <div className="container">
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

        {/* Content - Only show when not loading */}
        {!loading && blogs.length > 0 && (
          <>
            {/* Hero Section - Featured Blog */}
            {featuredBlog && (
              <div className="row mb-60">
                <div className="col-12">
                  <div
                    className="blog-hero-section position-relative"
                    onClick={() => handleBlogClick(featuredBlog)}
                    style={{
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      borderRadius: "20px",
                      padding: "80px 60px",
                      minHeight: "400px",
                      display: "flex",
                      alignItems: "center",
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.02)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <div
                      className="blog-hero-content"
                      style={{ maxWidth: "600px", zIndex: 2 }}
                    >
                      <span
                        className="blog-hero-badge"
                        style={{
                          background: "rgba(255,255,255,0.2)",
                          padding: "8px 20px",
                          borderRadius: "50px",
                          color: "#fff",
                          fontSize: "14px",
                          fontWeight: "500",
                          display: "inline-block",
                          marginBottom: "20px",
                        }}
                      >
                        Featured Article
                      </span>
                      <h1
                        className="blog-hero-title"
                        style={{
                          color: "#fff",
                          fontSize: "48px",
                          fontWeight: "700",
                          lineHeight: "1.2",
                          marginBottom: "20px",
                        }}
                      >
                        {featuredBlog.title}
                      </h1>
                      <p
                        className="blog-hero-desc"
                        style={{
                          color: "rgba(255,255,255,0.9)",
                          fontSize: "16px",
                          lineHeight: "1.6",
                          marginBottom: "30px",
                        }}
                      >
                        {featuredBlog.summary}
                      </p>
                      <div
                        className="blog-hero-meta"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "20px",
                          flexWrap: "wrap",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <div
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              background: "#fff",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "14px",
                                fontWeight: "600",
                                color: "#667eea",
                              }}
                            >
                              {getAuthorInitials(featuredBlog)}
                            </span>
                          </div>
                          <span
                            style={{
                              color: "#fff",
                              fontSize: "14px",
                              fontWeight: "500",
                            }}
                          >
                            {getAuthorName(featuredBlog)}
                          </span>
                        </div>
                        <span
                          style={{
                            color: "rgba(255,255,255,0.8)",
                            fontSize: "14px",
                          }}
                        >
                          {blogService.formatDate(featuredBlog.createdAt)}
                        </span>
                        <span
                          style={{
                            color: "rgba(255,255,255,0.8)",
                            fontSize: "14px",
                          }}
                        >
                          {blogService.calculateReadTime(featuredBlog.content)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Blog Header */}
            <div className="row mb-40">
              <div className="col-12">
                <div className="blog-section-header">
                  <h2
                    className="blog-section-title"
                    style={{
                      fontSize: "36px",
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
                      <div
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
                      </div>
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
            <div className="row g-4 mt-80">
              <div className="col-lg-6">
                <div
                  className="blog-cta-card"
                  style={{
                    background:
                      "linear-gradient(135deg, #2d3436 0%, #000000 100%)",
                    borderRadius: "20px",
                    padding: "60px 40px",
                    color: "#fff",
                    minHeight: "300px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "32px",
                      fontWeight: "700",
                      marginBottom: "20px",
                    }}
                  >
                    Explore more to get your comfort zone
                  </h3>
                  <p
                    style={{
                      fontSize: "16px",
                      opacity: "0.9",
                      marginBottom: "30px",
                    }}
                  >
                    Book your perfect stay with us.
                  </p>
                  <Link
                    href="/contact"
                    className="tp-btn"
                    style={{
                      display: "inline-block",
                      background: "#fff",
                      color: "#000",
                      padding: "12px 30px",
                      borderRadius: "8px",
                      fontWeight: "600",
                      textDecoration: "none",
                      width: "fit-content",
                    }}
                  >
                    Book Big Now →
                  </Link>
                </div>
              </div>
              <div className="col-lg-6">
                <div
                  className="blog-cta-card"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: "20px",
                    padding: "60px 40px",
                    color: "#fff",
                    minHeight: "300px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "32px",
                      fontWeight: "700",
                      marginBottom: "20px",
                    }}
                  >
                    Beyond accommodation, creating memories of a lifetime
                  </h3>
                  <div className="mt-4">
                    <div style={{ fontSize: "48px", fontWeight: "700" }}>
                      {blogs.length}
                    </div>
                    <div style={{ fontSize: "16px", opacity: "0.9" }}>
                      Article{blogs.length !== 1 ? "s" : ""} Available
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

      {/* Blog Modal */}
      <BlogModal
        blog={selectedBlog}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default ModernBlogArea;
