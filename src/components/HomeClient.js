"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Tilt from "./Tilt";

export default function HomeClient() {
  const [activeFaq, setActiveFaq] = useState(0); // First FAQ open by default
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    consent: false
  });
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    email: "",
    message: "",
    consent: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSending, setFormSending] = useState(false);

  const heroGlowRef = useRef(null);

  // Toggle body.dark-hero class for header overlay styling
  useEffect(() => {
    document.body.classList.add("dark-hero");
    
    const handleScroll = () => {
      if (typeof window === "undefined" || !heroGlowRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const y = window.pageYOffset || document.documentElement.scrollTop;
      if (y < 900) {
        heroGlowRef.current.style.transform = `translateY(${y * 0.12}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.body.classList.remove("dark-hero");
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    // Clear error on input
    setFormErrors((prev) => ({
      ...prev,
      [name === "firstName" ? "firstName" : name]: ""
    }));
  };

  const handleFaqToggle = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { firstName, email, message, consent } = formValues;
    const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    let firstBad = "";
    const errors = { firstName: "", email: "", message: "", consent: "" };

    if (!firstName.trim()) {
      errors.firstName = "Please enter your first name.";
      firstBad = firstBad || "fn";
    }
    if (!email.trim()) {
      errors.email = "Please enter your email.";
      firstBad = firstBad || "em";
    } else if (!okEmail) {
      errors.email = "Enter a valid email address.";
      firstBad = firstBad || "em";
    }
    if (!message.trim()) {
      errors.message = "Please tell us what you need help with.";
      firstBad = firstBad || "msg";
    }
    if (!consent) {
      errors.consent = "Please accept the Privacy Policy to continue.";
      firstBad = firstBad || "consent";
    }

    setFormErrors(errors);

    if (firstBad) {
      const el = document.getElementById(firstBad);
      if (el) el.focus();
      return;
    }

    setFormSending(true);
    setTimeout(() => {
      setFormSending(false);
      setFormSubmitted(true);
      setFormValues({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
        consent: false
      });
    }, 700);
  };

  return (
    <main id="top">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-mesh"></div>
          <div className="hero-grid-lines"></div>
          <div className="nglow" ref={heroGlowRef}>
            <svg viewBox="0 0 96 118" fill="none" stroke="currentColor" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 108 V26 L70 100 V34"></path>
              <path d="M49 44 L70 18 L91 44"></path>
            </svg>
          </div>
        </div>
        <div className="wrap hero-inner">
          <div className="hero-copy">
            <img 
              className="hero-logo reveal" 
              src="/turn2law-logo.png" 
              loading="eager" 
              alt="Turn2Law" 
              width="1620" 
              height="460" 
            />
            <span className="hero-badge reveal" style={{ "--d": "60ms" }}>
              <span className="dot"></span>India's Legal Operating System
              <span className="tag">EST. 2025</span>
            </span>
            <h1 className="reveal" style={{ "--d": "80ms" }}>
              We simplify legal<br />access for <span class="g">everyone.</span>
            </h1>
            <p className="hero-sub reveal" style={{ "--d": "160ms" }}>One platform. Founders and lawyers. Grounded in Indian law.</p>
            <div className="hero-ctas reveal" style={{ "--d": "240ms" }}>
              <a href="#products" className="btn btn-gold">
                Explore products
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6"></path>
                </svg>
              </a>
              <Link href="/introspector" className="btn btn-ghost">
                Try Introspector <span className="pill">24/7 AI</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span className="marquee-item">ICEBRKR<span></span>Sentinel Layer<span></span>Serene Neurotech<span></span>Motioncomm<span></span>Withera Labs<span></span></span>
          <span className="marquee-item">ICEBRKR<span></span>Sentinel Layer<span></span>Serene Neurotech<span></span>Motioncomm<span></span>Withera Labs<span></span></span>
        </div>
      </div>

      {/* PRODUCTS SECTION */}
      <section id="products" className="pad sec-amb">
        <div className="ablob" style={{ top: "-14%", right: "-8%", width: "400px", height: "400px", background: "radial-gradient(circle,rgba(216,171,91,.22),transparent 70%)" }}></div>
        <div className="ablob" style={{ bottom: "-16%", left: "-8%", width: "360px", height: "360px", background: "radial-gradient(circle,rgba(216,171,91,.16),transparent 70%)", animationDelay: "3s", animationDirection: "reverse" }}></div>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">The platform</span>
            <h2 class="h2 reveal" style={{ "--d": "80ms" }}>Three products. One legal OS.</h2>
            <p className="lede reveal" style={{ "--d": "140ms" }}>Everything Turn2Law does lives in one of three products: prepare the case, deliver the legal work, or draft the document. All grounded in Indian law, the IPC, BNS, and 50+ statutes that govern your work.</p>
          </div>
          <div className="products">
            <Tilt href="/introspector" className="pcard dark reveal" style={{ "--d": "80ms" }}>
              <div className="p-num">01 · Introspector</div>
              <div className="p-ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7"></circle>
                  <path d="M21 21l-4.35-4.35M11 8v6M8 11h6"></path>
                </svg>
              </div>
              <div className="p-name">Introspector</div>
              <p className="p-desc">The lawyer's AI research bench. Precedent search, statute mapping, and case strategy, with a citation on every claim it makes.</p>
              <div className="p-visual">
                <span className="chip"><i></i>IPC → BNS</span>
                <span className="chip"><i></i>Precedents</span>
                <span className="chip"><i></i>Cited ✓</span>
              </div>
              <span className="p-link">
                Meet the bench 
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6"></path>
                </svg>
              </span>
            </Tilt>
            <Tilt href="/legal-services" className="pcard reveal" style={{ "--d": "160ms" }}>
              <div className="p-num">02 · Legal Services</div>
              <div className="p-ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <div className="p-name">Legal Services</div>
              <p className="p-desc">Done right, not just fast. Incorporation, compliance, trademark, and advisory, delivered by an in-house bench of lawyers, CAs, and CS professionals.</p>
              <div className="p-visual">
                <span className="chip"><i></i>Incorporation</span>
                <span className="chip"><i></i>GST · MSME</span>
                <span className="chip"><i></i>ROC</span>
                <span className="chip"><i></i>Trademark</span>
              </div>
              <span className="p-link">
                See the catalogue 
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6"></path>
                </svg>
              </span>
            </Tilt>
            <Tilt href="/docengine" className="pcard reveal" style={{ "--d": "240ms" }}>
              <div className="p-num">03 · Doc Engine</div>
              <div className="p-ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                  <polyline points="14 3 14 9 20 9"></polyline>
                  <line x1="8" y1="13" x2="15" y2="13"></line>
                  <line x1="8" y1="17" x2="13" y2="17"></line>
                </svg>
              </div>
              <div className="p-name">Doc Engine</div>
              <p className="p-desc">Generate NDAs, agreements, legal notices, and contracts in minutes. Plain language in, an India-specific drafted document out.</p>
              <div className="p-visual">
                <span className="chip"><i></i>NDA</span>
                <span className="chip"><i></i>Founders' Agmt</span>
                <span className="chip"><i></i>Employment</span>
                <span className="chip"><i></i>Notice</span>
              </div>
              <span className="p-link">
                Draft a document 
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6"></path>
                </svg>
              </span>
            </Tilt>
          </div>
        </div>
      </section>

      {/* BENTO GRID */}
      <section className="pad-t sec-amb">
        <div className="ablob" style={{ top: "-10%", left: "-6%", width: "380px", height: "380px", background: "radial-gradient(circle,rgba(216,171,91,.2),transparent 70%)" }}></div>
        <div className="ablob" style={{ bottom: "-18%", right: "-6%", width: "420px", height: "420px", background: "radial-gradient(circle,rgba(216,171,91,.16),transparent 70%)", animationDelay: "2s", animationDirection: "reverse" }}></div>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">What the platform does</span>
            <h2 className="h2 reveal" style={{ "--d": "80ms" }}>Friction, removed piece by piece.</h2>
          </div>
          <div className="bento">
            <Tilt className="bcell feat reveal">
              <div>
                <div className="k">Compliance calendar</div>
                <div className="bt" style={{ fontSize: "19px" }}>Deadlines surfaced before they are missed.</div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "20px", flexWrap: "wrap" }}>
                <div>
                  <div className="big">14<s>days</s></div>
                  <div className="note">to MGT-7 annual return · reminded on WhatsApp</div>
                </div>
                <Link href="/legal-services" className="file-btn">Engage Turn2Law to file</Link>
              </div>
            </Tilt>
            <Tilt className="bcell reveal" style={{ "--d": "80ms" }}>
              <div className="k">Order tracking</div>
              <div className="bt">A named owner at every stage</div>
              <div className="bd">Received to Delivered, visible live. No email chains.</div>
            </Tilt>
            <Tilt className="bcell reveal" style={{ "--d": "140ms" }}>
              <div className="k">Doc Engine</div>
              <div className="bt">Drafts in under 60 seconds</div>
              <div className="bd">Assembled from a versioned, India-specific clause library.</div>
            </Tilt>
            <Tilt className="bcell reveal" style={{ "--d": "200ms" }}>
              <div className="k">E-signature</div>
              <div className="bt">Sign online, audit trail included</div>
              <div className="bd">Executed versions lock, exportable to PDF and DOCX forever.</div>
            </Tilt>
            <Tilt className="bcell dark reveal" style={{ "--d": "260ms" }}>
              <div className="k">Introspector</div>
              <div className="bt">Every claim carries a citation</div>
              <div className="bd">Uncited research is blocked at the pipeline level.</div>
            </Tilt>
          </div>
        </div>
      </section>

      {/* PILLAR 01: LEGAL SERVICES SPOTLIGHT */}
      <section id="legal-services" className="pad">
        <div className="wrap">
          <div className="split">
            <div>
              <span className="kicker reveal" style={{ color: "var(--gold-text)" }}>Pillar 01 · Legal Services</span>
              <h2 className="h2 reveal" style={{ "--d": "80ms" }}>Done right,<br />not just fast.</h2>
              <p className="lede reveal" style={{ "--d": "140ms" }}>Human-delivered legal, compliance, and IP work, sold and tracked like a modern product. Incorporation, registrations, ROC compliance, trademark, and advisory, all on one platform with an in-house bench behind it.</p>
              <div className="hp-chips reveal" style={{ "--d": "200ms", marginTop: "24px" }}>
                <span className="chip"><i></i>Incorporation</span>
                <span className="chip"><i></i>GST · MSME</span>
                <span className="chip"><i></i>ROC compliance</span>
                <span className="chip"><i></i>Trademark</span>
                <span className="chip"><i></i>Virtual GC</span>
              </div>
              <div className="hero-ctas reveal" style={{ "--d": "260ms", justifyContent: "flex-start", marginTop: "30px" }}>
                <Link href="/legal-services" className="btn btn-gold">
                  See the catalogue
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6"></path>
                  </svg>
                </Link>
                <Link href="/legal-services#pricing" className="btn btn-ghost">View pricing</Link>
              </div>
            </div>
            <div className="reveal" style={{ "--d": "160ms" }}>
              <div className="glasscard" style={{ position: "relative", padding: "26px", background: "var(--bg-tint)", boxShadow: "var(--shadow-md)" }}>
                <div className="k mono" style={{ fontSize: "10px", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--gray)", marginBottom: "18px" }}>Order · Received → Delivered</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <div style={{ display: "flex", gap: "14px", padding: "12px 0" }}>
                    <div style={{ flex: "none", width: "22px", height: "22px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Mono',monospace", fontSize: "10px", fontWeight: "500", background: "var(--gold)", color: "#111" }}>✓</div>
                    <div>
                      <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: "600", fontSize: "14px" }}>Received</div>
                      <div style={{ fontSize: "12px", color: "var(--gray)", lineHeight: "1.5" }}>Your order and matter are created; an invoice is issued within two minutes.</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "14px", padding: "12px 0", borderTop: "1px solid var(--line)" }}>
                    <div style={{ flex: "none", width: "22px", height: "22px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Mono',monospace", fontSize: "10px", fontWeight: "500", background: "var(--gold)", color: "#111" }}>✓</div>
                    <div>
                      <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: "600", fontSize: "14px" }}>Documents verified</div>
                      <div style={{ fontSize: "12px", color: "var(--gray)", lineHeight: "1.5" }}>Each KYC item shows its status with a reason in plain language.</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "14px", padding: "12px 0", borderTop: "1px solid var(--line)" }}>
                    <div style={{ flex: "none", width: "22px", height: "22px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Mono',monospace", fontSize: "10px", fontWeight: "500", background: "var(--bg)", border: "1px solid var(--line)", color: "var(--gray)" }}>3</div>
                    <div>
                      <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: "600", fontSize: "14px" }}>Filed</div>
                      <div style={{ fontSize: "12px", color: "var(--gray)", lineHeight: "1.5" }}>Your assigned professional files with the MCA; you see who owns it.</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "14px", padding: "12px 0", borderTop: "1px solid var(--line)" }}>
                    <div style={{ flex: "none", width: "22px", height: "22px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Mono',monospace", fontSize: "10px", fontWeight: "500", background: "var(--bg)", border: "1px solid var(--line)", color: "var(--gray)" }}>4</div>
                    <div>
                      <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: "600", fontSize: "14px" }}>Delivered</div>
                      <div style={{ fontSize: "12px", color: "var(--gray)", lineHeight: "1.5" }}>Everything lands in your locker, and your compliance calendar switches on.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PILLAR 02: DOC ENGINE PREVIEW */}
      <section id="docengine-preview" className="pad">
        <div className="wrap">
          <div className="split">
            <div className="reveal" style={{ "--d": "160ms" }}>
              <div className="de-panel" style={{ padding: "clamp(24px, 3vw, 32px)" }}>
                <div className="nglow">
                  <svg viewBox="0 0 96 118" fill="none" stroke="currentColor" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 108 V26 L70 100 V34"></path>
                    <path d="M49 44 L70 18 L91 44"></path>
                  </svg>
                </div>
                <div className="mono" style={{ fontSize: "10px", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "18px", position: "relative", zIndex: 1 }}>Prompt in → drafted document out</div>
                <div className="flow" style={{ position: "relative", zIndex: 1 }}>
                  <div className="step">
                    <div className="sn">STEP 01</div>
                    <div className="st">Prompt</div>
                    <div className="sd">Describe what you need in plain language.</div>
                  </div>
                  <div className="step">
                    <div className="sn">STEP 02</div>
                    <div className="st">Review</div>
                    <div className="sd">Every clause explained; one-sided terms flagged.</div>
                  </div>
                  <div className="step">
                    <div className="sn">STEP 03</div>
                    <div className="st">Execute</div>
                    <div className="sd">Sign online, export to PDF and DOCX, kept forever.</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <span className="kicker reveal" style={{ color: "var(--gold-text)" }}>Pillar 02 · Doc Engine</span>
              <h2 className="h2 reveal" style={{ "--d": "80ms" }}>Prompt in.<br />Drafted document out.</h2>
              <p className="lede reveal" style={{ "--d": "140ms" }}>A founder describes what they need in plain language and receives a well-drafted, India-specific legal document in minutes, with the option to bring in a Turn2Law lawyer when the stakes rise.</p>
              <div className="hp-chips reveal" style={{ "--d": "200ms", marginTop: "24px" }}>
                <span className="chip"><i></i>NDA</span>
                <span className="chip"><i></i>Founders' Agmt</span>
                <span className="chip"><i></i>Employment</span>
                <span className="chip"><i></i>Privacy Policy</span>
                <span className="chip"><i></i>Term Sheet</span>
              </div>
              <div className="hero-ctas reveal" style={{ "--d": "260ms", justifyContent: "flex-start", marginTop: "30px" }}>
                <Link href="/docengine" className="btn btn-gold">
                  Try Doc Engine
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6"></path>
                  </svg>
                </Link>
                <Link href="/docengine" className="btn btn-ghost">See templates</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PILLAR 03: INTROSPECTOR PREVIEW (dark) */}
      <section id="introspector-preview" className="intro-sec pad">
        <div className="nglow" style={{ top: "8%", right: "-8%", width: "480px", height: "560px", opacity: ".2" }}>
          <svg viewBox="0 0 96 118" fill="none" stroke="currentColor" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 108 V26 L70 100 V34"></path>
            <path d="M49 44 L70 18 L91 44"></path>
          </svg>
        </div>
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <div className="split">
            <div>
              <span className="kicker reveal" style={{ color: "var(--gold)" }}>Pillar 03 · Introspector</span>
              <h2 className="h2 reveal" style={{ "--d": "80ms" }}>The bench<br />you never had.</h2>
              <p className="lede reveal" style={{ "--d": "140ms" }}>An AI research and strategy agent for practising lawyers. Precedent search, statute mapping, and case organisation, with a citation on every claim it makes.</p>
              <div className="hp-chips reveal" style={{ "--d": "200ms", marginTop: "24px" }}>
                <span className="chip"><i></i>Research</span>
                <span className="chip"><i></i>Statute maps</span>
                <span className="chip"><i></i>Case file</span>
                <span className="chip"><i></i>Strategy</span>
                <span className="chip"><i></i>Vault</span>
              </div>
              <div className="hero-ctas reveal" style={{ "--d": "260ms", justifyContent: "flex-start", marginTop: "30px" }}>
                <Link href="/introspector" className="btn btn-gold" style={{ background: "var(--gold)", color: "#111" }}>
                  Join the pilot
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6"></path>
                  </svg>
                </Link>
                <Link href="/introspector" className="btn btn-ghost" style={{ background: "rgba(255,255,255,.06)", color: "#fff", borderColor: "rgba(255,255,255,.2)" }}>
                  See capabilities
                </Link>
              </div>
            </div>
            <div className="reveal" style={{ "--d": "160ms" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "14px" }}>
                <div className="icap">
                  <div className="k">Research</div>
                  <div className="cn" style={{ fontSize: "15px", margin: "10px 0 6px" }}>Precedent search, cited</div>
                  <div className="cb" style={{ fontSize: "12px" }}>Every claim carries a citation formatted for filings.</div>
                </div>
                <div className="icap">
                  <div className="k">Statute maps</div>
                  <div className="cn" style={{ fontSize: "15px", margin: "10px 0 6px" }}>IPC ↔ BNS, both ways</div>
                  <div className="cb" style={{ fontSize: "12px" }}>Cross-mapped across IPC, CrPC, and Evidence Act.</div>
                </div>
                <div className="icap">
                  <div className="k">Case file</div>
                  <div className="cn" style={{ fontSize: "15px", margin: "10px 0 6px" }}>Organises itself</div>
                  <div className="cb" style={{ fontSize: "12px" }}>OCR and auto-classification of FIRs and orders.</div>
                </div>
                <div className="icap">
                  <div className="k">Vault</div>
                  <div className="cn" style={{ fontSize: "15px", margin: "10px 0 6px" }}>Privilege, by design</div>
                  <div className="cb" style={{ fontSize: "12px" }}>Encrypted, per-case access, every access logged.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AUDIENCES FORKS */}
      <section className="pad sec-amb">
        <div className="ablob" style={{ top: "-12%", right: "-8%", width: "380px", height: "380px", background: "radial-gradient(circle,rgba(216,171,91,.2),transparent 70%)" }}></div>
        <div className="ablob" style={{ bottom: "-14%", left: "-8%", width: "340px", height: "340px", background: "radial-gradient(circle,rgba(216,171,91,.16),transparent 70%)", animationDelay: "4s", animationDirection: "reverse" }}></div>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">One platform, two audiences</span>
            <h2 className="h2 reveal" style={{ "--d": "80ms" }}>Built for both sides of the table.</h2>
            <p className="lede reveal" style={{ "--d": "140ms" }}>Whether you are building a company or arguing a case, Turn2Law removes the legal friction in your way.</p>
          </div>
          <div className="forks">
            <Tilt className="fork reveal">
              <div className="orb"></div>
              <div className="fork-badge">
                <i>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"></path>
                  </svg>
                </i>
                For founders
              </div>
              <h3>I am starting or running a company.</h3>
              <p>Incorporation with a visible timeline, documents drafted from plain language, and a compliance calendar that switches on the moment your company exists.</p>
              <ul>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  Incorporation and registrations, done right
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  Contracts drafted in minutes
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  ROC and GST deadlines, never missed
                </li>
              </ul>
              <Link href="/legal-services" className="btn btn-gold">
                Start here 
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6"></path>
                </svg>
              </Link>
            </Tilt>
            <Tilt className="fork ink reveal" style={{ "--d": "120ms" }}>
              <div className="orb"></div>
              <div className="fork-badge">
                <i>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h11M3 12h11M3 18h7M17 4v10M13 10l4 4 4-4"></path>
                  </svg>
                </i>
                For lawyers
              </div>
              <h3>I am a practising lawyer.</h3>
              <p>Introspector takes on the research and organisation that normally sits with paralegals and junior associates, so your hours go into arguing the case.</p>
              <ul>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  Precedent search with citations
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  Statute mapping across IPC and BNS
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  A privileged vault, isolated in India
                </li>
              </ul>
              <Link href="/introspector" className="btn btn-gold">
                Join the pilot 
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6"></path>
                </svg>
              </Link>
            </Tilt>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="pad tst2">
        <div className="tbp tbp1"></div>
        <div className="tbp tbp2"></div>
        <svg className="tst2-lines" viewBox="0 0 1200 500" preserveAspectRatio="none">
          <g fill="none" stroke="var(--gold)" strokeWidth="1">
            <path d="M0 420 L260 300 L520 380 L800 200 L1200 260"></path>
            <path d="M100 60 L360 180 L640 40"></path>
          </g>
          <g fill="var(--gold)">
            <circle cx="260" cy="300" r="3"></circle>
            <circle cx="520" cy="380" r="3"></circle>
            <circle cx="800" cy="200" r="3"></circle>
            <circle cx="360" cy="180" r="3"></circle>
          </g>
        </svg>
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <div className="sec-head" style={{ maxWidth: "640px" }}>
            <span className="eyebrow reveal">What people say</span>
            <h2 className="h2 reveal" style={{ "--d": "80ms" }}>Trusted by founders and lawyers alike.</h2>
            <p className="lede reveal" style={{ "--d": "140ms" }}>Teams building fast and lawyers arguing hard use Turn2Law to move legal work without the friction.</p>
          </div>
          <div className="tst-bento">
            <Tilt className="ttile feat reveal" style={{ "--d": "0ms" }}>
              <div className="qmark">“</div>
              <p className="q">Turn2Law incorporated us in eleven days flat, every stage visible, no chasing anyone on email. It felt like software, not a law firm.</p>
              <div className="who">
                <div className="av">AR</div>
                <div>
                  <div className="nm">
                    Ananya Rao
                    <span className="tverify" aria-label="Verified">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5"></path>
                      </svg>
                    </span>
                  </div>
                  <div className="rl">Founder · ICEBRKR</div>
                </div>
              </div>
            </Tilt>
            <Tilt className="ttile reveal" style={{ "--d": "60ms" }}>
              <div className="qmark">“</div>
              <p className="q">Introspector does the research my juniors used to spend nights on, with a citation on every claim.</p>
              <div className="who">
                <div className="av">PV</div>
                <div>
                  <div className="nm">Adv. Pranav Verma</div>
                  <div className="rl">Advocate · High Court</div>
                </div>
              </div>
            </Tilt>
            <Tilt className="ttile reveal" style={{ "--d": "120ms" }}>
              <div className="qmark">“</div>
              <p className="q">Doc Engine drafts our NDAs in under a minute and flags anything one-sided.</p>
              <div className="who">
                <div className="av">KM</div>
                <div>
                  <div className="nm">Kabir Menon</div>
                  <div className="rl">COO · Sentinel Layer</div>
                </div>
              </div>
            </Tilt>
            <Tilt className="ttile reveal" style={{ "--d": "180ms" }}>
              <div className="qmark">“</div>
              <p className="q">Transparent pricing, right on the page. That kind of honesty is refreshing.</p>
              <div className="who">
                <div className="av">TW</div>
                <div>
                  <div className="nm">Tara Wadhwa</div>
                  <div className="rl">Founder · Withera Labs</div>
                </div>
              </div>
            </Tilt>
          </div>
          <div className="tst-metrics reveal" style={{ "--d": "240ms" }}>
            <div className="tst-metrics-grid">
              <div className="tst-metric">
                <div className="mv"><span>50+</span></div>
                <div className="mk">Startups incorporated</div>
              </div>
              <div className="tst-metric">
                <div className="mv"><span>11</span> days</div>
                <div className="mk">Fastest incorporation</div>
              </div>
              <div className="tst-metric">
                <div className="mv"><span>100%</span></div>
                <div className="mk">Transparent pricing</div>
              </div>
              <div className="tst-metric">
                <div className="mv"><span>24/7</span></div>
                <div className="mk">Platform support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="pad-t faq-sec">
        <div className="fp fp1"></div>
        <div className="fp fp2"></div>
        <div className="faq-particle" style={{ width: "6px", height: "6px", top: "20%", left: "38%", animationDelay: ".5s" }}></div>
        <div className="faq-particle" style={{ width: "4px", height: "4px", top: "64%", left: "46%", animationDelay: "2.2s" }}></div>
        <div className="faq-particle" style={{ width: "8px", height: "8px", top: "42%", left: "60%", animationDelay: "3.6s" }}></div>
        <div className="wrap">
          <div className="faq-grid">
            <div className="faq-copy">
              <span className="faq-badge reveal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"></path>
                </svg>
                FAQ
              </span>
              <h2 className="reveal" style={{ "--d": "80ms" }}>
                Your Questions,<br /><span class="g">Answered</span>
              </h2>
              <p className="reveal" style={{ "--d": "140ms" }}>Everything you need to know about Turn2Law and how our AI-powered products simplify legal work for individuals and businesses.</p>
              <hr className="faq-rule reveal" style={{ "--d": "180ms" }} />
            </div>
            <div className="faq-list">
              {[
                {
                  q: "What is Turn2Law?",
                  ico: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"></path>
                    </svg>
                  ),
                  a: "Turn2Law is India's Legal OS: one platform that brings verified legal professionals and purpose-built AI onto the same system. Founders use it to incorporate, draft contracts, and stay compliant; lawyers use it to research and prepare cases. It is a technology platform, not a law firm."
                },
                {
                  q: "What are Introspector and Doc Engine?",
                  ico: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                      <polyline points="14 3 14 9 20 9"></polyline>
                      <line x1="8" y1="13" x2="16" y2="13"></line>
                      <line x1="8" y1="17" x2="13" y2="17"></line>
                    </svg>
                  ),
                  a: "Introspector is an AI research bench for practising lawyers: precedent search, statute mapping across the IPC, BNS and CrPC, case timelines, and strategy scaffolds, with a citation on every claim. Doc Engine turns plain-language prompts into India-specific legal documents in minutes, with risk flagging, plain-language explainers, and e-signature. AI output is decision support and is always reviewed by qualified counsel."
                },
                {
                  q: "What legal services does Turn2Law offer?",
                  ico: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                  ),
                  a: "Company incorporation and registrations, trademark and IP protection, GST and MSME registration, ROC and annual compliance, fundraising and ESOP advisory, employment and HR legal, disputes and recovery, plus AI document drafting through Doc Engine and AI legal research through Introspector."
                },
                {
                  q: "How is my data kept private and secure?",
                  ico: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      <path d="M9 12l2 2 4-4"></path>
                    </svg>
                  ),
                  a: "Confidentiality is a design requirement, not a policy footnote. Sensitive and privileged material lives in isolated, encrypted storage in India, with per-matter access controls and a full access log visible to you. Your documents are never used to train models."
                },
                {
                  q: "Can I use Turn2Law entirely online?",
                  ico: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9"></circle>
                      <path d="M3 12h18M12 3c2.5 2.5 4 6 4 9s-1.5 6.5-4 9c-2.5-2.5-4-6-4-9s1.5-6.5 4-9z"></path>
                    </svg>
                  ),
                  a: "Yes. Turn2Law is built for virtual legal support: draft documents, run research, file registrations, and track every matter online from anywhere in India, with live status, named owners, and updates on WhatsApp. Support is available around the clock."
                }
              ].map((faq, index) => (
                <div key={index} className={`faq-card reveal ${activeFaq === index ? "open" : ""}`}>
                  <button 
                    className="faq-q2" 
                    type="button" 
                    aria-expanded={activeFaq === index ? "true" : "false"}
                    onClick={() => handleFaqToggle(index)}
                  >
                    <span className="faq-ico2">{faq.ico}</span>
                    <span className="faq-qtext">{faq.q}</span>
                    <span className="faq-toggle"></span>
                  </button>
                  <div 
                    className="faq-panel2"
                    style={{ maxHeight: activeFaq === index ? "200px" : "0px", overflow: "hidden", transition: "max-height 0.4s ease" }}
                  >
                    <p className="faq-a2">{faq.a}</p>
                  </div>
                </div>
              ))}
              
              <div className="faq-cta2 reveal" style={{ "--d": "300ms" }}>
                <div className="faq-cta-h">
                  <span className="fic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </span>
                  <div>
                    <b>Still have questions?</b>
                    <p>We're here to help you understand how Turn2Law can work for you.</p>
                  </div>
                </div>
                <div className="div2">
                  <div>
                    <b style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: "15px", display: "block" }}>Write to us</b>
                    <p style={{ margin: "2px 0 0", fontSize: "13px", color: "var(--gray)" }}>We typically reply within 24 hours</p>
                  </div>
                  <a href="mailto:hello@turn2law.in" className="faq-cta-arrow" aria-label="Email Turn2Law">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17 17 7M17 7H7M17 7v10"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="pad">
        <div className="wrap">
          <div className="contact-wrap reveal">
            <div className="glow" style={{ top: "-80px", right: "-60px", width: "340px", height: "340px", background: "radial-gradient(circle,rgba(216,171,91,.2),transparent 68%)" }}></div>
            <div className="glow" style={{ bottom: "-90px", left: "-70px", width: "300px", height: "300px", background: "radial-gradient(circle,rgba(216,171,91,.12),transparent 68%)" }}></div>
            <div className="contact-grid">
              <div>
                <span className="eyebrow">Get in touch</span>
                <h2 className="h2" style={{ fontSize: "clamp(24px,3.2vw,34px)", maxWidth: "320px", margin: "16px 0 14px" }}>Let's talk about your legal work.</h2>
                <p style={{ fontSize: "15px", lineHeight: 1.65, color: "var(--gray)", maxWidth: "360px", margin: "0 0 26px" }}>Questions, partnerships, or a matter you need help with. Reach us directly or send a message and we will write back.</p>
                <div className="cinfo">
                  <div className="ico">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                      <path d="m3 7 9 6 9-6"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="k">Email</div>
                    <div className="v"><a href="mailto:hello@turn2law.in">hello@turn2law.in</a></div>
                  </div>
                </div>
                <div className="cinfo">
                  <div className="ico">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <div className="k">Office</div>
                    <div className="v">New Delhi, India</div>
                  </div>
                </div>
                <div className="cinfo">
                  <div className="ico">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-4 0v6h-4v-6a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="11"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </div>
                  <div>
                    <div className="k">LinkedIn</div>
                    <div className="v"><a href="https://www.linkedin.com/company/turn2law" target="_blank" rel="noopener noreferrer">linkedin.com/company/turn2law</a></div>
                  </div>
                </div>
              </div>
              <form className="form" id="contactForm" onSubmit={handleFormSubmit} noValidate>
                <div className="field">
                  <label htmlFor="fn">First name</label>
                  <input 
                    id="fn" 
                    name="firstName" 
                    value={formValues.firstName}
                    onChange={handleInputChange}
                    placeholder="Ananya" 
                    autoComplete="given-name" 
                    required 
                    aria-required="true" 
                    aria-invalid={formErrors.firstName ? "true" : "false"}
                    aria-describedby="fnErr"
                  />
                  <small className={`ferr ${formErrors.firstName ? "show" : ""}`} id="fnErr" role="alert">
                    {formErrors.firstName}
                  </small>
                </div>
                <div className="field">
                  <label htmlFor="ln">Last name</label>
                  <input 
                    id="ln" 
                    name="lastName" 
                    value={formValues.lastName}
                    onChange={handleInputChange}
                    placeholder="Rao" 
                    autoComplete="family-name" 
                  />
                </div>
                <div className="field full">
                  <label htmlFor="em">Email</label>
                  <input 
                    id="em" 
                    name="email" 
                    type="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    placeholder="you@company.in" 
                    autoComplete="email" 
                    required 
                    aria-required="true" 
                    aria-invalid={formErrors.email ? "true" : "false"}
                    aria-describedby="emErr"
                  />
                  <small className={`ferr ${formErrors.email ? "show" : ""}`} id="emErr" role="alert">
                    {formErrors.email}
                  </small>
                </div>
                <div className="field full">
                  <label htmlFor="msg">Message</label>
                  <textarea 
                    id="msg" 
                    name="message" 
                    value={formValues.message}
                    onChange={handleInputChange}
                    placeholder="Tell us what you need help with..." 
                    required 
                    aria-required="true" 
                    aria-invalid={formErrors.message ? "true" : "false"}
                    aria-describedby="msgErr"
                  ></textarea>
                  <small className={`ferr ${formErrors.message ? "show" : ""}`} id="msgErr" role="alert">
                    {formErrors.message}
                  </small>
                </div>
                <label className="consent">
                  <input 
                    type="checkbox" 
                    id="consent" 
                    name="consent"
                    checked={formValues.consent}
                    onChange={handleInputChange}
                    required 
                    aria-required="true" 
                  />
                  <span>I agree to the <a href="#">Privacy Policy</a> and consent to Turn2Law contacting me about my enquiry.</span>
                </label>
                <small className={`ferr ${formErrors.consent ? "show" : ""}`} id="consentErr" role="alert" style={{ gridColumn: "1/-1", marginTop: "-6px" }}>
                  {formErrors.consent}
                </small>
                
                {!formSubmitted ? (
                  <button 
                    className="btn btn-gold send" 
                    type="submit"
                    disabled={formSending}
                  >
                    {formSending ? "Sending…" : "Send message"}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"></path>
                    </svg>
                  </button>
                ) : (
                  <div className="form-ok" id="formOk" style={{ display: "flex" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <path d="M22 4 12 14.01l-3-3"></path>
                    </svg>
                    <span>Thank you. Your message has been received, we will write back shortly.</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
