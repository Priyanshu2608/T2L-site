"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Validation errors
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Toast
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastTimer, setToastTimer] = useState(null);

  const router = useRouter();

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
    if (toastTimer) clearTimeout(toastTimer);
    const t = setTimeout(() => {
      setShowToast(false);
    }, 2600);
    setToastTimer(t);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    triggerToast("Password reset is coming soon.");
  };

  const handleSocialClick = (socName) => {
    triggerToast(`${socName} sign-in is coming soon.`);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let hasError = false;
    
    // Email validate
    if (!email) {
      setEmailErr("Please enter your email.");
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailErr("Enter a valid email address.");
      hasError = true;
    } else {
      setEmailErr("");
    }

    // Password validate
    if (!password) {
      setPasswordErr("Please enter your password.");
      hasError = true;
    } else {
      setPasswordErr("");
    }

    if (hasError) return;

    setIsSubmitting(true);
    
    setTimeout(() => {
      setShowSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 1100);
    }, 700);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <symbol id="nmark" viewBox="0 0 96 118">
          <g fill="none" stroke="currentColor" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 108 V26 L70 100 V34"></path>
            <path d="M49 44 L70 18 L91 44"></path>
          </g>
        </symbol>
      </svg>

      <Link href="/" className="back" aria-label="Back to home">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M11 6l-6 6 6 6"></path>
        </svg>
        Back to site
      </Link>

      <main className="auth">
        {/* BRAND SIDE */}
        <section className="brandside" aria-hidden="true">
          <div className="mesh"></div>
          <div className="grid-lines"></div>
          <Link href="/" aria-label="Turn2Law home">
            <img className="brand-logo" src="/turn2law-logo.png" alt="Turn2Law" width="1620" height="460" style={{ height: "30px", width: "auto", display: "block" }} />
          </Link>
          <span className="badge"><span className="dot"></span>India's Legal Operating System</span>
          <div className="brand-head">
            <h1>Welcome<br /><span class="g">back.</span></h1>
            <p>Log in to pick up right where you left off.</p>
          </div>
          
          <div className="illus">
            <div className="stage">
              <div className="halo"></div>
              <div className="podium"></div>
              <div className="n" style={{ color: "var(--gold-deep)" }}>
                <svg viewBox="0 0 96 118">
                  <use href="#nmark"></use>
                </svg>
              </div>
              <div className="fcard c1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                  <polyline points="14 3 14 9 20 9"></polyline>
                </svg>
              </div>
              <div className="fcard c2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v18M7 7h10M5 21h14"></path>
                  <path d="M6 7l-3 6a3 3 0 0 0 6 0zM18 7l-3 6a3 3 0 0 0 6 0z"></path>
                </svg>
              </div>
              <div className="fcard c3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <path d="M9 12l2 2 4-4"></path>
                </svg>
              </div>
              <div className="fcard c4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="4" width="16" height="16" rx="3"></rect>
                  <path d="M9 9h6v6H9zM4 10v4M20 10v4M10 4h4M10 20h4"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="features">
            <div className="feat">
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="4" width="16" height="16" rx="3"></rect>
                  <path d="M9 9h6v6H9zM4 10v4M20 10v4M10 4h4M10 20h4"></path>
                </svg>
              </span>
              <div><b>AI-Powered</b><span>Built for legal pros</span></div>
            </div>
            <div className="feat">
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <path d="M9 12l2 2 4-4"></path>
                </svg>
              </span>
              <div><b>Secure &amp; Private</b><span>Your data protected</span></div>
            </div>
            <div className="feat">
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </span>
              <div><b>Built for India</b><span>Designed for Indian law</span></div>
            </div>
          </div>
        </section>

        {/* FORM SIDE */}
        <section className="formside">
          <div className="card">
            <Link href="/" className="mob-logo" aria-label="Turn2Law home">
              <img src="/turn2law-logo.png" alt="Turn2Law" width="1620" height="460" />
            </Link>
            <h2>Welcome back</h2>
            <p className="sub">Log in to your Turn2Law account.</p>
            
            <form onSubmit={handleFormSubmit} noValidate>
              <div className="field">
                <label htmlFor="email">Email address</label>
                <div className="inp">
                  <svg className="lead" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                    <path d="m3 7 9 6 9-6"></path>
                  </svg>
                  <input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="you@company.in" 
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailErr(""); }}
                    autoComplete="email" 
                    required 
                    aria-required="true"
                    aria-invalid={emailErr ? "true" : "false"}
                    aria-describedby="emailErr"
                  />
                </div>
                <small className={`ferr ${emailErr ? "show" : ""}`} id="emailErr" role="alert">{emailErr}</small>
              </div>

              <div className="field">
                <label htmlFor="password">Password</label>
                <div className="inp">
                  <svg className="lead" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="11" width="16" height="10" rx="2"></rect>
                    <path d="M8 11V7a4 4 0 0 1 8 0v4"></path>
                  </svg>
                  <input 
                    id="password" 
                    name="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Enter your password" 
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setPasswordErr(""); }}
                    autoComplete="current-password" 
                    required 
                    aria-required="true"
                    aria-invalid={passwordErr ? "true" : "false"}
                    aria-describedby="passwordErr"
                  />
                  <button 
                    type="button" 
                    className="toggle" 
                    id="pwToggle" 
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? "Hide password" : "Show password"} 
                    aria-pressed={showPassword}
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c6.5 0 10 7 10 7a13.2 13.2 0 0 1-1.67 2.68M6.6 6.6A13.5 13.5 0 0 0 2 11s3.5 7 10 7a9.7 9.7 0 0 0 5.4-1.6M14.12 14.12A3 3 0 1 1 9.88 9.88"></path>
                        <path d="M2 2l20 20"></path>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
                <small className={`ferr ${passwordErr ? "show" : ""}`} id="passwordErr" role="alert">{passwordErr}</small>
              </div>

              <div className="row-between">
                <label className="remember">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  Remember me
                </label>
                <a href="#" className="forgot" onClick={handleForgotPassword}>Forgot password?</a>
              </div>

              <button type="submit" className="submit" disabled={isSubmitting}>
                {isSubmitting ? "Logging in…" : "Log in"}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6"></path>
                </svg>
              </button>

              <div className="formok" id="formOk" style={{ display: showSuccess ? "flex" : "none" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <path d="M22 4 12 14.01l-3-3"></path>
                </svg>
                <span>Logged in. Taking you in…</span>
              </div>
            </form>

            <div className="divider">or continue with</div>
            
            <div className="socials">
              <button type="button" className="soc" onClick={() => handleSocialClick("Google")} aria-label="Continue with Google">
                <svg viewBox="0 0 48 48" width="18" height="18">
                  <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
                  <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"></path>
                  <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path>
                  <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
                </svg>
              </button>
              <button type="button" className="soc" onClick={() => handleSocialClick("Microsoft")} aria-label="Continue with Microsoft">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path fill="#F25022" d="M1 1h10v10H1z"></path>
                  <path fill="#7FBA00" d="M13 1h10v10H13z"></path>
                  <path fill="#00A4EF" d="M1 13h10v10H1z"></path>
                  <path fill="#FFB900" d="M13 13h10v10H13z"></path>
                </svg>
              </button>
              <button type="button" className="soc" onClick={() => handleSocialClick("Apple")} aria-label="Continue with Apple">
                <svg viewBox="0 0 24 24" width="17" height="17" fill="#111">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.51 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"></path>
                </svg>
              </button>
            </div>
            
            <p className="alt">New to Turn2Law? <Link href="/signup">Create an account</Link></p>
          </div>
        </section>
      </main>

      {/* TOAST NOTIFICATION */}
      <div className={`toast ${showToast ? "show" : ""}`} id="toast" role="status" aria-live="polite">
        {toastMsg}
      </div>
    </>
  );
}
