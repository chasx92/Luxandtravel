"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Users, ScanFace, ShieldAlert, Camera, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useService } from '../lib/ServiceContext';

/**
 * ProfileFinder Widget - Using INLINE STYLES to guarantee dimensions
 */

export type ServiceType = 'dating' | 'following' | 'facetrace' | 'fidelity';

const SERVICES = [
    { id: 'dating' as ServiceType, label: 'Dating', icon: Heart, title: 'WHO ARE YOU LOOKING FOR?' },
    { id: 'following' as ServiceType, label: 'Social AI', icon: Users, title: 'ENTER TARGET USERNAME' },
    { id: 'facetrace' as ServiceType, label: 'Face', icon: ScanFace, title: 'UPLOAD PHOTO TO SCAN' },
    { id: 'fidelity' as ServiceType, label: 'Fidelity', icon: ShieldAlert, title: 'UPLOAD CHAT SCREENSHOT' },
];

// ============================================
// TAB BUTTON
// ============================================
const TabButton = ({ active, onClick, icon: Icon, label }: {
    active: boolean;
    onClick: () => void;
    icon: React.ElementType;
    label: string;
}) => (
    <button
        onClick={onClick}
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            borderRadius: '9999px',
            fontSize: '14px',
            fontWeight: 600,
            border: active ? 'none' : '1px solid #e5e7eb',
            backgroundColor: active ? '#EF3E5C' : 'white',
            color: active ? 'white' : '#4b5563',
            cursor: 'pointer',
            transition: 'all 0.2s',
        }}
    >
        <Icon size={16} />
        <span>{label}</span>
    </button>
);

// ============================================
// CTA BUTTON WITH HAND
// ============================================
const CTAButton = ({ label, onClick, disabled }: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
}) => (
    <div style={{ position: 'relative', flexShrink: 0 }}>
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                backgroundColor: 'black',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '14px',
                padding: '16px 32px',
                borderRadius: '9999px',
                border: 'none',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.5 : 1,
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            }}
        >
            {label}
        </button>
        <motion.span
            style={{
                position: 'absolute',
                bottom: '-10px',
                right: '-12px',
                fontSize: '36px',
                pointerEvents: 'none',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                lineHeight: 1,
            }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
            👈
        </motion.span>
    </div>
);

// ============================================
// DATING VIEW - STRICT INLINE STYLES
// ============================================
const DatingView = ({ onSearch, isLoading }: { onSearch: (g: 'man' | 'woman') => void; isLoading: boolean }) => {
    const [selected, setSelected] = useState<'man' | 'woman'>('man');
    const { colors } = useService();
    const primaryColor = colors.primary;

    const cardStyle = (isSelected: boolean): React.CSSProperties => ({
        width: '90px',
        height: '115px',
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        border: isSelected ? `2px solid ${primaryColor}` : '2px solid #cbd5e1',
        boxShadow: isSelected ? `0 8px 20px ${primaryColor}40` : '0 2px 8px rgba(0,0,0,0.06)',
        transform: isSelected ? 'scale(1.02)' : 'scale(1)',
        transition: 'all 0.3s ease',
        opacity: isSelected ? 1 : 0.85,
        flexShrink: 0,
        position: 'relative',
    });

    const avatarContainerStyle: React.CSSProperties = {
        height: '70%',
        backgroundColor: '#f8fafc',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: 0,
    };

    const avatarImageStyle: React.CSSProperties = {
        width: '115%',
        height: '115%',
        objectFit: 'cover',
        objectPosition: 'center 42%',
        transform: 'translateY(2%)',
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            {/* Gender Cards Container */}
            <div style={{ display: 'flex', gap: '12px' }}>
                {/* MAN Card */}
                <div onClick={() => setSelected('man')} style={cardStyle(selected === 'man')}>
                    {/* Checkmark */}
                    {selected === 'man' && (
                        <div style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            backgroundColor: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 10,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M13.5 4L6 11.5L2.5 8" stroke={primaryColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    )}
                    <div
                        style={avatarContainerStyle}
                    >
                        <img
                            src="https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/Design%20sans%20titre%20(6).svg"
                            alt="Man"
                            style={avatarImageStyle}
                        />
                    </div>
                    <div style={{
                        height: '30%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: selected === 'man' ? primaryColor : '#94a3b8',
                        color: 'white',
                        fontSize: '13px',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                    }}>
                        MAN
                    </div>
                </div>

                {/* WOMAN Card */}
                <div onClick={() => setSelected('woman')} style={cardStyle(selected === 'woman')}>
                    {/* Checkmark */}
                    {selected === 'woman' && (
                        <div style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            backgroundColor: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 10,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M13.5 4L6 11.5L2.5 8" stroke={primaryColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    )}
                    <div
                        style={avatarContainerStyle}
                    >
                        <img
                            src="https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/FEMME.svg"
                            alt="Woman"
                            style={avatarImageStyle}
                        />
                    </div>
                    <div style={{
                        height: '30%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: selected === 'woman' ? primaryColor : '#94a3b8',
                        color: 'white',
                        fontSize: '13px',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                    }}>
                        WOMAN
                    </div>
                </div>
            </div>

            {/* CTA Button */}
            <CTAButton
                label={isLoading ? "..." : "SEARCH"}
                onClick={() => onSearch(selected)}
                disabled={isLoading}
            />
        </div>
    );
};

// ============================================
// SOCIAL AI VIEW
// ============================================
const SocialView = ({ onAnalyze, isLoading }: { onAnalyze: (u: string) => void; isLoading: boolean }) => {
    const [username, setUsername] = useState('');

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%' }}>
            <div style={{ position: 'relative', flex: 1 }}>
                <div style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #fbbf24, #ef4444, #a855f7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                }}>
                    <Camera size={20} color="white" />
                </div>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="@username"
                    style={{
                        width: '100%',
                        paddingLeft: '64px',
                        paddingRight: '16px',
                        paddingTop: '16px',
                        paddingBottom: '16px',
                        backgroundColor: '#f9fafb',
                        border: '2px solid #f3f4f6',
                        borderRadius: '16px',
                        fontSize: '16px',
                        fontWeight: 500,
                        outline: 'none',
                    }}
                />
            </div>
            <CTAButton
                label={isLoading ? "..." : "ANALYZE"}
                onClick={() => onAnalyze(username)}
                disabled={isLoading}
            />
        </div>
    );
};

// ============================================
// UPLOAD VIEW
// ============================================
const UploadView = ({ icon: Icon, title, subtitle, btnLabel, onAction, isLoading }: {
    icon: React.ElementType;
    title: string;
    subtitle: string;
    btnLabel: string;
    onAction: () => void;
    isLoading: boolean;
}) => {
    const { colors } = useService();
    const primaryColor = colors.primary;

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%' }}>
            <div
                onClick={onAction}
                style={{
                    flex: 1,
                    height: '64px',
                    border: `2px dashed ${primaryColor}66`,
                    backgroundColor: `${primaryColor}0D`,
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 16px',
                    gap: '16px',
                    cursor: 'pointer',
                }}
            >
                <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    flexShrink: 0,
                }}>
                    <Icon size={20} color={primaryColor} />
                </div>
                <div>
                    <p style={{ fontWeight: 700, color: '#1f2937', margin: 0, fontSize: '14px' }}>{title}</p>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>{subtitle}</p>
                </div>
            </div>
            <CTAButton
                label={isLoading ? "..." : btnLabel}
                onClick={onAction}
                disabled={isLoading}
            />
        </div>
    );
};

// ============================================
// MAIN WIDGET
// ============================================
export const ServiceFormWidget = () => {
    const { selectedService, setSelectedService, colors } = useService();
    const primaryColor = colors.primary;
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const activeConfig = SERVICES.find(s => s.id === selectedService) || SERVICES[0];

    const resetServiceTransientState = () => {
        if (typeof window === 'undefined') return;
        sessionStorage.removeItem('pf_following_query');
        sessionStorage.removeItem('pf_facetrace_image');
        sessionStorage.removeItem('pf_fidelity_uploads');
    };

    const handleAction = (path: string) => {
        resetServiceTransientState();
        setIsLoading(true);
        setTimeout(() => {
            router.push(path);
            setIsLoading(false);
        }, 400);
    };

    return (
        <div style={{
            width: '100%',
            maxWidth: '400px',
            margin: '0 auto',
            padding: '0 12px',
            boxSizing: 'border-box'
        }}>
            {/* Card - No service tabs */}
            <motion.div
                style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    border: `2px solid ${primaryColor}`,
                    boxShadow: `0 16px 40px ${primaryColor}33`,
                    padding: '12px',
                }}
                initial={false}
                animate={{ scale: 1 }}
                whileHover={{ boxShadow: `0 20px 50px ${primaryColor}40` }}
                transition={{ duration: 0.2 }}
            >
                {/* Title */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                    <div style={{
                        background: `linear-gradient(180deg, ${primaryColor}10 0%, #ffffff 100%)`,
                        borderRadius: '12px',
                        border: `1.5px solid ${primaryColor}30`,
                        boxShadow: `0 8px 20px ${primaryColor}1f, inset 0 1px 0 rgba(255,255,255,0.9)`,
                        padding: '8px 16px',
                        maxWidth: '100%'
                    }}>
                        <h3 style={{
                            color: primaryColor,
                            fontSize: '11px',
                            fontWeight: 950,
                            textAlign: 'center',
                            margin: 0,
                            letterSpacing: '0.12em',
                            lineHeight: 1.15,
                            whiteSpace: 'nowrap',
                        }}>
                            {activeConfig.title}
                        </h3>
                    </div>
                </div>

                {/* Content */}
                {/* Content */}
                {selectedService === 'dating' && (
                    <DatingView
                        onSearch={(g) => handleAction(`/dating-search/form?gender=${g}`)}
                        isLoading={isLoading}
                    />
                )}
                {selectedService === 'following' && (
                    <SocialView
                        onAnalyze={(u) => handleAction(`/following-ai/form?username=${u}`)}
                        isLoading={isLoading}
                    />
                )}
                {selectedService === 'facetrace' && (
                    <UploadView
                        icon={Camera}
                        title="Upload Photo"
                        subtitle="JPG/PNG Match"
                        btnLabel="SCAN"
                        onAction={() => handleAction('/face-trace/form')}
                        isLoading={isLoading}
                    />
                )}
                {selectedService === 'fidelity' && (
                    <UploadView
                        icon={MessageCircle}
                        title="Upload Chat"
                        subtitle="Analyze Logs"
                        btnLabel="TEST"
                        onAction={() => handleAction('/fidelity-test/form')}
                        isLoading={isLoading}
                    />
                )}
            </motion.div>
        </div>
    );
};

export default ServiceFormWidget;
