import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <div className="brand">
              <Link href="/">
                <img
                  src="/turn2law-logo.png"
                  alt="Turn2Law"
                  width="1620"
                  height="460"
                  style={{ height: "30px", width: "auto", display: "block" }}
                />
              </Link>
            </div>
            <p>India's Legal OS. One platform for the founder who cannot afford a lawyer on retainer and the lawyer who cannot afford a bench.</p>
          </div>
          <div className="foot-col">
            <h4>Products</h4>
            <Link href="/legal-services">Legal Services</Link>
            <Link href="/docengine">Doc Engine</Link>
            <Link href="/introspector">Introspector</Link>
          </div>
          <div className="foot-col">
            <h4>Company</h4>
            <Link href="/">Home</Link>
            <Link href="/resources">Resources</Link>
            <Link href="/#contact">Contact</Link>
            <a href="https://www.linkedin.com/company/turn2law" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
          <div className="foot-col">
            <h4>Get started</h4>
            <Link href="/#contact">Talk to us</Link>
            <Link href="/legal-services">For founders</Link>
            <Link href="/introspector">For lawyers</Link>
            <a href="mailto:hello@turn2law.in">hello@turn2law.in</a>
          </div>
        </div>
        <div className="foot-statutory">Effivia Turn2Law Legal Pvt. Ltd.&nbsp; · &nbsp;CIN: U63110DL2025PTC443434</div>
        <p className="foot-disc">Turn2Law is a technology platform, not a law firm, and does not provide legal representation. Information here is not legal advice. AI output is decision support and must be reviewed by qualified counsel before use in any filing.</p>
        <div className="foot-bottom">
          <div className="cr">© 2026 Effivia Turn2Law Legal Pvt. Ltd. All rights reserved.</div>
          <div className="foot-social">
            <a href="https://www.linkedin.com/company/turn2law" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-4 0v6h-4v-6a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="11"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="mailto:hello@turn2law.in" aria-label="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                <path d="m3 7 9 6 9-6"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
