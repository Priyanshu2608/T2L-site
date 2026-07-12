"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useMotionValue, useTransform, useInView } from "framer-motion";

export default function StartManageProtect() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={containerRef}
      className="bg-white py-[120px] px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* SECTION LABEL & HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start text-left mb-16"
        >
          {/* Label */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-[#A77A2A]" />
            <span className="text-[11px] md:text-[12px] tracking-[0.16em] uppercase font-mono font-medium text-[#A77A2A]">
              YOUR BUSINESS, END TO END
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-[36px] md:text-[52px] lg:text-[64px] font-bold leading-[1.1] tracking-tight text-[#111111] max-w-[700px] mb-6 font-sans">
            Start, manage, and protect your business.
          </h2>

          {/* Description */}
          <p className="text-[18px] md:text-[22px] leading-[1.7] text-[#666666] max-w-[650px] font-normal">
            From the day you incorporate to the day you defend your brand, one legal OS carries the whole journey. No handoffs, no chasing, no surprise invoices.
          </p>
        </motion.div>

        {/* CARDS CONTAINER */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-0 lg:-space-x-3 items-center mt-12">
          {/* CARD 01: START */}
          <JourneyCard
            index={0}
            isInView={isInView}
            topLabel="01 · START"
            title="Start Your Business"
            description="Launch effortlessly with expert-guided incorporation, registrations, and licensing. Private Limited, OPC, LLP, or Section 8, with the whole process visible before you pay."
            ctaText="Start now"
            ctaHref="/signup"
            rotationClass="lg:-rotate-3 lg:translate-x-3 z-0"
            isFeatured={false}
          >
            <Card1Widget />
          </JourneyCard>

          {/* CARD 02: MANAGE (FEATURED) */}
          <JourneyCard
            index={1}
            isInView={isInView}
            topLabel="02 · MANAGE"
            title="Manage Your Business"
            description="Stay compliant and in control with automated ROC and GST filings, a smart compliance calendar, and reminders on WhatsApp before a deadline can slip."
            ctaText="See how"
            ctaHref="/pricing"
            rotationClass="lg:rotate-0 lg:scale-[1.05] z-10 border-2 border-[#D8AB5B] shadow-lg shadow-black/[0.04]"
            isFeatured={true}
          >
            <Card2Widget active={isInView} />
          </JourneyCard>

          {/* CARD 03: PROTECT */}
          <JourneyCard
            index={2}
            isInView={isInView}
            topLabel="03 · PROTECT"
            title="Protect Your Business"
            description="Secure your brand with trademark registration, watertight contracts drafted by Doc Engine, and legal support from a verified in-house bench of lawyers."
            ctaText="Protect it"
            ctaHref="/services"
            rotationClass="lg:rotate-3 lg:-translate-x-3 z-0"
            isFeatured={false}
          >
            <Card3Widget />
          </JourneyCard>
        </div>
      </div>
    </section>
  );
}

/* ==========================================
   JOURNEY CARD COMPONENT (WITH 3D TILT)
   ========================================== */
function JourneyCard({ 
  index,
  isInView,
  topLabel, 
  title, 
  description, 
  children, 
  ctaText, 
  ctaHref,
  rotationClass = "",
  isFeatured = false
}) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  // Motion values for tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Dynamic transforms based on mouse position
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (event) => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
      animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
      transition={{ 
        duration: 0.8, 
        delay: 0.15 * index,
        ease: "easeOut"
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ 
        rotateX: hovered ? rotateX : 0, 
        rotateY: hovered ? rotateY : 0,
        transformStyle: "preserve-3d"
      }}
      className={`bg-white rounded-[28px] border border-[#EAEAEA] p-8 md:p-10 flex flex-col justify-between min-h-[560px] relative transition-all duration-300 ${
        hovered ? "shadow-xl shadow-black/8 border-[#D8AB5B]/50 -translate-y-2.5 scale-[1.02]" : "shadow-md shadow-black/[0.03]"
      } ${rotationClass}`}
    >
      <div style={{ transform: "translateZ(20px)" }} className="flex flex-col gap-6">
        {/* Top Label */}
        <div className="text-[11px] font-mono tracking-[0.16em] uppercase text-[#6F6F6F]">
          {topLabel}
        </div>

        {/* Title & Arrow */}
        <h3 className="text-[24px] font-bold tracking-tight text-[#111111] font-sans flex items-center justify-between">
          {title}
          <motion.span 
            animate={{ x: hovered ? 4 : 0 }} 
            transition={{ duration: 0.3 }}
            className="text-[#A77A2A]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M5 12h14M13 6l6 6-6 6"></path>
            </svg>
          </motion.span>
        </h3>

        {/* Description */}
        <p className="text-[15px] leading-[1.6] text-[#666666]">
          {description}
        </p>

        {/* Custom Widget */}
        <div className="mt-2">
          {children}
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-8" style={{ transform: "translateZ(10px)" }}>
        <Link 
          href={ctaHref}
          className="group relative inline-flex items-center gap-2 font-medium text-sm text-[#666666] hover:text-[#A77A2A] transition-colors duration-300"
        >
          {ctaText}
          <span className="group-hover:translate-x-1.5 transition-transform duration-300 text-xs">
            →
          </span>
          <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#A77A2A] group-hover:w-full transition-all duration-300 ease-out" />
        </Link>
      </div>
    </motion.div>
  );
}

/* ==========================================
   WIDGETS
   ========================================== */

/* Card 1 Widget: Start */
function Card1Widget() {
  const [hovered, setHovered] = useState(false);
  return (
    <div 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-[#FBFAF7]/80 backdrop-blur-md rounded-2xl border border-[#EAEAEA] p-4 flex items-center justify-between gap-4 transition-all duration-300 hover:bg-[#FBFAF7]"
    >
      <div className="flex items-center gap-3">
        <motion.div 
          animate={{ rotate: hovered ? 12 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-10 h-10 rounded-xl bg-[#D8AB5B]/10 border border-[#D8AB5B]/30 flex items-center justify-center text-[#B98F42]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
            <polyline points="14 3 14 9 20 9"></polyline>
          </svg>
        </motion.div>
        <div>
          <div className="text-sm font-semibold text-[#111111]">Business registration done</div>
          <div className="text-[12px] text-[#6F6F6F]">Completed in just 2 days</div>
        </div>
      </div>
      
      {/* Check Icon with Spring and Glow */}
      <motion.div 
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ 
          type: "spring",
          stiffness: 200,
          damping: 10,
          delay: 0.4
        }}
        className="w-6 h-6 rounded-full bg-[#B98F42] flex items-center justify-center text-white font-bold text-xs shadow-md shadow-[#D8AB5B]/30"
      >
        ✓
      </motion.div>
    </div>
  );
}

/* Card 2 Widget: Manage */
function Card2Widget({ active }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-[#FBFAF7]/80 backdrop-blur-md rounded-2xl border border-[#EAEAEA] p-4 flex flex-col gap-3 transition-all duration-300 hover:bg-[#FBFAF7]"
    >
      <div className="flex items-center gap-3">
        <motion.div 
          animate={{ y: [0, -3, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 3, 
            ease: "easeInOut" 
          }}
          className="w-10 h-10 rounded-xl bg-[#D8AB5B]/10 border border-[#D8AB5B]/30 flex items-center justify-center text-[#B98F42]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <rect x="3" y="4" width="18" height="18" rx="2"></rect>
            <path d="M16 2v4M8 2v4M3 10h18"></path>
          </svg>
        </motion.div>
        <div>
          <div className="text-sm font-semibold text-[#111111]">Filing process</div>
          <div className="text-[12px] text-[#6F6F6F]">Just 3 simple steps</div>
        </div>
      </div>

      {/* Progress bar container */}
      <div className="w-full bg-[#EAEAEA] h-2 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={active ? { width: "65%" } : { width: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeOut", delay: 0.2 }}
          className="h-full bg-gradient-to-r from-[#D8AB5B] to-[#B98F42] rounded-full"
        />
      </div>

      {/* Progress tags */}
      <div className="flex justify-between items-center text-[12px]">
        <span className="text-[#6F6F6F]">MGT-7 annual return</span>
        <b className="text-[#111111]">14 days</b>
      </div>
    </div>
  );
}

/* Card 3 Widget: Protect */
function Card3Widget() {
  const [hovered, setHovered] = useState(false);
  return (
    <div 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-[#FBFAF7]/80 backdrop-blur-md rounded-2xl border border-[#EAEAEA] p-4 flex flex-col gap-3 transition-all duration-300 hover:bg-[#FBFAF7]"
    >
      <div className="flex items-center gap-3">
        <motion.div 
          animate={hovered ? { scale: [1, 1.1, 0.95, 1.05, 1] } : {}}
          transition={{ duration: 0.5 }}
          className="w-10 h-10 rounded-xl bg-[#D8AB5B]/10 border border-[#D8AB5B]/30 flex items-center justify-center text-[#B98F42]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            <path d="M9 12l2 2 4-4"></path>
          </svg>
        </motion.div>
        <div>
          <div className="text-sm font-semibold text-[#111111]">Brand availability</div>
          <div className="text-[12px] text-[#6F6F6F]">Trademark search complete</div>
        </div>
      </div>

      {/* Bottom status row */}
      <div className="flex justify-between items-center border-t border-[#EAEAEA] pt-2 text-[12px]">
        <span className="text-[#6F6F6F]">Availability</span>
        <span className="font-bold text-[#A77A2A] px-2.5 py-0.5 rounded-full bg-[#D8AB5B]/10">
          Very High
        </span>
      </div>
    </div>
  );
}
