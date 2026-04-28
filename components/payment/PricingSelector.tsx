"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Check, Sparkles, Lock, ArrowRight,
    Shield, Zap, Star, Clock, X, Infinity as InfinityIcon,
    Search, Eye, Scan, MessageSquare, Heart
} from 'lucide-react';
import { getPaymentConfig, SUBSCRIPTION_CONFIG } from './paymentConfig';

interface PricingSelectorProps {
    serviceId: string;
    onPlanSelect: (planType: 'subscription' | 'single') => void;
    selectedPlan: 'subscription' | 'single';
    isProcessing?: boolean;
}

/**
 * PricingSelector - Aggressive Decoy Effect Design
 * Subscription is the HERO (70% visual attention)
 * Single Report is the DECOY (dimmed, less attractive)
 */
export function PricingSelector({ serviceId, onPlanSelect, selectedPlan, isProcessing = false }: PricingSelectorProps) {
    const serviceConfig = getPaymentConfig(serviceId);
    const isSubscriptionSelected = selectedPlan === 'subscription';
    const isSingleSelected = selectedPlan === 'single';
    const formatPrice = (price: number) => price.toFixed(2).replace('.', ',');
    const paymentPaths: Record<string, string> = {
        dating: '/dating-search/payment',
        faceTrace: '/face-trace/payment',
        fidelity: '/fidelity-test/payment',
        following: '/following-ai/payment',
        chatAnalysis: '/payment/chat-analysis',
    };
    const targetPaymentPath = paymentPaths[serviceId] || '/payment';

    // Service icons for the features list
    const serviceIcons = [
        { icon: Scan, name: 'Face Trace', desc: 'Reverse image search' },
        { icon: Heart, name: 'Dating Search', desc: 'Find hidden profiles' },
        { icon: Eye, name: 'Instagram AI', desc: 'Activity monitoring' },
        { icon: Search, name: 'Fidelity Check', desc: 'Partner detection' }
    ];

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="text-center mb-2">
                <h2 className="text-xl font-black text-gray-900 mb-1">Unlock Your Results</h2>
                <p className="text-sm text-gray-500">Pick one report, or unlock every tool.</p>
            </div>

            {/* ═══════════════════════════════════════════════════════════════════
                OPTION A: SUBSCRIPTION - THE HERO (70% visual attention)
            ═══════════════════════════════════════════════════════════════════ */}
            <motion.div
                onClick={() => onPlanSelect('subscription')}
                animate={{
                    scale: isSubscriptionSelected ? 1.02 : 1,
                    y: isSubscriptionSelected ? -4 : 0,
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                style={{
                    position: 'relative',
                    cursor: 'pointer',
                    borderRadius: '1.25rem',
                    overflow: 'visible',
                }}
            >
                {/* NEON GLOW BORDER */}
                <div style={{
                    position: 'absolute',
                    inset: '-3px',
                    background: serviceConfig.accentColors.gradient,
                    borderRadius: '1.35rem',
                    opacity: isSubscriptionSelected ? 1 : 0.6,
                    filter: isSubscriptionSelected ? 'blur(0px)' : 'blur(1px)',
                    transition: 'all 0.3s ease',
                }} />

                {/* ANIMATED GLOW EFFECT */}
                <motion.div
                    animate={{
                        boxShadow: isSubscriptionSelected
                            ? [`0 0 20px ${serviceConfig.accentColors.primary}66`, `0 0 40px ${serviceConfig.accentColors.primary}99`, `0 0 20px ${serviceConfig.accentColors.primary}66`]
                            : `0 0 15px ${serviceConfig.accentColors.primary}33`,
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                        position: 'absolute',
                        inset: '-3px',
                        borderRadius: '1.35rem',
                    }}
                />

                {/* CARD CONTENT */}
                <div style={{
                    position: 'relative',
                    background: isSubscriptionSelected
                        ? 'linear-gradient(135deg, #ffffff 0%, #faf5ff 100%)'
                        : '#ffffff',
                    borderRadius: '1.25rem',
                    padding: '1.1rem',
                    border: '2px solid transparent',
                }}>
                    {/* Floating badge */}
                    <div style={{
                        position: 'absolute',
                        top: '-12px',
                        right: '16px',
                        background: serviceConfig.accentColors.gradient,
                        color: 'white',
                        fontSize: '0.6875rem',
                        fontWeight: 800,
                        padding: '6px 16px',
                        borderRadius: '0.7rem',
                        boxShadow: `0 8px 20px ${serviceConfig.accentColors.primary}3f`,
                        display: 'flex',
                        alignItems: 'center',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                    }}>
                        Most Popular
                    </div>

                    {/* Selection Radio */}
                    <div style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: isSubscriptionSelected
                            ? serviceConfig.accentColors.gradient
                            : '#e5e7eb',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                        boxShadow: isSubscriptionSelected ? `0 4px 10px ${serviceConfig.accentColors.primary}66` : 'none',
                    }}>
                        {isSubscriptionSelected && <Check style={{ width: '14px', height: '14px', color: 'white' }} />}
                    </div>

                    {/* Header */}
                    <div style={{ marginTop: '0.25rem', marginLeft: '2.25rem', marginBottom: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <InfinityIcon style={{ width: '1.25rem', height: '1.25rem', color: serviceConfig.accentColors.primary }} />
                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: 900,
                                color: '#1f2937',
                                background: serviceConfig.accentColors.gradient,
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}>
                                All-Access Pass
                            </h3>
                        </div>
                        <p style={{
                            fontSize: '0.72rem',
                            color: '#6b7280',
                            fontWeight: 600,
                            marginTop: '0.25rem',
                            lineHeight: 1.4
                        }}>
                            Best if you want all ProfileFinder services, not just this report.
                        </p>
                    </div>

                    {/* Price */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '0.5rem',
                        marginBottom: '0.75rem',
                        marginLeft: '2.25rem',
                    }}>
                        <span style={{
                            fontSize: '2.1rem',
                            fontWeight: 900,
                            color: serviceConfig.accentColors.primary,
                            lineHeight: 1,
                        }}>
                            19,90€
                        </span>
                        <span style={{ fontSize: '1rem', color: '#9ca3af', fontWeight: 500 }}>/mo</span>
                        <div style={{
                            marginLeft: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                        }}>
                            <span style={{
                                fontSize: '0.875rem',
                                color: '#9ca3af',
                                textDecoration: 'line-through'
                            }}>39,90€</span>
                            <span style={{
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                color: '#16a34a',
                                background: '#dcfce7',
                                padding: '2px 8px',
                                borderRadius: '4px',
                            }}>-50%</span>
                        </div>
                    </div>

                    {/* Features Grid - All Services */}
                    <div style={{
                        background: 'linear-gradient(135deg, #faf5ff, #fdf4ff)',
                        borderRadius: '0.75rem',
                        padding: '0.75rem',
                        marginBottom: '0.75rem',
                        border: '1px solid #e9d5ff',
                    }}>
                        <div style={{
                            fontSize: '0.6875rem',
                            fontWeight: 700,
                            color: serviceConfig.accentColors.primary,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            marginBottom: '0.55rem',
                        }}>
                            Included
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.45rem' }}>
                            {serviceIcons.map((service, idx) => (
                                <div key={idx} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.4rem',
                                    background: 'white',
                                    borderRadius: '0.5rem',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                                }}>
                                    <div style={{
                                        width: '1.75rem',
                                        height: '1.75rem',
                                        borderRadius: '0.375rem',
                                        background: serviceConfig.accentColors.gradient,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <service.icon style={{ width: '0.875rem', height: '0.875rem', color: 'white' }} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1f2937' }}>
                                            {service.name}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Benefits List */}
                    <div style={{ marginBottom: '0.75rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem 0.75rem' }}>
                        {[
                            'UNLIMITED searches',
                            'Instant results',
                            'Cancel anytime',
                            'All reports included',
                        ].map((benefit, idx) => (
                            <div key={idx} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                            }}>
                                <div style={{
                                    width: '1.125rem',
                                    height: '1.125rem',
                                    borderRadius: '50%',
                                    background: '#dcfce7',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Check style={{ width: '0.75rem', height: '0.75rem', color: '#16a34a' }} />
                                </div>
                                <span style={{ fontSize: '0.8125rem', color: '#374151', fontWeight: 500 }}>
                                    {benefit}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (window.location.pathname.includes('/payment')) {
                                const desktopBtn = document.getElementById('outer-checkout-button');
                                const mobileBtn = document.getElementById('outer-checkout-button-mobile');
                                if (mobileBtn && window.getComputedStyle(mobileBtn.parentElement!).display !== 'none') {
                                    mobileBtn.click();
                                } else if (desktopBtn) {
                                    desktopBtn.click();
                                }
                            } else {
                                window.location.href = `${targetPaymentPath}?plan=subscription`;
                            }
                        }}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            background: isSubscriptionSelected
                                ? serviceConfig.accentColors.gradient
                                : 'linear-gradient(135deg, #9ca3af, #6b7280)',
                            color: 'white',
                            fontWeight: 700,
                            fontSize: '1rem',
                            borderRadius: '0.75rem',
                            border: 'none',
                            cursor: isProcessing ? 'wait' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            boxShadow: isSubscriptionSelected
                                ? `0 10px 25px ${serviceConfig.accentColors.primary}66`
                                : '0 4px 10px rgba(0,0,0,0.1)',
                            transition: 'all 0.3s ease',
                            opacity: isProcessing ? 0.7 : 1,
                        }}
                        disabled={isProcessing}
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
                                Unlock all now
                                <ArrowRight style={{ width: '1.125rem', height: '1.125rem' }} />
                            </>
                        )}
                    </motion.button>

                    {/* Trust Badge */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        marginTop: '0.75rem',
                        padding: '0.5rem',
                        background: '#f0fdf4',
                        borderRadius: '0.5rem',
                        border: '1px solid #bbf7d0',
                    }}>
                        <Shield style={{ width: '0.875rem', height: '0.875rem', color: '#16a34a' }} />
                        <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#166534' }}>
                            500,000+ users • Satisfied or refunded
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Divider */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                margin: '0.5rem 0',
            }}>
                <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
                <span style={{ fontSize: '0.6875rem', color: '#9ca3af', fontWeight: 500, textTransform: 'uppercase' }}>
                    or
                </span>
                <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
            </div>

            {/* ═══════════════════════════════════════════════════════════════════
                OPTION B: SINGLE REPORT - THE DECOY (dimmed, less attractive)
            ═══════════════════════════════════════════════════════════════════ */}
            <motion.div
                onClick={() => onPlanSelect('single')}
                animate={{
                    scale: isSingleSelected ? 1.01 : 1,
                    opacity: isSubscriptionSelected ? 0.82 : 1,
                }}
                whileHover={{ opacity: 1, scale: 1.01 }}
                transition={{ duration: 0.2 }}
                style={{
                    position: 'relative',
                    cursor: 'pointer',
                    background: isSingleSelected
                        ? `linear-gradient(135deg, #ffffff 0%, ${serviceConfig.accentColors.primary}10 100%)`
                        : '#ffffff',
                    borderRadius: '1.15rem',
                    padding: '1.05rem',
                    border: isSingleSelected
                        ? `2px solid ${serviceConfig.accentColors.primary}`
                        : '2px solid #d1d5db',
                    boxShadow: isSingleSelected
                        ? `0 12px 30px ${serviceConfig.accentColors.primary}24`
                        : '0 5px 18px rgba(15,23,42,0.06)',
                }}
            >
                <div style={{
                    position: 'absolute',
                    top: '-12px',
                    right: '16px',
                    background: isSingleSelected ? serviceConfig.accentColors.gradient : '#111827',
                    color: '#ffffff',
                    fontSize: '0.68rem',
                    fontWeight: 900,
                    padding: '6px 12px',
                    borderRadius: '999px',
                    boxShadow: '0 8px 18px rgba(15,23,42,0.16)',
                    letterSpacing: '0.04em'
                }}>
                    -50% today
                </div>

                {/* Selection Radio */}
                <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: isSingleSelected ? serviceConfig.accentColors.gradient : '#e5e7eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    boxShadow: isSingleSelected ? `0 4px 10px ${serviceConfig.accentColors.primary}55` : 'none',
                }}>
                    {isSingleSelected && <Check style={{ width: '12px', height: '12px', color: 'white' }} />}
                </div>

                <div style={{ marginLeft: '2rem' }}>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <h4 style={{
                                fontSize: '0.9375rem',
                                fontWeight: 900,
                                color: isSingleSelected ? '#111827' : '#4b5563',
                                marginBottom: '0.125rem',
                            }}>
                                {serviceConfig.singleReportName}
                            </h4>
                            <p style={{ fontSize: '0.6875rem', color: '#6b7280', fontWeight: 600, lineHeight: 1.35 }}>
                                One-time payment • unlock this scan only
                            </p>
                            {isSingleSelected && (
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.3rem',
                                    marginTop: '0.45rem',
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '999px',
                                    background: `${serviceConfig.accentColors.primary}14`,
                                    color: serviceConfig.accentColors.primary,
                                    fontSize: '0.65rem',
                                    fontWeight: 800,
                                }}>
                                    <Check style={{ width: '0.75rem', height: '0.75rem' }} />
                                    Selected single report
                                </div>
                            )}
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '1.45rem', fontWeight: 900, color: isSingleSelected ? serviceConfig.accentColors.primary : '#4b5563', lineHeight: 1 }}>
                                {formatPrice(serviceConfig.singleReportPrice)}€
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#9ca3af', textDecoration: 'line-through', marginTop: '0.2rem', fontWeight: 700 }}>
                                {formatPrice(serviceConfig.singleReportOriginalPrice)}€
                            </div>
                        </div>
                    </div>

                    <div style={{
                        marginTop: '0.85rem',
                        padding: '0.75rem',
                        background: '#ffffff',
                        borderRadius: '0.75rem',
                        border: `1px solid ${isSingleSelected ? `${serviceConfig.accentColors.primary}33` : '#e5e7eb'}`,
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                            {[
                                { icon: Check, text: `Unlock this ${serviceConfig.title} report`, color: serviceConfig.accentColors.primary },
                                { icon: X, text: 'Other ProfileFinder tools stay locked', color: '#ef4444' },
                                { icon: Clock, text: '24h access to this result', color: '#d97706' },
                            ].map((item, idx) => {
                                const ItemIcon = item.icon;
                                return (
                                <div key={idx} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.45rem',
                                }}>
                                    <ItemIcon style={{ width: '0.8rem', height: '0.8rem', color: item.color, flexShrink: 0 }} />
                                    <span style={{ fontSize: '0.72rem', color: '#374151', fontWeight: 700, lineHeight: 1.25 }}>
                                        {item.text}
                                    </span>
                                </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Compact action */}
                    <div style={{
                        marginTop: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    }}>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (!isSingleSelected) {
                                    onPlanSelect('single');
                                    return;
                                }

                                if (window.location.pathname.includes('/payment')) {
                                    const desktopBtn = document.getElementById('outer-checkout-button');
                                    const mobileBtn = document.getElementById('outer-checkout-button-mobile');
                                    if (mobileBtn && window.getComputedStyle(mobileBtn.parentElement!).display !== 'none') {
                                        mobileBtn.click();
                                    } else if (desktopBtn) {
                                        desktopBtn.click();
                                    }
                                } else {
                                    window.location.href = `${targetPaymentPath}?plan=single`;
                                }
                            }}
                            disabled={isProcessing}
                            style={{
                                padding: '0.58rem 1rem',
                                background: isSingleSelected ? serviceConfig.accentColors.gradient : '#ffffff',
                                color: isSingleSelected ? 'white' : serviceConfig.accentColors.primary,
                                fontSize: '0.78rem',
                                fontWeight: 800,
                                borderRadius: '0.65rem',
                                border: isSingleSelected ? 'none' : `1px solid ${serviceConfig.accentColors.primary}55`,
                                cursor: isProcessing ? 'wait' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                                opacity: isProcessing ? 0.7 : 1,
                                boxShadow: isSingleSelected ? `0 8px 18px ${serviceConfig.accentColors.primary}36` : 'none',
                            }}
                        >
                            {isProcessing ? 'Processing...' : (
                                isSingleSelected
                                    ? <>Continue <ArrowRight style={{ width: '0.75rem', height: '0.75rem' }} /></>
                                    : <>Select report</>
                            )}
                        </button>
                    </div>
                </div>
            </motion.div>


        </div>
    );
}

export default PricingSelector;
