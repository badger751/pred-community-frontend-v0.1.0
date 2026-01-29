import { useLayoutEffect, useRef } from "react";
import { type ReactNode } from "react";
import gsap from "gsap";

interface PageTransitionProps {
  children: ReactNode;
  locationKey: string;
}

const PageTransition = ({ children, locationKey }: PageTransitionProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        {
          autoAlpha: 0,
          y: 18,
          filter: "blur(6px)",
        },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.45,
          ease: "power2.out",
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [locationKey]);

  return (
    <div
      ref={containerRef}
      style={{ minHeight: "100vh", position: "relative" }}
    >
      {children}
    </div>
  );
};

export default PageTransition;
