import { useEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Animate multiple targets with a fade + translate effect when they scroll into view.
 * @param {string | Element | Element[]} targets - selector or DOM nodes.
 * @param {gsap.TweenVars} options - optional overrides for the tween.
 */
export function useGsapFadeIn(targets, options = {}) {
  const memoizedOptions = useMemo(
    () => options,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(options)]
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(targets).forEach((target, index) => {
        gsap.fromTo(
          target,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: memoizedOptions.stagger ? index * memoizedOptions.stagger : 0,
            scrollTrigger: {
              trigger: target,
              start: "top 85%",
              once: true,
              ...memoizedOptions.scrollTrigger,
            },
            ...memoizedOptions,
          }
        );
      });
    });

    return () => ctx.revert();
  }, [targets, memoizedOptions]);
}

