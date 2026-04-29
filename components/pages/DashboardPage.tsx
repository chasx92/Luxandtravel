"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    Search, Eye, Scan, Heart, MessageSquare, Crown,
    ArrowRight, Shield, Zap, Settings, Bell, User,
    Activity, Star, ChevronRight, Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { useCredits } from '@/lib/useCredits';

interface ServiceCardProps {
    service: {
        id: string;
        name: string;
        description: string;
        icon: React.ReactNode;
        gradient: string;
        href: string;
        stats?: string;
        creditKey: 'dating' | 'faceTrace' | 'following' | 'fidelity' | 'chatAnalysis';
    };
    index: number;
    credits: number;
}

type FidelityDashboardReport = {
    sessionId: string;
    createdAt: string;
    report: {
        riskLevel: 'low' | 'moderate' | 'high' | 'unclear';
        trustScore: number;
        status: string;
    };
};

function ServiceCard({ service, index, credits }: ServiceCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={service.href}>
                <div className={`relative group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 ${isHovered ? 'shadow-2xl scale-[1.02]' : 'shadow-lg'
                    }`}>
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 ${service.gradient} opacity-90`} />

                    {/* Shine Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''
                        }`} />

                    {/* Content */}
                    <div className="relative p-6 text-white">
                        {/* Icon */}
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                            {service.icon}
                        </div>

                        {/* Text */}
                        <h3 className="text-xl font-bold mb-1">{service.name}</h3>
                        <p className="text-sm text-white/80 mb-4">{service.description}</p>

                        {/* Stats if available */}
                        {service.stats && (
                            <div className="flex items-center gap-2 text-xs bg-white/10 rounded-full px-3 py-1 w-fit mb-4">
                                <Activity className="w-3 h-3" />
                                <span>{service.stats}</span>
                            </div>
                        )}

                        {/* CTA */}
                        <div className={`flex items-center gap-2 text-sm font-semibold transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''
                            }`}>
                            <span>Manage Searches</span>
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>

                    {/* Credits Badge */}
                    <div className="absolute top-4 right-4">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1">
                            <Zap className="w-4 h-4 text-yellow-300" />
                            <span className="text-sm font-bold">{credits}</span>
                            <span className="text-xs opacity-80">credits</span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export function DashboardPage() {
    const { credits, getCredits, getTotalCredits } = useCredits();
    const [latestFidelityReport, setLatestFidelityReport] = useState<FidelityDashboardReport | null>(null);

    useEffect(() => {
        try {
            const raw = sessionStorage.getItem('pf_fidelity_last_report');
            if (!raw) return;
            const parsed = JSON.parse(raw) as FidelityDashboardReport;
            if (parsed?.sessionId && parsed?.report?.status === 'report_ready') {
                setLatestFidelityReport(parsed);
            }
        } catch {
            setLatestFidelityReport(null);
        }
    }, []);

    const services = [
        {
            id: 'dating',
            name: 'Dating App Search',
            description: 'Find hidden profiles on Tinder, Bumble, Badoo & more',
            icon: <Heart className="w-7 h-7 text-white" />,
            gradient: 'bg-gradient-to-br from-rose-500 to-pink-600',
            href: '/dashboard/dating-search',
            stats: '1.2M searches today',
            creditKey: 'dating' as const,
        },
        {
            id: 'faceTrace',
            name: 'Face Trace',
            description: 'Reverse image search across 12M+ sources',
            icon: <Scan className="w-7 h-7 text-white" />,
            gradient: 'bg-gradient-to-br from-cyan-500 to-blue-600',
            href: '/dashboard/face-trace',
            stats: '98% accuracy rate',
            creditKey: 'faceTrace' as const,
        },
        {
            id: 'following',
            name: 'Following AI',
            description: 'Monitor Instagram activity & interactions',
            icon: <Eye className="w-7 h-7 text-white" />,
            gradient: 'bg-gradient-to-br from-violet-500 to-purple-600',
            href: '/dashboard/following-ai',
            stats: 'Real-time updates',
            creditKey: 'following' as const,
        },
        {
            id: 'fidelity',
            name: 'Fidelity Check',
            description: 'Analyze chat screenshots and trust-related signals',
            icon: <Search className="w-7 h-7 text-white" />,
            gradient: 'bg-gradient-to-br from-red-500 to-orange-500',
            href: '/dashboard/fidelity-check',
            stats: 'Private AI reports',
            creditKey: 'fidelity' as const,
        },
        {
            id: 'chatAnalysis',
            name: 'Chat Analysis',
            description: 'AI-powered conversation insights & red flags',
            icon: <MessageSquare className="w-7 h-7 text-white" />,
            gradient: 'bg-gradient-to-br from-purple-500 to-pink-500',
            href: '/dashboard/chat-analysis',
            stats: 'GPT-4 powered',
            creditKey: 'chatAnalysis' as const,
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
            {/* Navigation */}
            <nav className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3">
                            <img
                                src="https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/Design%20sans%20titre%20(7).svg"
                                alt="ProfileFinder"
                                className="h-8 w-8"
                            />
                            <span className="text-xl font-black text-white">ProfileFinder</span>
                        </Link>

                        {/* Right Actions */}
                        <div className="flex items-center gap-4">
                            <button className="p-2 text-gray-400 hover:text-white transition-colors">
                                <Bell className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-white transition-colors">
                                <Settings className="w-5 h-5" />
                            </button>
                            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                                <User className="w-5 h-5 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Banner */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative rounded-3xl overflow-hidden mb-8"
                >
                    {/* Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600" />
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-10" />

                    {/* Content */}
                    <div className="relative px-8 py-10">
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="bg-yellow-400/20 rounded-full p-2">
                                        <Crown className="w-6 h-6 text-yellow-400" />
                                    </div>
                                    <span className="bg-yellow-400/20 text-yellow-300 text-xs font-bold px-3 py-1 rounded-full">
                                        PREMIUM MEMBER
                                    </span>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                                    Welcome back! 👋
                                </h1>
                                <p className="text-lg text-white/70 max-w-lg">
                                    Your Premium All-Access membership is active.
                                    Enjoy unlimited searches across all 5 services.
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="hidden md:flex items-center gap-6">
                                <div className="text-center">
                                    <div className="text-3xl font-black text-white">{getTotalCredits()}</div>
                                    <div className="text-xs text-white/60">Total Credits</div>
                                </div>
                                <div className="w-px h-12 bg-white/20" />
                                <div className="text-center">
                                    <div className="text-3xl font-black text-white">5</div>
                                    <div className="text-xs text-white/60">Services Active</div>
                                </div>
                                <div className="w-px h-12 bg-white/20" />
                                <div className="text-center">
                                    <div className="text-3xl font-black text-green-400">Active</div>
                                    <div className="text-xs text-white/60">Subscription</div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex flex-wrap gap-3 mt-6">
                            <Link
                                href="/dating-search"
                                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all"
                            >
                                <Sparkles className="w-4 h-4" />
                                <span className="font-medium">Quick Search</span>
                            </Link>
                            <Link
                                href="/results"
                                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all"
                            >
                                <Activity className="w-4 h-4" />
                                <span className="font-medium">View Results</span>
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* Services Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Your Services</h2>
                            <p className="text-gray-400 text-sm">All-Access • Unlimited Usage</p>
                        </div>
                        <div className="flex items-center gap-2 bg-green-500/10 text-green-400 px-3 py-1.5 rounded-full text-sm font-medium">
                            <Shield className="w-4 h-4" />
                            All Active
                        </div>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {services.map((service, index) => (
                            <ServiceCard
                                key={service.id}
                                service={service}
                                index={index}
                                credits={getCredits(service.creditKey)}
                            />
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-white">Recent Reports</h3>
                        <Link href="/results" className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                            View All <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {latestFidelityReport ? (
                        <div className="rounded-2xl border border-red-500/20 bg-gradient-to-r from-red-500/10 to-orange-500/10 p-4">
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-orange-500">
                                        <Shield className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h4 className="font-bold text-white">Fidelity Test</h4>
                                            <span className="rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-bold text-green-400">
                                                {latestFidelityReport.report.status.replace('_', ' ')}
                                            </span>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-400">
                                            Created {new Date(latestFidelityReport.createdAt).toLocaleDateString()} • Risk {latestFidelityReport.report.riskLevel} • Trust score {latestFidelityReport.report.trustScore}/100
                                        </p>
                                    </div>
                                </div>
                                <Link
                                    href={`/report/fidelity/${latestFidelityReport.sessionId}`}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-gray-950 transition hover:bg-red-50"
                                >
                                    Open Report
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-gray-400 mb-2">No reports yet</p>
                            <p className="text-sm text-gray-500 mb-4">Start by launching a search from any service above</p>
                            <Link
                                href="/dating-search"
                                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                                <Search className="w-4 h-4" />
                                Start First Search
                            </Link>
                        </div>
                    )}
                </div>

                {/* Footer Help */}
                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        Need help? <Link href="/support" className="text-indigo-400 hover:underline">Contact Support</Link> •
                        <Link href="/account" className="text-indigo-400 hover:underline ml-2">Manage Subscription</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}

export default DashboardPage;
