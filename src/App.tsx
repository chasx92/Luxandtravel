import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const videoSource =
  "https://videos.ctfassets.net/4sjeayoe33pl/2Z9a0exEEWMcEu4qRVsniD/a67fcd97661979e81bf6dc951fcd22ec/vb-sizzle.mp4";

const visualAssets = {
  dinner:
    "https://images.pexels.com/photos/10666399/pexels-photo-10666399.jpeg?auto=compress&cs=tinysrgb&w=1400",
  table:
    "https://images.pexels.com/photos/15589502/pexels-photo-15589502.jpeg?auto=compress&cs=tinysrgb&w=1400",
  villa:
    "https://images.pexels.com/photos/7902905/pexels-photo-7902905.jpeg?auto=compress&cs=tinysrgb&w=1400",
  coast:
    "https://images.pexels.com/photos/9770700/pexels-photo-9770700.jpeg?auto=compress&cs=tinysrgb&w=1400",
  yacht:
    "https://images.pexels.com/photos/32989691/pexels-photo-32989691.jpeg?auto=compress&cs=tinysrgb&w=1400",
  mansion:
    "https://images.pexels.com/photos/32759289/pexels-photo-32759289/free-photo-of-mediterranean-sea-view-from-spanish-villa.jpeg?auto=compress&cs=tinysrgb&w=1400",
};

const conciergeMessages = [
  "Table confirmée.",
  "Villa shortlistée.",
  "Chauffeur assigné.",
  "Accès privé validé.",
];

const ease = [0.16, 1, 0.3, 1] as const;
const revealTransition = { duration: 1.05, ease };

type LoadingScreenProps = {
  onComplete: () => void;
};

type PhoneScreen = {
  eyebrow: string;
  title: string;
  lines: string[];
  status: string;
  image: string;
};

type ProcessStep = {
  label: string;
  title: string;
  text: string;
  phone: PhoneScreen;
};

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
};

function Reveal({ children, className, delay = 0, amount = 0.22 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 34, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 1.05, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function MotionLine({ className = "" }: { className?: string }) {
  return (
    <motion.span
      className={`block h-px origin-left bg-current ${className}`}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1.1, ease }}
    />
  );
}

function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const words = ["Hospitalité", "Émotion", "Exception"];

  useEffect(() => {
    let frame = 0;
    let completed = false;
    const start = performance.now();
    const duration = 2700;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const nextCount = Math.round(progress * 100);
      setCount(nextCount);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }

      if (!completed) {
        completed = true;
        window.setTimeout(onComplete, 400);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [onComplete]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setWordIndex((index) => (index + 1) % words.length);
    }, 900);

    return () => window.clearInterval(interval);
  }, [words.length]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#050505] text-[#F6F1E8]"
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.65, ease }}
    >
      <div className="absolute left-6 top-6 font-sans text-[10px] uppercase tracking-[0.34em] text-[#F6F1E8]/42 md:left-10 md:top-10">
        MAISON CHALAMBERT
      </div>

      <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={words[wordIndex]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease }}
            className="apple-display text-4xl text-[#F6F1E8]/68 md:text-6xl lg:text-7xl"
          >
            {words[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="apple-display absolute bottom-8 right-6 text-6xl tabular-nums text-[#F6F1E8]/90 md:bottom-10 md:right-10 md:text-8xl lg:text-9xl">
        {String(count).padStart(3, "0")}
      </div>

      <div className="fixed bottom-0 left-0 right-0 h-[3px] bg-white/10">
        <motion.div
          className="accent-gradient h-full origin-left shadow-[0_0_12px_rgba(200,169,106,0.35)]"
          style={{ scaleX: count / 100 }}
        />
      </div>
    </motion.div>
  );
}

function TypingMessages() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentMessage = conciergeMessages[messageIndex];
    const isComplete = displayText === currentMessage;
    const isCleared = displayText === "";

    const timeout = window.setTimeout(
      () => {
        if (!isDeleting && !isComplete) {
          setDisplayText(currentMessage.slice(0, displayText.length + 1));
          return;
        }

        if (!isDeleting && isComplete) {
          setIsDeleting(true);
          return;
        }

        if (isDeleting && !isCleared) {
          setDisplayText(currentMessage.slice(0, displayText.length - 1));
          return;
        }

        setIsDeleting(false);
        setMessageIndex((index) => (index + 1) % conciergeMessages.length);
      },
      !isDeleting && isComplete ? 2000 : isDeleting ? 50 : 100,
    );

    return () => window.clearTimeout(timeout);
  }, [displayText, isDeleting, messageIndex]);

  return (
    <div className="absolute bottom-10 right-6 z-30 flex w-[190px] justify-center text-center sm:w-[230px] md:bottom-12 md:right-10">
      <div className="inline-flex items-center justify-center rounded-full border border-white/10 bg-black/25 px-4 py-2 opacity-75 backdrop-blur-md">
        <span className="min-h-[1.5em] break-words font-sans text-[11px] uppercase leading-tight tracking-[0.08em] text-[#F6F1E8] sm:text-[13px]">
          {displayText}
        </span>
        <motion.span
          className="ml-1 inline-block h-3 w-1 align-middle bg-[#C8A96A]"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
}

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = [
    { label: "Accueil", href: "#hero" },
    { label: "Événements", href: "#signatures" },
    { label: "Voyages", href: "#experiences" },
    { label: "La Maison", href: "#maison" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const update = () => setIsScrolled(window.scrollY > 80);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <motion.header
      className="pointer-events-none fixed left-1/2 top-4 z-50 w-[calc(100%-28px)] max-w-[620px] -translate-x-1/2 md:top-6 md:w-[92%]"
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.15, ease }}
    >
      <nav
        className={`pointer-events-auto flex min-h-[58px] items-center justify-between rounded-[28px] border px-4 py-2 shadow-[0_14px_46px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-500 md:min-h-[58px] md:px-5 md:py-2 ${
          isScrolled
            ? "border-white/15 bg-black/45"
            : "border-white/10 bg-black/30 md:bg-black/20"
        }`}
      >
        <a
          href="#hero"
          className="flex max-w-[190px] flex-col gap-[2px] font-sans text-[12px] font-medium uppercase leading-none tracking-[0.34em] text-[#F6F1E8] no-underline md:text-[13px] md:tracking-[0.32em]"
        >
          <span>MAISON</span>
          <span>CHALAMBERT</span>
        </a>

        <button
          type="button"
          aria-label="Ouvrir le menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="group flex h-10 w-10 items-center justify-center rounded-full border border-[#F6F1E8]/16 bg-white/[0.035] text-[#F6F1E8]/82 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-[#C8A96A]/45 hover:bg-white/[0.065]"
        >
          <span className="flex w-4 flex-col gap-[5px]">
            <span className={`h-px w-full bg-current transition-transform duration-300 ${isMenuOpen ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`h-px w-full bg-current transition-transform duration-300 ${isMenuOpen ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="pointer-events-auto absolute right-0 top-[calc(100%+10px)] w-56 overflow-hidden rounded-[24px] border border-white/10 bg-black/55 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.38)] backdrop-blur-xl"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.28, ease }}
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-2xl px-4 py-3 font-sans text-sm text-[#F6F1E8]/78 no-underline transition-all duration-300 hover:bg-white/[0.06] hover:text-[#F6F1E8]"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function Hero() {
  const videoWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = videoWrapRef.current;
    if (!element) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduceMotion || isCoarse) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      element.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(1.05)`;
      frame = requestAnimationFrame(animate);
    };

    const handleMove = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      targetX = x * 12;
      targetY = y * 10;
    };

    frame = requestAnimationFrame(animate);
    window.addEventListener("mousemove", handleMove);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", handleMove);
      element.style.transform = "";
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-start justify-end overflow-hidden bg-[#050505] px-6 pb-28 pt-28 md:px-10 md:pb-28 md:pt-32 lg:px-16"
    >
      <div ref={videoWrapRef} className="absolute inset-0 z-0 will-change-transform">
        <video
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src={videoSource} type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 z-10 bg-black/25" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/45 via-black/5 to-black/70" />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.08)_52%,rgba(0,0,0,0.58)_100%)]" />

      <div className="pointer-events-none relative z-20 max-w-[620px] text-left md:max-w-[680px]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease }}
          className="mb-5 max-w-[520px] font-sans text-[10px] uppercase tracking-[0.28em] text-[#C8A96A] md:text-[10px]"
        >
          PRIVATE HOSPITALITY · BESPOKE TRAVEL · EXCLUSIVE ACCESS
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease }}
          className="apple-display mb-6 text-[50px] leading-[0.92] text-[#F6F1E8] md:text-[70px] lg:text-[84px]"
        >
          RIEN N’EST TROP
          <br />
          EXCEPTIONNEL
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease }}
          className="apple-copy max-w-[560px] text-[17px] leading-relaxed text-[#F6F1E8]/68 md:text-[18px] md:leading-[1.65]"
        >
          Une collection de lieux rares et d’expériences confidentielles, imaginée pour ceux qui font de l’excellence leur seule destination.
        </motion.p>
      </div>

      <TypingMessages />

      <motion.div
        className="pointer-events-none absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 0.72, y: 0 }}
        transition={{ duration: 1, delay: 1.3, ease }}
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#F6F1E8]/50">
          SCROLL
        </span>
        <span className="relative h-10 w-px overflow-hidden bg-white/15">
          <span className="animate-scroll-down absolute left-0 top-0 h-4 w-px bg-[#C8A96A]" />
        </span>
      </motion.div>
    </section>
  );
}

function ArtHospitaliteSection() {
  const pillars = [
    {
      title: "Personnalisation",
      text: "Parce que vous êtes unique, chaque expérience est dessinée sur-mesure. Nous écoutons vos silences et anticipons vos désirs pour façonner un moment qui ne ressemble qu’à vous.",
    },
    {
      title: "Inaccessible",
      text: "Poussez les portes qui restent closes aux autres. Tables confidentielles, lieux secrets ou privatisations impossibles : notre carnet d’adresses est votre passeport pour l’exception.",
    },
    {
      title: "Orchestration",
      text: "Laissez-vous porter. De la première inspiration à la dernière seconde, nous orchestrons tout dans l’ombre. Profitez de l’instant présent, nous maîtrisons le temps pour vous.",
    },
    {
      title: "Émotion",
      text: "Vivre l’inédit. Qu’il s’agisse d’une évasion au bout du monde ou d’un dîner privé, nous chassons l’ordinaire pour provoquer l’émerveillement et marquer les esprits.",
    },
  ];

  return (
    <section id="maison" className="bg-[#F7F5F0] py-24 text-[#111111] md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={revealTransition}
        >
          <p className="mb-8 font-sans text-xs uppercase tracking-[0.3em] text-black/45">
            LA MAISON
          </p>
          <h2 className="apple-display text-4xl leading-tight text-black md:text-6xl">
            L’ART DE L’HOSPITALITÉ
          </h2>
          <p className="apple-copy mx-auto mt-10 max-w-[680px] text-xl leading-[1.65] text-black/70 md:text-2xl">
            Passionnés et entourés des meilleurs dans chaque univers.
          </p>
          <p className="apple-copy mx-auto mt-6 max-w-[760px] text-lg leading-[1.75] text-black/58 md:text-xl">
            Une vision où chaque détail compte, où l’élégance rencontre l’audace, pour vous offrir bien plus qu’une expérience : une émotion.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-12 md:mt-24 md:grid-cols-4 md:gap-0">
          {pillars.map((pillar, index) => (
            <motion.article
              key={pillar.title}
              className="border-t border-black/10 pt-8 md:border-l md:border-t-0 md:px-8 md:pt-0 first:md:border-l-0"
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.05, delay: index * 0.11, ease }}
            >
              <MotionLine className="mb-8 text-black/12 md:hidden" />
              <h3 className="apple-display text-3xl text-black md:text-4xl">
                {pillar.title}
              </h3>
              <p className="apple-copy mt-7 text-[15px] leading-8 text-black/58 md:text-base">
                {pillar.text}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SignaturesSection() {
  const cards = [
    {
      title: "Événements",
      description: "Des célébrations privées pensées comme des mises en scène intimes.",
      className: "md:col-span-7 aspect-[1.25]",
      gradient: "from-[#34291B] via-[#11100D] to-[#050505]",
      image: visualAssets.dinner,
    },
    {
      title: "Tables",
      description: "Des adresses confidentielles aux dîners impossibles à réserver.",
      className: "md:col-span-5 aspect-[0.9]",
      gradient: "from-[#1E241D] via-[#0B0A08] to-[#050505]",
      image: visualAssets.table,
    },
    {
      title: "Lifestyle",
      description: "Des attentions, accès et expériences qui prolongent votre art de vivre.",
      className: "md:col-span-5 aspect-[0.9]",
      gradient: "from-[#201A20] via-[#0B0A08] to-[#050505]",
      image: visualAssets.yacht,
    },
    {
      title: "Voyages",
      description: "Des échappées sur-mesure, du lieu secret à l’itinéraire d’exception.",
      className: "md:col-span-7 aspect-[1.25]",
      gradient: "from-[#16222B] via-[#0B0A08] to-[#050505]",
      image: visualAssets.villa,
    },
  ];

  return (
    <section id="signatures" className="bg-[#050505] py-24 md:py-40">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <div className="mb-16 flex flex-col gap-10 md:mb-20 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={revealTransition}
            className="max-w-[760px]"
          >
            <div className="mb-6 flex items-center gap-4">
              <MotionLine className="w-8 text-white/20" />
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#C8A96A]">
                NOS SIGNATURES
              </span>
            </div>
            <h2 className="apple-display text-4xl leading-[1.02] text-[#F6F1E8] md:text-6xl">
              Des expériences pensées comme des{" "}
              <span className="text-[#D8C7A3]">
                souvenirs rares.
              </span>
            </h2>
            <p className="apple-copy mt-8 max-w-[720px] text-lg leading-[1.7] text-[#F6F1E8]/62 md:text-xl">
              Événements privés, tables confidentielles, escapades exclusives et attentions sur-mesure : Maison Chalambert compose chaque instant avec précision.
            </p>
          </motion.div>
          <a
            href="#experiences"
            className="hidden rounded-full border border-white/15 px-6 py-3 font-sans text-sm text-[#F6F1E8]/78 no-underline transition-all duration-300 hover:scale-[1.02] hover:border-[#C8A96A]/55 hover:text-[#F6F1E8] md:inline-flex"
          >
            Découvrir nos univers
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-7">
          {cards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: index % 2 === 0 ? 1.1 : 0.95, delay: index * 0.1, ease }}
              className={`group luxury-border relative overflow-hidden rounded-[1.75rem] bg-[#0B0A08] shadow-[0_32px_90px_rgba(0,0,0,0.22)] transition-colors duration-700 hover:border-[#C8A96A]/35 ${card.className}`}
              whileHover={{ y: -4 }}
            >
              <div
                className={`absolute inset-0 scale-100 bg-gradient-to-br ${card.gradient} transition-transform duration-[1800ms] ease-out group-hover:scale-[1.035]`}
              />
              <img
                src={card.image}
                alt=""
                className="absolute inset-0 h-full w-full scale-105 object-cover opacity-42 saturate-[0.75] transition-all duration-[2200ms] ease-out group-hover:scale-[1.09] group-hover:opacity-55"
              />
              <div className="absolute inset-0 transition-transform duration-[1800ms] group-hover:translate-y-[-10px] bg-[radial-gradient(circle_at_28%_20%,rgba(216,199,163,0.18),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.06)_0,transparent_35%)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/36 to-black/24" />
              <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_center,#F6F1E8_1px,transparent_1px)] [background-size:10px_10px]" />

              <div className="relative z-10 flex h-full flex-col items-center justify-center p-8 text-center">
                <h3 className="font-sans text-2xl uppercase tracking-[0.2em] text-[#F6F1E8] md:text-3xl">
                  {card.title}
                </h3>
                <div className="luxury-surface mt-6 max-w-sm translate-y-3 rounded-2xl px-5 py-4 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="font-sans text-sm leading-relaxed text-[#F6F1E8]/75">
                    {card.description}
                  </p>
                  <p className="mt-4 font-sans text-xs uppercase tracking-[0.22em] text-[#C8A96A]">
                    Explorer —{" "}
                    <span className="apple-copy text-base normal-case">
                      {card.title}
                    </span>
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhoneMockup({ screen }: { screen: PhoneScreen }) {
  return (
    <div className="relative mx-auto w-full max-w-[226px] rounded-[2.1rem] border border-white/15 bg-black p-2 shadow-[0_28px_80px_rgba(0,0,0,0.48)] md:max-w-[300px] md:rounded-[3rem] md:p-3 md:shadow-[0_40px_120px_rgba(0,0,0,0.58)]">
      <div className="absolute left-1/2 top-4 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-black shadow-[0_0_0_1px_rgba(255,255,255,0.08)] md:top-5 md:h-6 md:w-24" />
      <div className="relative min-h-[360px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0B0A08] px-4 pb-5 pt-13 md:min-h-[560px] md:rounded-[2.4rem] md:px-5 md:pb-6 md:pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(200,169,106,0.18),transparent_36%),linear-gradient(180deg,rgba(246,241,232,0.08),transparent_30%)]" />
        <AnimatePresence mode="wait">
          <motion.div
            key={`${screen.eyebrow}-${screen.title}`}
            className="relative z-10"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease }}
          >
            <img
              src={screen.image}
              alt=""
              className="absolute inset-x-0 top-0 -z-10 h-48 w-full rounded-[1.6rem] object-cover opacity-30 mix-blend-screen md:h-56"
            />
            <div className="absolute inset-x-0 top-0 -z-10 h-56 rounded-[1.6rem] bg-gradient-to-b from-black/10 via-[#0B0A08]/55 to-[#0B0A08]" />
            <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-[#C8A96A]">
              {screen.eyebrow}
            </p>
            <h3 className="apple-display mt-4 text-[29px] leading-none text-[#F6F1E8] md:mt-5 md:text-4xl">
              {screen.title}
            </h3>
            <div className="mt-5 space-y-2.5 md:mt-8 md:space-y-3">
              {screen.lines.map((line) => (
                <div
                  key={line}
                  className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-2.5 font-sans text-[12px] leading-relaxed text-[#F6F1E8]/72 md:py-3 md:text-sm"
                >
                  {line}
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-3xl border border-[#C8A96A]/25 bg-[#C8A96A]/10 p-4 md:mt-8 md:p-5">
              <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-[#D8C7A3]/75">
                Statut
              </p>
              <p className="mt-2 font-sans text-base text-[#F6F1E8]">{screen.status}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ConciergeProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const phoneRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const steps: ProcessStep[] = useMemo(
    () => [
      {
        label: "01 · L’ENVIE",
        title: "Tout commence par une intention.",
        text: "Un dîner privé, une destination, une surprise, un accès rare ou une demande qui semble trop précise pour être formulée. Nous transformons l’envie en brief clair.",
        phone: {
          eyebrow: "Brief privé",
          title: "Week-end confidentiel",
          lines: ["Villa privée · Chef · Table rare · Transferts"],
          status: "Brief reçu",
          image: visualAssets.villa,
        },
      },
      {
        label: "02 · LE RÉSEAU",
        title: "Nous activons les bons contacts.",
        text: "Hôtels, lieux privés, chefs, chauffeurs, tables, artistes, expériences : chaque demande est confiée au bon interlocuteur, au bon niveau.",
        phone: {
          eyebrow: "Réseau",
          title: "Accès en cours",
          lines: ["Lieu shortlisté", "Table confirmée", "Chauffeur assigné", "Expérience privée"],
          status: "Accès privé validé",
          image: visualAssets.table,
        },
      },
      {
        label: "03 · L’ORCHESTRATION",
        title: "Chaque détail disparaît dans l’ombre.",
        text: "Horaires, préférences, confirmations, imprévus : nous maîtrisons les détails pour que l’expérience paraisse simplement évidente.",
        phone: {
          eyebrow: "Timeline",
          title: "Soirée privée",
          lines: ["19:30 · Chauffeur", "20:15 · Dîner privé", "23:00 · Accès confidentiel", "Le lendemain · Évasion sur-mesure"],
          status: "Orchestration active",
          image: visualAssets.dinner,
        },
      },
      {
        label: "04 · L’ÉMOTION",
        title: "Il ne reste que le moment.",
        text: "Vous profitez de l’instant. Maison Chalambert veille en silence, avec la précision et la discrétion qu’exige l’exception.",
        phone: {
          eyebrow: "Maison Chalambert",
          title: "Votre expérience est prête.",
          lines: ["Everything is handled.", "Concierge disponible"],
          status: "Présence discrète",
          image: visualAssets.yacht,
        },
      },
    ],
    [],
  );

  useGSAP(
    () => {
      if (!sectionRef.current || !phoneRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const items = gsap.utils.toArray<HTMLElement>(".process-step");

      gsap.to(phoneRef.current, {
        y: 18,
        rotate: 1,
        scale: 1.015,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      if (progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top center",
              end: "bottom center",
              scrub: 1,
            },
          },
        );
      }

      items.forEach((item, index) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveStep(index),
          onEnterBack: () => setActiveStep(index),
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="process" className="bg-[#050505] py-24 md:min-h-[280vh] md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1, ease }}
        >
          <h2 className="apple-display text-4xl leading-tight text-[#F6F1E8] md:text-6xl">
            CONFIER L’IMPOSSIBLE, NOUS L’ORCHESTRONS.
          </h2>
          <p className="apple-copy mt-6 max-w-2xl text-lg leading-relaxed text-[#F6F1E8]/62 md:text-xl">
            Une demande, un désir, une contrainte. Maison Chalambert transforme l’intention en expérience fluide.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-16 md:mt-28 md:grid-cols-[0.85fr_1fr] md:gap-24">
          <div ref={phoneRef} className="hidden self-start md:sticky md:top-28 md:block">
            <PhoneMockup screen={steps[activeStep].phone} />
          </div>

          <div className="relative space-y-20 md:space-y-[42vh] md:pb-[34vh] md:pl-10">
            <motion.div
              className="sticky top-[76px] z-20 -mx-6 bg-gradient-to-b from-[#050505] via-[#050505]/95 to-[#050505]/78 px-6 pb-7 pt-3 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.95, ease }}
            >
              <div className="mx-auto max-w-[260px]">
                <PhoneMockup screen={steps[activeStep].phone} />
              </div>
            </motion.div>

            <div className="absolute left-0 top-0 hidden h-full w-px bg-white/10 md:block">
              <div ref={progressRef} className="h-full w-px origin-top scale-y-0 bg-[#C8A96A]/70" />
            </div>
            {steps.map((step, index) => (
              <motion.article
                key={step.label}
                className={`process-step min-h-[44vh] transition-opacity duration-700 md:min-h-[44vh] ${
                  activeStep === index ? "md:opacity-100" : "md:opacity-28"
                }`}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.9, ease }}
              >
                <div className="mt-0 md:mt-0">
                  <motion.p
                    className="font-sans text-xs uppercase tracking-[0.28em] text-[#C8A96A]"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.9, ease }}
                  >
                    {step.label}
                  </motion.p>
                  <h3 className="apple-display mt-5 text-4xl leading-tight text-[#F6F1E8] md:text-6xl">
                    {step.title}
                  </h3>
                  <p className="apple-copy mt-6 max-w-xl text-lg leading-8 text-[#F6F1E8]/62 md:text-xl">
                    {step.text}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ParallaxExperiencesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const experiences = [
    {
      label: "Dîner privé",
      text: "Une table cachée, un chef, une lumière juste.",
      image: visualAssets.dinner,
    },
    {
      label: "Villa confidentielle",
      text: "Un lieu rare, réservé dans le silence.",
      image: visualAssets.villa,
    },
    {
      label: "Escapade méditerranéenne",
      text: "Le voyage exact, au rythme d’un désir.",
      image: visualAssets.coast,
    },
    {
      label: "Nuit exclusive",
      text: "Une adresse, un accès, une scène privée.",
      image: visualAssets.table,
    },
    {
      label: "Accès culturel",
      text: "Ce qui ne s’annonce pas, mais s’ouvre.",
      image: visualAssets.mansion,
    },
    {
      label: "Célébration sur-mesure",
      text: "Une émotion orchestrée sans jamais se montrer.",
      image: visualAssets.yacht,
    },
  ];

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.to(".parallax-left", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.6,
        },
      });

      gsap.to(".parallax-right", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.6,
        },
      });

      gsap.to(".mobile-experience-intro", {
        opacity: 0.62,
        scale: 0.965,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "45% top",
          scrub: 1.4,
        },
      });

      gsap.utils.toArray<HTMLElement>(".mobile-parallax-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            y: 82,
            opacity: 0.3,
            scale: 0.94,
            rotate: index % 2 === 0 ? -2 : 2,
          },
          {
            y: -18,
            opacity: 1,
            scale: 1,
            rotate: index % 2 === 0 ? 1 : -1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              end: "bottom 42%",
              scrub: 1.15,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".mobile-experience-image").forEach((image) => {
        gsap.fromTo(
          image,
          { yPercent: -5, scale: 1.1 },
          {
            yPercent: 5,
            scale: 1.04,
            ease: "none",
            scrollTrigger: {
              trigger: image.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.4,
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="experiences" className="relative overflow-hidden bg-[#050505] md:min-h-[260vh]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[140vh] bg-[radial-gradient(circle_at_50%_18%,rgba(216,199,163,0.1),transparent_34%)] md:hidden" />

      <div className="relative z-10 hidden min-h-[48vh] items-center justify-center px-6 text-center md:sticky md:top-0 md:flex md:h-screen">
        <motion.div
          className="relative z-10 mx-auto max-w-[760px] rounded-[2rem] bg-[#050505]/35 px-4 py-8 backdrop-blur-[2px] md:bg-transparent md:p-0 md:backdrop-blur-none"
          initial={{ opacity: 0, y: 26, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1.15, ease }}
        >
          <motion.p
            className="font-sans text-xs uppercase tracking-[0.3em] text-[#C8A96A]"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            EXPÉRIENCES
          </motion.p>
          <h2 className="apple-display mt-6 text-4xl leading-tight text-[#F6F1E8] md:text-6xl">
            L’art de vivre,{" "}
            <span className="text-[#D8C7A3]">en mouvement.</span>
          </h2>
          <p className="apple-copy mx-auto mt-8 max-w-[700px] text-lg leading-[1.7] text-[#F6F1E8]/62 md:text-xl">
            Chaque univers raconte une manière d’habiter l’exception : une table, un voyage, une fête, une adresse que l’on ne trouve pas.
          </p>
          <a
            href="#contact"
            className="mt-9 inline-flex rounded-full border border-white/15 px-6 py-3 font-sans text-sm text-[#F6F1E8] no-underline transition-all duration-300 hover:border-[#C8A96A]/70 hover:text-[#D8C7A3]"
          >
            Voir les inspirations
          </a>
        </motion.div>
      </div>

      <div className="relative z-10 md:hidden">
        <div className="mobile-experience-intro sticky top-0 flex min-h-screen items-center justify-center px-6 pb-16 pt-24 text-center">
          <motion.div
            className="mx-auto max-w-[330px]"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.1, ease }}
          >
            <p className="font-sans text-[11px] uppercase tracking-[0.34em] text-[#C8A96A]">
              EXPÉRIENCES
            </p>
            <h2 className="apple-display mt-7 text-[43px] leading-[1.03] text-[#F6F1E8]">
              L’art de vivre,{" "}
              <span className="text-[#D8C7A3]">en mouvement.</span>
            </h2>
            <p className="apple-copy mx-auto mt-8 max-w-[310px] text-[18px] leading-[1.65] text-[#F6F1E8]/58">
              Une table, un voyage, une fête, une adresse que l’on ne trouve pas.
            </p>
            <a
              href="#contact"
              className="mt-9 inline-flex rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 font-sans text-[13px] text-[#F6F1E8]/88 no-underline backdrop-blur-md transition-all duration-300 hover:border-[#C8A96A]/60 hover:text-[#D8C7A3]"
            >
              Voir les inspirations
            </a>
          </motion.div>
        </div>

        <div className="relative z-20 -mt-[23vh] space-y-[12vh] px-5 pb-28">
          {experiences.map((item, index) => (
            <div
              key={item.label}
              className={`mobile-parallax-card flex min-h-[54vh] items-center ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <MobileExperienceCard
                label={item.label}
                text={item.text}
                image={item.image}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-0 mx-auto hidden max-w-7xl grid-cols-2 gap-4 px-6 pt-[34vh] md:grid md:gap-10 md:px-10 lg:px-16">
        <div className="parallax-left flex flex-col gap-6 md:-translate-x-20 md:gap-10">
          {experiences.slice(0, 3).map((item, index) => (
            <ExperienceCard key={item.label} label={item.label} image={item.image} index={index} side="left" />
          ))}
        </div>
        <div className="parallax-right mt-32 flex flex-col gap-6 md:mt-56 md:translate-x-20 md:gap-10">
          {experiences.slice(3).map((item, index) => (
            <ExperienceCard key={item.label} label={item.label} image={item.image} index={index + 3} side="right" />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  label,
  image,
  index,
  side,
}: {
  label: string;
  image: string;
  index: number;
  side: "left" | "right";
}) {
  const rotations = side === "left" ? ["-3deg", "2deg", "-1deg"] : ["2deg", "-2deg", "3deg"];
  const gradients = [
    "from-[#3A2A19] via-[#12100D] to-[#050505]",
    "from-[#102326] via-[#0B0A08] to-[#050505]",
    "from-[#2A251C] via-[#11100D] to-[#050505]",
    "from-[#241522] via-[#0B0A08] to-[#050505]",
    "from-[#1D261B] via-[#0B0A08] to-[#050505]",
    "from-[#18212D] via-[#0B0A08] to-[#050505]",
  ];

  return (
    <div
      className="pointer-events-auto luxury-border group relative aspect-[4/5] w-full max-w-[320px] overflow-hidden rounded-3xl bg-[#0B0A08] shadow-[0_30px_90px_rgba(0,0,0,0.24)] transition-all duration-700 hover:border-[#C8A96A]/40 hover:scale-[1.02]"
      style={{ rotate: rotations[index % 3] }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index]}`} />
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full scale-105 object-cover opacity-48 saturate-[0.78] transition-all duration-[1800ms] group-hover:scale-[1.08] group-hover:opacity-62"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_22%,rgba(216,199,163,0.2),transparent_34%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/30 to-black/18" />
      <div className="relative z-10 flex h-full items-end p-5 md:p-7">
        <p className="apple-display text-3xl leading-none text-[#F6F1E8] md:text-4xl">
          {label}
        </p>
      </div>
    </div>
  );
}

function MobileExperienceCard({
  label,
  text,
  image,
  index,
}: {
  label: string;
  text: string;
  image: string;
  index: number;
}) {
  const gradients = [
    "from-[#302313] via-[#12100D] to-[#050505]",
    "from-[#102326] via-[#0B0A08] to-[#050505]",
    "from-[#2A251C] via-[#11100D] to-[#050505]",
    "from-[#241522] via-[#0B0A08] to-[#050505]",
    "from-[#1D261B] via-[#0B0A08] to-[#050505]",
    "from-[#18212D] via-[#0B0A08] to-[#050505]",
  ];

  return (
    <motion.article
      className="luxury-border relative aspect-[4/5] w-[82vw] max-w-[322px] overflow-hidden rounded-[1.8rem] bg-[#0B0A08] shadow-[0_28px_90px_rgba(0,0,0,0.45)]"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} opacity-85`} />
      <img
        src={image}
        alt=""
        className="mobile-experience-image absolute inset-0 h-full w-full object-cover opacity-68 saturate-[0.78]"
      />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_14%,rgba(216,199,163,0.22),transparent_34%)]"
        animate={{ opacity: [0.45, 0.72, 0.45] }}
        transition={{ duration: 5 + index * 0.35, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/34 to-black/18" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className="relative z-10 flex h-full flex-col justify-between p-6">
        <div className="flex items-center justify-between">
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#C8A96A]/82">
            {String(index + 1).padStart(2, "0")}
          </p>
          <span className="h-px w-10 bg-white/20" />
        </div>
        <div>
          <h3 className="apple-display max-w-[240px] text-[38px] leading-[0.96] text-[#F6F1E8]">
            {label}
          </h3>
          <p className="apple-copy mt-4 max-w-[220px] text-[14px] leading-6 text-[#F6F1E8]/62">
            {text}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

function StatsSection() {
  const stats = [
    {
      value: "4",
      label: "Événements · Tables · Lifestyle · Voyages",
    },
    {
      value: "∞",
      label: "Aucun dîner trop privé, aucun lieu trop confidentiel.",
    },
    {
      value: "24/7",
      label: "Une présence discrète lorsque l’exception l’exige.",
    },
  ];

  return (
    <section className="bg-[#050505] py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-0 px-6 md:grid-cols-3 md:px-10 lg:px-16">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.value}
            className="border-t border-white/10 bg-white/[0.018] p-8 first:border-t-0 md:border-l md:border-t-0 md:p-12 first:md:border-l-0"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1, delay: index * 0.1, ease }}
          >
            <motion.p
              className="apple-display text-6xl leading-none text-[#F6F1E8] md:text-8xl"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: index * 0.12 + 0.1, ease }}
            >
              {stat.value}
            </motion.p>
            <p className="apple-copy mt-7 max-w-xs text-base leading-7 text-[#F6F1E8]/62">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function TrustedBySection() {
  const partners = ["Paris Society", "Kenzo"];

  return (
    <section className="bg-[#050505] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <motion.div
          className="border-y border-white/10 py-12 md:py-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={revealTransition}
        >
          <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-sans text-[11px] uppercase tracking-[0.32em] text-[#C8A96A]/80">
                Ils nous ont fait confiance
              </p>
              <p className="apple-copy mt-4 max-w-[520px] text-base leading-7 text-[#F6F1E8]/50 md:text-lg">
                Des maisons, lieux et univers exigeants, réunis par le goût du détail et de la discrétion.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:min-w-[430px]">
              {partners.map((partner, index) => (
                <motion.div
                  key={partner}
                  className="group rounded-full border border-white/10 px-7 py-5 text-center transition-all duration-500 hover:border-[#C8A96A]/45 hover:bg-white/[0.035]"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.9, delay: index * 0.08, ease }}
                >
                  <span className="font-sans text-[13px] uppercase tracking-[0.26em] text-[#F6F1E8]/72 transition-colors duration-500 group-hover:text-[#F6F1E8]">
                    {partner}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FinalContactFooter() {
  const footerRef = useRef<HTMLElement | null>(null);
  const marqueeText = "RIEN N’EST TROP EXCEPTIONNEL • ".repeat(10);

  useGSAP(
    () => {
      if (!footerRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.to(".footer-marquee", {
        xPercent: -50,
        duration: 58,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: footerRef },
  );

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative overflow-hidden bg-[#050505] pb-8 pt-24 md:pb-12 md:pt-40"
    >
      <video
        className="absolute inset-0 h-full w-full scale-y-[-1] object-cover opacity-28"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      >
        <source src={videoSource} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/76" />

      <div className="footer-marquee pointer-events-none absolute left-0 top-8 z-0 flex whitespace-nowrap apple-display text-[18vw] leading-none text-[#F6F1E8]/10">
        <span>{marqueeText}</span>
        <span>{marqueeText}</span>
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-5xl px-6 text-center md:px-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.32 }}
        transition={{ duration: 1.1, ease }}
      >
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-[#C8A96A]">
          CONTACT
        </p>
        <h2 className="apple-display mx-auto mt-8 max-w-4xl text-5xl leading-[0.98] text-[#F6F1E8] md:text-7xl">
          IMAGINER VOTRE EXPÉRIENCE AVEC NOUS
        </h2>
        <p className="apple-copy mx-auto mt-9 max-w-[680px] text-lg leading-[1.72] text-[#F6F1E8]/62 md:text-xl">
          Une demande confidentielle, une envie précise ou une occasion à célébrer : Maison Chalambert vous répond avec discrétion.
        </p>
        <a
          href="mailto:contact@luxeandtravel.com"
          className="mt-12 inline-flex rounded-full border border-transparent bg-[#F6F1E8] px-8 py-4 font-sans text-sm font-medium uppercase tracking-[0.12em] text-[#050505] no-underline transition-all duration-300 hover:scale-[1.02] hover:border-[#C8A96A]"
        >
          NOUS CONTACTER
        </a>
      </motion.div>

      <div className="relative z-10 mx-auto mt-20 flex max-w-7xl flex-col gap-6 border-t border-white/10 px-6 pt-8 font-sans text-xs uppercase tracking-[0.18em] text-[#F6F1E8]/55 md:mt-28 md:flex-row md:items-center md:justify-between md:px-10 lg:px-16">
        <p>MAISON CHALAMBERT</p>
        <p>Événements · Voyages · Tables · Lifestyle</p>
        <div className="flex flex-wrap items-center gap-5">
          <span className="inline-flex items-center gap-2 normal-case tracking-[0.08em]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#C8A96A]" />
            Disponible pour demandes privées
          </span>
          <a className="text-[#F6F1E8]/55 no-underline transition-colors hover:text-[#F6F1E8]" href="#">
            Instagram
          </a>
          <a className="text-[#F6F1E8]/55 no-underline transition-colors hover:text-[#F6F1E8]" href="mailto:contact@luxeandtravel.com">
            Contact
          </a>
          <a className="text-[#F6F1E8]/55 no-underline transition-colors hover:text-[#F6F1E8]" href="#">
            Mentions légales
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <Navbar />
      <main>
        <Hero />
        <ArtHospitaliteSection />
        <SignaturesSection />
        <ConciergeProcessSection />
        <ParallaxExperiencesSection />
        <StatsSection />
        <TrustedBySection />
        <FinalContactFooter />
      </main>
    </>
  );
}
