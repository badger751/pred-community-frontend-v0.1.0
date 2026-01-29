import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const THRESHOLD = 900;

const MobileBlocker = () => {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth <= THRESHOLD;
  });

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setIsMobile(window.innerWidth <= THRESHOLD);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(() => {
    if (!isMobile || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { autoAlpha: 0, y: 16, scale: 0.98 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.35, ease: "power2.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  if (!isMobile) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "grid",
        placeItems: "center",
        padding: "24px",
        background:
          "radial-gradient(circle at 18% 20%, rgba(46,139,87,0.08), transparent 35%), rgba(15, 23, 42, 0.96)",
        color: "#e5e7eb",
        backdropFilter: "blur(4px)",
        pointerEvents: "auto",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 380,
          borderRadius: 14,
          padding: "24px 22px",
          background: "rgba(17, 24, 39, 0.85)",
          border: "1px solid rgba(148, 163, 184, 0.3)",
          boxShadow: "0 14px 36px rgba(0,0,0,0.35)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 10 }}>🖥️</div>
        <h2 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 700, color: "#f8fafc" }}>
          Desktop recommended
        </h2>
        <p style={{ margin: "0 0 6px", fontSize: 14, lineHeight: 1.5, color: "#cbd5e1" }}>
          Please open this platform on a desktop to access the full experience.
        </p>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: "#cbd5e1" }}>
          On tablets, switch to landscape for the best view.
        </p>
      </div>
    </div>
  );
};

export default MobileBlocker;
