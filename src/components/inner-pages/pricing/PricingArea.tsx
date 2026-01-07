'use client'
import { useState, useEffect } from "react";
import PriceingContactus from "@/svg/inner-pages-icons/PriceingContactus";
import { planService, Plan } from "@/services/planService";

// data type
interface price_content_type {
    title: string;
    sm_info: string;
    contact_us: string;
    btn_text: string;
    priceing_list: {
        id: number;
        inner_head: string;
        inner_title: string;
        inner_price: JSX.Element;
        inner_y_price: JSX.Element;
    }[];
}

const PricingArea = () => {
    const [isMonthlyActive, setIsMonthlyActive] = useState(false);
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Static content
    const price_content: price_content_type = {
        title: "Plans & Pricing",
        sm_info: "Stay cool, we have a 48-hour money back guarantee!",
        contact_us: "Need Custom Us",
        btn_text: "Contact Us",
        priceing_list: []
    };
    const { title, sm_info, contact_us, btn_text } = price_content;

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

    // Transform plans to pricing list format
    const priceing_list = plans.map((plan, index) => {
        const monthlyPrice = plan.price;
        const yearlyPrice = planService.calculateYearlyPrice(monthlyPrice);
        const monthlyPriceParts = planService.formatPrice(monthlyPrice);
        const yearlyPriceParts = planService.formatPrice(yearlyPrice);
        
        return {
            id: index + 1,
            inner_head: planService.formatPlanName(plan.planName),
            inner_title: plan.description,
            inner_price: <><span>$</span>{monthlyPriceParts.dollars}<span>.{monthlyPriceParts.cents}</span></>,
            inner_y_price: <><span>$</span>{yearlyPriceParts.dollars}<span>.{yearlyPriceParts.cents}</span></>,
        };
    });
    const handleMonthlyClick = () => {
        setIsMonthlyActive(true);
    };

    const handleYearlyClick = () => {
        setIsMonthlyActive(false);
    };

    const handleSwitcherClick = () => {
        setIsMonthlyActive((prevState) => !prevState);
    };

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

    if (loading) {
        return (
            <section className="mt-90">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="pricing-inner-wrapper text-center">
                                <div className="pricing-inner-top">
                                    <h4 className="pricing-inner-top-title">{title}</h4>
                                    <p>Loading plans...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="mt-90">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="pricing-inner-wrapper text-center">
                                <div className="pricing-inner-top">
                                    <h4 className="pricing-inner-top-title">{title}</h4>
                                    <p style={{ color: 'red' }}>{error}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <>
            <style dangerouslySetInnerHTML={{__html: `
                .pricing-cards-wrapper {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 15px;
                    justify-content: center;
                }
                @media (min-width: 992px) {
                    .pricing-cards-wrapper > div {
                        flex: 0 0 calc(20% - 12px);
                        max-width: calc(20% - 12px);
                    }
                }
                @media (min-width: 768px) and (max-width: 991px) {
                    .pricing-cards-wrapper > div {
                        flex: 0 0 calc(50% - 8px);
                        max-width: calc(50% - 8px);
                    }
                }
                @media (min-width: 576px) and (max-width: 767px) {
                    .pricing-cards-wrapper > div {
                        flex: 0 0 calc(50% - 8px);
                        max-width: calc(50% - 8px);
                    }
                }
                @media (max-width: 575px) {
                    .pricing-cards-wrapper > div {
                        flex: 0 0 100%;
                        max-width: 100%;
                    }
                }
                .pricing-inner-item {
                    font-size: 0.9em;
                }
                .pricing-inner-item .pricing-inner-head span {
                    font-size: 0.9em;
                }
                .pricing-inner-item .pricing-inner-title span {
                    font-size: 0.85em;
                }
                .pricing-inner-item .pricing-inner-price h4.pricing-inner-price-count {
                    font-size: 2em;
                }
                .pricing-inner-item .pricing-inner-btn button {
                    font-size: 0.9em;
                }
            `}} />
            <section className="mt-90 mb-90"> 
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="pricing-inner-wrapper text-center">
                                <div className="pricing-inner-top">
                                    <h4 className="pricing-inner-top-title">{title}</h4>
                                    <p>{sm_info}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="row">
                        <div className="col-lg-12">
                            <div className="tpprice-switch text-center p-relative mb-55">
                                <div className="tpprice-switch-wrapper d-flex align-items-center justify-content-center">
                                    <div className="tppricing-switch-btn-switch">
                                        <div className="toggle">
                                            <input type="checkbox"
                                            onClick={handleSwitcherClick} defaultChecked={!isMonthlyActive}
                                            id="switcher" className="check" />
                                            <b className="switch"></b>
                                        </div>
                                    </div>
                                    <div className="tppricing-switch-btn-switch-item mt-10">
                                        <label  onClick={handleYearlyClick} 
                                            className={`toggler ${isMonthlyActive ? "toggler--is-active" : ""}`} 
                                            id="filt-monthly">Billed Yearly</label>
                                        <label  onClick={handleMonthlyClick} 
                                            className={`toggler ${isMonthlyActive ? "" : "toggler--is-active"}`} 
                                            id="filt-yearly">Billed Monthy</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="tp-price-toggle">
                                <div id="monthly" className={`wrapper-full ${isMonthlyActive ? "hide" : ""}`}>
                                    <div className="pricing-inner">
                                        <div className="pricing-cards-wrapper">
                                            {priceing_list.map((item, i) => 
                                                <div key={item.id}>
                                                    <div className={`pricing-inner-item ${i === 2 ? "active" : ""} text-center h-100`}>
                                                        <div className="pricing-inner-head">
                                                            <span>{item.inner_head}</span>
                                                        </div>
                                                        <div className="pricing-inner-title">
                                                            <span>{item.inner_title}</span>
                                                        </div>
                                                        <div className="pricing-inner-price">
                                                            <h4 className="pricing-inner-price-count">{item.inner_price}</h4>
                                                        </div>
                                                        <div className="pricing-inner-btn">
                                                            <button>Get Now</button>
                                                        </div>
                                                    </div>
                                                </div>                                            
                                            )} 
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

export default PricingArea;