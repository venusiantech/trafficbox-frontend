"use client"
import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import ScrollToTop from "@/components/common/scroll-to-top";
import Wrapper from "@/layout/Wrapper";
import SEOReportDisplay from "@/components/services/marketing-analysis/SEOReportDisplay";
import { seoAnalysisService, SEOAnalysisResponse } from "@/services/seoAnalysisService";
import { getAnalysisData } from "@/utils/storageService";

function ReportContent() {
  const router = useRouter();
  const [analysisData, setAnalysisData] = useState<SEOAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Try to get data from storage service (IndexedDB or sessionStorage)
        const data = await getAnalysisData();
        
        if (data) {
          setAnalysisData(data);
          setLoading(false);
        } else {
          setError("No analysis data found. Please perform an SEO analysis first.");
          setLoading(false);
        }
      } catch (err) {
        console.error('Error loading analysis data:', err);
        setError("Failed to load analysis data. Please try again.");
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <Wrapper>
        <div className="container py-5">
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading analysis report...</p>
          </div>
        </div>
        <ScrollToTop />
      </Wrapper>
    );
  }

  if (error || !analysisData) {
    return (
      <Wrapper>
        <div className="container py-5">
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Error</h4>
            <p>{error || "No analysis data available"}</p>
            <hr />
            <button
              className="btn btn-primary"
              onClick={() => router.push('/marketing-analysis')}
            >
              Go Back to Analysis
            </button>
          </div>
        </div>
        <ScrollToTop />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <SEOReportDisplay data={analysisData} />
      <ScrollToTop />
    </Wrapper>
  );
}

export default function ReportPage() {
  return (
    <Suspense fallback={
      <Wrapper>
        <div className="container py-5">
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading analysis report...</p>
          </div>
        </div>
        <ScrollToTop />
      </Wrapper>
    }>
      <ReportContent />
    </Suspense>
  );
}

