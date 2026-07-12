"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import StartManageProtect from "./StartManageProtect";
import LegalServicesRemaining from "./LegalServicesRemaining";
import PickRightStructure from "./PickRightStructure";

const ICONS = {
  building: (
    <>
      <path d="M4 21V6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v15"></path>
      <path d="M12 21V10a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v11"></path>
      <path d="M2 21h20"></path>
      <path d="M7 8h1M7 12h1M7 16h1M16 12h1M16 16h1"></path>
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="8" r="6"></circle>
      <path d="M8.2 13.9 7 23l5-3 5 3-1.2-9.1"></path>
    </>
  ),
  clipboard: (
    <>
      <path d="M9 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3"></path>
      <rect x="8" y="2" width="8" height="4" rx="1"></rect>
      <path d="m9 14 2 2 4-4"></path>
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2"></rect>
      <path d="M16 2v4M8 2v4M3 10h18"></path>
    </>
  ),
  trending: (
    <>
      <path d="M23 6 13.5 15.5l-5-5L1 18"></path>
      <path d="M17 6h6v6"></path>
    </>
  ),
  users: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </>
  ),
  dispute: (
    <>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </>
  )
};

const SERVICES = [
  {
    code: '01 · Incorporation',
    name: 'Company incorporation',
    icon: 'building',
    tags: ['PVT LTD', 'OPC', 'LLP', 'SECTION 8'],
    cardDesc: 'Private Limited, OPC, LLP, Section 8, and conversions, with the whole process visible before you pay.',
    desc: 'Private Limited, OPC, LLP, Section 8, and conversions, with the whole process visible before you pay. Pricing below is exactly what you see at checkout, entity by entity.',
    entities: [
      {
        name: 'Private Limited',
        tiers: [
          { name: 'Basic', price: '₹14,999', billing: 'one-time', features: ['DSC for 2 directors', 'DIN for 2 directors', 'Name approval (RUN)', 'MOA & AOA drafting', 'Incorporation certificate', 'Company PAN & TAN'] },
          { name: 'Standard', price: '₹19,999', billing: 'one-time', rec: true, features: ['Everything in Basic', 'Current bank account', 'GST registration', 'Commencement certificate', 'Share certificates', 'Priority support'] },
          { name: 'Premium', price: '₹29,999', billing: 'one-time', features: ['Everything in Standard', 'MSME / Udyam registration', 'Trademark registration', 'ESI & PF registration', 'Professional tax', 'Dedicated account manager'] }
        ]
      },
      {
        name: 'OPC',
        tiers: [
          { name: 'Basic', price: '₹12,999', billing: 'one-time', features: ['DSC for director', 'DIN for director', 'Name approval', 'MOA & AOA', 'Incorporation certificate', 'PAN & TAN'] },
          { name: 'Standard', price: '₹17,999', billing: 'one-time', rec: true, features: ['Everything in Basic', 'Bank account', 'GST registration', 'Share certificate', 'Priority support'] },
          { name: 'Premium', price: '₹24,999', billing: 'one-time', features: ['Everything in Standard', 'MSME registration', 'Trademark filing', 'Tax consultation', 'Account manager'] }
        ]
      },
      {
        name: 'LLP',
        tiers: [
          { name: 'Basic', price: '₹11,999', billing: 'one-time', features: ['DSC for 2 partners', 'DIN for designated partners', 'Name approval', 'LLP agreement drafting', 'LLP registration', 'PAN & TAN'] },
          { name: 'Standard', price: '₹16,999', billing: 'one-time', rec: true, features: ['Everything in Basic', 'Bank account assistance', 'GST registration', 'Certificate of incorporation', 'Priority support'] },
          { name: 'Premium', price: '₹23,999', billing: 'one-time', features: ['Everything in Standard', 'MSME registration', 'Trademark filing', 'Legal consultation', 'Dedicated manager'] }
        ]
      },
      {
        name: 'Section 8',
        tiers: [
          { name: 'Basic', price: '₹16,999', billing: 'one-time', features: ['DSC for 2 directors', 'DIN for 2 directors', 'Name approval', 'MOA & AOA (non-profit clauses)', 'Section 8 licence & incorporation', 'PAN & TAN'] },
          { name: 'Standard', price: '₹22,999', billing: 'one-time', rec: true, features: ['Everything in Basic', '12A & 80G groundwork', 'Bank account', 'Priority support'] },
          { name: 'Premium', price: '₹32,999', billing: 'one-time', features: ['Everything in Standard', 'FCRA readiness review', 'Dedicated account manager', 'Annual compliance briefing'] }
        ]
      }
    ],
    steps: [
      ['01', 'Obtain digital signatures and Director Identification Numbers for all directors or partners.'],
      ['02', 'Reserve your entity name through the RUN / name-approval service.'],
      ['03', 'File the incorporation form with drafted MOA / AOA or partnership agreement.'],
      ['04', 'The registrar verifies documents; any query is relayed to you in plain language.'],
      ['05', 'Receive your incorporation certificate, PAN, and TAN.'],
      ['06', 'Open a current account and your compliance calendar switches on.']
    ],
    note: 'No minimum capital required. Private Limited needs at least 2 directors (max 15); OPC needs 1; LLPs and Partnerships need at least 2 partners.'
  },
  {
    code: '02 · Trademark & IP',
    name: 'Trademark and IP',
    icon: 'award',
    tags: ['SEARCH', 'FILING', 'OPPOSITION', 'COPYRIGHT'],
    cardDesc: 'Search, filing, opposition, renewal, copyright, and patent assistance, handled by the bench.',
    desc: 'Search, filing, opposition, renewal, copyright, and patent assistance, handled by the bench. Government fees are billed at actuals on top of the professional fee below.',
    tiers: [
      { name: 'Search & file', price: '₹4,999', billing: '+ govt fee', features: ['Comprehensive trademark search', 'Filing in one class', 'Applicant-type fee guidance', 'Application tracking'] },
      { name: 'Filing & defence', price: '₹9,999', billing: '+ govt fee', rec: true, features: ['Everything in Search & file', 'Examination report response', 'Opposition reply drafting', 'Hearing brief preparation'] },
      { name: 'Full IP cover', price: '₹18,999', billing: '+ govt fee', features: ['Everything in Filing & defence', 'Copyright registration (1 work)', 'Renewal reminders for 10 years', 'Dedicated IP counsel'] }
    ],
    steps: [
      ['01', 'A comprehensive search across classes to flag conflicting marks before you file.'],
      ['02', 'Filing with the Trademark Registry under the correct class and applicant type.'],
      ['03', 'Examination report, if raised, is answered by the bench within the statutory window.'],
      ['04', 'Opposition, if filed by a third party, is defended with a counter-statement and evidence.'],
      ['05', 'Registration certificate issues; renewal reminders are set for year nine.']
    ],
    note: 'Government e-filing fee is ₹4,500 per class for individuals, startups, and MSMEs, and ₹9,000 per class for other applicants, billed at actuals.'
  },
  {
    code: '03 · Registrations',
    name: 'Business registrations',
    icon: 'clipboard',
    tags: ['GST', 'MSME', 'IEC', 'FSSAI', 'SHOPS'],
    cardDesc: 'The registrations a running business collects, done once and done right.',
    desc: 'The registrations a running business collects, done once and done right. Pricing is per registration; ask about bundle discounts when ordered together.',
    entities: [
      {
        name: 'GST',
        tiers: [
          { name: 'Basic', price: '₹2,999', billing: 'one-time', features: ['GST registration filing', 'GSTIN certificate', 'Filing assistance', 'Expert guidance', 'Email support'] },
          { name: 'Standard', price: '₹4,999', billing: 'one-time', rec: true, features: ['Everything in Basic', 'Return filing (3 months)', 'Invoice generation tool', 'Priority support', 'Compliance calendar'] },
          { name: 'Premium', price: '₹9,999', billing: 'one-time', features: ['Everything in Standard', 'Annual return filing', 'Tax planning session', 'Dedicated CA', 'Audit support'] }
        ]
      },
      {
        name: 'IEC',
        tiers: [
          { name: 'Basic', price: '₹2,999', billing: 'one-time', features: ['IEC number registration', 'Document preparation', 'Application filing', 'Certificate delivery'] },
          { name: 'Standard', price: '₹4,999', billing: 'one-time', rec: true, features: ['Everything in Basic', 'Priority processing', 'PAN–IEC linking', 'Compliance checklist', 'Dedicated support'] },
          { name: 'Premium', price: '₹7,999', billing: 'one-time', features: ['Everything in Standard', 'Post-registration guidance', 'Export compliance training', 'Legal consultation (2 sessions)', 'Dedicated account manager'] }
        ]
      },
      {
        name: 'MSME / Udyam',
        tiers: [
          { name: 'Assisted filing', price: '₹1,499', billing: 'one-time', rec: true, features: ['Udyam registration filing', 'Certificate delivery', 'Investment & turnover classification check', 'Email support'] }
        ]
      },
      {
        name: 'FSSAI',
        tiers: [
          { name: 'Basic registration', price: '₹2,999', billing: '+ govt fee', rec: true, features: ['Eligibility check (basic / state / central)', 'Application filing', 'Document preparation', 'Certificate delivery'] }
        ]
      },
      {
        name: 'Shops & Establishment',
        tiers: [
          { name: 'Assisted filing', price: '₹1,999', billing: '+ govt fee', rec: true, features: ['State-specific application filing', 'Document preparation', 'Certificate delivery'] }
        ]
      }
    ],
    steps: [
      ['01', 'Tell us which registrations your business needs; we confirm documents and fees upfront.'],
      ['02', 'Our team prepares and files each application with the relevant authority.'],
      ['03', 'Queries from the department, if any, are handled and relayed to you.'],
      ['04', 'Certificates land in your locker as each registration is approved.']
    ]
  },
  {
    code: '04 · ROC compliance',
    name: 'ROC and annual compliance',
    icon: 'calendar',
    tags: ['AOC-4', 'MGT-7', 'DIR-3 KYC', 'REGISTERS'],
    cardDesc: 'Annual filings, resolutions, registers, and AGM paperwork on a calendar that cannot miss.',
    desc: 'Annual filings, resolutions, registers, and AGM paperwork on a calendar that cannot miss a date.',
    tiers: [
      { name: 'Annual compliance', price: '₹18,000', billing: '/ year', rec: true, features: ['AOC-4 and MGT-7 annual filings', 'DIR-3 KYC for all directors', 'Statutory registers maintained', 'Board & AGM minutes drafted', 'Compliance calendar with WhatsApp reminders'] }
    ],
    steps: [
      ['01', 'Your compliance calendar switches on the moment incorporation completes.'],
      ['02', 'Reminders land on email and WhatsApp before every statutory deadline.'],
      ['03', 'Filings are prepared, shared for your sign-off, and filed with the ROC.'],
      ['04', 'Registers and minutes are kept current and stored in your locker.']
    ],
    note: 'Covers one financial year for a single company with standard filings. Event-based filings (share transfers, charge creation, director changes) are quoted separately.'
  },
  {
    code: '05 · Fundraising',
    name: 'Fundraising advisory',
    icon: 'trending',
    tags: ['ESOP', 'CAP TABLE', 'TERM SHEET', 'FEMA'],
    cardDesc: 'ESOP schemes, cap tables, term sheets, and FEMA / RBI paperwork for your round.',
    desc: 'ESOP schemes, cap tables, term sheets, and FEMA / RBI paperwork for your round, priced by deliverable so you know the cost before you commit.',
    tiers: [
      { name: 'Term sheet review', price: '₹14,999', billing: 'fixed fee', features: ['Clause-by-clause review', 'Investor-friendliness flags', 'One round of negotiation notes', 'Turnaround in 3 business days'] },
      { name: 'ESOP scheme', price: '₹24,999', billing: 'fixed fee', rec: true, features: ['ESOP pool structuring', 'Scheme drafting and board resolutions', 'Cap table modelling', 'Grant letter templates'] },
      { name: 'Full round support', price: 'Custom quote', billing: 'engagement', features: ["Shareholders' agreement drafting", 'FEMA / RBI filings (FC-GPR)', 'Cap table and waterfall modelling', 'Closing checklist management'] }
    ],
    steps: [
      ['01', 'Share your term sheet or round structure; we scope the exact deliverables.'],
      ['02', 'Drafting and structuring work runs on a fixed-fee, fixed-timeline basis.'],
      ['03', 'FEMA / RBI filings are prepared and tracked to closing.'],
      ['04', 'Signed documents and filings land in your locker.']
    ]
  },
  {
    code: '06 · Employment & HR',
    name: 'Employment and HR legal',
    icon: 'users',
    tags: ['CONTRACTS', 'POSH', 'PF / ESI', 'POLICIES'],
    cardDesc: 'Contracts, POSH compliance, PF and ESI, and policy manuals as you hire.',
    desc: 'Contracts, POSH compliance, PF and ESI, and policy manuals as you hire, so growth never outruns your paperwork.',
    tiers: [
      { name: 'Contract pack', price: '₹2,999', billing: 'per template', features: ['Employment agreement, role-specific', 'Offer letter and NDA', 'Plain-language explainer per clause'] },
      { name: 'POSH compliance', price: '₹9,999', billing: 'one-time', rec: true, features: ['POSH policy drafting', 'Internal Committee (IC) constitution', 'Employee awareness deck', 'Annual report template'] },
      { name: 'Full HR legal pack', price: '₹19,999', billing: 'one-time', features: ['Everything in Contract pack and POSH', 'PF & ESI registration guidance', 'Employee handbook and policy manuals', 'Priority support'] }
    ],
    steps: [
      ['01', 'Tell us your headcount and hiring plan; we recommend the right pack.'],
      ['02', 'Contracts and policies are drafted from India-specific, versioned templates.'],
      ['03', 'POSH committee setup and registrations are handled end to end.'],
      ['04', 'Everything is stored in your locker, ready to send on day one.']
    ]
  },
  {
    code: '07 · Disputes',
    name: 'Disputes and recovery',
    icon: 'dispute',
    tags: ['NOTICES', 'RECOVERY', 'MEDIATION'],
    cardDesc: 'Legal notices, payment recovery, and mediation support, informational and clear.',
    desc: 'Legal notices, payment recovery, and mediation support, informational and clear.',
    tiers: [
      { name: 'Legal notice', price: '₹2,999', billing: 'per notice', features: ['Drafted by the bench', 'Sent via registered post and email', 'One round of revisions'] },
      { name: 'Payment recovery', price: '₹4,999', billing: 'starting', rec: true, features: ['Demand notice drafting and dispatch', 'Structured follow-up cadence', 'Settlement negotiation support'] },
      { name: 'Mediation support', price: 'Custom quote', billing: 'engagement', features: ['Mediation-readiness review', 'Documentation and evidence organisation', 'Referral to empanelled mediators'] }
    ],
    steps: [
      ['01', 'Describe the dispute; we confirm scope, documents needed, and cost.'],
      ['02', 'Notices are drafted, reviewed with you, and dispatched.'],
      ['03', 'Follow-up and negotiation are tracked with visible status.'],
      ['04', 'For matters needing representation, we refer you to empanelled counsel.']
    ],
    note: 'Turn2Law is a technology platform, not a law firm, and does not provide courtroom representation.'
  },
  {
    code: '08 · Virtual GC',
    name: 'Virtual general counsel',
    icon: 'shield',
    tags: ['RETAINER', 'PRIORITY SLA', 'MONTHLY'],
    cardDesc: 'A monthly retainer: your request queue, priority SLAs, one bench behind it.',
    desc: 'A monthly retainer: your request queue, priority SLAs, one bench behind it, for teams that need ongoing legal support without a full-time hire.',
    tiers: [
      { name: 'Starter', price: '₹14,999', billing: '/ month', features: ['Up to 5 requests / month', '48-hour turnaround SLA', 'Contract review and redlines', 'Email support'] },
      { name: 'Growth', price: '₹29,999', billing: '/ month', rec: true, features: ['Up to 12 requests / month', '24-hour turnaround SLA', 'Contract review, policy drafting, notices', 'Priority support channel'] },
      { name: 'Scale', price: '₹49,999', billing: '/ month', features: ['Unlimited standard requests', 'Same-day turnaround SLA', 'Named lead counsel', 'Quarterly legal health review'] }
    ],
    steps: [
      ['01', 'Pick a tier based on your monthly request volume.'],
      ['02', 'Requests are logged in a shared queue with visible status and owners.'],
      ['03', 'The bench works to your SLA; escalations are flagged, not buried in email.'],
      ['04', 'A quarterly review keeps the retainer scoped to what you actually need.']
    ]
  }
];

export default function LegalServicesClient() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedEntityIdx, setSelectedEntityIdx] = useState(0);

  // Clean up body class on component unmount
  useEffect(() => {
    document.body.classList.remove("dark-hero");
    return () => {
      document.body.classList.remove("dark-hero");
      document.body.classList.remove("modal-open");
    };
  }, []);

  const openModal = (svc) => {
    setSelectedService(svc);
    setSelectedEntityIdx(0);
    setModalOpen(true);
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedService(null);
    document.body.classList.remove("modal-open");
  };

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("svc-overlay")) {
      closeModal();
    }
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Render tiers inside modal
  const renderTiers = (tiers) => {
    return (
      <div className="svc-tiers">
        {tiers.map((t, idx) => (
          <div key={idx} className={`svc-tier ${t.rec ? "rec" : ""}`}>
            {t.rec && <div className="stg">Recommended</div>}
            <div className="stn">{t.name}</div>
            <div className="stp">
              {t.price}
              <small>{t.billing}</small>
            </div>
            <ul>
              {t.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  return (
    <main id="top">
      {/* PHERO SECTION */}
      <section className="phero">
        <div className="hero-bg">
          <div className="hero-mesh"></div>
          <div className="hero-grid-lines"></div>
          <div className="nglow">
            <svg viewBox="0 0 96 118" fill="none" stroke="currentColor" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 108 V26 L70 100 V34"></path>
              <path d="M49 44 L70 18 L91 44"></path>
            </svg>
          </div>
        </div>
        <div className="wrap">
          <div className="phero-inner center">
            <span className="crumb reveal">
              <Link href="/">Home</Link> / Legal Services
            </span>
            <h1 className="reveal" style={{ "--d": "60ms" }}>
              Legal services,<br />
              <span className="g">done right.</span>
            </h1>
            <p className="lede reveal" style={{ "--d": "140ms" }}>
              Human-delivered legal, compliance, and IP work, sold and tracked like a modern product. Incorporation to ongoing compliance, one bench behind it.
            </p>
            <div className="phero-ctas reveal" style={{ "--d": "220ms" }}>
              <Link href="/signup" className="btn btn-gold">
                Get started 
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6"></path>
                </svg>
              </Link>
              <a href="#services" className="btn btn-ghost">See the catalogue</a>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="wrap" style={{ marginTop: "-28px", position: "relative", zIndex: 5 }}>
        <div className="stats reveal">
          <div className="stat">
            <div className="v">50+</div>
            <div className="k">Startups registered</div>
          </div>
          <div className="stat">
            <div className="v">₹18,000</div>
            <div className="k">ROC compliance / year</div>
          </div>
          <div className="stat">
            <div className="v">In-house</div>
            <div className="k">Lawyers, CAs, CS</div>
          </div>
        </div>
      </section>

      {/* END-TO-END JOURNEY SECTION (RECREATED WITH TAILWIND & FRAMER MOTION) */}
      <StartManageProtect />

      {/* PILLAR 01 SECTION */}
      <section className="pad-t">
        <div className="wrap">
          <div className="split">
            <div>
              <span className="kicker reveal" style={{ color: "var(--gold-deep)" }}>Pillar 01 · Legal Services</span>
              <h2 className="h2 reveal" style={{ "--d": "80ms", margin: "16px 0 18px" }}>Done right,<br />not just fast.</h2>
              <p className="lede reveal" style={{ "--d": "140ms" }}>Human-delivered legal, compliance, and IP work, sold and tracked like a modern product. Every service page says exactly what happens, when, and what it costs.</p>
              <ul className="deep-list reveal" style={{ "--d": "200ms" }}>
                <li>
                  <span className="n">01</span>
                  <div>
                    <b>Incorporation, done right</b>
                    <p>Private Limited, OPC, LLP, and Section 8, with the whole process visible before you pay.</p>
                  </div>
                </li>
                <li>
                  <span className="n">02</span>
                  <div>
                    <b>ROC and GST, never missed</b>
                    <p>Annual filings, resolutions, and registers on a calendar that cannot slip.</p>
                  </div>
                </li>
                <li>
                  <span className="n">03</span>
                  <div>
                    <b>An in-house bench</b>
                    <p>Lawyers, CAs, and CS professionals on one platform, with a named owner per matter.</p>
                  </div>
                </li>
              </ul>
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
                      <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: "600", fontSize: "14px" }}>Government processing</div>
                      <div style={{ fontSize: "12px", color: "var(--gray)", lineHeight: "1.5" }}>We track the registrar so you do not have to; blockers are named.</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "14px", padding: "12px 0", borderTop: "1px solid var(--line)" }}>
                    <div style={{ flex: "none", width: "22px", height: "22px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Mono',monospace", fontSize: "10px", fontWeight: "500", background: "var(--bg)", border: "1px solid var(--line)", color: "var(--gray)" }}>5</div>
                    <div>
                      <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: "600", fontSize: "14px" }}>Approved</div>
                      <div style={{ fontSize: "12px", color: "var(--gray)", lineHeight: "1.5" }}>Approval lands; deliverables are prepared for your locker.</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "14px", padding: "12px 0", borderTop: "1px solid var(--line)" }}>
                    <div style={{ flex: "none", width: "22px", height: "22px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Mono',monospace", fontSize: "10px", fontWeight: "500", background: "var(--bg)", border: "1px solid var(--line)", color: "var(--gray)" }}>6</div>
                    <div>
                      <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: "600", fontSize: "14px" }}>Delivered</div>
                      <div style={{ fontSize: "12px", color: "var(--gray)", lineHeight: "1.5" }}>Everything in your locker, and your compliance calendar switches on.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG GRID SECTION */}
      <section id="services" className="pad">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">The service catalogue</span>
            <h2 className="h2 reveal" style={{ "--d": "80ms" }}>Every legal service a company needs.</h2>
            <p className="lede reveal" style={{ "--d": "140ms" }}>Human-delivered legal, compliance, and IP work, sold and tracked like a modern product. Tap any service below for its full pricing and process.</p>
          </div>
          <div className="cat-grid">
            {SERVICES.map((svc, idx) => (
              <div 
                key={idx}
                className="cat reveal" 
                style={{ "--d": `${idx * 70}ms` }} 
                onClick={() => openModal(svc)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openModal(svc);
                  }
                }}
                tabIndex="0" 
                role="button" 
                aria-haspopup="dialog"
              >
                <div className="cat-ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    {ICONS[svc.icon]}
                  </svg>
                </div>
                <div className="cc">{svc.code}</div>
                <div className="cn">{svc.name}</div>
                <div className="cb">{svc.cardDesc}</div>
                <div className="ct">{svc.tags.join(" · ")}</div>
                <div className="cat-more">
                  View pricing &amp; details
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6"></path>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INCORPORATION STRUCTURES SECTION (RECREATED WITH TAILWIND & FRAMER MOTION) */}
      <PickRightStructure />

      {/* REMAINING SECTIONS: PRICING, HOW IT WORKS, COMPARISON, TESTIMONIALS, FAQ, CTA (RECREATED WITH TAILWIND & FRAMER MOTION) */}
      <LegalServicesRemaining />

      {/* SERVICE DETAIL POPUP MODAL */}
      <div 
        className={`svc-overlay ${modalOpen ? "open" : ""}`} 
        onClick={handleOverlayClick}
        role="dialog" 
        aria-modal="true"
      >
        <div className="svc-panel">
          <button className="svc-close" onClick={closeModal} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12"></path>
            </svg>
          </button>
          
          {selectedService && (
            <div id="svcContent">
              <div className="svc-head">
                <div className="nglow">
                  <svg viewBox="0 0 96 118" fill="none" stroke="currentColor" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 108 V26 L70 100 V34"></path>
                    <path d="M49 44 L70 18 L91 44"></path>
                  </svg>
                </div>
                <div className="svc-ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    {ICONS[selectedService.icon]}
                  </svg>
                </div>
                <div className="svc-code">{selectedService.code}</div>
                <div className="svc-title">{selectedService.name}</div>
                <div className="svc-tags">
                  {selectedService.tags.map((t, i) => (
                    <span key={i} className="chip">
                      <i></i>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="svc-body">
                <p className="svc-desc">{selectedService.desc}</p>
                
                <div className="svc-sub">Pricing</div>
                {selectedService.entities ? (
                  <>
                    <div className="svc-tabs">
                      {selectedService.entities.map((e, idx) => (
                        <button 
                          key={idx} 
                          className={`svc-tab ${selectedEntityIdx === idx ? "on" : ""}`}
                          onClick={() => setSelectedEntityIdx(idx)}
                          type="button"
                        >
                          {e.name}
                        </button>
                      ))}
                    </div>
                    {renderTiers(selectedService.entities[selectedEntityIdx].tiers)}
                  </>
                ) : (
                  renderTiers(selectedService.tiers)
                )}

                {selectedService.note && (
                  <div className="svc-note">{selectedService.note}</div>
                )}

                {selectedService.steps && (
                  <>
                    <div className="svc-sub">How it works</div>
                    <div className="svc-steps">
                      {selectedService.steps.map((step, idx) => (
                        <div key={idx} className="svc-step">
                          <b>{step[0]}</b>
                          <div>{step[1]}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <div className="svc-foot">
                  <Link href="/signup" className="btn btn-gold" onClick={closeModal}>
                    Get started
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6"></path>
                    </svg>
                  </Link>
                  <Link href="/#contact" className="btn btn-ghost" onClick={closeModal}>
                    Talk to us
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
