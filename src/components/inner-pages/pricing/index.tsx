'use client';

import { useState, useEffect } from 'react';
import FooterFour from '@/layout/footers/FooterFour';
import HeaderFour from '@/layout/headers/HeaderFour';
import ComparisonArea from './ComparisonArea';
import PricingArea from './PricingArea';
import { planService, Plan } from '@/services/planService';

const Pricing = () => {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                setLoading(true);
                setError(null);
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

    return (
        <>
            <HeaderFour />
            <main>
                <PricingArea plans={plans} loading={loading} error={error} />
                <ComparisonArea plans={plans} loading={loading} />
            </main>
            <FooterFour />
        </>
    );
};

export default Pricing;
