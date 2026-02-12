import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export const ShipRouteAnimation = () => {
  const containerRef = useRef(null);
  const shipRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    // Desktop only
    if (window.innerWidth < 1024) return;

    const ctx = gsap.context(() => {
      // Calculate path length
      const pathLength = pathRef.current.getTotalLength();
      
      // Initial state: Path is fully hidden (or fully shown but we want to reveal it BEHIND the ship?)
      // User said: "line ahead of the ship should not appear".
      // So line draws *with* the ship.
      // StrokeDashoffset: pathLength -> 0
      gsap.set(pathRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // Animate Ship along path
      gsap.to(shipRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: true, // Auto-rotate ship to follow path
          start: 0,
          end: 1,
        },
        ease: "none",
      });

      // Animate Path Drawing (Synced with Ship)
      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full overflow-hidden lg:block max-w-[1440px] mx-auto left-0 right-0"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 5000"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={pathRef}
          d="
            M 50 100              
            L 50 650              
            C 50 800, 1390 800, 1390 950 
            L 1390 1900            
            C 1390 2050, 50 2050, 50 2200 
            L 50 2900             
            C 50 3050, 1390 3050, 1390 3200 
            L 1390 4000
            C 1390 4150, 50 4150, 50 4300
             L 50 4900
          "
          stroke="rgba(153, 207, 98, 0.4)"
          strokeWidth="3"
          strokeDasharray="10 10"
          vectorEffect="non-scaling-stroke"
          style={{ filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))" }}
        />
      </svg>

      {/* Ship Icon */}
      <div
        ref={shipRef}
        className="absolute left-0 top-0 h-20 w-20 -ml-10 -mt-10 flex items-center justify-center z-10"
        style={{ transformOrigin: "center center" }}
      >
        <img
          src="/photos/iconenavio/navio.png"
          alt="Ship"
          className="w-full h-full object-contain drop-shadow-lg"
          style={{ transform: "rotate(90deg)" }}
        />
      </div>
    </div>
  );
};
