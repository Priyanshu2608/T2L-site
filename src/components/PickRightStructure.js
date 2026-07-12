"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function PickRightStructure() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.12,
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 40, 
      scale: prefersReducedMotion ? 1 : 0.97 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.65,
        ease: "easeOut",
      },
    },
  };

  const cardsData = [
    {
      label: "MOST POPULAR",
      title: "Private Limited",
      description: "Best for startups raising capital and issuing ESOPs.",
      bullets: [
        "Separate legal entity",
        "Equity and ESOP ready",
        "Preferred by investors"
      ]
    },
    {
      label: "SOLO FOUNDER",
      title: "OPC",
      description: "One person company for a single founder who wants limited liability.",
      bullets: [
        "One shareholder",
        "Limited liability",
        "Lower compliance load"
      ]
    },
    {
      label: "PARTNERS",
      title: "LLP",
      description: "Limited liability partnership for services firms and small teams.",
      bullets: [
        "Partner liability capped",
        "Flexible profit share",
        "Fewer filings than Pvt Ltd"
      ]
    },
    {
      label: "NON-PROFIT",
      title: "Section 8",
      description: "For mission-driven organisations and foundations.",
      bullets: [
        "Non-profit status",
        "Tax benefits eligible",
        "Grant and CSR ready"
      ]
    }
  ];

  return (
    <section className="py-[120px] px-6 md:px-12 bg-white relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="flex flex-col items-center text-center mb-16"
        >
          {/* Label */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-6 h-[1px] bg-[#D4A24C]" />
            <span className="text-[11px] md:text-[12px] tracking-[0.45em] font-mono font-medium text-[#D4A24C] uppercase">
              START YOUR BUSINESS
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-[34px] md:text-[48px] lg:text-[64px] font-extrabold text-[#111111] leading-tight tracking-tight mb-4">
            Pick the right structure.
          </h2>

          {/* Description */}
          <p className="text-[16px] md:text-[18px] lg:text-[22px] leading-[1.7] text-[#666666] max-w-[760px]">
            Four ways to incorporate in India. We help you choose, then handle the filing end to end.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch"
        >
          {cardsData.map((card, index) => (
            <StructureCard
              key={index}
              label={card.label}
              title={card.title}
              description={card.description}
              bullets={card.bullets}
              variants={cardVariants}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function StructureCard({ label, title, description, bullets, variants, prefersReducedMotion }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={variants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={
        prefersReducedMotion
          ? {}
          : {
              y: -8,
              scale: 1.02,
              borderColor: "#D4A24C",
              boxShadow: "0 12px 24px rgba(212, 162, 76, 0.08), 0 20px 40px rgba(17, 17, 17, 0.04)",
            }
      }
      transition={{
        duration: 0.45,
        ease: [0.22, 0.61, 0.36, 1],
      }}
      className="bg-white rounded-[24px] border border-[#EAEAEA] p-8 md:p-10 flex flex-col justify-between transition-colors shadow-sm duration-300 relative group cursor-default"
    >
      <div>
        {/* Label */}
        <div className="text-[10px] md:text-[11px] font-mono tracking-[0.16em] uppercase text-[#D4A24C] font-semibold mb-4 select-none">
          {label}
        </div>

        {/* Title */}
        <motion.h3
          animate={prefersReducedMotion ? {} : { y: isHovered ? -2 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-[28px] md:text-[32px] font-bold text-[#111111] leading-tight mb-4 select-none"
        >
          {title}
        </motion.h3>

        {/* Description */}
        <p className="text-[14px] md:text-[15px] leading-relaxed text-[#666666] mb-8">
          {description}
        </p>
      </div>

      {/* Bullets */}
      <ul className="flex flex-col gap-4 border-t border-[#F1F1F1] pt-6 text-[14px] text-[#666666]">
        {bullets.map((bullet, idx) => (
          <li key={idx} className="flex items-start gap-3 group/bullet">
            <motion.span
              animate={prefersReducedMotion ? {} : { 
                scale: isHovered ? 1.15 : 1,
                x: isHovered ? 2 : 0
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-[#D4A24C] mt-0.5 flex-none"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
            </motion.span>
            <span className="leading-snug select-none">{bullet}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
