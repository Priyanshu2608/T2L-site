"use client";
import { useRef } from "react";
import Link from "next/link";

export default function Tilt({ children, className, href, style, ...props }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${py * -4}deg) rotateY(${px * 4}deg)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) card.style.transform = "";
  };

  if (href) {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <Link
          ref={cardRef}
          className={className}
          href={href}
          style={style}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          {...props}
        >
          {children}
        </Link>
      );
    } else {
      return (
        <a
          ref={cardRef}
          className={className}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={style}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          {...props}
        >
          {children}
        </a>
      );
    }
  }

  return (
    <div
      ref={cardRef}
      className={className}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
}
