"use client";

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useService } from '@/lib/ServiceContext';
import {
    getPaymentConfig,
    SUBSCRIPTION_CONFIG,
    getStripePrice,
    getSuccessUrl
} from '@/components/payment/paymentConfig';
import { PricingSelector } from '@/components/payment/PricingSelector';
import { DatingResultsPreview } from '@/components/ui/DatingResultsPreview';
import { FaceTraceResultsPreview } from '@/components/ui/FaceTraceResultsPreview';
import { FidelityCheckResultsPreview } from '@/components/ui/FidelityCheckResultsPreview';
import { ChatAnalysisResultsPreview } from '@/components/ui/ChatAnalysisResultsPreview';
import { FollowingResultsPreview } from '@/components/ui/FollowingResultsPreview';
import { CountdownTimer } from '@/components/ui/CountdownTimer';

// Icons
const IconShield = ({ style }: { style?: React.CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
);

const IconLock = ({ style }: { style?: React.CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
);

const IconArrowRight = ({ style }: { style?: React.CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
    </svg>
);

const PaymentBadges = () => {
    const badges = [
        { label: 'VISA', color: '#1434cb', style: 'italic' },
        { label: 'MC', color: '#111827', style: 'normal' },
        { label: 'DISCOVER', color: '#111827', style: 'normal' },
        { label: 'AMEX', color: '#1273c4', style: 'normal' },
    ];

    return (
        <div style={{
            marginTop: '0.8rem',
            paddingTop: '0.8rem',
            borderTop: '1px solid rgba(148,163,184,0.12)',
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.45rem',
                color: '#7b8190',
                fontSize: '0.76rem',
                fontWeight: 700,
                textAlign: 'center',
                marginBottom: '0.55rem',
                letterSpacing: '0.01em',
            }}>
                <IconLock style={{ width: '0.85rem', height: '0.85rem', color: '#9ca3af', flexShrink: 0 }} />
                <span>Secure payment by Stripe</span>
            </div>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '0.42rem',
            }}>
                {badges.map((badge) => (
                    <div
                        key={badge.label}
                        aria-label={`${badge.label} accepted`}
                        style={{
                            minWidth: '54px',
                            height: '28px',
                            padding: '0 0.5rem',
                            borderRadius: '0.45rem',
                            background: 'rgba(255,255,255,0.78)',
                            border: '1px solid rgba(15,23,42,0.10)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: badge.color,
                            fontSize: badge.label === 'DISCOVER' ? '0.58rem' : '0.72rem',
                            fontWeight: 900,
                            fontStyle: badge.style,
                            boxShadow: '0 4px 10px rgba(15,23,42,0.035)',
                            letterSpacing: badge.label === 'AMEX' ? '0.01em' : '0',
                        }}
                    >
                        {badge.label === 'MC' ? (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                                <span style={{ width: '12px', height: '12px', borderRadius: '999px', background: '#eb001b', display: 'inline-block' }} />
                                <span style={{ width: '12px', height: '12px', borderRadius: '999px', background: '#f79e1b', display: 'inline-block', marginLeft: '-5px' }} />
                            </span>
                        ) : (
                            badge.label
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const OrderSummary = ({
    selectedPlan,
    serviceId,
}: {
    selectedPlan: 'subscription' | 'single';
    serviceId: string;
}) => {
    const serviceConfig = getPaymentConfig(serviceId);
    const isSubscription = selectedPlan === 'subscription';
    const originalPrice = isSubscription ? SUBSCRIPTION_CONFIG.originalPrice : serviceConfig.singleReportOriginalPrice;
    const total = isSubscription ? SUBSCRIPTION_CONFIG.price : serviceConfig.singleReportPrice;
    const discount = Math.max(originalPrice - total, 0);
    const discountPercent = Math.round((discount / originalPrice) * 100);
    const planLabel = isSubscription ? 'All-Access monthly pass' : serviceConfig.singleReportName.replace(/[^\w\s-]/g, '').trim();
    const formatPrice = (price: number) => `${price.toFixed(2).replace('.', ',')}€`;

    return (
        <div style={{
            marginTop: '0.85rem',
            background: 'rgba(255,255,255,0.86)',
            color: '#0f172a',
            borderRadius: '0.85rem',
            padding: '0.85rem 0.9rem',
            border: '1px solid rgba(226,232,240,0.9)',
            boxShadow: '0 8px 22px rgba(15,23,42,0.045)',
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '0.72rem',
            }}>
                <h3 style={{ fontSize: '0.88rem', fontWeight: 800, margin: 0, color: '#111827' }}>Order summary</h3>
                <span style={{
                    padding: '0.18rem 0.45rem',
                    borderRadius: '999px',
                    background: 'rgba(236,253,245,0.82)',
                    color: '#058051',
                    fontSize: '0.62rem',
                    fontWeight: 800,
                    whiteSpace: 'nowrap',
                }}>
                    {discountPercent}% OFF
                </span>
            </div>

            <div style={{ display: 'grid', gap: '0.48rem', fontSize: '0.82rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', color: '#5f6673' }}>
                    <span>{planLabel}</span>
                    <span style={{ fontWeight: 700, color: '#374151' }}>{formatPrice(originalPrice)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', color: '#047857' }}>
                    <span>Discount applied</span>
                    <span style={{ fontWeight: 800 }}>-{formatPrice(discount)}</span>
                </div>
            </div>

            <div style={{
                height: '1px',
                background: 'rgba(226,232,240,0.82)',
                margin: '0.72rem 0',
            }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#111827' }}>Total today</span>
                <span style={{ fontSize: '1.22rem', fontWeight: 900, letterSpacing: '-0.02em' }}>{formatPrice(total)}</span>
            </div>
        </div>
    );
};

const LegalAgreement = () => (
    <p style={{
        textAlign: 'center',
        fontSize: '0.75rem',
        color: 'rgba(255,255,255,0.82)',
        lineHeight: 1.6,
        margin: '0.9rem auto 0',
        maxWidth: '620px',
    }}>
        By clicking "Unlock Results", you agree to our{' '}
        <a href="/terms" style={{ color: '#ffffff', fontWeight: 800, textDecoration: 'underline' }}>Terms of Service</a>
        {' '}and{' '}
        <a href="/privacy" style={{ color: '#ffffff', fontWeight: 800, textDecoration: 'underline' }}>Privacy Policy</a>.
    </p>
);

// WebGL Background
const useThreeScript = (url: string) => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if ((window as any).THREE) { setLoaded(true); return; }
        const script = document.createElement('script');
        script.src = url; script.async = true;
        script.onload = () => setLoaded(true);
        document.body.appendChild(script);
    }, [url]);
    return loaded;
};

const WebGLBackground = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const loaded = useThreeScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
        }
    }, []);

    useEffect(() => {
        if (prefersReducedMotion || !loaded || !mountRef.current) return;
        const THREE = (window as any).THREE;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 100;
        const posArray = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount * 3; i++) { posArray[i] = (Math.random() - 0.5) * 12; }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const material = new THREE.PointsMaterial({ size: 0.03, color: 0xffffff, transparent: true, opacity: 0.5 });
        const particlesMesh = new THREE.Points(particlesGeometry, material);
        scene.add(particlesMesh);
        camera.position.z = 3;

        const animate = () => { requestAnimationFrame(animate); particlesMesh.rotation.y += 0.0008; renderer.render(scene, camera); };
        animate();

        const handleResize = () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); };
        window.addEventListener('resize', handleResize);
        return () => { window.removeEventListener('resize', handleResize); if (mountRef.current) mountRef.current.innerHTML = ''; };
    }, [loaded, prefersReducedMotion]);

    if (prefersReducedMotion) return null;
    return <div ref={mountRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.5 }} />;
};

// Service-specific preview components
const PreviewComponents: Record<string, React.ComponentType> = {
    dating: DatingResultsPreview,
    faceTrace: FaceTraceResultsPreview,
    fidelity: FidelityCheckResultsPreview,
    chatAnalysis: ChatAnalysisResultsPreview,
    following: FollowingResultsPreview,
};

const getServiceGradient = (service: string): string => {
    const gradients: Record<string, string> = {
        dating: 'radial-gradient(ellipse 150% 80% at 50% 20%, #FF5E00 0%, #FF085E 35%, #FF004F 60%, #E8003D 100%)',
        faceTrace: 'radial-gradient(ellipse 150% 80% at 50% 20%, #06B6D4 0%, #0EA5E9 35%, #0284C7 60%, #0369A1 100%)',
        following: 'radial-gradient(ellipse 150% 80% at 50% 20%, #9333EA 0%, #7C3AED 35%, #6D28D9 60%, #5B21B6 100%)',
        fidelity: 'radial-gradient(ellipse 150% 80% at 50% 20%, #F472B6 0%, #EC4899 35%, #DB2777 60%, #BE185D 100%)',
        chatAnalysis: 'radial-gradient(ellipse 150% 80% at 50% 20%, #F472B6 0%, #EC4899 35%, #DB2777 60%, #BE185D 100%)',
    };
    return gradients[service] || gradients.dating;
};

// Map URL path segments to service IDs
const pathToServiceId: Record<string, string> = {
    'facetrace': 'faceTrace',
    'fidelity': 'fidelity',
    'chat-analysis': 'chatAnalysis',
    'instagram': 'following',
    'dating': 'dating',
};

export function PaymentPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const { searchTarget, selectedService } = useService();

    // Get service from URL path, query params, or context
    const getServiceFromPath = (): string => {
        if (pathname) {
            const segments = pathname.split('/');
            const lastSegment = segments[segments.length - 1];
            if (pathToServiceId[lastSegment]) {
                return pathToServiceId[lastSegment];
            }
        }
        return '';
    };

    const urlService = searchParams?.get('service') ?? null;
    const pathService = getServiceFromPath();
    const activeService = pathService || urlService || selectedService || 'dating';
    const config = getPaymentConfig(activeService);
    const formatPrice = (price: number) => price.toFixed(2).replace('.', ',');

    // Plan selection state - default to subscription (HERO CHOICE)
    const [selectedPlan, setSelectedPlan] = useState<'subscription' | 'single'>('subscription');
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const planParam = searchParams?.get('plan');
        if (planParam === 'single' || planParam === 'subscription') {
            setSelectedPlan(planParam);
        }
    }, [searchParams]);

    // Get the preview component for current service
    const PreviewComponent = PreviewComponents[activeService] || DatingResultsPreview;

    /**
     * HANDLE CHECKOUT - Conditional Redirect Logic
     * 
     * Subscription (19.99€) → success_url: /dashboard
     * Single Report → success_url: /results/{service}
     */
    const handleCheckout = async () => {
        setIsProcessing(true);

        // Get Stripe price ID based on selected plan
        const priceId = getStripePrice(activeService, selectedPlan);

        // Determine success URL based on plan type
        let successUrl: string;
        if (selectedPlan === 'subscription') {
            // Subscription → Dashboard Hub (direct redirect for demo)
            successUrl = '/dashboard';

            // Initialize credits for all services (5 each)
            if (typeof window !== 'undefined') {
                localStorage.setItem('profilefinder_credits', JSON.stringify({
                    dating: 5,
                    faceTrace: 5,
                    following: 5,
                    fidelity: 5,
                    chatAnalysis: 5,
                }));
            }
        } else {
            // Single Report → Specific Results Page
            successUrl = `/payment/success?plan=single&service=${activeService}`;
        }

        // Log for debugging (remove in production)
        console.log('Checkout initiated:', {
            priceId,
            planType: selectedPlan,
            service: activeService,
            successUrl,
            redirectAfterSuccess: selectedPlan === 'subscription' ? '/dashboard' : config.resultPage,
        });

        // TODO: Replace with actual Stripe Checkout Session creation
        // const session = await createCheckoutSession({
        //     priceId,
        //     successUrl: `${window.location.origin}${successUrl}`,
        //     cancelUrl: `${window.location.origin}/payment?service=${activeService}`,
        // });
        // window.location.href = session.url;

        // DEMO: Simulate redirect to success page
        setTimeout(() => {
            router.push(successUrl);
        }, 1500);
    };

    return (
        <>
            <style>{`
                @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fade-in 0.5s ease-out; }
            `}</style>

            <div style={{
                minHeight: '100vh',
                width: '100%',
                background: getServiceGradient(activeService),
                fontFamily: 'var(--font-display), ui-sans-serif, system-ui, -apple-system, sans-serif',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <WebGLBackground />

                {/* Navigation */}
                <nav className="animate-fade-in" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '16px 24px', maxWidth: '960px', margin: '0 auto',
                    backdropFilter: 'blur(12px)', backgroundColor: 'rgba(255,255,255,0.08)',
                    borderBottom: '1px solid rgba(255,255,255,0.15)', borderRadius: '0 0 20px 20px',
                    position: 'relative', zIndex: 30, color: 'white'
                }}>
                    <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'white' }}>
                        <img src="https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/Design%20sans%20titre%20(7).svg" alt="ProfileFinder" loading="lazy" style={{ height: '36px', width: 'auto' }} />
                        <span style={{ fontSize: '22px', fontWeight: 900, letterSpacing: '-0.02em' }}>ProfileFinder</span>
                    </a>
                </nav>

                {/* Main Content */}
                <div style={{
                    maxWidth: '760px',
                    margin: '0.5rem auto 0',
                    padding: '0 1rem 2rem',
                    position: 'relative',
                    zIndex: 20,
                }}>
                    {/* Mobile layout: Preview FIRST (top), then Pricing */}
                    <div className="flex flex-col gap-4 lg:hidden">
                        {/* 1. Preview card - always on top on mobile */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.97)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '1.5rem',
                                boxShadow: '0 25px 60px -15px rgba(0,0,0,0.3)',
                                overflow: 'hidden',
                                padding: '1.25rem',
                            }}
                        >
                            {activeService !== 'dating' && (
                                <div style={{ marginBottom: '0.75rem' }}>
                                    <h1 style={{
                                        fontSize: '1.375rem',
                                        fontWeight: 800,
                                        color: '#1f2937',
                                        lineHeight: 1.2,
                                        marginBottom: '0.375rem',
                                    }}>
                                        {config.title}{' '}
                                        <span style={{
                                            backgroundClip: 'text',
                                            WebkitBackgroundClip: 'text',
                                            color: 'transparent',
                                            backgroundImage: config.accentColors.gradient,
                                        }}>
                                            {config.subtitle}
                                        </span>
                                    </h1>
                                    <div style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.375rem',
                                        backgroundColor: `${config.accentColors.primary}15`,
                                        color: config.accentColors.primary,
                                        padding: '0.25rem 0.625rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.6875rem',
                                        fontWeight: 700,
                                    }}>
                                        <span style={{
                                            width: '6px', height: '6px',
                                            borderRadius: '50%',
                                            backgroundColor: config.accentColors.primary,
                                            animation: 'pulse 2s infinite',
                                        }} />
                                        {config.badgeText}
                                    </div>
                                </div>
                            )}
                            <PreviewComponent />
                        </motion.div>

                        {/* 2. Pricing card - below preview on mobile */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.97)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '1.5rem',
                                boxShadow: '0 25px 60px -15px rgba(0,0,0,0.3)',
                                overflow: 'hidden',
                                padding: '1.25rem',
                            }}
                        >
                            {selectedPlan === 'subscription' && (
                                <CountdownTimer durationMinutes={15} storageKey="all-access-timer" />
                            )}

                            <PricingSelector
                                serviceId={activeService}
                                selectedPlan={selectedPlan}
                                onPlanSelect={setSelectedPlan}
                            />

                            <OrderSummary selectedPlan={selectedPlan} serviceId={activeService} />

                            <motion.button
                                id="outer-checkout-button-mobile"
                                whileTap={{ scale: 0.98 }}
                                onClick={handleCheckout}
                                disabled={isProcessing}
                                style={{
                                    width: '100%',
                                    marginTop: '1rem',
                                    padding: '1rem',
                                    background: config.accentColors.gradient,
                                    color: 'white',
                                    borderRadius: '0.75rem',
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    border: 'none',
                                    cursor: isProcessing ? 'wait' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    boxShadow: selectedPlan === 'subscription'
                                        ? `0 10px 25px ${config.accentColors.primary}66`
                                        : '0 4px 12px rgba(0,0,0,0.1)',
                                    opacity: isProcessing ? 0.7 : 1,
                                }}
                            >
                                {isProcessing ? 'Processing...' : (
                                    <>
                                        <IconLock style={{ width: '1rem', height: '1rem' }} />
                                        {selectedPlan === 'subscription' ? 'Unlock Results' : `Unlock ${config.title}`} {selectedPlan === 'subscription'
                                            ? `${formatPrice(SUBSCRIPTION_CONFIG.price)}€/mo`
                                            : `${formatPrice(config.singleReportPrice)}€`
                                        }
                                    </>
                                )}
                            </motion.button>

                            <PaymentBadges />
                            <LegalAgreement />
                        </motion.div>
                    </div>

                    {/* Desktop layout: centered checkout flow */}
                    <div className="hidden lg:flex" style={{ flexDirection: 'column', gap: '1.25rem', alignItems: 'center' }}>
                        {/* Preview */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.97)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '1.75rem',
                                boxShadow: '0 25px 60px -15px rgba(0,0,0,0.3)',
                                overflow: 'hidden',
                                padding: '1.5rem',
                                width: '100%',
                            }}
                        >
                            {activeService !== 'dating' && (
                                <div style={{ marginBottom: '1rem' }}>
                                    <h1 style={{
                                        fontSize: '1.625rem',
                                        fontWeight: 800,
                                        color: '#1f2937',
                                        lineHeight: 1.2,
                                        marginBottom: '0.5rem',
                                    }}>
                                        {config.title}{' '}
                                        <span style={{
                                            backgroundClip: 'text',
                                            WebkitBackgroundClip: 'text',
                                            color: 'transparent',
                                            backgroundImage: config.accentColors.gradient,
                                        }}>
                                            {config.subtitle}
                                        </span>
                                    </h1>
                                    <div style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        backgroundColor: `${config.accentColors.primary}15`,
                                        color: config.accentColors.primary,
                                        padding: '0.375rem 0.75rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.75rem',
                                        fontWeight: 700,
                                    }}>
                                        <span style={{
                                            width: '8px', height: '8px',
                                            borderRadius: '50%',
                                            backgroundColor: config.accentColors.primary,
                                            animation: 'pulse 2s infinite',
                                        }} />
                                        {config.badgeText}
                                    </div>
                                </div>
                            )}
                            <PreviewComponent />

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                marginTop: '1rem',
                                padding: '0.75rem',
                                backgroundColor: '#f9fafb',
                                borderRadius: '0.75rem',
                                fontSize: '0.6875rem',
                                color: '#6b7280',
                            }}>
                                <IconShield style={{ width: '1rem', height: '1rem', color: '#22c55e' }} />
                                <span>256-bit SSL Encryption • 100% Secure Payment</span>
                            </div>
                        </motion.div>

                        {/* Pricing */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.97)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '1.75rem',
                                boxShadow: '0 25px 60px -15px rgba(0,0,0,0.3)',
                                overflow: 'hidden',
                                padding: '1.5rem',
                                width: '100%',
                            }}
                        >
                            {selectedPlan === 'subscription' && (
                                <CountdownTimer durationMinutes={10} storageKey="all-access-timer" />
                            )}

                            <PricingSelector
                                serviceId={activeService}
                                selectedPlan={selectedPlan}
                                onPlanSelect={setSelectedPlan}
                            />

                            <OrderSummary selectedPlan={selectedPlan} serviceId={activeService} />

                            <motion.button
                                id="outer-checkout-button"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleCheckout}
                                disabled={isProcessing}
                                style={{
                                    width: '100%',
                                    marginTop: '1.25rem',
                                    padding: '1rem',
                                    background: config.accentColors.gradient,
                                    color: 'white',
                                    borderRadius: '0.875rem',
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    border: 'none',
                                    cursor: isProcessing ? 'wait' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    boxShadow: selectedPlan === 'subscription'
                                        ? `0 12px 30px ${config.accentColors.primary}66`
                                        : '0 6px 15px rgba(0,0,0,0.15)',
                                    opacity: isProcessing ? 0.7 : 1,
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                {isProcessing ? (
                                    <>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                            style={{
                                                width: '1.25rem',
                                                height: '1.25rem',
                                                border: '2px solid white',
                                                borderTopColor: 'transparent',
                                                borderRadius: '50%',
                                            }}
                                        />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <IconLock style={{ width: '1rem', height: '1rem' }} />
                                        {selectedPlan === 'subscription' ? 'Unlock Results' : `Unlock ${config.title}`} {selectedPlan === 'subscription'
                                            ? `${formatPrice(SUBSCRIPTION_CONFIG.price)}€/mo`
                                            : `${formatPrice(config.singleReportPrice)}€`
                                        }
                                        <IconArrowRight style={{ width: '1rem', height: '1rem' }} />
                                    </>
                                )}
                            </motion.button>

                            <p style={{
                                textAlign: 'center',
                                fontSize: '0.625rem',
                                color: '#9ca3af',
                                marginTop: '0.625rem',
                            }}>
                                {selectedPlan === 'subscription'
                                    ? 'No commitment • Cancel in 1-click • Instant access'
                                    : 'One-time payment • Instant access to results'
                                }
                            </p>

                            <PaymentBadges />
                        </motion.div>

                        <LegalAgreement />
                    </div>
                </div>
            </div>
        </>
    );
}

export default PaymentPage;
