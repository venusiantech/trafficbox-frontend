"use client"
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ScrollToTop from "@/components/common/scroll-to-top";
import Wrapper from "@/layout/Wrapper";
import SEOReportDisplay from "@/components/services/marketing-analysis/SEOReportDisplay";
import { seoAnalysisService, SEOAnalysisResponse } from "@/services/seoAnalysisService";
import { getAnalysisData } from "@/utils/storageService";

export default function ReportByIdPage() {
  const router = useRouter();
  const params = useParams();
  const analysisId = params?.id as string;
  const [analysisData, setAnalysisData] = useState<SEOAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Get data from storage service using the analysis ID
        const data = await getAnalysisData(analysisId);
        
        if (data) {
          // Verify the analysis ID matches
          if (data.data?.data?.analysis_id === analysisId || !analysisId) {
            setAnalysisData(data);
            setLoading(false);
          } else {
            setError("Analysis ID mismatch. Please perform a new SEO analysis.");
            setLoading(false);
          }
        } else {
          setError("Analysis data not found. Please perform a new SEO analysis.");
          setLoading(false);
        }
      } catch (err) {
        console.error('Error loading analysis data:', err);
        setError("Failed to load analysis data. Please try again.");
        setLoading(false);
      }
    };

    if (analysisId) {
      loadData();
    } else {
      setError("Invalid analysis ID.");
      setLoading(false);
    }
  }, [analysisId]);

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

