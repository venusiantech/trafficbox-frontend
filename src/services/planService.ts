export interface PlanFeatures {
    countryTargeting: string;
    trafficSources: string;
    behaviorSettings: string;
    campaignRenewal: string;
    support: string;
    analytics: string;
}

export interface Plan {
    planName: string;
    visitsIncluded: number;
    campaignLimit: number;
    price: number;
    features: PlanFeatures;
    description: string;
}

export interface PlansResponse {
    ok: boolean;
    plans: Plan[];
}

export const planService = {
    // Fetch all subscription plans
    async getPlans(): Promise<PlansResponse> {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscription/plans`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store', // Disable caching for fresh data
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: PlansResponse = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching plans:', error);
            throw error;
        }
    },

    // Helper function to format plan name to title case
    formatPlanName(planName: string): string {
        return planName.charAt(0).toUpperCase() + planName.slice(1);
    },

    // Helper function to format price - returns price parts for JSX formatting
    formatPrice(price: number): { dollars: string; cents: string } {
        const priceStr = price.toFixed(2);
        const [dollars, cents] = priceStr.split('.');
        return { dollars, cents };
    },

    // Calculate yearly price (assuming 20% discount for yearly billing)
    calculateYearlyPrice(monthlyPrice: number): number {
        return Math.round(monthlyPrice * 12 * 0.8);
    }
};

