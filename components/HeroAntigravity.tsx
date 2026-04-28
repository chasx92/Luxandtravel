"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useService } from '../lib/ServiceContext';
import { ServiceType } from '../lib/content';
import { trustedUserPhotos } from '../lib/profileSamples';
import {
    Search, Globe, User, Check, Shield, Clock, Menu, X,
    Heart, Users, ScanFace, MessageSquare, Instagram,
    MessageCircle, Fingerprint, TrendingUp, Star,
    UploadCloud, Activity, ArrowRight
} from 'lucide-react';
import { FidelityForm } from './forms/FidelityForm';

// --- Types ---
type GenderType = 'man' | 'woman';

interface GenderCardProps {
    gender: string;
    selected: boolean;
    onClick: () => void;
    img: string;
    color: string;
    isWoman?: boolean;
}

interface UploadZoneProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    accentColor: string;
    badge: React.ReactNode;
}

const HeroAntigravity: React.FC = () => {
    const router = useRouter();
    const { selectedService, setSelectedService } = useService();
    const [selectedGender, setSelectedGender] = useState<GenderType>('man');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [faceTraceImage, setFaceTraceImage] = useState<string | null>(null);
    const [faceTraceFile, setFaceTraceFile] = useState<File | null>(null);
    const [isPrivate, setIsPrivate] = useState(false);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        router.prefetch('/dating-search/form');
        router.prefetch('/activity-tracker');
        router.prefetch('/face-trace/form');
        router.prefetch('/fidelity-test/form');
        router.prefetch('/payment');
    }, [router]);

    const handleFaceTraceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFaceTraceFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setFaceTraceImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const clearFaceTraceImage = () => {
        setFaceTraceImage(null);
        setFaceTraceFile(null);
    };

    // --- Images ---
    const avatarMan = "https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/Design%20sans%20titre%20(6).svg";
    const avatarWoman = "https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/FEMME.svg";

    const trustedUsers = trustedUserPhotos;

    const services = [
        { id: 'dating' as ServiceType, label: 'Dating Search', icon: <Heart size={20} strokeWidth={2.5} />, path: '/' },
        { id: 'following' as ServiceType, label: 'Following AI', icon: <Users size={20} strokeWidth={2.5} />, path: '/following-ai' },
        { id: 'facetrace' as ServiceType, label: 'Face Trace', icon: <ScanFace size={20} strokeWidth={2.5} />, path: '/face-trace' },
        { id: 'fidelity' as ServiceType, label: 'Fidelity Test', icon: <MessageSquare size={20} strokeWidth={2.5} />, path: '/fidelity-test' },
    ];

    const trendingKeywords = [
        "Pimeyes Alternative", "Reverse Image Search", "Face Search Free", "Instagram Finder", "Tinder Profile Search", "AI Face Recognition"
    ];

    const contentMap: Record<ServiceType, { h1: string; desc: string; instruction: string; cta: string; ctaEmoji: string; buttonIcon: React.ReactNode; buttonBg: string }> = {
        dating: {
            h1: "Find any profile on Tinder with AI",
            desc: "Uncover your partner's secrets with the #1 Tinder Profile Finder. More accurate than Pimeyes for dating apps.",
            instruction: "WHO ARE YOU LOOKING FOR?",
            cta: "START SEARCH",
            ctaEmoji: "",
            buttonIcon: null,
            buttonBg: "linear-gradient(135deg, #991b1b 0%, #dc2626 50%, #ef4444 100%)"
        },
        following: {
            h1: "Reveal Hidden Instagram Connections",
            desc: "Analyze their entire following list instantly. See who they recently followed and uncover suspicious interactions.",
            instruction: "ENTER TARGET USERNAME",
            cta: "SCAN FOLLOWINGS",
            ctaEmoji: "",
            buttonIcon: <Instagram size={22} strokeWidth={2.5} />,
            buttonBg: "linear-gradient(135deg, #5b21b6 0%, #7c3aed 50%, #8b5cf6 100%)"
        },
        facetrace: {
            h1: "AI Face Search Engine",
            desc: "Reverse Image Search — Upload any photo and instantly find someone's presence across the web, social networks and dating apps.",
            instruction: "UPLOAD PHOTO TO SCAN",
            cta: "WEB SCAN",
            ctaEmoji: "",
            buttonIcon: <ScanFace size={22} strokeWidth={2.5} />,
            buttonBg: "linear-gradient(135deg, #075985 0%, #0284c7 50%, #0ea5e9 100%)"
        },
        fidelity: {
            h1: "Scan Chat Screenshots for Red Flags",
            desc: "Upload screenshots of suspicious conversations (WhatsApp, SMS, Tinder). Our AI detects hidden infidelity signals.",
            instruction: "UPLOAD CHAT SCREENSHOT",
            cta: "ANALYZE CHAT",
            ctaEmoji: "",
            buttonIcon: <MessageCircle size={22} strokeWidth={2.5} />,
            buttonBg: "linear-gradient(135deg, #9d174d 0%, #be185d 50%, #db2777 100%)"
        }
    };

    const currentContent = contentMap[selectedService];

    const ctaProofMap: Record<ServiceType, string> = {
        dating: '142 searches launched today',
        following: '89 profile checks today',
        facetrace: '76 photo scans today',
        fidelity: '58 chat reviews today'
    };

    const heroTrustMap: Record<ServiceType, string> = {
        dating: "The #1 AI fidelity check app",
        following: "The #1 following check app",
        facetrace: "The #1 face search app",
        fidelity: "The #1 chat fidelity app"
    };

    // Premium mesh-style radial gradient backgrounds per service (CheatEye inspired)
    const gradientMap: Record<ServiceType, string> = {
        dating: 'radial-gradient(ellipse 150% 80% at 50% 20%, #FF5E00 0%, #FF085E 35%, #FF004F 60%, #E8003D 100%)',
        following: 'radial-gradient(ellipse 150% 80% at 50% 20%, #9333EA 0%, #7C3AED 35%, #6D28D9 60%, #5B21B6 100%)',
        facetrace: 'radial-gradient(ellipse 150% 80% at 50% 20%, #06B6D4 0%, #0EA5E9 35%, #0284C7 60%, #0369A1 100%)',
        fidelity: 'radial-gradient(ellipse 150% 80% at 50% 20%, #F472B6 0%, #EC4899 35%, #DB2777 60%, #BE185D 100%)'
    };

    // Accent colors per service for consistent theming
    const accentColors: Record<ServiceType, { primary: string; secondary: string; light: string }> = {
        dating: { primary: '#dc2626', secondary: '#ef4444', light: '#fef2f2' },
        following: { primary: '#7c3aed', secondary: '#8b5cf6', light: '#f5f3ff' },
        facetrace: { primary: '#0284c7', secondary: '#0ea5e9', light: '#f0f9ff' },
        fidelity: { primary: '#be185d', secondary: '#db2777', light: '#fdf2f8' }
    };

    const currentAccent = accentColors[selectedService];

    const MobileServiceIcon = ({ type }: { type: 'tinder' | 'instagram' | 'facetrace' | 'message' }) => {
        const baseStyle: React.CSSProperties = {
            width: '42px',
            height: '42px',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            border: '1px solid rgba(255,255,255,0.18)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.22), 0 12px 24px rgba(0,0,0,0.24)'
        };

        if (type === 'tinder') {
            return (
                <span style={{ ...baseStyle, background: 'linear-gradient(135deg, #ff4458 0%, #ff6b2c 100%)' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M12.2 21.5c-4.2 0-7.2-2.9-7.2-6.8 0-2.2 1-4.3 2.6-5.7.4-.3 1-.1 1.1.4.2 1 .7 1.8 1.4 2.2-.2-3.8 2-7 5.2-9 .4-.3 1-.1 1.1.4.7 2.7 2.8 4.1 4 6.2.7 1.2 1.1 2.5 1.1 4 0 4.9-3.7 8.3-9.3 8.3Z" fill="white" />
                        <path d="M12.1 18.7c-1.9 0-3.3-1.3-3.3-3 0-1 .4-1.9 1.1-2.5.3-.2.7-.1.8.3.1.4.3.8.6 1 .1-1.7 1.1-3.1 2.6-4 .3-.2.7 0 .8.3.3 1.2 1.2 1.8 1.8 2.8.3.5.5 1.1.5 1.8 0 2-1.7 3.3-4.9 3.3Z" fill="#ff4458" opacity="0.35" />
                    </svg>
                </span>
            );
        }

        if (type === 'instagram') {
            return (
                <span style={{ ...baseStyle, background: 'radial-gradient(circle at 30% 105%, #feda75 0%, #fa7e1e 28%, #d62976 58%, #962fbf 78%, #4f5bd5 100%)' }}>
                    <Instagram size={24} color="#ffffff" strokeWidth={2.4} aria-hidden="true" />
                </span>
            );
        }

        if (type === 'facetrace') {
            return (
                <span style={{ ...baseStyle, background: 'linear-gradient(135deg, #075985 0%, #0ea5e9 100%)' }}>
                    <ScanFace size={25} color="#ffffff" strokeWidth={2.4} aria-hidden="true" />
                </span>
            );
        }

        return (
            <span style={{ ...baseStyle, background: 'linear-gradient(135deg, #34c759 0%, #0a8f3d 100%)' }}>
                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="2.5" y="4" width="19" height="15" rx="7.5" fill="white" />
                    <path d="M8.1 18.1 5 21v-4.6" fill="white" />
                    <path d="M7.8 10.9h8.4M7.8 13.4h5.5" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
            </span>
        );
    };

    return (
        <section style={{
            width: '100%',
            background: gradientMap[selectedService],
            color: '#ffffff',
            fontFamily: "var(--font-display), 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            overflow: 'hidden',
            position: 'relative',
            paddingBottom: '80px',
            borderRadius: '0 0 48px 48px',
            transition: 'background 0.5s ease',
            isolation: 'isolate'
        }}>
            {/* CSS is now in globals.css - no inline style tag needed */}

            {/* Navigation */}
            <nav style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 24px', // Reduced top/bottom padding
                maxWidth: '1280px',
                margin: '0 auto',
                width: '100%',
                backdropFilter: 'blur(12px)',
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '0 0 16px 16px',
                marginTop: '8px',
                position: 'relative',
                zIndex: 50
            }}>
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <img
                        src="https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/Design%20sans%20titre%20(7).svg"
                        alt="ProfileFinder"
                        loading="lazy"
                        style={{
                            height: '32px',
                            width: 'auto'
                        }}
                    />
                    <span style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 900, letterSpacing: '-0.02em', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                        ProfileFinder
                    </span>
                </div>

                {/* Desktop Navigation Links */}
                <div className="hidden lg:flex items-center gap-8 font-semibold text-[15px]">
                    {['Search Profile', 'Blog', 'Affiliate Program'].map((item) => (
                        <a
                            key={item}
                            href={item === 'Affiliate Program' ? 'https://profilefinder.tolt.io/login' : '#'}
                            style={{
                                color: 'rgba(255,255,255,0.8)',
                                textDecoration: 'none',
                                transition: 'color 0.2s',
                                padding: '8px 0'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
                        >
                            {item}
                        </a>
                    ))}
                </div>

                {/* Desktop Right Section */}
                <div className="hidden lg:flex items-center gap-4">
                    <div className="flex items-center gap-1.5 cursor-pointer px-3 py-2 rounded-xl font-semibold text-sm">
                        <Globe size={16} />
                        <span>EN</span>
                    </div>
                    <button
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            border: '1px solid rgba(255,255,255,0.3)',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            padding: '10px 20px',
                            borderRadius: '9999px',
                            color: '#ffffff',
                            fontSize: '14px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            backdropFilter: 'blur(8px)',
                            transition: 'all 0.3s'
                        }}
                        onFocus={(e) => e.currentTarget.style.outline = '2px solid #ffffff'}
                        onBlur={(e) => e.currentTarget.style.outline = 'none'}
                    >
                        <User size={18} />
                        <span>Profile</span>
                    </button>
                </div>

                {/* Mobile Hamburger Button */}
                <div className="flex lg:hidden items-center gap-2">
                    <span style={{
                        color: '#ffffff',
                        fontSize: '11px',
                        fontWeight: 900,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        padding: '8px 10px',
                        borderRadius: '999px',
                        backgroundColor: 'rgba(255,255,255,0.12)',
                        border: '1px solid rgba(255,255,255,0.22)',
                        backdropFilter: 'blur(8px)',
                        whiteSpace: 'nowrap',
                        boxShadow: '0 8px 18px rgba(0,0,0,0.14)'
                    }}>
                        Choose service
                    </span>
                    <button
                        className="flex items-center justify-center"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isMenuOpen}
                        style={{
                            width: '44px',
                            height: '44px',
                            border: '1px solid rgba(255,255,255,0.35)',
                            backgroundColor: 'rgba(255,255,255,0.16)',
                            borderRadius: '12px',
                            color: '#ffffff',
                            cursor: 'pointer',
                            backdropFilter: 'blur(8px)',
                            transition: 'all 0.3s',
                            boxShadow: '0 10px 24px rgba(0,0,0,0.18)'
                        }}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div
                        className="mobile-menu"
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            backgroundColor: 'rgba(0,0,0,0.95)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '0 0 24px 24px',
                            padding: '24px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                            zIndex: 100,
                            marginTop: '8px',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}
                    >
                        {/* Services Section - AT TOP */}
                        <div>
                            <p style={{ fontSize: '12px', fontWeight: 800, color: 'rgba(255,255,255,0.72)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                Choose your service
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
	                                {[
	                                    { label: 'Tinder Search', description: 'Find hidden dating profiles', path: '/', icon: 'tinder' as const },
	                                    { label: 'Following AI', description: 'Check suspicious new follows', path: '/following-ai', icon: 'instagram' as const },
	                                    { label: 'Face Trace', description: 'Search profiles from one photo', path: '/face-trace', icon: 'facetrace' as const },
	                                    { label: 'Fidelity Test', description: 'Analyze chats for red flags', path: '/fidelity-test', icon: 'message' as const }
	                                ].map((service) => (
                                    <a
                                        key={service.label}
                                        href={service.path}
                                        style={{
                                            color: '#ffffff',
                                            textDecoration: 'none',
                                            padding: '12px 16px',
                                            borderRadius: '16px',
                                            background: 'rgba(255,255,255,0.075)',
                                            border: '1px solid rgba(255,255,255,0.13)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            transition: 'all 0.2s',
                                            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 20px rgba(0,0,0,0.08)'
                                        }}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
	                                        <MobileServiceIcon type={service.icon} />
                                        <span style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                                            <span style={{ fontSize: '16px', fontWeight: 800, lineHeight: 1.15 }}>
                                                {service.label}
                                            </span>
                                            <span style={{ fontSize: '12px', fontWeight: 600, lineHeight: 1.25, color: 'rgba(255,255,255,0.62)' }}>
                                                {service.description}
                                            </span>
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Other Links */}
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
                            {['Blog', 'Affiliate Program'].map((item) => (
                                <a
                                    key={item}
                                    href={item === 'Affiliate Program' ? 'https://profilefinder.tolt.io/login' : '#'}
                                    style={{
                                        color: 'rgba(255,255,255,0.9)',
                                        textDecoration: 'none',
                                        fontSize: '18px',
                                        fontWeight: 600,
                                        padding: '12px 16px',
                                        borderRadius: '12px',
                                        backgroundColor: 'rgba(255,255,255,0.05)',
                                        transition: 'all 0.2s',
                                        display: 'block',
                                        marginBottom: '8px'
                                    }}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item}
                                </a>
                            ))}
                        </div>

                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', display: 'flex', gap: '12px' }}>
                            <button style={{
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                padding: '14px',
                                borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.2)',
                                backgroundColor: 'transparent',
                                color: '#ffffff',
                                fontSize: '14px',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}>
                                <Globe size={18} />
                                EN
                            </button>
                            <button style={{
                                flex: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                padding: '14px',
                                borderRadius: '12px',
                                border: 'none',
                                backgroundColor: '#ffffff',
                                color: '#0a0a0a',
                                fontSize: '14px',
                                fontWeight: 700,
                                cursor: 'pointer'
                            }}>
                                <User size={18} />
                                Profile
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <div className="flex flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(360px,480px)] items-center lg:items-start justify-between w-full max-w-[1480px] mx-auto px-4 md:px-8 pt-4 pb-6 lg:pt-2 lg:pb-12 gap-2 lg:gap-10 relative z-10">
                
                {/* Left Column */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full min-w-0" style={{ position: 'relative' }}>

                {/* Trusted Badge */}
                <div className="flex items-center gap-[12px] bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 shadow-lg scale-[0.85] origin-center lg:scale-100 lg:origin-left transition-transform mb-4 lg:mb-6">
                    <div className="flex">
                        {trustedUsers.map((url, i) => (
                            <img
                                key={i}
                                src={url}
                                alt="user"
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    border: '2px solid #ff6b6b',
                                    marginLeft: i > 0 ? '-12px' : '0',
                                    objectFit: 'cover'
                                }}
                            />
                        ))}
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: '#ffffff',
                            color: '#ff4b5c',
                            border: '2px solid #ff6b6b',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: '10px',
                            marginLeft: '-12px',
                            position: 'relative',
                            zIndex: 10
                        }}>
                            +99
                        </div>
                    </div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.95)', fontWeight: 700, lineHeight: 1.3, textAlign: 'left', paddingLeft: '8px', letterSpacing: '0.02em' }}>
                        TRUSTED BY <br />
                        <span style={{ color: '#ffffff', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 800 }}>
                            500k+ users <Check size={12} style={{ backgroundColor: '#22c55e', borderRadius: '50%', padding: '2px', color: '#fff' }} strokeWidth={4} />
                        </span>
                    </div>
                </div>

                {/* Headlines */}
                <div className="w-full mb-3 lg:mb-8">
                    <div
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'transparent',
                            border: 'none',
                            borderRadius: 0,
                            padding: '2px 0',
                            boxShadow: 'none',
                            backdropFilter: 'none',
                            color: '#ffffff',
                            marginBottom: '14px',
                            maxWidth: '100%'
                        }}
                    >
                        <span aria-hidden="true" style={{
                            fontSize: '13px',
                            lineHeight: 1,
                            opacity: 0.9,
                            flexShrink: 0
                        }}>✦</span>
                        <span style={{
                            fontSize: 'clamp(13px, 2.6vw, 15px)',
                            fontFamily: "var(--font-display), 'Plus Jakarta Sans', system-ui, sans-serif",
                            fontWeight: 800,
                            lineHeight: 1.1,
                            whiteSpace: 'nowrap',
                            letterSpacing: '0',
                            textShadow: '0 1px 0 rgba(255,255,255,0.08)'
                        }}>
                            {heroTrustMap[selectedService]}
                        </span>
                        <span aria-hidden="true" style={{
                            width: '1px',
                            height: '14px',
                            background: 'rgba(255,255,255,0.28)',
                            flexShrink: 0
                        }} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1px', flexShrink: 0, opacity: 0.95 }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} size={12} fill="#ffffff" color="#ffffff" strokeWidth={1.8} />
                            ))}
                        </div>
                        <span aria-hidden="true" style={{
                            fontSize: '13px',
                            lineHeight: 1,
                            opacity: 0.9,
                            flexShrink: 0
                        }}>✦</span>
                    </div>
                    <h1 className="font-extrabold mb-2 leading-[1.05] tracking-tight text-white drop-shadow-lg"
                        style={{
                            fontSize: 'clamp(1.7rem, 5vw, 4rem)',
                            fontFamily: "var(--font-display), 'Plus Jakarta Sans', sans-serif"
                        }}>
                        {currentContent.h1}
                    </h1>
                    <p className="text-white/90 leading-relaxed font-medium max-w-[90%] lg:max-w-[80%]"
                       style={{ fontSize: 'clamp(0.85rem, 1.8vw, 1.15rem)' }}>
                        {currentContent.desc}
                    </p>
                </div>

                {/* Service Selector - desktop only */}
                <div className="hidden lg:flex w-full mb-2 lg:mb-6 flex-col items-center lg:items-start lg:scale-[0.95] xl:scale-100 origin-top lg:origin-left transition-transform">
                    <p className="hidden lg:block" style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'rgba(255,255,255,0.9)',
                        marginBottom: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        Choose your service:
                    </p>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-2 w-full max-w-[700px] mt-1 lg:mt-0">
                        {services.map((service) => (
                            <button
                                key={service.id}
                                onClick={() => {
                                    setSelectedService(service.id);
                                    router.push(service.path);
                                }}
                                className="tab-btn"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '10px 16px',
                                    borderRadius: '9999px',
                                    fontSize: '13px',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    border: selectedService === service.id ? '2px solid #0a0a0a' : '2px solid transparent',
                                    backgroundColor: selectedService === service.id ? '#0a0a0a' : '#ffffff',
                                    color: selectedService === service.id ? '#ffffff' : '#475569',
                                    boxShadow: selectedService === service.id ? '0 6px 16px rgba(10,10,10,0.25)' : '0 2px 6px rgba(0,0,0,0.06)',
                                    transform: selectedService === service.id ? 'scale(1.02)' : 'scale(1)',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {React.cloneElement(service.icon as React.ReactElement<{ size?: number }>, { size: 16 })}
                                <span style={{ fontWeight: 700, letterSpacing: '0.01em' }}>{service.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* As seen in */}
                <div className="mt-4 lg:mt-8 hidden lg:flex flex-col items-center lg:items-start w-full">
                    <p className="font-bold text-[22px] text-white mb-6">As seen in</p>
                    <div className="flex items-center gap-8 opacity-60 grayscale brightness-[2] flex-wrap justify-center lg:justify-start">
                        <span style={{ fontSize: '28px', fontWeight: 900, fontFamily: 'serif', letterSpacing: '-1px' }}>Forbes</span>
                        <span style={{ fontSize: '28px', fontWeight: 900, fontFamily: 'serif', fontStyle: 'italic', letterSpacing: '-1px' }}>DailyMail</span>
                        <span style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '-1px' }}>The Sun</span>
                        <span style={{ fontSize: '28px', fontWeight: 900, fontFamily: 'sans-serif', letterSpacing: '-2px' }}>VICE</span>
                    </div>
                </div>

                </div>

                {/* Right Column */}
                <div className="w-full min-w-0 flex justify-center lg:justify-end">

                {/* The Card */}
                <div style={{
                    backgroundColor: '#ffffff',
                    color: '#1e293b',
                    borderRadius: '32px',
                    padding: '20px',
                    width: '100%',
                    maxWidth: '480px',
                    boxSizing: 'border-box',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
                    position: 'relative',
                    marginBottom: '40px',
                    border: '1px solid rgba(255,255,255,0.6)'
                }}>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', zIndex: 20 }}>

                        {/* Instruction Header */}
                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <div style={{
                                background: `linear-gradient(180deg, ${currentAccent.light} 0%, #ffffff 100%)`,
                                borderRadius: '14px',
                                padding: '10px 24px',
                                border: `1.5px solid ${currentAccent.primary}30`,
                                boxShadow: `0 10px 24px ${currentAccent.primary}1f, inset 0 1px 0 rgba(255,255,255,0.9)`,
                                maxWidth: '100%'
                            }}>
                                <span style={{
                                    display: 'block',
                                    fontSize: '13px',
                                    fontWeight: 950,
                                    letterSpacing: '0.14em',
                                    color: currentAccent.primary,
                                    textTransform: 'uppercase',
                                    whiteSpace: 'nowrap',
                                    lineHeight: 1.15
                                }}>
                                    {currentContent.instruction}
                                </span>
                            </div>
                        </div>

                        {/* Content Switching */}
                        {selectedService === 'dating' && (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <GenderCard
                                    gender="MAN"
                                    selected={selectedGender === 'man'}
                                    onClick={() => setSelectedGender('man')}
                                    img={avatarMan}
                                    color="#ff4b5c"
                                />
                                <GenderCard
                                    gender="WOMAN"
                                    selected={selectedGender === 'woman'}
                                    onClick={() => setSelectedGender('woman')}
                                    img={avatarWoman}
                                    color="#ff4b5c"
                                    isWoman={true}
                                />
                            </div>
                        )}

                        {selectedService === 'following' && (
                            <div style={{ display: 'flex', flexDirection: 'column', height: '300px', justifyContent: 'center' }}>
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                                        <div style={{
                                            width: '80px',
                                            height: '80px',
                                            background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                                            borderRadius: '16px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 8px 24px rgba(168,85,247,0.3)',
                                            marginBottom: '16px',
                                            transform: 'rotate(3deg)'
                                        }}>
                                            <Instagram size={40} color="#ffffff" />
                                        </div>
                                        <p style={{ fontSize: '14px', color: '#64748b', fontWeight: 600, textAlign: 'center', padding: '0 16px' }}>
                                            Analyze public profiles & hidden connections.
                                        </p>
                                    </div>

                                    {/* Private / Public Toggle */}
                                    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '12px' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                                            <input 
                                                type="radio" 
                                                name="profile_visibility" 
                                                checked={!isPrivate} 
                                                onChange={() => {
                                                    setIsPrivate(false);
                                                    setShowError(false);
                                                }}
                                                style={{ accentColor: '#8b5cf6' }}
                                            />
                                            Public Profile
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                                            <input 
                                                type="radio" 
                                                name="profile_visibility" 
                                                checked={isPrivate} 
                                                onChange={() => {
                                                    setIsPrivate(true);
                                                    setShowError(true);
                                                }}
                                                style={{ accentColor: '#8b5cf6' }}
                                            />
                                            Private Profile
                                        </label>
                                    </div>

                                    {showError && (
                                        <div style={{
                                            backgroundColor: '#fef2f2',
                                            color: '#b91c1c',
                                            padding: '8px 12px',
                                            borderRadius: '8px',
                                            fontSize: '12px',
                                            fontWeight: 700,
                                            textAlign: 'center',
                                            marginBottom: '12px',
                                            border: '1px solid #fca5a5'
                                        }}>
                                            Search is not possible if the profile is private.
                                        </div>
                                    )}

                                    <div style={{ position: 'relative', width: '100%', opacity: isPrivate ? 0.6 : 1, pointerEvents: isPrivate ? 'none' : 'auto' }}>
                                        <div style={{
                                            position: 'absolute',
                                            left: '16px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: '#94a3b8',
                                            fontWeight: 800,
                                            fontSize: '18px',
                                            zIndex: 10
                                        }}>@</div>
                                        <input
                                            type="text"
                                            placeholder="instagram_handle"
                                            style={{
                                                width: '100%',
                                                backgroundColor: '#f8fafc',
                                                border: '2px solid #e2e8f0',
                                                borderRadius: '16px',
                                                padding: '16px 16px 16px 40px',
                                                fontSize: '16px',
                                                fontWeight: 800,
                                                color: '#1e293b',
                                                outline: 'none',
                                                boxSizing: 'border-box'
                                            }}
                                        />
                                    </div>
                                    
                                    <div id="following_is_private" data-value={isPrivate.toString()} style={{display: 'none'}}></div>
                                </div>
                        )}

                        {selectedService === 'facetrace' && (
                            <div style={{ display: 'flex', flexDirection: 'column', height: '300px' }}>
                                {!faceTraceImage ? (
                                    <label
                                        htmlFor="facetrace-upload"
                                        style={{
                                            position: 'relative',
                                            flex: 1,
                                            marginBottom: '16px',
                                            cursor: 'pointer',
                                            overflow: 'hidden',
                                            borderRadius: '16px',
                                            border: '4px dashed #e2e8f0',
                                            backgroundColor: 'rgba(248,250,252,0.5)',
                                            transition: 'all 0.3s',
                                            color: '#ff4b5c'
                                        }}
                                    >
                                        <div
                                            className="animate-scan"
                                            style={{
                                                position: 'absolute',
                                                left: 0,
                                                right: 0,
                                                height: '3px',
                                                backgroundColor: '#ff4b5c',
                                                boxShadow: '0 0 20px #ff4b5c',
                                                zIndex: 10,
                                                pointerEvents: 'none'
                                            }}
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            inset: 0,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '16px',
                                            padding: '24px'
                                        }}>
                                            <div style={{
                                                width: '80px',
                                                height: '80px',
                                                backgroundColor: '#ffffff',
                                                borderRadius: '50%',
                                                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#ff4b5c',
                                                position: 'relative',
                                                zIndex: 20,
                                                border: '4px solid #f1f5f9'
                                            }}>
                                                <ScanFace size={48} strokeWidth={1.5} />
                                                <div style={{
                                                    position: 'absolute',
                                                    bottom: '-4px',
                                                    right: '-4px',
                                                    backgroundColor: '#1e293b',
                                                    color: '#ffffff',
                                                    borderRadius: '50%',
                                                    padding: '6px',
                                                    border: '4px solid #ffffff'
                                                }}>
                                                    <Fingerprint size={16} />
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'center', zIndex: 20 }}>
                                                <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b', letterSpacing: '-0.02em', marginBottom: '8px' }}>
                                                    Drag & Drop Photo
                                                </h3>
                                                <p style={{
                                                    fontSize: '12px',
                                                    color: '#64748b',
                                                    fontWeight: 700,
                                                    backgroundColor: 'rgba(255,255,255,0.6)',
                                                    padding: '4px 12px',
                                                    borderRadius: '9999px',
                                                    border: '1px solid #e2e8f0',
                                                    display: 'inline-block'
                                                }}>
                                                    JPG, PNG (Max 10MB)
                                                </p>
                                            </div>
                                            <div style={{
                                                backgroundColor: '#1e293b',
                                                color: '#ffffff',
                                                fontSize: '12px',
                                                fontWeight: 800,
                                                padding: '10px 20px',
                                                borderRadius: '12px',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                marginTop: '8px',
                                                cursor: 'pointer'
                                            }}>
                                                <UploadCloud size={16} strokeWidth={3} />
                                                Browse Files
                                            </div>
                                        </div>
                                        <input
                                            id="facetrace-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFaceTraceUpload}
                                            style={{ display: 'none' }}
                                        />
                                    </label>
                                ) : (
                                    <div style={{
                                        position: 'relative',
                                        flex: 1,
                                        marginBottom: '16px',
                                        borderRadius: '16px',
                                        overflow: 'hidden',
                                        border: '4px solid #22c55e'
                                    }}>
                                        <img
                                            src={faceTraceImage}
                                            alt="Preview"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                        <button
                                            onClick={clearFaceTraceImage}
                                            style={{
                                                position: 'absolute',
                                                top: '12px',
                                                right: '12px',
                                                backgroundColor: '#ff4b5c',
                                                color: '#ffffff',
                                                border: 'none',
                                                borderRadius: '50%',
                                                width: '32px',
                                                height: '32px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                                            }}
                                        >
                                            <X size={18} strokeWidth={3} />
                                        </button>
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '12px',
                                            left: '12px',
                                            backgroundColor: '#22c55e',
                                            color: '#ffffff',
                                            padding: '6px 12px',
                                            borderRadius: '8px',
                                            fontSize: '12px',
                                            fontWeight: 700,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px'
                                        }}>
                                            <Check size={14} strokeWidth={3} />
                                            Photo ready
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {selectedService === 'fidelity' && (
                            <div style={{ marginTop: '-12px' }}>
                                <FidelityForm />
                            </div>
                        )}

                        {/* Action Button - Only for non-fidelity services */}
                        {selectedService !== 'fidelity' && (
	                            <div style={{ position: 'relative', width: '100%', marginTop: '8px', paddingRight: '28px', boxSizing: 'border-box' }}>
                            <button
                                onClick={() => {
                                    if (selectedService === 'facetrace') {
                                        if (typeof window !== 'undefined' && faceTraceImage) {
                                            sessionStorage.setItem('pf_facetrace_image', faceTraceImage);
                                        }
                                        router.push('/face-trace/form');
                                    } else if (selectedService === 'following') {
                                        const isPrivateNode = document.getElementById('following_is_private');
                                        if (isPrivateNode && isPrivateNode.getAttribute('data-value') === 'true') {
                                            return; // block navigation if private
                                        }
                                        router.push('/activity-tracker');
                                    } else if (selectedService === 'dating') {
                                        // Save gender for payment preview
                                        if (typeof window !== 'undefined') {
                                            sessionStorage.setItem('pf_dating_gender', selectedGender);
                                        }
                                        router.push('/dating-search/form');
                                    } else {
                                        router.push('/payment');
                                    }
                                }}
                                className="hero-btn"
                                style={{
                                    position: 'relative',
                                    width: '100%',
                                    background: currentContent.buttonBg,
                                    color: '#ffffff',
                                    borderRadius: '9999px',
	                                    padding: '16px 24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    cursor: 'pointer',
	                                    overflow: 'hidden',
                                    marginTop: 0,
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                                    transition: 'transform 0.3s'
                                }}
                            >
	                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: '32px', zIndex: 20 }}>
                                    {currentContent.buttonIcon && (
                                        <span style={{ opacity: 0.9, position: 'absolute', left: '0', display: 'flex', alignItems: 'center' }}>
                                            {currentContent.buttonIcon}
                                        </span>
                                    )}
	                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', width: '100%', minWidth: 0 }}>
	                                        <span style={{
	                                            fontSize: 'clamp(14px, 3.8vw, 18px)',
	                                            fontWeight: 900,
	                                            letterSpacing: '0.1em',
	                                            textTransform: 'uppercase',
	                                            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
	                                            whiteSpace: 'nowrap',
	                                            paddingLeft: currentContent.buttonIcon ? '34px' : '0',
	                                            paddingRight: 0
	                                        }}>
	                                            {currentContent.cta} {currentContent.ctaEmoji}
	                                        </span>
	                                        <span
	                                            className="cta-arrow-animate"
	                                            style={{
	                                                display: 'flex',
	                                                alignItems: 'center',
	                                                justifyContent: 'center',
	                                                width: '36px',
	                                                height: '36px',
	                                                borderRadius: '9999px',
	                                                backgroundColor: 'rgba(255,255,255,0.16)',
	                                                border: '1px solid rgba(255,255,255,0.22)',
	                                                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
	                                                pointerEvents: 'none',
	                                                flexShrink: 0
	                                            }}
	                                        >
	                                            <ArrowRight size={18} strokeWidth={3} />
	                                        </span>
	                                    </div>
	                                </div>
	                            </button>
                            <span
                                className="cta-finger-outside"
                                style={{
	                                    fontSize: 'clamp(34px, 8vw, 42px)',
                                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                                    lineHeight: 1,
                                    zIndex: 30
                                }}
                            >
                                👈
                            </span>
                            </div>
                        )}

                        {/* Social Proof */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '10px',
                            marginTop: '10px',
                            paddingTop: '12px',
                            borderTop: '1px solid #f1f5f9'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                backgroundColor: '#fefce8',
                                padding: '4px 12px',
                                borderRadius: '9999px',
                                border: '1px solid #fef08a'
                            }}>
                                <div style={{ display: 'flex' }}>
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} fill="#FFB800" color="#FFB800" />)}
                                </div>
                                <span style={{ fontSize: '10px', fontWeight: 700, color: '#475569' }}>4.9/5 Rating</span>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px',
                                color: '#dc2626',
                                background: 'linear-gradient(180deg, rgba(254,242,242,1) 0%, rgba(255,255,255,1) 100%)',
                                border: '1px solid #fecaca',
                                borderRadius: '9999px',
                                padding: '6px 12px',
                                boxShadow: '0 6px 16px rgba(220, 38, 38, 0.08)'
                            }}>
                                <Activity size={12} color="#22c55e" />
                                <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#dc2626' }}>{ctaProofMap[selectedService]}</span>
                            </div>
                        </div>
                    </div>

                    {/* Security Badges */}
                    <div style={{
                        position: 'absolute',
                        bottom: '-56px',
                        left: 0,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        zIndex: 10,
                        pointerEvents: 'none'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            backgroundColor: '#ff0033',
                            color: '#ffffff',
                            padding: '12px 24px',
                            borderRadius: '9999px',
                            fontSize: '10px',
                            fontWeight: 700,
                            boxShadow: '0 8px 24px rgba(255,0,51,0.3)',
                            border: '1px solid rgba(255,255,255,0.2)'
                        }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Shield size={12} strokeWidth={3} /> 100% Private</span>
                            <span style={{ width: '1px', height: '12px', backgroundColor: 'rgba(255,255,255,0.3)' }} />
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={12} strokeWidth={3} /> Instant</span>
                            <span style={{ width: '1px', height: '12px', backgroundColor: 'rgba(255,255,255,0.3)' }} />
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Check size={12} strokeWidth={3} /> 99% Accuracy</span>
                        </div>
                    </div>

                </div>
                {/* End Right Column */}
                </div>

                {/* Mobile As seen in */}
                <div className="flex lg:hidden flex-col items-center w-full mt-4 mb-4">
                    <p className="font-bold text-[18px] text-white mb-4">As seen in</p>
                    <div className="flex items-center gap-6 opacity-60 grayscale brightness-[2] flex-wrap justify-center">
                        <span style={{ fontSize: '20px', fontWeight: 900, fontFamily: 'serif', letterSpacing: '-1px' }}>Forbes</span>
                        <span style={{ fontSize: '20px', fontWeight: 900, fontFamily: 'serif', fontStyle: 'italic', letterSpacing: '-1px' }}>DailyMail</span>
                        <span style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '-1px' }}>The Sun</span>
                        <span style={{ fontSize: '20px', fontWeight: 900, fontFamily: 'sans-serif', letterSpacing: '-2px' }}>VICE</span>
                    </div>
                </div>

                {/* Mobile Service Selector - below form */}
                <div className="flex lg:hidden flex-col items-center w-full mt-6 mb-4">
                    <p style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'rgba(255,255,255,0.9)',
                        marginBottom: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        Choose your service:
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 w-full max-w-[400px]">
                        {services.map((service) => (
                            <button
                                key={service.id}
                                onClick={() => {
                                    setSelectedService(service.id);
                                    router.push(service.path);
                                }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '8px 14px',
                                    borderRadius: '9999px',
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    border: selectedService === service.id ? '2px solid #0a0a0a' : '2px solid transparent',
                                    backgroundColor: selectedService === service.id ? '#0a0a0a' : '#ffffff',
                                    color: selectedService === service.id ? '#ffffff' : '#475569',
                                    boxShadow: selectedService === service.id ? '0 6px 16px rgba(10,10,10,0.25)' : '0 2px 6px rgba(0,0,0,0.06)',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {React.cloneElement(service.icon as React.ReactElement<{ size?: number }>, { size: 14 })}
                                <span>{service.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

            </div>

            {/* SEO Marquee */}
            <div style={{
                width: '100%',
                backgroundColor: 'rgba(0,0,0,0.3)',
                backdropFilter: 'blur(12px)',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                padding: '16px 0',
                overflow: 'hidden'
            }}>
                <div className="animate-marquee" style={{ display: 'flex', alignItems: 'center', gap: '48px', whiteSpace: 'nowrap' }}>
                    {[...trendingKeywords, ...trendingKeywords].map((keyword, i) => (
                        <div key={i} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: 'rgba(255,255,255,0.5)',
                            fontSize: '10px',
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em'
                        }}>
                            <TrendingUp size={12} color="#ff4b5c" />
                            {keyword}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- Sub-components with INLINE STYLES ---

const UploadZone: React.FC<UploadZoneProps> = ({ icon, title, subtitle, accentColor, badge }) => (
    <div style={{
        position: 'relative',
        flex: 1,
        marginBottom: '16px',
        cursor: 'pointer',
        overflow: 'hidden',
        borderRadius: '16px',
        border: `4px dashed #e2e8f0`,
        backgroundColor: 'rgba(248,250,252,0.5)',
        transition: 'all 0.3s',
        color: accentColor
    }}>
        <div
            className="animate-scan"
            style={{
                position: 'absolute',
                left: 0,
                right: 0,
                height: '3px',
                backgroundColor: accentColor,
                boxShadow: `0 0 20px ${accentColor}`,
                zIndex: 10,
                pointerEvents: 'none'
            }}
        />
        <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            padding: '24px'
        }}>
            <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#ffffff',
                borderRadius: '50%',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: accentColor,
                position: 'relative',
                zIndex: 20,
                border: '4px solid #f1f5f9'
            }}>
                {icon}
                <div style={{
                    position: 'absolute',
                    bottom: '-4px',
                    right: '-4px',
                    backgroundColor: '#1e293b',
                    color: '#ffffff',
                    borderRadius: '50%',
                    padding: '6px',
                    border: '4px solid #ffffff'
                }}>
                    {badge}
                </div>
            </div>
            <div style={{ textAlign: 'center', zIndex: 20 }}>
                <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b', letterSpacing: '-0.02em', marginBottom: '8px' }}>
                    {title}
                </h3>
                <p style={{
                    fontSize: '12px',
                    color: '#64748b',
                    fontWeight: 700,
                    backgroundColor: 'rgba(255,255,255,0.6)',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    border: '1px solid #e2e8f0',
                    display: 'inline-block'
                }}>
                    {subtitle}
                </p>
            </div>
            <div style={{
                backgroundColor: '#1e293b',
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: 800,
                padding: '10px 20px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '8px',
                cursor: 'pointer'
            }}>
                <UploadCloud size={16} strokeWidth={3} />
                Browse Files
            </div>
        </div>
    </div>
);

const GenderCard: React.FC<GenderCardProps> = ({ gender, selected, onClick, img, color, isWoman }) => (
    <div
        onClick={onClick}
        className="gender-card"
        style={{
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transition: 'all 0.3s',
            transform: selected ? 'scale(1.03)' : 'scale(1)',
            opacity: selected ? 1 : 0.85,
            outline: 'none',
            WebkitTapHighlightColor: 'transparent'
        }}
    >
        <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '1',
            borderRadius: '24px',
            overflow: 'hidden',
            border: `4px solid ${selected ? color : 'transparent'}`,
            boxShadow: selected ? `0 15px 35px -10px ${color}99` : 'none',
            transition: 'all 0.3s',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#ffffff'
        }}>
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: selected ? '#ffffff' : '#f1f5f9',
                borderRadius: '20px',
                overflow: 'hidden'
            }} />

            {/* Image container */}
            <div style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: '48px',
                top: 0,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                overflow: 'hidden',
                paddingBottom: '4px',
                zIndex: 10,
                pointerEvents: 'none'
            }}>
                <img
                    src={img}
                    alt={gender}
                    style={{
                        width: isWoman ? '88%' : '91%',
                        height: 'auto',
                        maxHeight: '106%',
                        objectFit: 'contain',
                        objectPosition: 'bottom',
                        filter: 'drop-shadow(0 10px 16px rgba(15,23,42,0.16))',
                        transition: 'transform 0.7s',
                        transform: selected ? 'translateY(2px) scale(1.02)' : 'translateY(3px) scale(1)'
                    }}
                />
            </div>

            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '12px 0',
                textAlign: 'center',
                fontWeight: 900,
                fontSize: '14px',
                letterSpacing: '0.25em',
                color: '#ffffff',
                backgroundColor: selected ? color : '#94a3b8',
                transition: 'background-color 0.3s',
                zIndex: 20,
                borderRadius: '0 0 20px 20px'
            }}>
                {gender}
            </div>

            {selected && (
                <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: '#ffffff',
                    borderRadius: '50%',
                    padding: '6px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    zIndex: 30
                }}>
                    <Check size={16} strokeWidth={4} color={color} />
                </div>
            )}
        </div>
    </div>
);

export default HeroAntigravity;
