import { ComponentType } from 'react';

// Types pour la configuration de paiement par service
export interface PaymentServiceConfig {
    previewComponent: ComponentType<{ searchTarget?: string }>;
    title: string;
    subtitle: string;
    badgeText: string;
    singleReportName: string;
    singleReportDescription: string;
    singleReportPrice: number;
    singleReportOriginalPrice: number;
    accentColors: {
        primary: string;
        secondary: string;
        gradient: string;
    };
    features?: { name: string; description: string; Icon?: any }[];
    resultPage: string; // Route vers la page de résultat
}

// Stripe Price IDs (à remplacer par vos vrais IDs)
export const STRIPE_PRICES = {
    subscription: 'price_subscription_1999', // 19.99€/mois
    singleReport: {
        dating: 'price_single_dating_1499',
        faceTrace: 'price_single_facetrace_1499',
        following: 'price_single_following_999',
        fidelity: 'price_single_fidelity_1499',
        chatAnalysis: 'price_single_chat_999',
    }
};

// Couleurs par défaut (Dating)
const DATING_COLORS = {
    primary: '#ff085e',
    secondary: '#e8003d',
    gradient: 'linear-gradient(to right, #ff085e, #e8003d)',
};

const FIDELITY_COLORS = {
    primary: '#dc2626',
    secondary: '#f97316',
    gradient: 'linear-gradient(to right, #dc2626, #f97316)',
};

const FACETRACE_COLORS = {
    primary: '#06b6d4',
    secondary: '#3b82f6',
    gradient: 'linear-gradient(to right, #06b6d4, #3b82f6)',
};

const FOLLOWING_COLORS = {
    primary: '#8b5cf6',
    secondary: '#6366f1',
    gradient: 'linear-gradient(to right, #8b5cf6, #6366f1)',
};

const CHAT_ANALYSIS_COLORS = {
    primary: '#a855f7',
    secondary: '#ec4899',
    gradient: 'linear-gradient(to right, #a855f7, #ec4899)',
};

export const SERVICE_ACCENT_COLORS: Record<string, typeof DATING_COLORS> = {
    dating: DATING_COLORS,
    faceTrace: FACETRACE_COLORS,
    following: FOLLOWING_COLORS,
    fidelity: FIDELITY_COLORS,
    chatAnalysis: CHAT_ANALYSIS_COLORS,
};

export const PAYMENT_CONFIG: Record<string, Omit<PaymentServiceConfig, 'previewComponent'>> = {
    dating: {
        title: 'Dating Search',
        subtitle: 'Profile Results',
        badgeText: '20+ Matches Found',
        singleReportName: '💕 Dating App Report',
        singleReportDescription: 'One-time search on Tinder, Bumble & Badoo',
        singleReportPrice: 14.90,
        singleReportOriginalPrice: 29.90,
        accentColors: DATING_COLORS,
        resultPage: '/results/dating',
        features: [
            { name: '💕 Dating App Search', description: 'Unlimited searches across all dating apps' },
            { name: '👀 Following AI', description: 'Daily analysis of Instagram followers' },
            { name: '🔍 Face Trace', description: 'Reverse face search across all platforms' },
            { name: '💔 Cheating Analytics', description: 'Complete reports and real-time alerts' },
        ],
    },
    faceTrace: {
        title: 'Face Trace',
        subtitle: 'Detection Results',
        badgeText: '15+ Faces Detected',
        singleReportName: '🔍 Face Recognition Report',
        singleReportDescription: 'One-time reverse image search on 12M+ sources',
        singleReportPrice: 14.90,
        singleReportOriginalPrice: 29.90,
        accentColors: FACETRACE_COLORS,
        resultPage: '/results/face-trace',
        features: [
            { name: '🔍 Reverse Face Search', description: 'Find profiles by uploading a photo' },
            { name: '📸 Photo Discovery', description: 'Access hidden photos from all socials' },
            { name: '🌐 Global Coverage', description: 'Searches across 500+ social platforms' },
            { name: '📊 Integrity Report', description: 'Full report on findings and locations' },
        ],
    },
    following: {
        title: 'Following AI',
        subtitle: 'Activity Analysis',
        badgeText: 'Activity Detected',
        singleReportName: '👀 Instagram Activity Report',
        singleReportDescription: 'One-time analysis of follower interactions',
        singleReportPrice: 14.90,
        singleReportOriginalPrice: 29.90,
        accentColors: FOLLOWING_COLORS,
        resultPage: '/results/instagram',
        features: [
            { name: '📊 Activity Analysis', description: 'Spots unusual timing & secret contacts' },
            { name: '🕵️ Following Tracker', description: 'Real-time alerts on new interactions' },
            { name: '⚠️ Risk Detection', description: 'Calculates probability of secrecy' },
            { name: '📋 Behavior Report', description: 'Download detailed activity evidence' },
        ],
    },
    fidelity: {
        title: 'Fidelity Check',
        subtitle: 'Partner Analysis',
        badgeText: '⚠️ Suspicious Activity',
        singleReportName: '💔 Partner Check Report',
        singleReportDescription: 'One-time dating profile detection by name/location',
        singleReportPrice: 14.90,
        singleReportOriginalPrice: 29.90,
        accentColors: FIDELITY_COLORS,
        resultPage: '/report/fidelity/latest',
        features: [
            { name: '💔 Dating App Detection', description: 'Scan Tinder, Bumble, Badoo & 20+ apps' },
            { name: '📍 Location Tracking', description: 'Geolocation-based profile search' },
            { name: '🔔 Real-Time Alerts', description: 'Get notified when profile goes active' },
            { name: '📊 Activity Reports', description: 'Full history of matches & interactions' },
        ],
    },
    chatAnalysis: {
        title: 'Chat Analysis',
        subtitle: 'AI Insights',
        badgeText: '🧠 Analysis Complete',
        singleReportName: '🧠 Chat Analysis Report',
        singleReportDescription: 'One-time AI analysis of conversation screenshots',
        singleReportPrice: 14.90,
        singleReportOriginalPrice: 29.90,
        accentColors: CHAT_ANALYSIS_COLORS,
        resultPage: '/results/chat-analysis',
        features: [
            { name: '🧠 AI Sentiment Analysis', description: 'Decode hidden emotions & intentions' },
            { name: '💬 Pattern Recognition', description: 'Detect manipulation & gaslighting' },
            { name: '📈 Interest Score', description: 'Measure true engagement level' },
            { name: '🚩 Red Flag Detection', description: 'Identify toxic behaviors instantly' },
        ],
    },
};

// All-Access Subscription Config
export const SUBSCRIPTION_CONFIG = {
    name: 'Premium All-Access',
    price: 19.90,
        originalPrice: 39.90,
    period: 'month',
    stripePriceId: STRIPE_PRICES.subscription,
    features: [
        { name: '💕 Dating App Search', description: 'Unlimited searches on Tinder, Bumble, Badoo...' },
        { name: '👀 Following AI', description: 'Real-time Instagram activity monitoring' },
        { name: '🔍 Face Trace', description: 'Reverse face search on 12M+ sources' },
        { name: '💔 Fidelity Check', description: 'Partner profile detection' },
        { name: '🧠 Chat Analysis', description: 'AI-powered conversation insights' },
        { name: '⚡ Priority Support', description: '24/7 premium customer support' },
    ],
    badges: ['Recommended', 'Best Value', 'Most Popular'],
};

export function getPaymentConfig(service: string) {
    return PAYMENT_CONFIG[service] || PAYMENT_CONFIG.dating;
}

export function getSingleReportPrice(service: string): string {
    const config = getPaymentConfig(service);
    return config.singleReportPrice.toFixed(2);
}

export function getStripePrice(service: string, planType: 'subscription' | 'single'): string {
    if (planType === 'subscription') {
        return STRIPE_PRICES.subscription;
    }
    return STRIPE_PRICES.singleReport[service as keyof typeof STRIPE_PRICES.singleReport]
        || STRIPE_PRICES.singleReport.dating;
}

export function getSuccessUrl(service: string, planType: 'subscription' | 'single'): string {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    if (planType === 'subscription') {
        return `${baseUrl}/payment/success?plan=subscription`;
    }
    return `${baseUrl}/payment/success?plan=single&service=${service}`;
}
