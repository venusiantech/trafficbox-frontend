'use client';

import Link from 'next/link';
import { Plan, planService } from '@/services/planService';

interface PricingAreaProps {
    plans: Plan[];
    loading: boolean;
    error: string | null;
}

const PricingArea = ({ plans, loading, error }: PricingAreaProps) => {
    const title = 'Plans & Pricing';
    const sm_info = 'Stay cool, we have a 48-hour money back guarantee!';

    const formatVisits = (n: number) => {
        if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
        if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
        return String(n);
    };

    if (loading) {
        return (
            <section className="pricing-area-improved mt-90">
                <div className="container">
                    <div className="pricing-header text-center">
                        <h1 className="pricing-title">{title}</h1>
                        <p className="pricing-subtitle">{sm_info}</p>
                        <div className="pricing-loading">
                            <div className="pricing-loading-dots">
                                <span /><span /><span />
                            </div>
                            <p>Loading plans...</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="pricing-area-improved mt-90">
                <div className="container">
                    <div className="pricing-header text-center">
                        <h1 className="pricing-title">{title}</h1>
                        <p className="pricing-error">{error}</p>
                    </div>
                </div>
            </section>
        );
    }

    if (!plans.length) {
        return (
            <section className="pricing-area-improved mt-90">
                <div className="container">
                    <div className="pricing-header text-center">
                        <h1 className="pricing-title">{title}</h1>
                        <p className="pricing-subtitle">No plans available at the moment.</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: `
                .pricing-area-improved { padding: 2rem 0 4rem; }
                .pricing-header { margin-bottom: 3rem; }
                .pricing-title {
                    font-family: var(--tp-ff-jakarta);
                    font-weight: 700;
                    font-size: clamp(2rem, 5vw, 3rem);
                    line-height: 1.2;
                    letter-spacing: -0.02em;
                    color: var(--tp-common-11);
                    margin-bottom: 0.75rem;
                }
                .pricing-subtitle {
                    font-family: var(--tp-ff-jakarta);
                    font-size: 1rem;
                    color: var(--tp-grey-8);
                    max-width: 480px;
                    margin: 0 auto;
                }
                .pricing-loading { padding: 3rem; }
                .pricing-loading-dots {
                    display: flex;
                    gap: 8px;
                    justify-content: center;
                    margin-bottom: 1rem;
                }
                .pricing-loading-dots span {
                    width: 10px; height: 10px;
                    border-radius: 50%;
                    background: var(--tp-theme-primary);
                    animation: pricing-bounce 0.6s ease-in-out infinite alternate;
                }
                .pricing-loading-dots span:nth-child(2) { animation-delay: 0.2s; }
                .pricing-loading-dots span:nth-child(3) { animation-delay: 0.4s; }
                @keyframes pricing-bounce { to { transform: translateY(-8px); opacity: 0.6; } }
                .pricing-error { color: #dc2626; font-weight: 500; }

                .pricing-cards-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                    gap: 1.5rem;
                    justify-content: center;
                    align-items: stretch;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                @media (min-width: 900px) {
                    .pricing-cards-grid { grid-template-columns: repeat(5, 1fr); }
                }

                .pricing-card {
                    font-family: var(--tp-ff-jakarta);
                    background: #fff;
                    border: 1px solid #E7E7EA;
                    border-radius: 16px;
                    padding: 1.75rem 1.25rem;
                    display: flex;
                    flex-direction: column;
                    transition: border-color 0.2s, box-shadow 0.2s;
                }
                .pricing-card:hover { border-color: #c5c7d0; box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
                .pricing-card.popular {
                    border-color: var(--tp-theme-primary);
                    box-shadow: 0 8px 32px rgba(66, 96, 255, 0.18);
                    position: relative;
                }
                .pricing-card.custom {
                    border-style: dashed;
                    background: linear-gradient(135deg, #fafbff 0%, #f0f4ff 100%);
                }

                .pricing-card-badge {
                    position: absolute;
                    top: -10px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: var(--tp-theme-primary);
                    color: #fff;
                    font-size: 0.7rem;
                    font-weight: 600;
                    padding: 4px 12px;
                    border-radius: 20px;
                    white-space: nowrap;
                }

                .pricing-card-name {
                    font-weight: 600;
                    font-size: 1.1rem;
                    color: var(--tp-common-11);
                    text-transform: capitalize;
                    margin-bottom: 0.5rem;
                }
                .pricing-card-desc {
                    font-size: 0.8rem;
                    line-height: 1.4;
                    color: #6b7280;
                    margin-bottom: 1.25rem;
                    flex-grow: 1;
                    min-height: 2.8em;
                }
                .pricing-card-meta {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 1.25rem;
                    flex-wrap: wrap;
                }
                .pricing-card-meta-item {
                    font-size: 0.75rem;
                    color: #6b7280;
                }
                .pricing-card-meta-item strong { color: var(--tp-common-11); }

                .pricing-card-price-wrap { margin-bottom: 1.5rem; }
                .pricing-card-price {
                    font-weight: 700;
                    font-size: 2rem;
                    line-height: 1.2;
                    color: var(--tp-common-11);
                }
                .pricing-card-price .currency { font-size: 1.1rem; font-weight: 600; }
                .pricing-card-price-note { font-size: 0.75rem; color: #9ca3af; margin-top: 2px; }

                .pricing-card-cta {
                    display: block;
                    text-align: center;
                    font-weight: 600;
                    font-size: 0.9rem;
                    padding: 12px 20px;
                    border-radius: 8px;
                    text-decoration: none;
                    transition: background 0.2s, color 0.2s;
                    margin-top: auto;
                }
                .pricing-card-cta.primary {
                    background: var(--tp-theme-primary);
                    color: #fff;
                    border: none;
                }
                .pricing-card-cta.primary:hover { filter: brightness(1.08); }
                .pricing-card-cta.secondary {
                    background: #fff;
                    color: var(--tp-common-11);
                    border: 1px solid #E2E3E9;
                }
                .pricing-card-cta.secondary:hover { background: #f6f7fb; }
                .pricing-card.popular .pricing-card-cta.secondary {
                    border-color: var(--tp-theme-primary);
                    color: var(--tp-theme-primary);
                }
            ` }} />
            <section className="pricing-area-improved mt-90 mb-90">
                <div className="container">
                    <div className="pricing-header text-center">
                        <h1 className="pricing-title">{title}</h1>
                        <p className="pricing-subtitle">{sm_info}</p>
                    </div>
                    <div className="pricing-cards-grid">
                        {plans.map((plan, i) => {
                            const isPopular = plan.planName === 'growth';
                            const isCustom = plan.planName === 'custom';
                            const priceParts = planService.formatPrice(plan.price);
                            return (
                                <div
                                    key={plan.planName}
                                    className={`pricing-card ${isPopular ? 'popular' : ''} ${isCustom ? 'custom' : ''}`}
                                >
                                    {isPopular && <span className="pricing-card-badge">Popular</span>}
                                    <div className="pricing-card-name">
                                        {planService.formatPlanName(plan.planName)}
                                    </div>
                                    <p className="pricing-card-desc">{plan.description}</p>
                                    {!isCustom && (
                                        <div className="pricing-card-meta">
                                            <span className="pricing-card-meta-item">
                                                <strong>{formatVisits(plan.visitsIncluded)}</strong> visits/mo
                                            </span>
                                            <span className="pricing-card-meta-item">
                                                <strong>{plan.campaignLimit}</strong> campaign{plan.campaignLimit !== 1 ? 's' : ''}
                                            </span>
                                        </div>
                                    )}
                                    <div className="pricing-card-price-wrap">
                                        <div className="pricing-card-price">
                                            {isCustom ? (
                                                'Custom'
                                            ) : (
                                                <><span className="currency">$</span>{priceParts.dollars}<span className="currency">.{priceParts.cents}</span></>
                                            )}
                                        </div>
                                        {!isCustom && plan.price > 0 && (
                                            <div className="pricing-card-price-note">per month</div>
                                        )}
                                    </div>
                                    <Link
                                        href={isCustom ? '/contact' : '/contact'}
                                        className={`pricing-card-cta ${isPopular ? 'primary' : 'secondary'}`}
                                    >
                                        {isCustom ? 'Contact us' : 'Get started'}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
};

export default PricingArea;
