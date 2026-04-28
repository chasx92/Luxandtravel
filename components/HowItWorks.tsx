import { motion } from "framer-motion";
import { Activity, ArrowRight, Bell, Camera, Check, CheckCircle2, Eye, Flame, Heart, Lock, MessageSquare, Radar, ScanFace, ShieldCheck, Sparkles, Users } from "lucide-react";
import { useService } from "../lib/ServiceContext";
import { serviceContent } from "../lib/content";
import { followingPreviewPhotos } from "../lib/profileSamples";
import { RevealOnScroll } from "./ui/RevealOnScroll";
import { SocialProofVideos } from "./SocialProofVideos";

// --- ICÔNES SVG INTÉGRÉES ---
const IconZap = ({ style, className }: { style?: React.CSSProperties; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);
const IconClock = ({ style }: { style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);
const IconBell = ({ style }: { style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);
const IconFingerprint = ({ style }: { style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4"></path><path d="M5 19.5C5.5 18 6 15 6 12c0-.7.12-1.37.34-2"></path><path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"></path><path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"></path><path d="M8.65 22c.21-.66.45-1.32.57-2"></path><path d="M14 13.12c0 2.38 0 6.38-1 8.88"></path><path d="M2 16h.01"></path><path d="M21.8 16c.2-2 .131-5.354 0-6"></path><path d="M9 6.8a6 6 0 0 1 9 5.2c0 .47 0 1.17-.02 2"></path>
  </svg>
);
const IconMessageCircle = ({ style }: { style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);
const IconAlertTriangle = ({ style }: { style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);
const IconMapPin = ({ style }: { style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
  </svg>
);
const IconSearch = ({ style }: { style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

// Couleurs
const colors = {
  slate900: '#0f172a',
  slate800: '#1e293b',
  slate700: '#334155',
  slate600: '#475569',
  slate500: '#64748b',
  slate400: '#94a3b8',
  slate300: '#cbd5e1',
  slate200: '#e2e8f0',
  slate100: '#f1f5f9',
  slate50: '#f8fafc',
  indigo600: '#4f46e5',
  indigo500: '#6366f1',
  indigo400: '#818cf8',
  indigo300: '#a5b4fc',
  indigo100: '#e0e7ff',
  indigo50: '#eef2ff',
  purple500: '#a855f7',
  rose500: '#f43f5e',
  rose400: '#fb7185',
  rose100: '#ffe4e6',
  rose50: '#fff1f2',
  emerald900: '#064e3b',
  emerald800: '#065f46',
  emerald600: '#059669',
  emerald400: '#34d399',
  blue600: '#2563eb',
  blue500: '#3b82f6',
  blue100: '#dbeafe',
  blue50: '#eff6ff',
  orange500: '#f97316',
  yellow500: '#eab308',
  green500: '#22c55e',
  white: '#ffffff',
};

export function HowItWorks() {
  const { colors: serviceColors, selectedService } = useService();

  // Get service-specific content
  const content = serviceContent[selectedService];
  const howItWorksContent = content.howItWorks;

  // Service-specific header text
  const headerConfig = {
    dating: {
      badge: "How our Tinder profile finder works",
      title: "Find someone on Tinder",
      highlight: "in 3 simple steps",
      subtitle: "ProfileFinder turns hours of manual swiping into one fast Tinder profile search. Get a clear answer about hidden dating profiles in under 2 minutes."
    },
    following: {
      badge: "How Following AI works",
      title: "Monitor Instagram activity",
      highlight: "in 3 simple steps",
      subtitle: "Track who they follow, detect suspicious patterns, and get real-time alerts when their social behavior changes."
    },
    facetrace: {
      badge: "How Face Trace works",
      title: "Find someone by photo",
      highlight: "in 3 simple steps",
      subtitle: "Upload a photo and our AI performs a reverse face search to track their digital footprint and web activity across the internet."
    },
    fidelity: {
      badge: "How Fidelity Test works",
      title: "Verify trust patterns",
      highlight: "in 3 simple steps",
      subtitle: "Analyze behavior patterns and detect potential red flags with our AI-powered relationship risk assessment."
    }
  };

  const header = headerConfig[selectedService];

  // Map content steps to component format
  const steps = howItWorksContent.steps.map((step, index) => ({
    number: index + 1,
    emoji: index === 0 ? "📝" : index === 1 ? "🔍" : "📡",
    title: step.title,
    description: step.description,
    features: step.features
  }));

  const barHeights = [35, 60, 45, 90, 65, 85, 40];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const notifications = [
    { text: 'Bio Updated', color: colors.blue500 },
    { text: 'New Photo', color: colors.rose500 },
    { text: 'Location Change', color: colors.orange500 },
  ];
  const toolkitThemes = {
    allAccess: {
      background: 'radial-gradient(circle at 12% 10%, rgba(255,78,113,0.34), transparent 34%), radial-gradient(circle at 78% 8%, rgba(59,130,246,0.28), transparent 31%), radial-gradient(circle at 88% 84%, rgba(139,92,246,0.24), transparent 32%), linear-gradient(135deg, #070a18 0%, #111827 52%, #090b16 100%)',
      accent: '#ff4e71',
      soft: '#fecdd3',
    },
    dating: {
      background: 'radial-gradient(circle at 18% 10%, rgba(255,78,113,0.24), transparent 34%), radial-gradient(circle at 86% 86%, rgba(255,127,102,0.18), transparent 34%), linear-gradient(135deg, #2a0713 0%, #451025 50%, #111827 100%)',
      border: 'rgba(255,78,113,0.32)',
      iconBg: 'rgba(255,78,113,0.16)',
      iconBorder: 'rgba(255,78,113,0.28)',
      accent: '#ff4e71',
      accent2: '#ff7f66',
      soft: '#fda4af',
    },
    faceTrace: {
      background: 'radial-gradient(circle at 15% 8%, rgba(59,130,246,0.28), transparent 34%), radial-gradient(circle at 85% 82%, rgba(96,165,250,0.18), transparent 34%), linear-gradient(135deg, #082f49 0%, #0f172a 100%)',
      border: 'rgba(96,165,250,0.34)',
      iconBg: 'rgba(59,130,246,0.16)',
      iconBorder: 'rgba(96,165,250,0.34)',
      accent: '#60a5fa',
      soft: '#bfdbfe',
    },
    radar: {
      background: 'linear-gradient(135deg, #f8fbff 0%, #fff7fb 100%)',
      border: '#dbeafe',
      accent: '#3b82f6',
      accent2: '#ff4e71',
      soft: '#eff6ff',
    },
    fidelity: {
      background: 'radial-gradient(circle at 14% 8%, rgba(236,72,153,0.30), transparent 34%), radial-gradient(circle at 86% 86%, rgba(244,114,182,0.18), transparent 34%), linear-gradient(135deg, #500724 0%, #831843 56%, #1f1020 100%)',
      border: 'rgba(244,114,182,0.34)',
      accent: '#f472b6',
      soft: '#fbcfe8',
    },
    following: {
      background: 'radial-gradient(circle at 12% 8%, rgba(167,139,250,0.30), transparent 35%), radial-gradient(circle at 84% 82%, rgba(139,92,246,0.22), transparent 34%), linear-gradient(135deg, #2e1065 0%, #5b21b6 54%, #111827 100%)',
      border: 'rgba(167,139,250,0.34)',
      accent: '#a78bfa',
      soft: '#ddd6fe',
    },
  };
  const allAccessTools = [
    { label: 'Dating Search', icon: Heart, accent: toolkitThemes.dating.accent, bg: 'rgba(255,78,113,0.12)', border: 'rgba(255,78,113,0.22)' },
    { label: 'Face Trace', icon: ScanFace, accent: toolkitThemes.faceTrace.accent, bg: 'rgba(96,165,250,0.12)', border: 'rgba(96,165,250,0.22)' },
    { label: 'Following AI', icon: Users, accent: toolkitThemes.following.accent, bg: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.22)' },
    { label: 'Fidelity Test', icon: MessageSquare, accent: toolkitThemes.fidelity.accent, bg: 'rgba(244,114,182,0.12)', border: 'rgba(244,114,182,0.22)' },
    { label: '24/7 Radar', icon: Radar, accent: toolkitThemes.radar.accent, bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.22)' },
  ];

  return (
    <section id="how-it-works" className="max-w-[1760px] mx-auto px-4 md:px-8 py-12 md:py-16 bg-gradient-to-b from-white via-gray-50/50 to-white">

      {/* SEO HEADER */}
      <div className="text-center mb-12 md:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
          style={{
            background: `linear-gradient(135deg, ${serviceColors.primary}, ${serviceColors.secondary})`,
            color: 'white',
            boxShadow: `0 4px 15px ${serviceColors.primary}30`
          }}>
          <IconSearch style={{ width: '0.875rem', height: '0.875rem' }} />
          <span className="text-xs font-semibold">{header.badge}</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 mb-6">
          {header.title}{' '}
          <span style={{
            background: `linear-gradient(to right, ${serviceColors.primary}, ${serviceColors.secondary}, ${serviceColors.primary})`,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}>
            {header.highlight}
          </span>
        </h2>
        <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
          {header.subtitle}
        </p>
      </div>

      {/* Stats Banner */}
      <motion.div
        className="max-w-4xl mx-auto mb-12 md:mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-3 gap-3 md:gap-6 bg-white rounded-2xl shadow-lg p-4 md:p-6 border-2" style={{ borderColor: `${serviceColors.primary}15` }}>
          <div className="text-center">
            <div className="text-2xl md:text-4xl font-bold mb-1" style={{ color: serviceColors.primary }}>3</div>
            <div className="text-xs md:text-sm text-slate-600 font-medium">Simple Steps</div>
          </div>
          <div className="text-center border-x border-gray-200">
            <div className="text-2xl md:text-4xl font-bold mb-1" style={{ color: serviceColors.primary }}>30s</div>
            <div className="text-xs md:text-sm text-slate-600 font-medium">Average Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-4xl font-bold mb-1" style={{ color: serviceColors.primary }}>95%</div>
            <div className="text-xs md:text-sm text-slate-600 font-medium">Success Rate</div>
          </div>
        </div>
      </motion.div>

      {/* Main Content: TINDER CARD LEFT + STEPS RIGHT */}
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* LEFT: VISUAL (STICKY) */}
          <motion.div
            className="lg:sticky lg:top-24"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {(selectedService === 'dating' || selectedService === 'facetrace') && (
              <div className="relative bg-white dark:bg-[#1e293b] rounded-[2rem] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.4)] max-w-sm mx-auto transform rotate-[-3deg] hover:rotate-0 transition-transform duration-700 border border-white/10">
                {/* Badge LIVE */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border z-10" style={{
                  backgroundColor: `${serviceColors.primary}15`,
                  color: serviceColors.primary,
                  borderColor: `${serviceColors.primary}30`
                }}>
                  <div className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: serviceColors.primary }}></div>
                  LIVE
                </div>

                {/* Header: Name, Age, Location */}
                <div className="text-center mb-6 mt-2">
                  <h2 className="text-gray-900 dark:text-white text-2xl font-bold flex items-center justify-center gap-2">
                    Victor, 26
                    <CheckCircle2 className="w-5 h-5 text-blue-500 fill-blue-500/20" />
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-widest mt-1">
                    New York • Detected 2m ago
                  </p>
                </div>

                {/* Photo with Scan Effect */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-5 group shadow-inner">
                  <img
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80"
                    alt="Victor"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>

                  {/* Progress Bars & Match Score */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex gap-1 mb-2">
                      <div className="h-1 flex-1 bg-white/40 rounded-full overflow-hidden">
                        <div className="h-full w-full bg-white rounded-full"></div>
                      </div>
                      <div className="h-1 flex-1 bg-white/40 rounded-full"></div>
                      <div className="h-1 flex-1 bg-white/40 rounded-full"></div>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-white text-sm font-medium">Match probability</span>
                      <span className="text-green-400 text-xl font-bold">98%</span>
                    </div>
                  </div>
                </div>

                {/* Status Info */}
                <div className="space-y-3 bg-gray-50 dark:bg-[#0f172a] p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between text-gray-700 dark:text-gray-300 text-sm">
                    <span className="flex items-center gap-2">
                      <Eye className="w-4 h-4" style={{ color: serviceColors.primary }} /> Last activity
                    </span>
                    <span className="text-green-500 font-medium">Online</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-700 dark:text-gray-300 text-sm">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" style={{ color: serviceColors.primary }} /> Verified account
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  </div>
                </div>

                {/* CTA Button */}
                <button className="mt-4 w-full py-3 text-white font-bold rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2 group" style={{
                  background: `linear-gradient(135deg, ${serviceColors.primary}, ${serviceColors.secondary})`,
                  boxShadow: `0 10px 30px ${serviceColors.primary}30`
                }}>
                  <Sparkles className="w-4 h-4 group-hover:text-yellow-300 transition-colors" />
                  View full report
                </button>
              </div>
            )}

            {selectedService === 'fidelity' && (
              <div className="relative bg-white dark:bg-[#1e293b] rounded-[2rem] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.4)] max-w-sm mx-auto transform rotate-[-3deg] hover:rotate-0 transition-transform duration-700 border border-white/10 overflow-hidden">
                <img
                  src="/assets/fidelity-step-guide.png"
                  alt="Fidelity Test step-by-step guide"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '1.25rem',
                    display: 'block'
                  }}
                />
              </div>
            )}

            {selectedService === 'following' && (
              <div className="relative bg-white dark:bg-[#1e293b] rounded-[2rem] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.4)] max-w-sm mx-auto transform rotate-[-3deg] hover:rotate-0 transition-transform duration-700 border border-white/10 overflow-hidden">
                <img
                  src="/assets/following-step-guide.png"
                  alt="Following AI step-by-step guide"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '1.25rem',
                    display: 'block'
                  }}
                />
              </div>
            )}
          </motion.div>

          {/* RIGHT: STEPS */}
          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border-2 hover:shadow-2xl transition-all duration-300 group"
                style={{ borderColor: `${serviceColors.primary}15` }}
              >
                {/* Step Number Badge */}
                <div className="flex items-start gap-4 md:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-white text-xl md:text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300" style={{
                      background: `linear-gradient(135deg, ${serviceColors.primary}, ${serviceColors.secondary})`
                    }}>
                      {step.number}
                    </div>
                  </div>

                  <div className="flex-1">
                    {/* Title with Emoji */}
                    <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-900 mb-3">
                      <span className="mr-2">{step.emoji}</span>{step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4 font-medium">
                      {step.description}
                    </p>

                    {/* Features List */}
                    {step.features && step.features.length > 0 && (
                      <div className="space-y-2">
                        {step.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 mt-0.5" style={{ color: serviceColors.primary }} />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Proof Videos - Between steps and toolkit */}
      <SocialProofVideos />

      {/* OUR TOOLS SECTION - ALL ACCESS SUITE */}
      <div className="mx-auto mt-14 md:mt-20 max-w-5xl lg:max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: `linear-gradient(135deg, ${serviceColors.primary}, ${serviceColors.secondary})`,
              color: 'white',
              padding: '8px 20px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 700,
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              boxShadow: `0 4px 20px ${serviceColors.primary}30`
            }}
          >
            Our Toolkit
          </div>
	          <h3 className="mx-auto max-w-[720px] text-balance text-[1.7rem] font-black leading-[1.08] tracking-[-0.03em] text-slate-900 sm:text-4xl md:text-[2.5rem]" style={{ fontFamily: "'Inter Tight', system-ui, sans-serif", marginBottom: '0.75rem' }}>
	            Everything You Need to <span className="inline whitespace-normal pr-1 italic" style={{ background: `linear-gradient(135deg, ${serviceColors.primary}, ${serviceColors.secondary})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Uncover the Truth</span>
	          </h3>
          <p style={{
            color: '#64748b',
            fontSize: '1rem',
            fontWeight: 500,
            fontFamily: "'Inter Tight', system-ui, sans-serif"
          }}>
            A complete toolkit to investigate relationship doubts with AI-powered precision
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* ALL ACCESS OVERVIEW */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 lg:col-span-4"
            style={{
              background: toolkitThemes.allAccess.background,
              color: 'white',
              borderRadius: 'clamp(1.25rem, 4vw, 1.75rem)',
              padding: 'clamp(1rem, 3vw, 1.25rem)',
              boxShadow: '0 26px 70px rgba(15,23,42,0.28)',
              border: '1px solid rgba(255,255,255,0.12)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(280px, 0.9fr)', gap: '1rem', alignItems: 'stretch' }} className="max-lg:!grid-cols-1">
              <div className="p-0 sm:p-2">
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.45rem 0.75rem', borderRadius: '999px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.14)', color: toolkitThemes.allAccess.soft, fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
                  <Sparkles style={{ width: '0.9rem', height: '0.9rem' }} />
                  All Access
                </div>
                <h4 className="text-balance text-[1.45rem] font-black leading-[1.08] tracking-[-0.04em] sm:text-[2rem] lg:text-[2.35rem]" style={{ marginBottom: '0.75rem' }}>
                  Everything You Need to <span className="inline italic" style={{ color: toolkitThemes.allAccess.accent }}>Uncover the Truth</span>
                </h4>
                <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.95rem', lineHeight: 1.65, maxWidth: '42rem' }}>
                  A complete toolkit to investigate relationship doubts with AI-powered precision, combining Dating Search, Face Trace, Following AI, Fidelity Test and 24/7 Radar in one recurring access.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '1.25rem' }}>
                  {allAccessTools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <span key={tool.label} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.55rem 0.7rem', borderRadius: '999px', background: tool.bg, border: `1px solid ${tool.border}`, color: 'rgba(255,255,255,0.9)', fontSize: '0.75rem', fontWeight: 800 }}>
                        <Icon style={{ width: '0.9rem', height: '0.9rem', color: tool.accent }} />
                        {tool.label}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '1.35rem', padding: '1rem', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 900, color: toolkitThemes.allAccess.soft, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Live signal dashboard</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.7rem', fontWeight: 800, color: '#bbf7d0' }}><span style={{ width: '7px', height: '7px', borderRadius: '999px', background: '#22c55e' }} />Active</span>
                </div>
                <div style={{ display: 'grid', gap: '0.65rem' }}>
                  {[
                    ['Tinder profile search', '98% match'],
                    ['Reverse image search', '12M+ sources'],
                    ['Instagram monitoring', '23 new follows'],
                    ['Relationship risk assessment', '76% trust score'],
                  ].map(([label, value]) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', padding: '0.72rem 0.8rem', borderRadius: '0.95rem', background: 'rgba(2,6,23,0.46)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <span style={{ color: 'rgba(255,255,255,0.76)', fontSize: '0.78rem', fontWeight: 700 }}>{label}</span>
                      <span style={{ color: '#ffffff', fontSize: '0.78rem', fontWeight: 900 }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* DATING SEARCH */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="md:col-span-2 lg:col-span-2"
            style={{
              background: toolkitThemes.dating.background,
              color: 'white',
              borderRadius: 'clamp(1.25rem, 4vw, 1.5rem)',
              padding: 'clamp(1rem, 3vw, 1.25rem)',
              boxShadow: '0 24px 52px rgba(255,78,113,0.18)',
              border: `1px solid ${toolkitThemes.dating.border}`,
              position: 'relative',
              overflow: 'hidden',
              minHeight: 'clamp(15rem, 44vw, 18rem)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.75rem' }}>
                  <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: toolkitThemes.dating.iconBg, border: `1px solid ${toolkitThemes.dating.iconBorder}` }}>
                    <Heart style={{ width: '1.25rem', height: '1.25rem', color: toolkitThemes.dating.accent }} />
                  </div>
                  <span style={{ fontSize: '0.76rem', fontWeight: 900, color: toolkitThemes.dating.soft, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Dating Search</span>
                </div>
                <h4 style={{ fontSize: '1.45rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '0.4rem' }}>Find hidden Tinder profiles</h4>
                <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.55 }}>Run a targeted Tinder profile search based on name, age and city.</p>
              </div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(34,197,94,0.14)', border: '1px solid rgba(34,197,94,0.28)', color: '#86efac', borderRadius: '999px', padding: '0.35rem 0.55rem', fontSize: '0.66rem', fontWeight: 900, whiteSpace: 'nowrap' }}>
                <Check style={{ width: '0.75rem', height: '0.75rem' }} /> Detected
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }} className="max-sm:!grid-cols-1">
              <div style={{ borderRadius: '1.1rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', padding: '0.8rem' }}>
                <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
                  <img src="/assets/profiles/user-samples/dating-man-sample-03.jpg" alt="Tinder profile search result" style={{ width: '4.2rem', height: '4.2rem', borderRadius: '1rem', objectFit: 'cover', border: `2px solid ${toolkitThemes.dating.accent}` }} />
                  <div>
                    <div style={{ fontWeight: 900, fontSize: '1rem' }}>Victor, 26</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase' }}>New York • Detected 2m ago</div>
                    <div style={{ marginTop: '0.45rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#bbf7d0', fontSize: '0.75rem', fontWeight: 900 }}><Flame style={{ width: '0.85rem', height: '0.85rem' }} /> Active on Tinder</div>
                  </div>
                </div>
              </div>
              <div style={{ borderRadius: '1.1rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', padding: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '0.45rem', height: '5rem' }}>
                  {barHeights.map((h, i) => (
                    <div key={i} style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'flex-end' }}>
                      <div style={{ width: '100%', background: `linear-gradient(to top, ${toolkitThemes.dating.accent}, ${toolkitThemes.dating.accent2})`, borderRadius: '4px 4px 0 0', height: `${h}%` }} />
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.45rem', fontSize: '9px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>
                  {days.map((day) => <span key={day}>{day}</span>)}
                </div>
              </div>
            </div>
          </motion.div>

          {/* FACE TRACE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              background: toolkitThemes.faceTrace.background,
              color: 'white',
              borderRadius: 'clamp(1.25rem, 4vw, 1.5rem)',
              padding: 'clamp(1rem, 3vw, 1.25rem)',
              boxShadow: '0 20px 45px rgba(59,130,246,0.18)',
              border: `1px solid ${toolkitThemes.faceTrace.border}`,
              position: 'relative',
              overflow: 'hidden',
              minHeight: 'auto',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.75rem' }}>
              <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: toolkitThemes.faceTrace.iconBg, border: `1px solid ${toolkitThemes.faceTrace.iconBorder}` }}>
                <ScanFace style={{ width: '1.35rem', height: '1.35rem', color: toolkitThemes.faceTrace.accent }} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 900, letterSpacing: '-0.02em' }}>Face Trace</h4>
                <p style={{ color: toolkitThemes.faceTrace.soft, fontSize: '0.74rem', fontWeight: 800 }}>AI face search & reverse image lookup.</p>
              </div>
            </div>
	            <div className="relative aspect-[16/10] min-h-0 overflow-hidden rounded-[1rem] border border-white/10 bg-white/10 sm:rounded-[1.15rem]">
	              <img src="/assets/profiles/facetrace-source.webp" alt="Reverse image search match" className="block h-full w-full object-cover" style={{ objectPosition: 'center 34%' }} />
	              <div className="absolute inset-3 rounded-[0.8rem] border-2 border-[#60a5fa] shadow-[0_0_24px_rgba(96,165,250,0.42)]" />
	              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-[0.8rem] border border-white/15 bg-slate-950/75 px-3 py-2 backdrop-blur">
	                <span className="text-sm font-black">Best Match</span>
	                <span className="text-base font-black text-[#60a5fa]">92%</span>
	              </div>
	            </div>
          </motion.div>

          {/* 24/7 RADAR */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            style={{
              background: toolkitThemes.radar.background,
              borderRadius: 'clamp(1.25rem, 4vw, 1.5rem)',
              padding: 'clamp(1rem, 3vw, 1.25rem)',
              boxShadow: '0 20px 42px rgba(59,130,246,0.12)',
              border: `1px solid ${toolkitThemes.radar.border}`,
              position: 'relative',
              overflow: 'hidden',
              minHeight: 'auto',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff', border: `1px solid ${toolkitThemes.radar.border}`, color: toolkitThemes.radar.accent, boxShadow: '0 12px 24px rgba(59,130,246,0.12)' }}>
                <Bell style={{ width: '1.25rem', height: '1.25rem' }} />
              </div>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', backgroundColor: toolkitThemes.radar.accent, color: 'white', fontSize: '9px', fontWeight: 900, padding: '0.3rem 0.55rem', borderRadius: '9999px' }}>
                <span style={{ width: '6px', height: '6px', backgroundColor: 'white', borderRadius: '9999px' }} /> LIVE
              </span>
            </div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.25rem' }}>24/7 Radar</h4>
            <p style={{ color: '#64748b', fontSize: '0.78rem', marginBottom: '0.85rem', fontWeight: 600 }}>Instant alerts for profile changes.</p>
            <div style={{ display: 'grid', gap: '0.55rem' }}>
              {notifications.map((notif, i) => (
                <div key={i} style={{ backgroundColor: '#ffffff', border: `1px solid ${i === 1 ? '#ffe4e6' : toolkitThemes.radar.border}`, padding: '0.65rem', borderRadius: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.65rem', boxShadow: '0 10px 20px rgba(59,130,246,0.06)' }}>
                  <div style={{ width: '1.7rem', height: '1.7rem', borderRadius: '0.55rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: i === 1 ? toolkitThemes.radar.accent2 : notif.color, background: i === 1 ? '#fff1f2' : toolkitThemes.radar.soft }}>
                    {i === 0 ? <Activity style={{ width: '0.95rem', height: '0.95rem' }} /> : i === 1 ? <Camera style={{ width: '0.95rem', height: '0.95rem' }} /> : <Radar style={{ width: '0.95rem', height: '0.95rem' }} />}
                  </div>
                  <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#334155' }}>{notif.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* FIDELITY TEST */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 lg:col-span-2"
            style={{
              background: toolkitThemes.fidelity.background,
              color: 'white',
              borderRadius: 'clamp(1.25rem, 4vw, 1.5rem)',
              padding: 'clamp(1rem, 3vw, 1.25rem)',
              boxShadow: '0 24px 52px rgba(236,72,153,0.20)',
              border: `1px solid ${toolkitThemes.fidelity.border}`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(180px,0.75fr)', gap: '1rem', alignItems: 'center' }} className="max-sm:!grid-cols-1">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)' }}>
                    <MessageSquare style={{ width: '1.25rem', height: '1.25rem', color: toolkitThemes.fidelity.soft }} />
                  </div>
                  <span style={{ fontSize: '0.76rem', fontWeight: 900, color: toolkitThemes.fidelity.soft, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Fidelity Test</span>
                </div>
                <h4 style={{ fontSize: '1.35rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '0.45rem' }}>Verify hidden activity</h4>
                <p style={{ color: 'rgba(255,255,255,0.74)', fontSize: '0.88rem', lineHeight: 1.55 }}>Evaluate behavior against classic boundary-crossing patterns.</p>
              </div>
              <div style={{ borderRadius: '1.1rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.12)', padding: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                  <span style={{ color: toolkitThemes.fidelity.soft, fontSize: '0.72rem', fontWeight: 900, textTransform: 'uppercase' }}>Trust score</span>
                  <span style={{ color: '#fde68a', fontWeight: 900 }}>76%</span>
                </div>
                {['Consistent online behavior', 'Strong communication signals', 'Location mismatch detected'].map((item, i) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.45rem 0', borderTop: i ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                    <span style={{ width: '0.45rem', height: '0.45rem', borderRadius: '999px', background: i === 2 ? '#facc15' : '#22c55e' }} />
                    <span style={{ color: 'rgba(255,255,255,0.82)', fontSize: '0.72rem', fontWeight: 700 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* FOLLOWING AI */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 lg:col-span-2"
            style={{
              background: toolkitThemes.following.background,
              color: 'white',
              borderRadius: 'clamp(1.25rem, 4vw, 1.5rem)',
              padding: 'clamp(1rem, 3vw, 1.25rem)',
              boxShadow: '0 24px 52px rgba(139,92,246,0.20)',
              border: `1px solid ${toolkitThemes.following.border}`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,0.78fr) minmax(210px,1fr)', gap: '1rem', alignItems: 'center' }} className="max-sm:!grid-cols-1">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.13)', border: '1px solid rgba(255,255,255,0.2)' }}>
                    <Users style={{ width: '1.25rem', height: '1.25rem', color: toolkitThemes.following.soft }} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <h4 style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.03em' }}>Following AI</h4>
                      <span style={{ backgroundColor: 'rgba(255,255,255,0.14)', padding: '0.2rem 0.55rem', borderRadius: '9999px', fontSize: '0.62rem', fontWeight: 900, color: '#ffffff', border: '1px solid rgba(255,255,255,0.16)' }}>Cheater AI</span>
                    </div>
                    <p style={{ color: toolkitThemes.following.soft, fontSize: '0.74rem', fontWeight: 800 }}>Analyse who they follow and like</p>
                  </div>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '0.88rem', lineHeight: 1.55 }}>Reviews public follows and likes to reveal patterns before conversations shift to dating apps.</p>
              </div>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {[
                  ['Recent follows', '23 new follows this week', '+32'],
                  ['Risky connections', 'AI risk score based on behavior', '+8'],
                ].map(([title, subtitle, count], i) => (
                  <div key={title} style={{ borderRadius: '1.05rem', background: 'rgba(15,23,42,0.22)', border: '1px solid rgba(255,255,255,0.14)', padding: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.55rem' }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 900, textTransform: 'uppercase' }}>{title}</span>
                      <span style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.72rem', fontWeight: 700 }}>View all</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      {followingPreviewPhotos.map((img, index) => (
                        <img key={img} src={img} alt={title} style={{ width: '2.25rem', height: '2.25rem', borderRadius: '999px', objectFit: 'cover', border: `2px solid ${i ? toolkitThemes.fidelity.accent : '#22c55e'}`, marginLeft: index ? '-0.65rem' : 0 }} />
                      ))}
                      <span style={{ marginLeft: '0.15rem', width: '2.35rem', height: '2.35rem', borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', fontSize: '0.8rem', fontWeight: 900 }}>{count}</span>
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.76)', fontSize: '0.76rem', marginTop: '0.55rem', fontWeight: 700 }}>{subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* PRIVACY STRIP */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2 lg:col-span-4"
            style={{
              backgroundColor: 'white',
              borderRadius: '1.25rem',
              padding: '0.95rem 1rem',
              boxShadow: '0 16px 36px rgba(15,23,42,0.08)',
              border: '1px solid #e2e8f0',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: '0.75rem' }} className="max-md:!grid-cols-1">
              {[
                { icon: Lock, title: '100% Private', text: 'Your searches stay private', accent: toolkitThemes.dating.accent, bg: 'rgba(255,78,113,0.1)', border: 'rgba(255,78,113,0.16)' },
                { icon: ShieldCheck, title: 'AI-powered precision', text: 'Relationship risk assessment', accent: toolkitThemes.faceTrace.accent, bg: 'rgba(96,165,250,0.1)', border: 'rgba(96,165,250,0.16)' },
                { icon: ArrowRight, title: 'Recurring All Access', text: 'All services in one toolkit', accent: toolkitThemes.following.accent, bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.16)' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
                    <div style={{ width: '2.35rem', height: '2.35rem', flexShrink: 0, borderRadius: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: item.bg, color: item.accent, border: `1px solid ${item.border}` }}>
                      <Icon style={{ width: '1.1rem', height: '1.1rem' }} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ color: '#0f172a', fontSize: '0.86rem', fontWeight: 900 }}>{item.title}</div>
                      <div style={{ color: '#64748b', fontSize: '0.74rem', fontWeight: 600 }}>{item.text}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>


    </section>
  );
}

export default HowItWorks;
