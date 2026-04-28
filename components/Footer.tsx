import { motion } from "framer-motion";
import { Star, ArrowRight, Shield } from "lucide-react";
import { footerContent } from "../lib/content";

const LOGO_URL = "https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/Design%20sans%20titre%20(7).svg";

// Footer theme variants
export type FooterVariant = 'default' | 'dating' | 'faceTrace' | 'activity' | 'fidelity' | 'chat';

interface FooterTheme {
  mainBg: string;
  bottomBarBg: string;
  bottomBarGradient: string;
  accentColor: string;
  textColor: string;
  mutedColor: string;
  linkHover: string;
  badgeLabel: string;
}

const FOOTER_THEMES: Record<FooterVariant, FooterTheme> = {
  default: {
    mainBg: '#f8f9fa',
    bottomBarBg: '#fce4ec',
    bottomBarGradient: 'linear-gradient(135deg, #ff4b5c 0%, #ff9e75 100%)',
    accentColor: '#ff4b5c',
    textColor: '#374151',
    mutedColor: '#6b7280',
    linkHover: '#ff4b5c',
    badgeLabel: 'Dating Search'
  },
  dating: {
    mainBg: '#f8f9fa',
    bottomBarBg: '#fce4ec',
    bottomBarGradient: 'linear-gradient(135deg, #ff4b5c 0%, #ff9e75 100%)',
    accentColor: '#ff4b5c',
    textColor: '#374151',
    mutedColor: '#6b7280',
    linkHover: '#ff4b5c',
    badgeLabel: 'Dating Search'
  },
  faceTrace: {
    mainBg: '#f8f9fa',
    bottomBarBg: '#fff0f0',
    bottomBarGradient: 'linear-gradient(135deg, #FF6B6B 0%, #FFA502 100%)',
    accentColor: '#FF6B6B',
    textColor: '#374151',
    mutedColor: '#6b7280',
    linkHover: '#FF6B6B',
    badgeLabel: 'Face Trace'
  },
  activity: {
    mainBg: '#f8f9fa',
    bottomBarBg: '#fce4f0',
    bottomBarGradient: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
    accentColor: '#ec4899',
    textColor: '#374151',
    mutedColor: '#6b7280',
    linkHover: '#ec4899',
    badgeLabel: 'Activity Tracker'
  },
  fidelity: {
    mainBg: '#f8f9fa',
    bottomBarBg: '#fff4ed',
    bottomBarGradient: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
    accentColor: '#f97316',
    textColor: '#374151',
    mutedColor: '#6b7280',
    linkHover: '#f97316',
    badgeLabel: 'Fidelity Test'
  },
  chat: {
    mainBg: '#f8f9fa',
    bottomBarBg: '#fff0f0',
    bottomBarGradient: 'linear-gradient(135deg, #FF6B6B 0%, #FFA502 100%)',
    accentColor: '#FF6B6B',
    textColor: '#374151',
    mutedColor: '#6b7280',
    linkHover: '#FF6B6B',
    badgeLabel: 'Chat Analysis'
  }
};

const footerLinks = {
  tools: [
    { label: "Dating Search", href: "/dating-search" },
    { label: "Face Trace", href: "/face-trace" },
    { label: "Social AI Tracker", href: "/following-ai" },
    { label: "Fidelity Test", href: "/fidelity-test" }
  ],
  resources: [
    { label: footerContent.links.blog || "Blog", href: "/blog" },
    { label: "FAQ", href: "#faq" },
    { label: footerContent.links.contact || "Support", href: "#support" },
    { label: footerContent.links.about || "About us", href: "#about" }
  ],
  legal: [
    { label: footerContent.links.terms || "Terms", href: "/terms" },
    { label: footerContent.links.privacy || "Privacy", href: "/privacy" },
    { label: "Legal Notice", href: "/legal-notice" }
  ]
};

interface FooterProps {
  variant?: FooterVariant;
}

export function Footer({ variant = 'default' }: FooterProps) {
  const theme = FOOTER_THEMES[variant];

  return (
    <footer className="font-['Inter_Tight',sans-serif]">
      {/* Main Footer Section - Light Background */}
      <div
        className="py-10 md:py-12"
        style={{ backgroundColor: theme.mainBg }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">

            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                {/* Animated Logo */}
                <motion.div
                  className="bg-white rounded-2xl p-3 shadow-md"
                  animate={{
                    y: [0, -6, 0],
                    rotate: [0, -3, 3, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <img
                    src={LOGO_URL}
                    alt="ProfileFinder"
                    loading="lazy"
                    className="w-8 h-8 object-contain"
                    width={32}
                    height={32}
                  />
                </motion.div>
                <span
                  className="text-xl font-black tracking-tight"
                  style={{ color: theme.textColor }}
                >
                  ProfileFinder
                </span>
              </div>

              <p
                className="text-sm leading-relaxed mb-4 max-w-xs"
                style={{ color: theme.mutedColor }}
              >
                {footerContent.tagline}
              </p>

              {/* Star Rating */}
              <div className="flex gap-1 mb-4" aria-label="Rating: 5 out of 5 stars">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="w-4 h-4"
                    style={{ fill: theme.accentColor, color: theme.accentColor }}
                  />
                ))}
              </div>

              {/* Service Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2"
                style={{
                  borderColor: theme.accentColor,
                  backgroundColor: 'white'
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: theme.accentColor }}
                />
                <span
                  className="text-sm font-semibold"
                  style={{ color: theme.accentColor }}
                >
                  {theme.badgeLabel}
                </span>
              </motion.div>
            </div>

            {/* Tools Links */}
            <div>
              <h3
                className="text-sm font-bold mb-4 italic"
                style={{ color: theme.textColor }}
              >
                Tools
              </h3>
              <ul className="space-y-3">
                {footerLinks.tools.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm flex items-center gap-2 transition-colors duration-200 group"
                      style={{ color: theme.mutedColor }}
                      onMouseEnter={(e) => e.currentTarget.style.color = theme.linkHover}
                      onMouseLeave={(e) => e.currentTarget.style.color = theme.mutedColor}
                    >
                      <ArrowRight
                        className="w-3 h-3 group-hover:translate-x-1 transition-transform"
                        style={{ color: theme.accentColor }}
                      />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3
                className="text-sm font-bold mb-4 italic"
                style={{ color: theme.textColor }}
              >
                Resources
              </h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm flex items-center gap-2 transition-colors duration-200 group"
                      style={{ color: theme.mutedColor }}
                      onMouseEnter={(e) => e.currentTarget.style.color = theme.linkHover}
                      onMouseLeave={(e) => e.currentTarget.style.color = theme.mutedColor}
                    >
                      <ArrowRight
                        className="w-3 h-3 group-hover:translate-x-1 transition-transform"
                        style={{ color: theme.accentColor }}
                      />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3
                className="text-sm font-bold mb-4 italic"
                style={{ color: theme.textColor }}
              >
                {footerContent.legal}
              </h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm flex items-center gap-2 transition-colors duration-200 group"
                      style={{ color: theme.mutedColor }}
                      onMouseEnter={(e) => e.currentTarget.style.color = theme.linkHover}
                      onMouseLeave={(e) => e.currentTarget.style.color = theme.mutedColor}
                    >
                      <ArrowRight
                        className="w-3 h-3 group-hover:translate-x-1 transition-transform"
                        style={{ color: theme.accentColor }}
                      />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar - Gradient Background */}
      <div
        className="py-4"
        style={{ backgroundColor: theme.bottomBarBg }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p
              className="text-sm font-medium"
              style={{ color: theme.accentColor }}
            >
              {footerContent.copyright}
            </p>

            {/* Legal Links Row */}
            <div className="flex items-center gap-4 text-sm">
              {footerLinks.legal.map((link, index) => (
                <span key={link.href} className="flex items-center gap-4">
                  <a
                    href={link.href}
                    className="transition-colors duration-200"
                    style={{ color: theme.mutedColor }}
                    onMouseEnter={(e) => e.currentTarget.style.color = theme.accentColor}
                    onMouseLeave={(e) => e.currentTarget.style.color = theme.mutedColor}
                  >
                    {link.label}
                  </a>
                  {index < footerLinks.legal.length - 1 && (
                    <span style={{ color: theme.mutedColor }}>·</span>
                  )}
                </span>
              ))}
            </div>

            {/* Secure Badge */}
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{
                backgroundColor: 'rgba(0,0,0,0.08)',
                color: theme.mutedColor
              }}
            >
              <Shield className="w-3.5 h-3.5" style={{ color: theme.accentColor }} />
              <span>Secure and certified site</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
