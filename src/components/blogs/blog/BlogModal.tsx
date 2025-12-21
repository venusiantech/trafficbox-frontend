"use client";
import { useEffect } from "react";
import Image from "next/image";
import { Blog } from "@/services/blogService";
import { blogService } from "@/services/blogService";

interface BlogModalProps {
  blog: Blog | null;
  isOpen: boolean;
  onClose: () => void;
}

const BlogModal = ({ blog, isOpen, onClose }: BlogModalProps) => {
  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !blog) return null;

  // Helper function to get author full name
  const getAuthorName = () => {
    if (!blog.author) return "Anonymous";
    return `${blog.author.firstName || "Unknown"} ${blog.author.lastName || "Author"}`;
  };

  // Helper function to get author initials
  const getAuthorInitials = () => {
    if (!blog.author) return "A";
    const firstName = blog.author.firstName || "U";
    const lastName = blog.author.lastName || "A";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  return (
    <>
      {/* Backdrop with blur */}
      <div
        className="blog-modal-backdrop"
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(8px)",
          zIndex: 9998,
          animation: "fadeIn 0.3s ease-out",
        }}
      />

      {/* Modal Container */}
      <div
        className="blog-modal-container"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          overflowY: "auto",
        }}
        onClick={onClose}
      >
        {/* Modal Content */}
        <div
          className="blog-modal-content"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          style={{
            background: "#fff",
            borderRadius: "24px",
            maxWidth: "900px",
            width: "100%",
            maxHeight: "90vh",
            position: "relative",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
            animation: "slideUp 0.4s ease-out",
            overflow: "hidden", // Hide overflow to contain scrollbar
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "none",
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              color: "#333",
              transition: "all 0.3s ease",
              zIndex: 10,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(245, 245, 245, 0.95)";
              e.currentTarget.style.transform = "rotate(90deg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.95)";
              e.currentTarget.style.transform = "rotate(0deg)";
            }}
          >
            ✕
          </button>

          {/* Scrollable Content Container */}
          <div
            style={{
              maxHeight: "90vh",
              overflowY: "auto",
              overflowX: "hidden",
              scrollbarGutter: "stable",
            }}
          >

          {/* Blog Header Image */}
          {blog.imageUrl && (
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "400px",
                borderRadius: "16px 24px 0 0",
                overflow: "hidden",
              }}
            >
              <Image
                src={blog.imageUrl}
                alt={blog.title}
                fill
                style={{ objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "150px",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                }}
              />
            </div>
          )}

          {/* Blog Content */}
          <div style={{ padding: "40px 60px 60px" }}>
            {/* Title */}
            <h1
              style={{
                fontSize: "42px",
                fontWeight: "700",
                lineHeight: "1.2",
                marginBottom: "20px",
                color: "#1a1a1a",
              }}
            >
              {blog.title}
            </h1>

            {/* Meta Info */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                paddingBottom: "30px",
                marginBottom: "30px",
                borderBottom: "1px solid #e5e5e5",
                flexWrap: "wrap",
              }}
            >
              {/* Author */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: "600",
                    fontSize: "16px",
                  }}
                >
                  {getAuthorInitials()}
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: "600",
                      fontSize: "15px",
                      color: "#333",
                    }}
                  >
                    {getAuthorName()}
                  </div>
                  <div style={{ fontSize: "13px", color: "#666" }}>Author</div>
                </div>
              </div>

              {/* Date */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.6667 2.66667H3.33333C2.59695 2.66667 2 3.26362 2 4V13.3333C2 14.0697 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0697 14 13.3333V4C14 3.26362 13.403 2.66667 12.6667 2.66667Z"
                    stroke="#666"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.6667 1.33333V4"
                    stroke="#666"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.33333 1.33333V4"
                    stroke="#666"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 6.66667H14"
                    stroke="#666"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span style={{ fontSize: "14px", color: "#666" }}>
                  {blogService.formatDate(blog.createdAt)}
                </span>
              </div>

              {/* Read Time */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
                    stroke="#666"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 4V8L10.6667 9.33333"
                    stroke="#666"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span style={{ fontSize: "14px", color: "#666" }}>
                  {blogService.calculateReadTime(blog.content)}
                </span>
              </div>
            </div>

            {/* Summary */}
            {blog.summary && (
              <div
                style={{
                  background: "#f8f9fa",
                  padding: "20px 24px",
                  borderRadius: "12px",
                  marginBottom: "40px",
                  borderLeft: "4px solid #667eea",
                }}
              >
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: "1.7",
                    color: "#444",
                    margin: 0,
                    fontStyle: "italic",
                  }}
                >
                  {blog.summary}
                </p>
              </div>
            )}

            {/* Main Content */}
            <div
              className="blog-content"
              style={{
                fontSize: "17px",
                lineHeight: "1.8",
                color: "#333",
              }}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Share Section */}
            <div
              style={{
                marginTop: "60px",
                paddingTop: "30px",
                borderTop: "1px solid #e5e5e5",
              }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "20px",
                }}
              >
                Share this article
              </h3>
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  style={{
                    padding: "10px 20px",
                    borderRadius: "8px",
                    border: "1px solid #e5e5e5",
                    background: "#fff",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14px",
                    fontWeight: "500",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#1DA1F2";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.borderColor = "#1DA1F2";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.color = "#000";
                    e.currentTarget.style.borderColor = "#e5e5e5";
                  }}
                >
                  Twitter
                </button>
                <button
                  style={{
                    padding: "10px 20px",
                    borderRadius: "8px",
                    border: "1px solid #e5e5e5",
                    background: "#fff",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14px",
                    fontWeight: "500",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#0A66C2";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.borderColor = "#0A66C2";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.color = "#000";
                    e.currentTarget.style.borderColor = "#e5e5e5";
                  }}
                >
                  LinkedIn
                </button>
                <button
                  style={{
                    padding: "10px 20px",
                    borderRadius: "8px",
                    border: "1px solid #e5e5e5",
                    background: "#fff",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14px",
                    fontWeight: "500",
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied to clipboard!");
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#667eea";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.borderColor = "#667eea";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.color = "#000";
                    e.currentTarget.style.borderColor = "#e5e5e5";
                  }}
                >
                  Copy Link
                </button>
              </div>
            </div>
          </div>
          </div> {/* Close scrollable content container */}
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Blog Content Styles */
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
          font-family: "Courier New", monospace;
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

        /* Scrollbar Styling - Overlay Style */
        .blog-modal-content > div {
          scrollbar-width: thin;
          scrollbar-color: rgba(0, 0, 0, 0.3) transparent;
        }

        .blog-modal-content > div::-webkit-scrollbar {
          width: 8px;
          background: transparent;
        }

        .blog-modal-content > div::-webkit-scrollbar-track {
          background: transparent;
        }

        .blog-modal-content > div::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
          border: 2px solid transparent;
          background-clip: content-box;
        }

        .blog-modal-content > div::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.4);
          background-clip: content-box;
        }

        /* Hide scrollbar track completely */
        .blog-modal-content > div::-webkit-scrollbar-corner {
          background: transparent;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .blog-modal-content {
            margin: 10px;
            border-radius: 16px !important;
          }

          .blog-modal-content > div {
            padding: 30px 24px 40px !important;
          }

          .blog-modal-content h1 {
            font-size: 28px !important;
          }

          .blog-content h1 {
            font-size: 24px;
          }

          .blog-content h2 {
            font-size: 20px;
          }

          .blog-content h3 {
            font-size: 18px;
          }
        }
      `}</style>
    </>
  );
};

export default BlogModal;
