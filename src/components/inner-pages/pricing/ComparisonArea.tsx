'use client';

import NoticIcon from '@/svg/inner-pages-icons/NoticIcon';
import { Plan, PlanFeatures } from '@/services/planService';

interface ComparisonAreaProps {
    plans: Plan[];
    loading: boolean;
}

const FEATURE_LABELS: Record<keyof PlanFeatures, string> = {
    countryTargeting: 'Country targeting',
    trafficSources: 'Traffic sources',
    behaviorSettings: 'Behavior settings',
    campaignRenewal: 'Campaign renewal',
    support: 'Support',
    analytics: 'Analytics',
};

const formatFeatureValue = (value: string): string => {
    if (!value) return '—';
    return value
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
        .replace(/\b24 7\b/i, '24/7');
};

const formatLimit = (n: number, planName: string): string => {
    if (planName === 'custom' && n === 0) return 'Custom';
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
    return String(n);
};

const ComparisonArea = ({ plans, loading }: ComparisonAreaProps) => {
    const featureKeys = Object.keys(FEATURE_LABELS) as (keyof PlanFeatures)[];

    if (loading || !plans.length) {
        return (
            <section className="comparison-area">
                <div className="container">
                    <div className="pricing-comparison-tag">
                        <h5 className="pricing-comparison-tag-title">
                            <span /> Feature comparison
                        </h5>
                    </div>
                    <div className="pricing-comparison mb-35">
                        <p className="text-center py-5 text-muted">
                            {loading ? 'Loading comparison...' : 'No plans to compare.'}
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    const comparisonSections = [
        {
            id: 'limits',
            title: 'Limits',
            rows: [
                { id: 'visits', label: 'Visits included', getValue: (p: Plan) => formatLimit(p.visitsIncluded, p.planName) },
                { id: 'campaigns', label: 'Campaign limit', getValue: (p: Plan) => p.planName === 'custom' && p.campaignLimit === 0 ? 'Custom' : String(p.campaignLimit) },
            ],
        },
        {
            id: 'features',
            title: 'Features',
            rows: featureKeys.map((key) => ({
                id: key,
                label: FEATURE_LABELS[key],
                getValue: (p: Plan) => formatFeatureValue(p.features[key]),
            })),
        },
    ];

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: `
                .comparison-table-wrapper { overflow-x: auto; -webkit-overflow-scrolling: touch; }
                .comparison-table {
                    width: 100%;
                    min-width: 700px;
                    border-collapse: collapse;
                    font-family: var(--tp-ff-jakarta);
                }
                .comparison-table th,
                .comparison-table td {
                    padding: 14px 16px;
                    text-align: left;
                    border-bottom: 1px solid #E7E7EA;
                    vertical-align: middle;
                }
                .comparison-table thead th {
                    font-weight: 600;
                    font-size: 14px;
                    color: var(--tp-common-11);
                    text-transform: capitalize;
                    background: #f9fafb;
                }
                .comparison-table thead th:first-child { width: 28%; min-width: 160px; }
                .comparison-table tbody td:first-child {
                    font-weight: 500;
                    color: var(--tp-common-11);
                }
                .comparison-table tbody td:not(:first-child) {
                    font-size: 14px;
                    color: var(--tp-grey-8);
                }
                .comparison-table .comparison-plan-name {
                    font-weight: 600;
                    font-size: 15px;
                    color: var(--tp-common-11);
                }
            ` }} />
            <section className="comparison-area">
                <div className="container">
                    {comparisonSections.map((section, sectionIndex) => (
                        <div key={section.id} className="row">
                            <div className="col-lg-12">
                                <div className="pricing-comparison-tag">
                                    <h5
                                        className={`pricing-comparison-tag-title ${
                                            sectionIndex === 1 ? 'pricing-comparison-tag-title-2' : ''
                                        } ${sectionIndex === 2 ? 'pricing-comparison-tag-title-3' : ''}`}
                                    >
                                        <span />
                                        {section.title}
                                    </h5>
                                </div>
                                <div className="pricing-comparison mb-35">
                                    <div className="comparison-table-wrapper">
                                        <table className="comparison-table">
                                            <thead>
                                                <tr>
                                                    <th>Feature</th>
                                                    {plans.map((plan) => (
                                                        <th key={plan.planName} className="comparison-plan-name text-center">
                                                            {plan.planName.charAt(0).toUpperCase() + plan.planName.slice(1)}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {section.rows.map((row) => (
                                                    <tr key={row.id}>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <span>{row.label}</span>
                                                                <div className="pricing-feature-info ms-2">
                                                                    <span><NoticIcon /></span>
                                                                    <div className="pricing-feature-info-tooltip">
                                                                        <p>{row.label}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        {plans.map((plan) => (
                                                            <td key={plan.planName} className="text-center">
                                                                {row.getValue(plan)}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default ComparisonArea;
