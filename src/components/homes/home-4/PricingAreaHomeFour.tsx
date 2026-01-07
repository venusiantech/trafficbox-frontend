"use client"
import Image from "next/image";
import {useEffect, useState } from 'react'; 
import PriceSaveRound from '@/svg/price_save_round';
import { planService, Plan } from "@/services/planService";

import priceing_shape_1 from "@/assets/img/shape/pricing-4-shape-3.png";
import priceing_shape_2 from "@/assets/img/shape/pricing-4-shape-2.png";

// Static content
const sub_title = "Pricing Plans";
const title = "Packages for everyone";


const PricingAreaHomeFour = () => {
    const [isMonthlyActive, setIsMonthlyActive] = useState(true);
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch plans on component mount
    useEffect(() => {
        const fetchPlans = async () => {
            try {
                setLoading(true);
                const response = await planService.getPlans();
                if (response.ok && response.plans) {
                    setPlans(response.plans);
                } else {
                    setError('Failed to fetch plans');
                }
            } catch (err) {
                console.error('Error fetching plans:', err);
                setError('Failed to load plans. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    const handleMonthlyClick = () => {
      setIsMonthlyActive(true);
    };
  
    const handleYearlyClick = () => {
      setIsMonthlyActive(false);
    };
  
    const handleSwitcherClick = () => {
      setIsMonthlyActive((prevState) => !prevState);
    };

    // Transform plan features to display format
    const getFeatureValue = (plan: Plan, featureKey: string): string => {
        const feature = plan.features[featureKey as keyof typeof plan.features];
        if (featureKey === 'visitsIncluded') {
            return plan.visitsIncluded.toLocaleString();
        }
        if (featureKey === 'campaignLimit') {
            return plan.campaignLimit.toString();
        }
        return feature || 'N/A';
    };

    // Feature list based on plan structure
    const featureList = [
        { id: 1, title: "Visits Included", key: "visitsIncluded" },
        { id: 2, title: "Campaign Limit", key: "campaignLimit" },
        { id: 3, title: "Country Targeting", key: "countryTargeting" },
        { id: 4, title: "Traffic Sources", key: "trafficSources" },
        { id: 5, title: "Behavior Settings", key: "behaviorSettings" },
    ];

  useEffect(() => {
    const monthlySEOElement = document.getElementById("monthly-seo");
    const hourlySEOElement = document.getElementById("hourly-seo");

    if (isMonthlyActive) {
      if (monthlySEOElement) {
        monthlySEOElement.classList.remove("analisis-hide");
      }
      if (hourlySEOElement) {
        hourlySEOElement.classList.add("analisis-hide");
      }
    } else {
      if (monthlySEOElement) {
        monthlySEOElement.classList.add("analisis-hide");
      }
      if (hourlySEOElement) {
        hourlySEOElement.classList.remove("analisis-hide");
      }
    }
  }, [isMonthlyActive]);

    return (
        <>
            <style dangerouslySetInnerHTML={{__html: `
                .price-scroll {
                    overflow-x: auto;
                    overflow-y: hidden;
                    -webkit-overflow-scrolling: touch;
                    scrollbar-width: thin;
                }
                .price-scroll-width {
                    min-width: max-content;
                }
                .price-scroll .price-custom-col-2 .row {
                    display: flex;
                    flex-wrap: nowrap;
                }
                .price-scroll .price-custom-col-2 > .row > div {
                    min-width: 280px;
                    max-width: 280px;
                    flex-shrink: 0;
                    flex-grow: 0;
                }
                @media (max-width: 768px) {
                    .price-scroll .price-custom-col-2 > .row > div {
                        min-width: 200px;
                        max-width: 200px;
                    }
                }
            `}} />
            <section className="pricing-area tp-price-parent tppricing-box-active pb-170 fix">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-wrapper text-center mb-40">
                                <span>{sub_title}</span>
                                <h5 className="section-title-4 section-title-4-2">{title}</h5>
                            </div>
                        </div>
                    </div>
                    {/* <div className="tpprice-4-switch-box  p-relative">
                        <div className="tpprice-4-switch p-relative">
                            <div className="tpprice-switch-wrapper tpprice-4-position tppricing-switch-2">
                                <div className="toggle">
                                    <input type="checkbox" id="switcher-price" className="tp-check" onClick={handleSwitcherClick} defaultChecked={!isMonthlyActive} />
                                    <b className="switch"></b>
                                </div>
                                <div className="label-text">
                                    <label className={`toggler ${isMonthlyActive ? "toggler-price-active" : ""}`} id="filt-monthly-price" onClick={handleYearlyClick}>Billed Yearly</label>
                                    <label className={`toggler ${isMonthlyActive ? "" : "toggler-price-active"}`} id="filt-yearly-price" onClick={handleMonthlyClick}>Billed Monthy</label>
                                </div>
                            </div>
                        </div>
                        <div className="tppricing-shape-4">
                            <div className="tppricing-shape-1">
                                <Image src={priceing_shape_1} alt="theme-pure" />
                            </div>
                            <div className="tppricing-shape-3">
                                <PriceSaveRound />
                            </div>
                            <div className="tppricing-shape-2">
                                <Image src={priceing_shape_2} alt="theme-pure" />
                            </div>
                        </div>
                    </div> */}
                    {loading ? (
                        <div className="text-center py-5">
                            <p>Loading plans...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-5">
                            <p style={{ color: 'red' }}>{error}</p>
                        </div>
                    ) : (
                    <div className="price-scroll">
                        <div className="price-scroll-width">
                            <div className="row gx-0">
                                <div className="col-12">

                                    <div id="monthly-price" className={`wrapper-full ${isMonthlyActive ? "" : "price-is-hide"}`}>
                                    {/* <!-- priceing-top --> */}
                                    <div className="tppriceing-top">
                                        <div className="row gx-0">
                                            <div className="price-custom-col-1">
                                            </div>
                                            <div className="price-custom-col-2">
                                                <div className="row gx-0">
                                                    {plans.map((plan, index) => {
                                                        const priceParts = planService.formatPrice(plan.price);
                                                        const isActive = index === Math.floor(plans.length / 2);
                                                        return (
                                                            <div key={plan.planName} style={{ minWidth: '280px', maxWidth: '280px', flexShrink: 0 }}>
                                                                <div className={`tppricing-4-head ${isActive ? "active" : ""} text-center ${isActive ? "p-relative" : ""}`}>
                                                                    {isActive && (
                                                                        <>
                                                                            <div className="big-price-shape"></div>
                                                                            <div className="sm-price-shape"></div>
                                                                        </>
                                                                    )}
                                                                    <span>{planService.formatPlanName(plan.planName)}</span>
                                                                    <h4 className="title">${priceParts.dollars}.{priceParts.cents}</h4>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- priceing-top-end -->
                                    <!-- pricing-box --> */}
                                    <div className="pricing-box-4">
                                        {featureList.map((feature) => 
                                            <div key={feature.id} className="row gx-0">
                                                <div className="price-custom-col-1">
                                                    <div className="tppricing-4-title">
                                                        <h4 className="title">{feature.title}</h4>
                                                    </div>
                                                </div>
                                                <div className="price-custom-col-2">
                                                    <div className="row gx-0">
                                                        {plans.map((plan, planIndex) => {
                                                            const isActive = planIndex === Math.floor(plans.length / 2);
                                                            const isFirst = planIndex === 0;
                                                            const isLast = planIndex === plans.length - 1;
                                                            const featureValue = getFeatureValue(plan, feature.key);
                                                            let priceClass = "tppricing-4-price text-center";
                                                            if (isFirst) priceClass += " tppricing-right";
                                                            if (isLast) priceClass += " tppricing-left";
                                                            if (isActive) priceClass += " active";
                                                            
                                                            return (
                                                                 <div key={plan.planName} style={{ minWidth: '280px', maxWidth: '280px', flexShrink: 0 }}>
                                                                    <div className={priceClass}>
                                                                        <p>{featureValue}</p>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>                                        
                                        )} 
                                        {/* <!-- pricing-item-end -->
                                        <!-- pricing-item --> */}
                                        <div className="row gx-0">
                                            <div className="price-custom-col-1"></div>
                                            <div className="price-custom-col-2">
                                                <div className="row gx-0">
                                                    {plans.map((plan, btnIndex) => {
                                                        const isActive = btnIndex === Math.floor(plans.length / 2);
                                                        const isFirst = btnIndex === 0;
                                                        const isLast = btnIndex === plans.length - 1;
                                                        let btnClass = "tppricing-4-price tppricing-4-btn";
                                                        if (isFirst) btnClass += " tppricing-right";
                                                        if (isLast) btnClass += " tppricing-left";
                                                        if (isActive) btnClass += " active";
                                                        
                                                        return (
                                                             <div key={plan.planName} style={{ minWidth: '280px', maxWidth: '280px', flexShrink: 0 }}>
                                                                <div className={btnClass}>
                                                                    <p>
                                                                        <button>Join this Plan</button>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                        {/* <!-- pricing-item-end --> */}
                                    </div>
                                    {/* <!-- pricing-box-end --> */}
                                    </div>

                                    
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default PricingAreaHomeFour;