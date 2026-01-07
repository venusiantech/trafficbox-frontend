"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import RoundSearchIcon from "@/svg/round_search_icon";
import { seoAnalysisService } from "@/services/seoAnalysisService";
import { storeAnalysisData } from "@/utils/storageService";

const SEOAnalysisForm = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate URL
    const validation = seoAnalysisService.validateURL(url);
    if (!validation.valid) {
      setError(validation.error || "Invalid URL");
      return;
    }

    try {
      setLoading(true);
      const response = await seoAnalysisService.analyzeURL(url);
      
      // Get analysis ID
      const analysisId = response.data?.data?.analysis_id || `analysis-${Date.now()}`;
      
      // Store response using storage service (handles large data with IndexedDB)
      try {
        await storeAnalysisData(analysisId, response);
      } catch (storageError: any) {
        console.error('Storage error:', storageError);
        setError(storageError.message || "Failed to store analysis data. Please try again.");
        setLoading(false);
        return;
      }
      
      // Navigate to report page with analysis ID
      router.push(`/marketing-analysis/report/${analysisId}`);
    } catch (err: any) {
      setError(err.message || "Failed to analyze URL. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="tpbanner__form d-flex align-items-center justify-content-between">
          <div className="tpbanner__input tpkeyword__input">
            <input
              type="url"
              placeholder="Enter website URL (e.g., https://example.com)"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError("");
              }}
              disabled={loading}
            />
            <span>
              <RoundSearchIcon />
            </span>
          </div>
          <div className="tpbanner__search-btn tpkeyword__search-btn">
            <button
              className="banner-search-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Analyze Now"}
            </button>
          </div>
        </div>
        {error && (
          <div className="mt-3 text-danger" style={{ textAlign: "center" }}>
            {error}
          </div>
        )}
      </form>
    </>
  );
};

export default SEOAnalysisForm;

