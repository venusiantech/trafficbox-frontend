"use client"
import Link from "next/link";
import SEOAnalysisForm from "@/components/forms/SEOAnalysisForm"; 


type seo_analysis_content_type = {
    title: string;
    sm_info: JSX.Element;
    tags: string[];
}
const seo_analysis_content: seo_analysis_content_type = {
    title: "SEO Analysis",
    sm_info: <>Get a comprehensive SEO analysis of any website. Analyze meta tags, content quality, <br /> performance metrics, and technical SEO factors in one click</>,
    tags: ["https://example.com", "https://google.com", "https://github.com"]
}
const { title, sm_info, tags } = seo_analysis_content

const KeywordArea = () => {
    return (
        <>
            <section className="keyword-area keyword-inner-wrapper keyword-inner-bg pt-105 mb-90 pb-120" style={{ backgroundImage: `url(/assets/img/shape/keyword-inner.png)` }}>
                <div className="keyword-inner-shape">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <div className="keyword-inner text-center">
                                    <div className="keyword-inner-content">
                                        <h4 className="keyword-inner-title">{title}</h4>
                                        <p>{sm_info}</p>
                                    </div>
                                    <div className="keyword-search mb-25">
                                        <div className="tpbanner__search">
                                            <SEOAnalysisForm />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default KeywordArea;