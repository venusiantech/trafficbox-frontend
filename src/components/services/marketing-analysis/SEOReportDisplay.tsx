"use client"
import { useRef, useState } from "react";
import { SEOAnalysisResponse } from "@/services/seoAnalysisService";
import HeaderFour from "@/layout/headers/HeaderFour";
import FooterFour from "@/layout/footers/FooterFour";

interface SEOReportDisplayProps {
  data: SEOAnalysisResponse;
}

const SEOReportDisplay = ({ data }: SEOReportDisplayProps) => {
  const reportRef = useRef<HTMLDivElement>(null);
  const pdfContentRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const analysisData = data.data?.data;

  if (!analysisData) {
    return <div>No data available</div>;
  }

  // Use lighter, modern color palette for score indicators
  const getScoreColor = (score: number) => {
    if (score >= 80) return "#34d399"; // light emerald green (tailwind emerald-400)
    if (score >= 60) return "#facc15"; // soft yellow (tailwind yellow-400)
    return "#f87171"; // light red (tailwind red-400)
  };


  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-emerald-50 border-emerald-200";
    if (score >= 60) return "bg-amber-50 border-amber-200";
    return "bg-red-50 border-red-200";
  };

  const getStatusBadge = (status: string) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes("pass") || lowerStatus.includes("good") || lowerStatus.includes("success")) {
      return { text: "Good", color: "bg-emerald-100 text-emerald-800" };
    }
    if (lowerStatus.includes("warning") || lowerStatus.includes("fair") || lowerStatus.includes("needs improvement")) {
      return { text: "Warning", color: "bg-amber-100 text-amber-800" };
    }
    return { text: "Critical", color: "bg-red-100 text-red-800" };
  };

  const downloadPDF = async () => {
    if (!reportRef.current || !pdfContentRef.current) return;

    setIsGeneratingPDF(true);
    
    // Hide the download button during PDF generation
    const buttonContainer = pdfContentRef.current.querySelector('[data-pdf-hide-button]') as HTMLElement;
    const originalButtonDisplay = buttonContainer?.style.display || '';
    if (buttonContainer) {
      buttonContainer.style.display = 'none';
    }

    try {
      const jsPDF = await import('jspdf');
      const html2canvas = await import('html2canvas');
      
      const pdf = new jsPDF.default('p', 'mm', 'a4');
      const pageWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const margin = 15; // 15mm margins
      const contentWidth = pageWidth - (margin * 2);
      
      // Helper function to add page number
      const addPageNumber = (pageNum: number) => {
        pdf.setFontSize(9);
        pdf.setTextColor(150, 150, 150);
        pdf.setFont('helvetica', 'normal');
        pdf.text(
          `Page ${pageNum}`, 
          pageWidth - margin - 10, 
          pageHeight - margin + 5
        );
      };

      // Helper function to add section to PDF
      const addSectionToPDF = async (sectionElement: HTMLElement, currentY: number, isFirstOnPage: boolean = false): Promise<number> => {
        const canvas = await html2canvas.default(sectionElement, {
          scale: 1.5, // Higher scale for better quality
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          allowTaint: false,
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.75);
        const imgWidth = contentWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        // Check if section fits on current page
        if (!isFirstOnPage && currentY + imgHeight > pageHeight - margin - 10) {
          pdf.addPage();
          addPageNumber(pdf.getNumberOfPages());
          currentY = margin;
        }
        
        pdf.addImage(imgData, 'JPEG', margin, currentY, imgWidth, imgHeight);
        return currentY + imgHeight + 10; // Add 10mm spacing
      };

      // Process each page (1-6)
      for (let pageNum = 1; pageNum <= 6; pageNum++) {
        const sections = pdfContentRef.current.querySelectorAll(`[data-pdf-page="${pageNum}"]`) as NodeListOf<HTMLElement>;
        
        if (sections.length === 0) continue;
        
        // Start new page for each page number (except page 1)
        if (pageNum > 1) {
          pdf.addPage();
        }
        
        let currentY = margin;
        let isFirstSection = true;
        
        // Add all sections for this page
        for (let i = 0; i < sections.length; i++) {
          const section = sections[i];
          currentY = await addSectionToPDF(section, currentY, isFirstSection);
          isFirstSection = false;
        }
        
        // Add page number
        addPageNumber(pageNum);
      }

      pdf.save(`seo-analysis-${analysisData.domain || 'report'}-${new Date().toISOString().split('T')[0]}.pdf`);
      
      // Restore button
      if (buttonContainer) {
        buttonContainer.style.display = originalButtonDisplay;
      }
      
      setIsGeneratingPDF(false);
    } catch (error: any) {
      console.error('Error generating PDF:', error);
      
      // Restore button
      if (buttonContainer) {
        buttonContainer.style.display = originalButtonDisplay;
      }
      
      setIsGeneratingPDF(false);
      
      // Fallback: download as JSON
      const dataStr = JSON.stringify(data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `seo-analysis-${analysisData.domain || 'report'}-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      alert('PDF generation failed. JSON report downloaded instead.');
    }
  };

  // Get screenshot data
  const finalScreenshot = analysisData.performance?.lighthouse?.core_web_vitals?.["final-screenshot"]?.details?.data;
  const screenshotThumbnails = analysisData.performance?.lighthouse?.core_web_vitals?.["screenshot-thumbnails"]?.details?.items || [];

  return (
    <>
      <HeaderFour />
      <main>

        <section className="seo-report-area pt-120 pb-120" ref={reportRef}>
          <div className="container" ref={pdfContentRef}>
            {/* Header Card */}
            <div className="row mb-5" data-pdf-page="1">
              <div className="col-12">
                <div 
                  className="card border-0 shadow-sm mb-4"
                  style={{
                    borderRadius: "20px",
                    background: "white",
                    padding: "2.5rem",
                    border: "1px solid #e5e7eb"
                  }}
                >
                  <div className="d-flex justify-content-between align-items-start flex-wrap gap-4">
                    <div style={{ flex: 1, minWidth: "300px" }}>
                      <div className="d-flex align-items-center gap-3 mb-4">
                        <div style={{
                          width: "4px",
                          height: "40px",
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          borderRadius: "2px"
                        }}></div>
                        <h2 className="mb-0" style={{ fontSize: "2rem", fontWeight: "700", color: "#1f2937" }}>
                          SEO Analysis Report
                        </h2>
                      </div>
                      <div className="ps-4">
                        <div className="mb-3" style={{ fontSize: "0.95rem", color: "#6b7280" }}>
                          <span style={{ color: "#374151", fontWeight: "500" }}>URL:</span>{" "}
                          <a 
                            href={analysisData.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            style={{ color: "#667eea", textDecoration: "none" }}
                            onMouseEnter={(e) => e.currentTarget.style.textDecoration = "underline"}
                            onMouseLeave={(e) => e.currentTarget.style.textDecoration = "none"}
                          >
                            {analysisData.url}
                          </a>
                        </div>
                        <div className="mb-3" style={{ fontSize: "0.95rem", color: "#6b7280" }}>
                          <span style={{ color: "#374151", fontWeight: "500" }}>Domain:</span>{" "}
                          <span style={{ color: "#1f2937" }}>{analysisData.domain}</span>
                        </div>
                        <div className="mb-3" style={{ fontSize: "0.95rem", color: "#6b7280" }}>
                          <span style={{ color: "#374151", fontWeight: "500" }}>Analysis ID:</span>{" "}
                          <code style={{ 
                            background: "#f3f4f6", 
                            color: "#667eea",
                            padding: "4px 10px", 
                            borderRadius: "6px",
                            fontSize: "0.875rem",
                            fontFamily: "monospace",
                            border: "1px solid #e5e7eb"
                          }}>
                            {analysisData.analysis_id}
                          </code>
                        </div>
                        <div style={{ fontSize: "0.95rem", color: "#6b7280" }}>
                          <span style={{ color: "#374151", fontWeight: "500" }}>Generated:</span>{" "}
                          <span style={{ color: "#1f2937" }}>{new Date(analysisData.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 mt-md-0" data-pdf-hide-button>
                      <button
                        className="btn btn-lg"
                        onClick={downloadPDF}
                        disabled={isGeneratingPDF}
                        data-pdf-button="true"
                        style={{
                          borderRadius: "12px",
                          padding: "12px 28px",
                          fontWeight: "600",
                          background: isGeneratingPDF 
                            ? "#9ca3af" 
                            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          color: "white",
                          border: "none",
                          boxShadow: "0 4px 14px rgba(102, 126, 234, 0.3)",
                          transition: "all 0.3s ease",
                          cursor: isGeneratingPDF ? "not-allowed" : "pointer"
                        }}
                        onMouseEnter={(e) => {
                          if (!isGeneratingPDF) {
                            e.currentTarget.style.transform = "translateY(-2px)";
                            e.currentTarget.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.4)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isGeneratingPDF) {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 4px 14px rgba(102, 126, 234, 0.3)";
                          }
                        }}
                      >
                        {isGeneratingPDF ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Generating PDF...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-download me-2"></i>
                            Download PDF
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Overall Score Card */}
            <div className="row mb-4" data-pdf-page="1">
              <div className="col-12">
                <div 
                  className="card border-0 shadow-sm"
                  style={{
                    borderRadius: "16px",
                    padding: "2.5rem",
                    background: "white",
                    border: "1px solid #e5e7eb"
                  }}
                >
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div style={{
                      width: "4px",
                      height: "32px",
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      borderRadius: "2px"
                    }}></div>
                    <h3 className="mb-0" style={{ fontSize: "1.5rem", fontWeight: "600", color: "#1f2937" }}>Overall Score</h3>
                  </div>
                  
                  <div className="row align-items-center">
                    {/* Main Score Display */}
                    <div className="col-md-4 text-center mb-4 mb-md-0">
                      <div
                        style={{
                          fontSize: "5.5rem",
                          fontWeight: "700",
                          color: "#1f2937",
                          lineHeight: "1",
                          marginBottom: "1rem",
                          letterSpacing: "-0.02em"
                        }}
                      >
                        {analysisData.overall_score.total.toFixed(0)}
                      </div>
                      <div
                        style={{
                          background: "#f3f4f6",
                          color: "#374151",
                          padding: "8px 20px",
                          borderRadius: "8px",
                          fontSize: "0.95rem",
                          fontWeight: "600",
                          display: "inline-block",
                          border: "1px solid #e5e7eb"
                        }}
                      >
                        Grade: {analysisData.overall_score.grade}
                      </div>
                      <div style={{ marginTop: "12px", fontSize: "0.875rem", color: "#6b7280" }}>
                        {analysisData.overall_score.status}
                      </div>
                    </div>
                    
                    {/* Category Breakdown */}
                    <div className="col-md-8">
                      <div className="row g-3">
                        {Object.entries(analysisData.overall_score.breakdown).map(([key, value]) => (
                          <div key={key} className="col-6 col-md-4">
                            <div 
                              className="card border" 
                              style={{ 
                                borderRadius: "12px", 
                                padding: "1.25rem",
                                background: "white",
                                borderColor: "#e5e7eb",
                                transition: "all 0.2s ease"
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = "#667eea";
                                e.currentTarget.style.boxShadow = "0 2px 8px rgba(102, 126, 234, 0.1)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "#e5e7eb";
                                e.currentTarget.style.boxShadow = "none";
                              }}
                            >
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <span style={{ fontSize: "0.875rem", fontWeight: "500", textTransform: "capitalize", color: "#6b7280" }}>
                                  {key.replace("_", " ")}
                                </span>
                                <span style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937" }}>
                                  {value}
                                </span>
                              </div>
                              <div className="progress" style={{ height: "8px", borderRadius: "4px", background: "#f3f4f6" }}>
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  style={{
                                    width: `${value}%`,
                                    background: value >= 80 ? "#10b981" : value >= 60 ? "#f59e0b" : "#ef4444",
                                    borderRadius: "4px",
                                    transition: "width 0.3s ease"
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Screenshot Section - Page 2 */}
            {finalScreenshot && (
              <div className="row mb-4" data-pdf-page="2">
                <div className="col-12">
                  <div 
                    className="card border-0 shadow-sm"
                    style={{
                      borderRadius: "16px",
                      padding: "2.5rem",
                      background: "white",
                      border: "1px solid #e5e7eb"
                    }}
                  >
                    <h3 className="mb-4" style={{ fontSize: "1.5rem", fontWeight: "600", color: "#1f2937" }}>Page Screenshot</h3>
                    <div className="text-center">
                      <img
                        src={finalScreenshot}
                        alt="Final page screenshot"
                        style={{
                          maxWidth: "100%",
                          borderRadius: "12px",
                          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                          border: "1px solid #e5e7eb"
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Screenshot Thumbnails (Filmstrip) - Page 2 */}
            {screenshotThumbnails.length > 0 && (
              <div className="row mb-4" data-pdf-page="2">
                <div className="col-12">
                  <div 
                    className="card border-0 shadow-sm"
                    style={{
                      borderRadius: "16px",
                      padding: "2.5rem",
                      background: "white",
                      border: "1px solid #e5e7eb"
                    }}
                  >
                    <h3 className="mb-4" style={{ fontSize: "1.5rem", fontWeight: "600", color: "#1f2937" }}>Page Load Timeline</h3>
                    <div className="d-flex gap-3 overflow-auto pb-3" style={{ scrollbarWidth: "thin" }}>
                      {screenshotThumbnails.map((thumb: any, i: number) => (
                        <div key={i} className="text-center" style={{ minWidth: "200px" }}>
                          <img
                            src={thumb.data}
                            alt={`Screenshot at ${thumb.timing}ms`}
                            style={{
                              width: "100%",
                              borderRadius: "8px",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                              border: "1px solid #e5e7eb",
                              marginBottom: "8px"
                            }}
                          />
                          <div style={{ fontSize: "0.875rem", color: "#6b7280", fontWeight: "500" }}>
                            {thumb.timing}ms
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Meta Information */}
            <div className="row mb-4" data-pdf-page="3">
              <div className="col-12">
                <div 
                  className="card border-0 shadow-sm"
                  style={{
                    borderRadius: "16px",
                    padding: "2.5rem",
                    background: "white",
                    border: "1px solid #e5e7eb"
                  }}
                >
                  <h3 className="mb-4" style={{ fontSize: "1.5rem", fontWeight: "600", color: "#1f2937" }}>Meta Information</h3>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div 
                        className="card border" 
                        style={{ 
                          borderRadius: "12px", 
                          padding: "1.5rem", 
                          background: "white",
                          borderColor: "#e5e7eb"
                        }}
                      >
                        <h5 className="mb-3" style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937" }}>Title Tag</h5>
                        <p className="mb-2" style={{ color: "#374151" }}>
                          <span style={{ color: "#6b7280", fontWeight: "500" }}>Content:</span>{" "}
                          <span style={{ color: "#1f2937" }}>{analysisData.meta_information.title.content || "N/A"}</span>
                        </p>
                        <p className="mb-3" style={{ color: "#374151" }}>
                          <span style={{ color: "#6b7280", fontWeight: "500" }}>Length:</span>{" "}
                          <span style={{ color: "#1f2937" }}>{analysisData.meta_information.title.length} characters</span>
                        </p>
                        <span className={`badge ${getStatusBadge(analysisData.meta_information.title.status).color}`} style={{ padding: "6px 12px", borderRadius: "6px", marginBottom: "12px", display: "inline-block" }}>
                          {getStatusBadge(analysisData.meta_information.title.status).text}
                        </span>
                        {analysisData.meta_information.title.recommendations.length > 0 && (
                          <div className="mt-3 pt-3" style={{ borderTop: "1px solid #e5e7eb" }}>
                            <strong style={{ color: "#374151", display: "block", marginBottom: "8px" }}>Recommendations:</strong>
                            <ul className="mb-0" style={{ paddingLeft: "20px", color: "#6b7280" }}>
                              {analysisData.meta_information.title.recommendations.map((rec, i) => (
                                <li key={i} style={{ marginBottom: "6px", fontSize: "0.9rem" }}>{rec}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div 
                        className="card border" 
                        style={{ 
                          borderRadius: "12px", 
                          padding: "1.5rem", 
                          background: "white",
                          borderColor: "#e5e7eb"
                        }}
                      >
                        <h5 className="mb-3" style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937" }}>Meta Description</h5>
                        <p className="mb-2" style={{ color: "#374151" }}>
                          <span style={{ color: "#6b7280", fontWeight: "500" }}>Content:</span>{" "}
                          <span style={{ color: "#1f2937" }}>{analysisData.meta_information.description.content || "N/A"}</span>
                        </p>
                        <p className="mb-3" style={{ color: "#374151" }}>
                          <span style={{ color: "#6b7280", fontWeight: "500" }}>Length:</span>{" "}
                          <span style={{ color: "#1f2937" }}>{analysisData.meta_information.description.length} characters</span>
                        </p>
                        <span className={`badge ${getStatusBadge(analysisData.meta_information.description.status).color}`} style={{ padding: "6px 12px", borderRadius: "6px", marginBottom: "12px", display: "inline-block" }}>
                          {getStatusBadge(analysisData.meta_information.description.status).text}
                        </span>
                        {analysisData.meta_information.description.recommendations.length > 0 && (
                          <div className="mt-3 pt-3" style={{ borderTop: "1px solid #e5e7eb" }}>
                            <strong style={{ color: "#374151", display: "block", marginBottom: "8px" }}>Recommendations:</strong>
                            <ul className="mb-0" style={{ paddingLeft: "20px", color: "#6b7280" }}>
                              {analysisData.meta_information.description.recommendations.map((rec, i) => (
                                <li key={i} style={{ marginBottom: "6px", fontSize: "0.9rem" }}>{rec}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div 
                        className="card border" 
                        style={{ 
                          borderRadius: "12px", 
                          padding: "1.5rem", 
                          background: "white",
                          borderColor: "#e5e7eb"
                        }}
                      >
                        <h5 className="mb-3" style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937" }}>Open Graph</h5>
                        <span className={`badge ${getStatusBadge(analysisData.meta_information.open_graph.status).color}`} style={{ padding: "6px 12px", borderRadius: "6px", marginBottom: "12px", display: "inline-block" }}>
                          {getStatusBadge(analysisData.meta_information.open_graph.status).text}
                        </span>
                        {analysisData.meta_information.open_graph.missing_tags.length > 0 && (
                          <div className="mt-3 pt-3" style={{ borderTop: "1px solid #e5e7eb" }}>
                            <strong style={{ color: "#374151", display: "block", marginBottom: "10px" }}>Missing Tags:</strong>
                            <div className="d-flex flex-wrap gap-2">
                              {analysisData.meta_information.open_graph.missing_tags.map((tag, i) => (
                                <span 
                                  key={i} 
                                  style={{ 
                                    padding: "6px 12px", 
                                    borderRadius: "6px",
                                    background: "#f3f4f6",
                                    color: "#374151",
                                    fontSize: "0.875rem",
                                    border: "1px solid #e5e7eb"
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div 
                        className="card border" 
                        style={{ 
                          borderRadius: "12px", 
                          padding: "1.5rem", 
                          background: "white",
                          borderColor: "#e5e7eb"
                        }}
                      >
                        <h5 className="mb-3" style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937" }}>Twitter Card</h5>
                        <span className={`badge ${getStatusBadge(analysisData.meta_information.twitter_card.status).color}`} style={{ padding: "6px 12px", borderRadius: "6px", marginBottom: "12px", display: "inline-block" }}>
                          {getStatusBadge(analysisData.meta_information.twitter_card.status).text}
                        </span>
                        {analysisData.meta_information.twitter_card.missing_tags.length > 0 && (
                          <div className="mt-3 pt-3" style={{ borderTop: "1px solid #e5e7eb" }}>
                            <strong style={{ color: "#374151", display: "block", marginBottom: "10px" }}>Missing Tags:</strong>
                            <div className="d-flex flex-wrap gap-2">
                              {analysisData.meta_information.twitter_card.missing_tags.map((tag, i) => (
                                <span 
                                  key={i} 
                                  style={{ 
                                    padding: "6px 12px", 
                                    borderRadius: "6px",
                                    background: "#f3f4f6",
                                    color: "#374151",
                                    fontSize: "0.875rem",
                                    border: "1px solid #e5e7eb"
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Analysis */}
            <div className="row mb-4" data-pdf-page="3">
              <div className="col-12">
                <div 
                  className="card border-0 shadow-sm"
                  style={{
                    borderRadius: "16px",
                    padding: "2.5rem",
                    background: "white",
                    border: "1px solid #e5e7eb"
                  }}
                >
                  <h3 className="mb-4" style={{ fontSize: "1.5rem", fontWeight: "600", color: "#1f2937" }}>Content Analysis</h3>
                  <div className="row g-4">
                    <div className="col-md-4">
                      <div className="card border text-center" style={{ borderRadius: "12px", padding: "1.5rem", background: "white", borderColor: "#e5e7eb" }}>
                        <div style={{ fontSize: "2rem", fontWeight: "700", color: "#667eea" }}>
                          {analysisData.content_analysis.word_count.toLocaleString()}
                        </div>
                        <div style={{ color: "#6b7280", marginTop: "8px", fontSize: "0.875rem", fontWeight: "500" }}>Words</div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card border text-center" style={{ borderRadius: "12px", padding: "1.5rem", background: "white", borderColor: "#e5e7eb" }}>
                        <div style={{ fontSize: "2rem", fontWeight: "700", color: "#667eea" }}>
                          {analysisData.content_analysis.reading_time_minutes}
                        </div>
                        <div style={{ color: "#6b7280", marginTop: "8px", fontSize: "0.875rem", fontWeight: "500" }}>Minutes Read</div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card border text-center" style={{ borderRadius: "12px", padding: "1.5rem", background: "white", borderColor: "#e5e7eb" }}>
                        <div style={{ fontSize: "2rem", fontWeight: "700", color: getScoreColor(analysisData.content_analysis.score) }}>
                          {analysisData.content_analysis.score}
                        </div>
                        <div style={{ color: "#6b7280", marginTop: "8px", fontSize: "0.875rem", fontWeight: "500" }}>Content Score</div>
                      </div>
                    </div>
                    {analysisData.content_analysis.top_keywords.length > 0 && (
                      <div className="col-12 mt-2">
                        <h5 className="mb-3" style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937" }}>Top Keywords</h5>
                        <div className="table-responsive">
                          <table className="table mb-0" style={{ background: "white", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
                            <thead style={{ background: "#f9fafb" }}>
                              <tr>
                                <th style={{ color: "#374151", fontWeight: "600", borderColor: "#e5e7eb" }}>Keyword</th>
                                <th style={{ color: "#374151", fontWeight: "600", borderColor: "#e5e7eb" }}>Count</th>
                                <th style={{ color: "#374151", fontWeight: "600", borderColor: "#e5e7eb" }}>Density</th>
                              </tr>
                            </thead>
                            <tbody>
                              {analysisData.content_analysis.top_keywords.map((kw, i) => (
                                <tr key={i} style={{ borderColor: "#e5e7eb" }}>
                                  <td style={{ color: "#1f2937", fontWeight: "600" }}>{kw.keyword}</td>
                                  <td style={{ color: "#6b7280" }}>{kw.count}</td>
                                  <td style={{ color: "#667eea", fontWeight: "500" }}>{kw.density.toFixed(2)}%</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            {analysisData.performance && (
              <div className="row mb-4" data-pdf-page="4">
                <div className="col-12">
                  <div 
                    className="card border-0 shadow-sm"
                    style={{
                      borderRadius: "16px",
                      padding: "2.5rem",
                      background: "white",
                      border: "1px solid #e5e7eb"
                    }}
                  >
                    <h3 className="mb-4" style={{ fontSize: "1.5rem", fontWeight: "600", color: "#1f2937" }}>Performance Metrics</h3>
                    {analysisData.performance.lighthouse && (
                      <div className="row g-3 mb-4">
                        <div className="col-6 col-md-3">
                          <div className="card border text-center" style={{ borderRadius: "12px", padding: "1.5rem", background: "white", borderColor: "#e5e7eb" }}>
                            <div style={{ fontSize: "2rem", fontWeight: "700", color: getScoreColor(analysisData.performance.lighthouse.performance_score) }}>
                              {analysisData.performance.lighthouse.performance_score}
                            </div>
                            <div style={{ color: "#6b7280", marginTop: "8px", fontSize: "0.875rem", fontWeight: "500" }}>Performance</div>
                          </div>
                        </div>
                        <div className="col-6 col-md-3">
                          <div className="card border text-center" style={{ borderRadius: "12px", padding: "1.5rem", background: "white", borderColor: "#e5e7eb" }}>
                            <div style={{ fontSize: "2rem", fontWeight: "700", color: getScoreColor(analysisData.performance.lighthouse.accessibility_score) }}>
                              {analysisData.performance.lighthouse.accessibility_score}
                            </div>
                            <div style={{ color: "#6b7280", marginTop: "8px", fontSize: "0.875rem", fontWeight: "500" }}>Accessibility</div>
                          </div>
                        </div>
                        <div className="col-6 col-md-3">
                          <div className="card border text-center" style={{ borderRadius: "12px", padding: "1.5rem", background: "white", borderColor: "#e5e7eb" }}>
                            <div style={{ fontSize: "2rem", fontWeight: "700", color: getScoreColor(analysisData.performance.lighthouse.best_practices_score) }}>
                              {analysisData.performance.lighthouse.best_practices_score}
                            </div>
                            <div style={{ color: "#6b7280", marginTop: "8px", fontSize: "0.875rem", fontWeight: "500" }}>Best Practices</div>
                          </div>
                        </div>
                        <div className="col-6 col-md-3">
                          <div className="card border text-center" style={{ borderRadius: "12px", padding: "1.5rem", background: "white", borderColor: "#e5e7eb" }}>
                            <div style={{ fontSize: "2rem", fontWeight: "700", color: getScoreColor(analysisData.performance.lighthouse.seo_score) }}>
                              {analysisData.performance.lighthouse.seo_score}
                            </div>
                            <div style={{ color: "#6b7280", marginTop: "8px", fontSize: "0.875rem", fontWeight: "500" }}>SEO</div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="row g-3">
                      <div className="col-md-4">
                        <div className="card border" style={{ borderRadius: "12px", padding: "1.25rem", background: "white", borderColor: "#e5e7eb" }}>
                          <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "8px", fontWeight: "500" }}>Page Load Time</div>
                          <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937" }}>{analysisData.performance.page_load_time_ms}ms</div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card border" style={{ borderRadius: "12px", padding: "1.25rem", background: "white", borderColor: "#e5e7eb" }}>
                          <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "8px", fontWeight: "500" }}>Page Size</div>
                          <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937" }}>{analysisData.performance.page_size_formatted}</div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card border" style={{ borderRadius: "12px", padding: "1.25rem", background: "white", borderColor: "#e5e7eb" }}>
                          <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "8px", fontWeight: "500" }}>Performance Score</div>
                          <div style={{ fontSize: "1.5rem", fontWeight: "700", color: getScoreColor(analysisData.performance.score) }}>
                            {analysisData.performance.score}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Recommendations */}
            {analysisData.recommendations && analysisData.recommendations.length > 0 && (
              <div className="row mb-4" data-pdf-page="4">
                <div className="col-12">
                  <div 
                    className="card border-0 shadow-sm"
                    style={{
                      borderRadius: "16px",
                      padding: "2.5rem",
                      background: "white",
                      border: "1px solid #e5e7eb"
                    }}
                  >
                    <h3 className="mb-4" style={{ fontSize: "1.5rem", fontWeight: "600", color: "#1f2937" }}>Recommendations</h3>
                    <div className="row g-3">
                      {analysisData.recommendations.map((rec, i) => (
                        <div key={i} className="col-12">
                          <div 
                            className="card border"
                            style={{
                              borderRadius: "12px",
                              padding: "1.5rem",
                              background: "white",
                              borderColor: "#e5e7eb",
                              borderLeft: `4px solid ${
                                rec.priority === "critical" ? "#ef4444" : 
                                rec.priority === "high" ? "#f59e0b" : 
                                rec.priority === "medium" ? "#667eea" : "#9ca3af"
                              }`
                            }}
                          >
                            <div className="d-flex align-items-center gap-2 mb-3">
                              <span 
                                className="badge"
                                style={{
                                  background: rec.priority === "critical" ? "#ef4444" : 
                                    rec.priority === "high" ? "#f59e0b" : 
                                    rec.priority === "medium" ? "#667eea" : "#9ca3af",
                                  color: "white",
                                  padding: "6px 12px",
                                  borderRadius: "6px",
                                  fontSize: "0.75rem",
                                  textTransform: "uppercase",
                                  fontWeight: "600"
                                }}
                              >
                                {rec.priority}
                              </span>
                              <span 
                                style={{ 
                                  padding: "6px 12px", 
                                  borderRadius: "6px", 
                                  fontSize: "0.75rem",
                                  background: "#f3f4f6",
                                  color: "#6b7280",
                                  fontWeight: "500"
                                }}
                              >
                                {rec.category}
                              </span>
                            </div>
                            <h5 className="mb-2" style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937" }}>{rec.issue}</h5>
                            <p className="mb-2" style={{ color: "#6b7280", fontSize: "0.95rem" }}>
                              <span style={{ color: "#374151", fontWeight: "500" }}>Impact:</span> {rec.impact}
                            </p>
                            <p className="mb-0" style={{ color: "#374151", fontSize: "0.95rem" }}>
                              <span style={{ color: "#374151", fontWeight: "500" }}>Recommendation:</span> {rec.recommendation}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Core Web Vitals */}
            {analysisData.performance?.lighthouse?.core_web_vitals && (
              <div className="row mb-4" data-pdf-page="5">
                <div className="col-12">
                  <div 
                    className="card border-0 shadow-sm"
                    style={{
                      borderRadius: "16px",
                      padding: "2.5rem",
                      background: "white",
                      border: "1px solid #e5e7eb"
                    }}
                  >
                    <h3 className="mb-4" style={{ fontSize: "1.5rem", fontWeight: "600", color: "#1f2937" }}>Core Web Vitals</h3>
                    <div className="row g-3">
                      {analysisData.performance.lighthouse.core_web_vitals["first-contentful-paint"] && (
                        <div className="col-md-4">
                          <div className="card border" style={{ borderRadius: "12px", padding: "1.5rem", background: "white", borderColor: "#e5e7eb" }}>
                            <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "8px", fontWeight: "500" }}>First Contentful Paint</div>
                            <div style={{ fontSize: "1.75rem", fontWeight: "700", color: "#1f2937" }}>
                              {analysisData.performance.lighthouse.core_web_vitals["first-contentful-paint"].displayValue || 
                               `${(analysisData.performance.lighthouse.core_web_vitals["first-contentful-paint"].numericValue || 0).toFixed(1)}ms`}
                            </div>
                          </div>
                        </div>
                      )}
                      {analysisData.performance.lighthouse.core_web_vitals["largest-contentful-paint"] && (
                        <div className="col-md-4">
                          <div className="card border" style={{ borderRadius: "12px", padding: "1.5rem", background: "white", borderColor: "#e5e7eb" }}>
                            <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "8px", fontWeight: "500" }}>Largest Contentful Paint</div>
                            <div style={{ fontSize: "1.75rem", fontWeight: "700", color: "#1f2937" }}>
                              {analysisData.performance.lighthouse.core_web_vitals["largest-contentful-paint"].displayValue || 
                               `${(analysisData.performance.lighthouse.core_web_vitals["largest-contentful-paint"].numericValue || 0).toFixed(1)}ms`}
                            </div>
                          </div>
                        </div>
                      )}
                      {analysisData.performance.lighthouse.core_web_vitals["cumulative-layout-shift"] && (
                        <div className="col-md-4">
                          <div className="card border" style={{ borderRadius: "12px", padding: "1.5rem", background: "white", borderColor: "#e5e7eb" }}>
                            <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "8px", fontWeight: "500" }}>Cumulative Layout Shift</div>
                            <div style={{ fontSize: "1.75rem", fontWeight: "700", color: "#1f2937" }}>
                              {analysisData.performance.lighthouse.core_web_vitals["cumulative-layout-shift"].displayValue || 
                               (analysisData.performance.lighthouse.core_web_vitals["cumulative-layout-shift"].numericValue || 0).toFixed(3)}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Technical SEO */}
            <div className="row mb-4" data-pdf-page="5">
              <div className="col-12">
                <div 
                  className="card border-0 shadow-sm"
                  style={{
                    borderRadius: "16px",
                    padding: "2rem",
                    background: "white"
                  }}
                >
                  <h3 className="mb-4" style={{ fontSize: "1.5rem", fontWeight: "600" }}>Technical SEO</h3>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <div className="card border" style={{ borderRadius: "12px", padding: "1.5rem", background: "#f9fafb" }}>
                        <div style={{ fontSize: "0.875rem", color: "#64748b", marginBottom: "8px" }}>SSL Status</div>
                        <div className="d-flex align-items-center gap-2">
                          <span className={`badge ${analysisData.technical_seo.ssl.enabled ? "bg-success" : "bg-danger"}`} style={{ padding: "6px 12px", borderRadius: "6px" }}>
                            {analysisData.technical_seo.ssl.enabled ? "Enabled" : "Disabled"}
                          </span>
                          <span style={{ fontSize: "0.875rem", color: "#64748b" }}>{analysisData.technical_seo.ssl.status}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card border" style={{ borderRadius: "12px", padding: "1.5rem", background: "#f9fafb" }}>
                        <div style={{ fontSize: "0.875rem", color: "#64748b", marginBottom: "8px" }}>Structured Data</div>
                        <div style={{ fontSize: "1.25rem", fontWeight: "700" }}>
                          {analysisData.technical_seo.structured_data.exists ? (
                            <span>{analysisData.technical_seo.structured_data.count} types found</span>
                          ) : (
                            <span style={{ color: "#ef4444" }}>Not Found</span>
                          )}
                        </div>
                        {analysisData.technical_seo.structured_data.types.length > 0 && (
                          <div className="d-flex flex-wrap gap-2 mt-2">
                            {analysisData.technical_seo.structured_data.types.map((type, i) => (
                              <span key={i} className="badge bg-blue-100 text-blue-800" style={{ padding: "4px 8px", borderRadius: "4px" }}>
                                {type}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card border" style={{ borderRadius: "12px", padding: "1.5rem", background: "#f9fafb" }}>
                        <div style={{ fontSize: "0.875rem", color: "#64748b", marginBottom: "8px" }}>Technical Score</div>
                        <div style={{ fontSize: "1.75rem", fontWeight: "700", color: getScoreColor(analysisData.technical_seo.score) }}>
                          {analysisData.technical_seo.score}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile & Accessibility */}
            <div className="row mb-4" data-pdf-page="5">
              <div className="col-md-6 mb-4">
                <div 
                  className="card border-0 shadow-sm h-100"
                  style={{
                    borderRadius: "16px",
                    padding: "2rem",
                    background: "white"
                  }}
                >
                  <h3 className="mb-4" style={{ fontSize: "1.5rem", fontWeight: "600" }}>Mobile Analysis</h3>
                  <div className="d-flex flex-column gap-3">
                    <div className="d-flex justify-content-between align-items-center p-3" style={{ background: "#f9fafb", borderRadius: "8px" }}>
                      <span>Mobile Friendly</span>
                      <span className={`badge ${analysisData.mobile.is_mobile_friendly ? "bg-success" : "bg-danger"}`} style={{ padding: "6px 12px", borderRadius: "6px" }}>
                        {analysisData.mobile.is_mobile_friendly ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center p-3" style={{ background: "#f9fafb", borderRadius: "8px" }}>
                      <span>Viewport Configured</span>
                      <span className={`badge ${analysisData.mobile.viewport_configured ? "bg-success" : "bg-warning"}`} style={{ padding: "6px 12px", borderRadius: "6px" }}>
                        {analysisData.mobile.viewport_configured ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center p-3" style={{ background: "#f9fafb", borderRadius: "8px" }}>
                      <span>Responsive Design</span>
                      <span className={`badge ${analysisData.mobile.responsive_design ? "bg-success" : "bg-warning"}`} style={{ padding: "6px 12px", borderRadius: "6px" }}>
                        {analysisData.mobile.responsive_design ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center p-3" style={{ background: "#f9fafb", borderRadius: "8px" }}>
                      <span>Media Queries</span>
                      <strong>{analysisData.mobile.media_queries}</strong>
                    </div>
                    <div className="d-flex justify-content-between align-items-center p-3" style={{ background: "#f9fafb", borderRadius: "8px" }}>
                      <span>Mobile Score</span>
                      <strong style={{ fontSize: "1.25rem", color: getScoreColor(analysisData.mobile.score) }}>{analysisData.mobile.score}</strong>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div 
                  className="card border-0 shadow-sm h-100"
                  style={{
                    borderRadius: "16px",
                    padding: "2rem",
                    background: "white"
                  }}
                >
                  <h3 className="mb-4" style={{ fontSize: "1.5rem", fontWeight: "600" }}>Accessibility</h3>
                  <div className="d-flex flex-column gap-3">
                    <div className="d-flex justify-content-between align-items-center p-3" style={{ background: "#f9fafb", borderRadius: "8px" }}>
                      <span>ARIA Labels</span>
                      <strong>{analysisData.accessibility.aria_labels}</strong>
                    </div>
                    <div className="d-flex justify-content-between align-items-center p-3" style={{ background: "#f9fafb", borderRadius: "8px" }}>
                      <span>Alt Text Coverage</span>
                      <strong>{analysisData.accessibility.alt_text_coverage}%</strong>
                    </div>
                    <div className="d-flex justify-content-between align-items-center p-3" style={{ background: "#f9fafb", borderRadius: "8px" }}>
                      <span>Form Labels</span>
                      <strong>{analysisData.accessibility.form_labels}</strong>
                    </div>
                    <div className="d-flex justify-content-between align-items-center p-3" style={{ background: "#f9fafb", borderRadius: "8px" }}>
                      <span>Accessibility Score</span>
                      <strong style={{ fontSize: "1.25rem", color: getScoreColor(analysisData.accessibility.score) }}>{analysisData.accessibility.score}</strong>
                    </div>
                    {analysisData.accessibility.issues.length > 0 && (
                      <div className="mt-2">
                        <strong>Issues:</strong>
                        <ul className="mt-2 mb-0">
                          {analysisData.accessibility.issues.map((issue, i) => (
                            <li key={i} style={{ fontSize: "0.875rem", color: "#64748b" }}>{issue}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Issues Section */}
            {analysisData.issues && (analysisData.issues.warnings.length > 0 || analysisData.issues.notices.length > 0) && (
              <div className="row mb-4" data-pdf-page="6">
                <div className="col-12">
                  <div 
                    className="card border-0 shadow-sm"
                    style={{
                      borderRadius: "16px",
                      padding: "2rem",
                      background: "white"
                    }}
                  >
                    <h3 className="mb-4" style={{ fontSize: "1.5rem", fontWeight: "600" }}>Issues Found</h3>
                    {analysisData.issues.warnings.length > 0 && (
                      <div className="mb-4">
                        <h5 className="mb-3" style={{ fontSize: "1.125rem", fontWeight: "600", color: "#f59e0b" }}>
                          Warnings ({analysisData.issues.warnings.length})
                        </h5>
                        <div className="row g-3">
                          {analysisData.issues.warnings.map((warning: any, i: number) => (
                            <div key={i} className="col-12">
                              <div className="card border border-amber-200" style={{ borderRadius: "12px", padding: "1rem", background: "#fffbeb" }}>
                                <div className="d-flex align-items-center gap-2 mb-1">
                                  <span className="badge bg-amber-500" style={{ padding: "4px 8px", borderRadius: "4px" }}>
                                    {warning.type}
                                  </span>
                                </div>
                                <p className="mb-0" style={{ color: "#92400e" }}>{warning.message}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {analysisData.issues.notices.length > 0 && (
                      <div>
                        <h5 className="mb-3" style={{ fontSize: "1.125rem", fontWeight: "600", color: "#3b82f6" }}>
                          Notices ({analysisData.issues.notices.length})
                        </h5>
                        <div className="row g-3">
                          {analysisData.issues.notices.map((notice: any, i: number) => (
                            <div key={i} className="col-12">
                              <div className="card border border-blue-200" style={{ borderRadius: "12px", padding: "1rem", background: "#eff6ff" }}>
                                <div className="d-flex align-items-center gap-2 mb-1">
                                  <span className="badge bg-blue-500" style={{ padding: "4px 8px", borderRadius: "4px" }}>
                                    {notice.type}
                                  </span>
                                </div>
                                <p className="mb-0" style={{ color: "#1e40af" }}>{notice.message}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Quick Stats Grid */}
            <div className="row mb-4" data-pdf-page="6">
              <div className="col-md-6 mb-4">
                <div 
                  className="card border-0 shadow-sm h-100"
                  style={{
                    borderRadius: "16px",
                    padding: "2rem",
                    background: "white"
                  }}
                >
                  <h3 className="mb-4" style={{ fontSize: "1.5rem", fontWeight: "600" }}>Quick Stats</h3>
                  <div className="d-flex flex-column gap-3">
                    <div className="d-flex justify-content-between align-items-center p-2" style={{ background: "#f9fafb", borderRadius: "8px" }}>
                      <span>Processing Time</span>
                      <strong>{analysisData.processing_time_ms}ms</strong>
                    </div>
                    <div className="d-flex justify-content-between align-items-center p-2" style={{ background: "#f9fafb", borderRadius: "8px" }}>
                      <span>Status Code</span>
                      <strong>{analysisData.technical_seo.status_code}</strong>
                    </div>
                    <div className="d-flex justify-content-between align-items-center p-2" style={{ background: "#f9fafb", borderRadius: "8px" }}>
                      <span>Total Links</span>
                      <strong>{analysisData.links.total} (I: {analysisData.links.internal}, E: {analysisData.links.external})</strong>
                    </div>
                    <div className="d-flex justify-content-between align-items-center p-2" style={{ background: "#f9fafb", borderRadius: "8px" }}>
                      <span>Total Images</span>
                      <strong>{analysisData.images.total} (Alt: {analysisData.images.with_alt})</strong>
                    </div>
                    <div className="d-flex justify-content-between align-items-center p-2" style={{ background: "#f9fafb", borderRadius: "8px" }}>
                      <span>Mobile Friendly</span>
                      <strong>{analysisData.mobile.is_mobile_friendly ? "Yes" : "No"}</strong>
                    </div>
                    <div className="d-flex justify-content-between align-items-center p-2" style={{ background: "#f9fafb", borderRadius: "8px" }}>
                      <span>HTTPS</span>
                      <strong>{analysisData.security.https ? "Yes" : "No"}</strong>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div 
                  className="card border-0 shadow-sm h-100"
                  style={{
                    borderRadius: "16px",
                    padding: "2rem",
                    background: "white"
                  }}
                >
                  <h3 className="mb-4" style={{ fontSize: "1.5rem", fontWeight: "600" }}>Category Scores</h3>
                  {Object.entries(analysisData.category_scores).map(([key, value]) => (
                    <div key={key} className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span style={{ textTransform: "capitalize", fontWeight: "500" }}>{key.replace("_", " ")}</span>
                        <span style={{ fontSize: "1.25rem", fontWeight: "700", color: getScoreColor(value) }}>{value}</span>
                      </div>
                      <div className="progress" style={{ height: "10px", borderRadius: "5px", background: "#e5e7eb" }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{
                            width: `${value}%`,
                            background: getScoreColor(value),
                            borderRadius: "5px"
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterFour />
    </>
  );
};

export default SEOReportDisplay;

