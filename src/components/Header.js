"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollScale, setScrollScale] = useState(0);
  const [showToTop, setShowToTop] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollScale(h > 0 ? st / h : 0);
      setScrolled(st > 20);
      setShowToTop(st > 800);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }

  const toggleMenu = () => {
    const nextState = !menuOpen;
    setMenuOpen(nextState);
    document.body.classList.toggle("menu-open", nextState);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.classList.remove("menu-open");
  };

  const handleToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
  };

  // Determine if it's the home page or introspection page to toggle body.dark-hero if needed,
  // or we can handle it locally on header styling if scroll is 0.
  // Wait, let's look at the class:
  // "body.dark-hero .nav:not(.scrolled) .brand" etc.
  // If we toggle body class inside page useEffects, the CSS will naturally style the header.
  // Let's do that! So header just uses CSS classes.

  return (
    <>
      <div
        className="progress"
        id="progress"
        style={{ transform: `scaleX(${scrollScale})`, transformOrigin: "0% 50%" }}
      />
      <header className={`nav ${scrolled ? "scrolled" : ""}`} id="nav">
        <div className="nav-inner">
          <Link href="/" className="brand" aria-label="Turn2Law home" onClick={closeMenu}>
            <img
              src="/turn2law-logo.png"
              alt="Turn2Law"
              width="1620"
              height="460"
              style={{ height: "28px", width: "auto", display: "block" }}
            />
          </Link>
          <nav className="nav-links" aria-label="Primary">
            <Link
              href="/legal-services"
              style={pathname === "/legal-services" ? { color: "var(--ink)", background: "rgba(17, 17, 17, 0.05)" } : {}}
            >
              Legal Services
            </Link>
            <Link
              href="/docengine"
              style={pathname === "/docengine" ? { color: "var(--ink)", background: "rgba(17, 17, 17, 0.05)" } : {}}
            >
              Doc Engine
            </Link>
            <Link
              href="/introspector"
              style={pathname === "/introspector" ? { color: "var(--ink)", background: "rgba(17, 17, 17, 0.05)" } : {}}
            >
              Introspector
            </Link>
            <Link
              href="/resources"
              style={pathname === "/resources" ? { color: "var(--ink)", background: "rgba(17, 17, 17, 0.05)" } : {}}
            >
              Resources
            </Link>
          </nav>
          <div className="nav-cta">
            <Link href="/login" className="nav-login">Login</Link>
            <Link href="/signup" className="btn btn-gold">
              Get Started
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6"></path>
              </svg>
            </Link>
            <button
              className="burger"
              id="burger"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={toggleMenu}
            >
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <nav className="mobile-menu" id="mobileMenu" aria-label="Mobile">
        <Link href="/legal-services" onClick={closeMenu}>Legal Services</Link>
        <Link href="/docengine" onClick={closeMenu}>Doc Engine</Link>
        <Link href="/introspector" onClick={closeMenu}>Introspector</Link>
        <Link href="/resources" onClick={closeMenu}>Resources</Link>
        <div className="mm-actions">
          <Link href="/login" className="btn btn-ghost" onClick={closeMenu}>Login</Link>
          <Link href="/signup" className="btn btn-gold" onClick={closeMenu}>Get Started</Link>
        </div>
      </nav>

      <button
        className={`totop ${showToTop ? "show" : ""}`}
        id="totop"
        aria-label="Back to top"
        onClick={handleToTop}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7"></path>
        </svg>
      </button>
    </>
  );
}
