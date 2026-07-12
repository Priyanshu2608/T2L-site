"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { 
  FileText, 
  ShieldCheck, 
  Bell, 
  Plus, 
  Minus, 
  ArrowRight,
  CheckCircle2,
  Linkedin,
  Mail
} from "lucide-react";

export default function LegalServicesRemaining() {
  const [activeFaq, setActiveFaq] = useState(null);
  
  // Ref for prefers-reduced-motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Fade Up Animation Config
  const fadeUpVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 50 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: prefersReducedMotion ? 0 : custom * 0.08,
      }
    })
  };

  const scrollRef = useRef(null);

  return (
    <div className="bg-[#FFFFFF] text-[#111111]" ref={scrollRef}>
      
      {/* 1. PRICING SECTION */}
      <section id="pricing" className="py-24 px-6 md:px-12 bg-[#FFFFFF] border-t border-[#EAEAEA]">
        <div className="max-w-[1280px] mx-auto">
          {/* Section Header */}
          <SectionHeader
            label="PRICING"
            title="What it costs, on the page."
            description="Transparent, all-inclusive fees. No quotes-on-request for standard work. Government fees where applicable are billed at actuals."
            fadeUpVariants={fadeUpVariants}
          />

          {/* Pricing Cards Heading */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
            custom={1}
            className="text-[11px] font-mono tracking-[0.16em] uppercase text-[#6F6F6F] mb-8 font-semibold border-b border-[#EAEAEA] pb-4"
          >
            COMPANY FORMATION • PRIVATE LIMITED COMPANY
          </motion.div>

          {/* Three main pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 items-stretch">
            {/* Card 1: Basic */}
            <PricingCard
              title="Basic"
              price="₹14,999"
              subtitle="one-time"
              description="Everything you need to incorporate"
              features={[
                "DSC and DIN for 2 directors",
                "Name approval (RUN) and MOA / AOA drafting",
                "Company incorporation certificate",
                "Company PAN and TAN"
              ]}
              buttonText="Get started"
              buttonStyle="border border-[#EAEAEA] hover:border-[#111111] text-[#111111] bg-transparent"
              index={0}
              isRecommended={false}
              fadeUpVariants={fadeUpVariants}
              prefersReducedMotion={prefersReducedMotion}
            />

            {/* Card 2: Standard (Recommended) */}
            <PricingCard
              title="Standard"
              price="₹19,999"
              subtitle="one-time"
              description="Incorporate and start operating"
              features={[
                "Everything in Basic",
                "Current bank account and GST registration",
                "Commencement certificate and share certificates",
                "Priority support"
              ]}
              buttonText="Get started"
              buttonStyle="bg-[#D8AB5B] hover:bg-[#B98F42] text-white shadow-md shadow-[#D8AB5B]/25"
              index={1}
              isRecommended={true}
              fadeUpVariants={fadeUpVariants}
              prefersReducedMotion={prefersReducedMotion}
            />

            {/* Card 3: Premium */}
            <PricingCard
              title="Premium"
              price="₹29,999"
              subtitle="one-time"
              description="Incorporate, protect, and stay compliant"
              features={[
                "Everything in Standard",
                "MSME / Udyam and Trademark registration",
                "ESI, PF, and Professional Tax",
                "Dedicated account manager"
              ]}
              buttonText="Get started"
              buttonStyle="border-2 border-[#111111] hover:bg-[#111111] hover:text-white text-[#111111] bg-transparent"
              index={2}
              isRecommended={false}
              fadeUpVariants={fadeUpVariants}
              prefersReducedMotion={prefersReducedMotion}
            />
          </div>

          {/* Subheading for mini-pricing */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
            custom={0}
            className="text-[11px] font-mono tracking-[0.16em] uppercase text-[#6F6F6F] mb-8 font-semibold border-b border-[#EAEAEA] pb-4"
          >
            MORE SERVICES • STARTING PRICES
          </motion.div>

          {/* Six starting price cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { title: "One Person Company", price: "₹12,999", info: "Basic plan. Standard and Premium available." },
              { title: "Limited Liability Partnership", price: "₹11,999", info: "Basic plan. Standard and Premium available." },
              { title: "Partnership Firm", price: "₹8,999", info: "Basic plan. Standard and Premium available." },
              { title: "GST Registration", price: "₹2,999", info: "Basic plan. Return-filing plans from ₹999 / month." },
              { title: "Import Export Code", price: "₹2,999", info: "Basic plan, lifetime validity." },
              { title: "ROC Annual Compliance", price: "₹18,000", period: "/ year", info: "AOC-4, MGT-7, DIR-3 KYC, registers, and calendar." }
            ].map((svc, i) => (
              <MiniPriceCard 
                key={i} 
                title={svc.title} 
                price={svc.price} 
                period={svc.period} 
                info={svc.info} 
                index={i}
                fadeUpVariants={fadeUpVariants}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>

          {/* Bottom disclaimer */}
          <motion.p 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            custom={2}
            className="text-[10.5px] md:text-[11.5px] font-mono tracking-[0.1em] text-center text-[#6F6F6F] mt-12 leading-relaxed uppercase"
          >
            ALL-INCLUSIVE OF PROFESSIONAL FEES. GOVERNMENT AND STATUTORY FEES BILLED AT ACTUALS. NO GSTIN APPEARS UNTIL REGISTRATION IS ACTIVE.
          </motion.p>
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section className="py-24 px-6 md:px-12 bg-[#FBFAF7] border-t border-[#EAEAEA]">
        <div className="max-w-[1280px] mx-auto">
          <SectionHeader
            label="HOW IT WORKS"
            title="From order to delivered, in the open."
            fadeUpVariants={fadeUpVariants}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
            {/* Step 1 */}
            <StepCard
              step="STEP 01"
              title="Tell us what you need"
              body="Pick a service or describe your matter. You see the scope, the documents required, and the price before anything begins."
              icon={<FileText className="w-6 h-6 stroke-[#B98F42] stroke-[1.8]" />}
              index={0}
              fadeUpVariants={fadeUpVariants}
              prefersReducedMotion={prefersReducedMotion}
            />

            {/* Step 2 */}
            <StepCard
              step="STEP 02"
              title="We verify and file"
              body="Your assigned professional collects KYC, prepares the paperwork, and files with the MCA or the relevant authority."
              icon={<ShieldCheck className="w-6 h-6 stroke-[#B98F42] stroke-[1.8]" />}
              index={1}
              fadeUpVariants={fadeUpVariants}
              prefersReducedMotion={prefersReducedMotion}
            />

            {/* Step 3 */}
            <StepCard
              step="STEP 03"
              title="Track to delivered"
              body="Every stage is visible live with a named owner. Deliverables land in your locker and your compliance calendar switches on."
              icon={<Bell className="w-6 h-6 stroke-[#B98F42] stroke-[1.8]" />}
              index={2}
              fadeUpVariants={fadeUpVariants}
              prefersReducedMotion={prefersReducedMotion}
            />
          </div>
        </div>
      </section>

      {/* 3. TRADITIONAL COMPARISON */}
      <section className="py-24 px-6 md:px-12 bg-[#FFFFFF] border-t border-[#EAEAEA]">
        <div className="max-w-[1280px] mx-auto">
          <SectionHeader
            label="WHY TURN2LAW"
            title="Traditional legal services, rebuilt."
            fadeUpVariants={fadeUpVariants}
          />

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
            custom={1}
            className="overflow-x-auto mt-12 border border-[#EAEAEA] rounded-2xl"
          >
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-[#EAEAEA] bg-[#FBFAF7]/60">
                  <th className="p-5 font-mono text-[11px] tracking-[0.16em] uppercase text-[#6F6F6F] font-semibold w-[20%]">Dimension</th>
                  <th className="p-5 font-mono text-[11px] tracking-[0.16em] uppercase text-[#6F6F6F] font-semibold w-[40%]">Traditional</th>
                  <th className="p-5 font-mono text-[11px] tracking-[0.16em] uppercase text-[#B98F42] font-semibold w-[40%]">Turn2Law</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { dim: "Access", trad: "Referral-driven, office hours", t2l: "One platform, wherever you are" },
                  { dim: "Cost", trad: "High retainers from day one", t2l: "Per-service and subscription tiers" },
                  { dim: "Speed", trad: "Days to weeks for a first draft", t2l: "Services on defined timelines" },
                  { dim: "Tracking", trad: "Email chains and phone tag", t2l: "Live status, a named owner per matter" }
                ].map((row, i) => (
                  <motion.tr 
                    key={i}
                    whileHover={prefersReducedMotion ? {} : { backgroundColor: "rgba(216, 171, 91, 0.03)" }}
                    className="border-b border-[#EAEAEA] last:border-none transition-colors duration-200"
                  >
                    <td className="p-5 font-semibold text-[#111111] text-sm md:text-base">{row.dim}</td>
                    <td className="p-5 text-[#666666] text-sm md:text-base">{row.trad}</td>
                    <td className="p-5 text-[#111111] font-medium text-sm md:text-base flex items-center gap-2.5">
                      <span className="text-[#D8AB5B] font-bold">—</span>
                      {row.t2l}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* 4. TESTIMONIALS */}
      <section className="py-24 px-6 md:px-12 bg-[#FBFAF7] border-t border-[#EAEAEA]">
        <div className="max-w-[1280px] mx-auto">
          <SectionHeader
            label="WHAT FOUNDERS SAY"
            title="Trusted by teams building fast."
            fadeUpVariants={fadeUpVariants}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
            {[
              {
                text: "Turn2Law incorporated us in eleven days flat, every stage visible, no chasing anyone on email. It felt like software, not a law firm.",
                name: "Ananya Rao",
                role: "Founder · ICEBRKR",
                initials: "AR"
              },
              {
                text: "The compliance calendar caught an MGT-7 deadline we would have missed. That single reminder more than paid for the platform.",
                name: "Sara Nair",
                role: "Founder · Serene Neurotech",
                initials: "SN"
              },
              {
                text: "One platform for incorporation, contracts, and compliance. Genuinely the legal ops layer for our whole company.",
                name: "Ishaan Sharma",
                role: "Founder · Motioncomm",
                initials: "IS"
              }
            ].map((tst, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUpVariants}
                custom={i}
                whileHover={prefersReducedMotion ? {} : { y: -8, boxShadow: "0 20px 40px rgba(17,17,17,0.06)" }}
                className="bg-white rounded-3xl border border-[#EAEAEA] p-8 flex flex-col justify-between shadow-sm relative transition-all duration-300 min-h-[250px]"
              >
                <div className="text-[64px] font-serif text-[#D8AB5B]/20 absolute top-4 left-6 select-none pointer-events-none">
                  &ldquo;
                </div>
                <p className="text-[#666666] leading-[1.65] relative z-10 text-base mb-8">
                  {tst.text}
                </p>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-11 h-11 rounded-full bg-[#D8AB5B]/10 border border-[#D8AB5B]/20 text-[#A77A2A] font-bold text-sm flex items-center justify-center select-none">
                    {tst.initials}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#111111] flex items-center gap-1.5">
                      {tst.name}
                      <span className="w-3.5 h-3.5 rounded-full bg-[#B98F42] flex items-center justify-center text-white text-[8px]">✓</span>
                    </h4>
                    <p className="text-xs text-[#6F6F6F] mt-0.5">{tst.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQ */}
      <section id="faq" className="py-24 px-6 md:px-12 bg-[#FFFFFF] border-t border-[#EAEAEA]">
        <div className="max-w-[760px] mx-auto">
          <SectionHeader
            label="FREQUENTLY ASKED"
            title="Questions, answered."
            center={true}
            fadeUpVariants={fadeUpVariants}
          />

          <div className="mt-12 flex flex-col gap-1 border-t border-[#EAEAEA]">
            {[
              {
                q: "Which company structure should I choose?",
                a: "Most funded startups incorporate as a Private Limited company because it is equity and ESOP ready and preferred by investors. Solo founders often pick an OPC, services firms an LLP, and non-profits a Section 8 company. We help you decide before filing."
              },
              {
                q: "How long does incorporation take?",
                a: "Timelines depend on name approval and government processing, but the whole process is visible before you pay and tracked live with a named owner. Early clients have been incorporated in under two weeks."
              },
              {
                q: "What is included in ROC annual compliance?",
                a: "The confirmed package at ₹18,000 per year covers AOC-4 and MGT-7 annual filings, DIR-3 KYC, statutory registers, board minutes, and a compliance calendar with reminders on email and WhatsApp."
              },
              {
                q: "Who actually does the work?",
                a: "An in-house bench of lawyers, CAs, and CS professionals, with a named owner on every matter. Turn2Law is a technology platform, not a law firm, and does not provide legal representation."
              },
              {
                q: "When will a GSTIN appear on invoices?",
                a: "GST registration is pending. No GSTIN is printed on any document until it is confirmed active."
              }
            ].map((faq, i) => (
              <FaqAccordionItem
                key={i}
                q={faq.q}
                a={faq.a}
                isOpen={activeFaq === i}
                onClick={() => toggleFaq(i)}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA BANNER */}
      <section className="py-16 px-6 md:px-12 bg-[#FFFFFF]">
        <div className="max-w-[1280px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-[#0A1628] rounded-[36px] p-10 md:p-20 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[380px]"
          >
            {/* Logo Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none blur-[4px]">
              <svg viewBox="0 0 96 118" className="w-[300px] md:w-[480px] text-white">
                <path d="M13 108 V26 L70 100 V34" fill="none" stroke="currentColor" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M49 44 L70 18 L91 44" fill="none" stroke="currentColor" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>

            <div className="relative z-10 max-w-[640px] flex flex-col items-center">
              <h2 className="text-[28px] md:text-[44px] font-bold text-white leading-tight font-sans tracking-tight mb-4">
                Start your company the right way.
              </h2>
              <p className="text-[#A4B3C6] text-sm md:text-base leading-relaxed mb-8 max-w-[500px]">
                Incorporation, registrations, and compliance on one platform, with a named owner at every stage.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <motion.div whileHover={prefersReducedMotion ? {} : { scale: 1.03 }} whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}>
                  <Link 
                    href="/signup" 
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D8AB5B] hover:bg-[#B98F42] text-white font-semibold text-sm px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-[#D8AB5B]/15"
                  >
                    Get started
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
                <motion.div whileHover={prefersReducedMotion ? {} : { scale: 1.03 }} whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}>
                  <Link 
                    href="/#contact" 
                    className="w-full sm:w-auto inline-flex items-center justify-center border border-[#A4B3C6]/30 hover:border-[#A4B3C6]/60 text-white font-semibold text-sm px-8 py-4 rounded-xl bg-transparent transition-all duration-300"
                  >
                    Talk to us
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

/* ==========================================
   SUB-COMPONENTS
   ========================================== */

/* Section Header */
function SectionHeader({ label, title, description, center = false, fadeUpVariants }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeUpVariants}
      custom={0}
      className={`flex flex-col ${center ? "items-center text-center" : "items-start text-left"} mb-12`}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="w-6 h-[1px] bg-[#A77A2A]" />
        <span className="text-[11px] tracking-[0.16em] uppercase font-mono font-medium text-[#A77A2A]">{label}</span>
      </div>
      <h2 className="text-[28px] md:text-[40px] font-bold text-[#111111] leading-tight tracking-tight font-sans mb-4">
        {title}
      </h2>
      {description && (
        <p className={`text-[15px] md:text-[16px] leading-[1.65] text-[#666666] max-w-[680px]`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}

/* Pricing Card */
function PricingCard({ 
  title, 
  price, 
  subtitle, 
  description, 
  features, 
  buttonText, 
  buttonStyle, 
  index,
  isRecommended,
  fadeUpVariants,
  prefersReducedMotion
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeUpVariants}
      custom={index}
      whileHover={prefersReducedMotion ? {} : { y: -8, boxShadow: "0 20px 40px rgba(17,17,17,0.06)" }}
      className={`bg-white rounded-[28px] p-8 md:p-10 flex flex-col justify-between relative transition-all duration-300 border ${
        isRecommended 
          ? "border-[#D8AB5B] shadow-md shadow-[#D8AB5B]/5" 
          : "border-[#EAEAEA] shadow-sm"
      }`}
    >
      {isRecommended && (
        <div className="absolute -top-3.5 left-8 bg-[#D8AB5B] text-white text-[9.5px] font-mono tracking-[0.16em] font-bold uppercase py-1 px-3 rounded-full border border-[#D8AB5B] select-none">
          RECOMMENDED
        </div>
      )}
      <div>
        <div className="text-[11px] font-mono tracking-[0.16em] uppercase text-[#6F6F6F] mb-6">{title}</div>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-[36px] md:text-[44px] font-bold text-[#111111] tracking-tight">{price}</span>
          <span className="text-xs text-[#6F6F6F] font-mono">{subtitle}</span>
        </div>
        <p className="text-[13.5px] text-[#6F6F6F] mb-8">{description}</p>
        <ul className="flex flex-col gap-4 border-t border-[#EAEAEA] pt-6 mb-8 text-[14px] text-[#666666]">
          {features.map((feat, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="text-[#D8AB5B] font-bold mt-0.5 select-none">—</span>
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      <motion.div 
        whileHover={prefersReducedMotion ? {} : { scale: 1.03 }} 
        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
        className="w-full mt-4"
      >
        <Link 
          href="/signup" 
          className={`w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 ${buttonStyle}`}
        >
          {buttonText}
        </Link>
      </motion.div>
    </motion.div>
  );
}

/* Mini Price Card */
function MiniPriceCard({ title, price, period = "one-time", info, index, fadeUpVariants, prefersReducedMotion }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeUpVariants}
      custom={index % 3}
      whileHover={prefersReducedMotion ? {} : { y: -4, borderColor: "#B98F42" }}
      className="bg-white rounded-2xl border border-[#EAEAEA] p-6 shadow-sm flex flex-col justify-between gap-3 transition-all duration-200"
    >
      <div>
        <div className="text-[11px] font-mono tracking-[0.16em] uppercase text-[#6F6F6F] mb-2">{title}</div>
        <div className="flex items-baseline gap-1.5 mb-1">
          <span className="text-[20px] md:text-[24px] font-bold text-[#111111] tracking-tight">{price}</span>
          <span className="text-[10px] text-[#6F6F6F] font-mono">{period}</span>
        </div>
      </div>
      <p className="text-[12px] text-[#6F6F6F] leading-normal border-t border-[#F1F1F1] pt-2">{info}</p>
    </motion.div>
  );
}

/* Step Card for "How It Works" */
function StepCard({ step, title, body, icon, index, fadeUpVariants, prefersReducedMotion }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeUpVariants}
      custom={index}
      whileHover={prefersReducedMotion ? {} : { y: -6, borderColor: "#B98F42" }}
      className="bg-white rounded-[28px] border border-[#EAEAEA] p-8 shadow-sm flex flex-col gap-6 transition-all duration-300"
    >
      {/* Circle Icon Container */}
      <div className="w-12 h-12 rounded-2xl bg-[#FBFAF7] border border-[#EAEAEA] flex items-center justify-center">
        {icon}
      </div>
      <div>
        <div className="text-[10.5px] font-mono tracking-[0.16em] uppercase text-[#A77A2A] font-semibold mb-2">{step}</div>
        <h3 className="text-lg font-bold text-[#111111] font-sans mb-3">{title}</h3>
        <p className="text-sm leading-relaxed text-[#666666]">{body}</p>
      </div>
    </motion.div>
  );
}

/* FAQ Accordion Item */
function FaqAccordionItem({ q, a, isOpen, onClick, prefersReducedMotion }) {
  return (
    <div className="border-b border-[#EAEAEA]">
      <button 
        type="button" 
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left font-semibold text-[#111111] hover:text-[#A77A2A] transition-colors duration-200 text-sm md:text-base"
      >
        <span className="pr-4">{q}</span>
        <motion.span
          animate={{ rotate: prefersReducedMotion ? 0 : (isOpen ? 135 : 0) }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-[#B98F42] flex-none"
        >
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: "auto", 
              opacity: 1,
              transition: {
                height: { duration: prefersReducedMotion ? 0 : 0.3, ease: "easeOut" },
                opacity: { duration: 0.25, delay: prefersReducedMotion ? 0 : 0.05 }
              }
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
              transition: {
                height: { duration: prefersReducedMotion ? 0 : 0.25, ease: "easeIn" },
                opacity: { duration: 0.15 }
              }
            }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-sm md:text-base leading-relaxed text-[#666666] pr-8 pl-0.5">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
