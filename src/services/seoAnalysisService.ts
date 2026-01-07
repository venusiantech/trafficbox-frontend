// SEO Analysis Service
// Types for SEO Analysis API Response

export interface SEOAnalysisResponse {
  status: string;
  data: {
    success: boolean;
    message: string;
    timestamp: string;
    requestId: string;
    data: SEOAnalysisData;
  };
}

export interface SEOAnalysisData {
  status: string;
  timestamp: string;
  url: string;
  domain: string;
  analysis_id: string;
  processing_time_ms: number;
  overall_score: {
    total: number;
    grade: string;
    status: string;
    breakdown: {
      meta: number;
      content: number;
      technical: number;
      performance: number;
      mobile: number;
      security: number;
      accessibility: number;
    };
  };
  category_scores: {
    meta: number;
    content: number;
    technical: number;
    performance: number;
    mobile: number;
    security: number;
    accessibility: number;
  };
  meta_information: {
    title: {
      content: string;
      length: number;
      status: string;
      recommendations: string[];
    };
    description: {
      content: string;
      length: number;
      status: string;
      recommendations: string[];
    };
    keywords: {
      content: string;
      status: string;
      recommendations: string[];
    };
    robots: {
      content: string;
      status: string;
    };
    canonical: {
      exists: boolean;
      url: string;
      status: string;
      recommendations: string[];
    };
    open_graph: {
      status: string;
      missing_tags: string[];
    };
    twitter_card: {
      status: string;
      missing_tags: string[];
    };
    charset: string;
    language: string;
    viewport: {
      content: string;
      exists: boolean;
      status: string;
      recommendations: string[];
    };
  };
  headings: {
    structure: Array<{
      level: string;
      text: string;
    }>;
    h1_count: number;
    h2_count: number;
    h3_count: number;
    h4_count: number;
    h5_count: number;
    h6_count: number;
    issues: string[];
  };
  content_analysis: {
    word_count: number;
    character_count: number;
    readability: {
      flesch_reading_ease: number;
      flesch_kincaid_grade: number;
      difficulty: string;
      notes: string;
    };
    top_keywords: Array<{
      keyword: string;
      count: number;
      density: number;
    }>;
    reading_time_minutes: number;
    score: number;
    status: string;
  };
  links: {
    total: number;
    internal: number;
    external: number;
    nofollow: number;
    dofollow: number;
    broken: number;
    issues: string[];
  };
  images: {
    total: number;
    with_alt: number;
    without_alt: number;
    lazy_loaded: number;
    issues: string[];
  };
  performance: {
    page_load_time_ms: number;
    page_size_bytes: number;
    page_size_formatted: string;
    resources: {
      scripts: number;
      stylesheets: number;
      images: number;
    };
    score: number;
    lighthouse: {
      performance_score: number;
      accessibility_score: number;
      best_practices_score: number;
      seo_score: number;
      core_web_vitals: Record<string, any>;
    };
  };
  mobile: {
    viewport_configured: boolean;
    responsive_design: boolean;
    media_queries: number;
    is_mobile_friendly: boolean;
    score: number;
  };
  technical_seo: {
    ssl: {
      enabled: boolean;
      status: string;
    };
    robots_txt: Record<string, any>;
    sitemap: Record<string, any>;
    structured_data: {
      exists: boolean;
      count: number;
      types: string[];
    };
    status_code: number;
    redirects: number;
    score: number;
  };
  security: {
    https: boolean;
    headers: Record<string, any>;
    score: number;
    issues: string[];
  };
  accessibility: {
    aria_labels: number;
    alt_text_coverage: number;
    semantic_html: {
      nav: number;
      header: number;
      footer: number;
      main: number;
      article: number;
      section: number;
    };
    form_labels: number;
    score: number;
    issues: string[];
  };
  url_analysis: {
    length: number;
    has_keywords: boolean;
    is_readable: boolean;
    has_parameters: boolean;
    uses_hyphens: boolean;
    uses_underscores: boolean;
    depth: number;
    status: string;
    issues: string[];
  };
  backlinks: {
    available: boolean;
    message: string;
  };
  recommendations: Array<{
    category: string;
    priority: string;
    issue: string;
    impact: string;
    recommendation: string;
  }>;
  issues: {
    critical: any[];
    warnings: Array<{
      type: string;
      message: string;
    }>;
    notices: Array<{
      type: string;
      message: string;
    }>;
  };
  cost: number;
  remaining_credits: number;
  service_info: {
    name: string;
    category: string;
    version: string;
  };
}

export const seoAnalysisService = {
  // Perform SEO analysis on a URL
  async analyzeURL(url: string): Promise<SEOAnalysisResponse> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/ai/seo-analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
        cache: 'no-store',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data: SEOAnalysisResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error performing SEO analysis:', error);
      throw error;
    }
  },

  // Validate URL format
  validateURL(url: string): { valid: boolean; error?: string } {
    if (!url || url.trim() === '') {
      return { valid: false, error: 'URL is required' };
    }

    try {
      const urlObj = new URL(url);
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        return { valid: false, error: 'URL must use http or https protocol' };
      }
      return { valid: true };
    } catch (error) {
      return { valid: false, error: 'Please enter a valid URL (e.g., https://example.com)' };
    }
  },
};

