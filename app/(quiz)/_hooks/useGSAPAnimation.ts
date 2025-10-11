import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RefObject } from "react";

/**
 * Animation configuration for GSAP animations
 */
interface AnimationConfig {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
}

/**
 * Custom hook for GSAP animations with consistent patterns
 * Reduces boilerplate and ensures consistent animation behavior
 *
 * @param elementRef - Reference to the element to animate
 * @param config - Animation configuration (from and to states)
 * @param dependencies - Dependencies array to trigger re-animation
 */
export const useGSAPAnimation = (
  elementRef: RefObject<HTMLElement | null>,
  config: AnimationConfig,
  dependencies: unknown[] = []
) => {
  useGSAP(
    () => {
      if (!elementRef.current) return;

      gsap.fromTo(elementRef.current, config.from, config.to);
    },
    { scope: elementRef, dependencies }
  );
};

/**
 * Predefined animation configurations for common patterns
 */
export const ANIMATION_PRESETS = {
  fadeSlideUp: (duration = 0.6, delay = 0): AnimationConfig => ({
    from: { y: 20, opacity: 0 },
    to: { y: 0, opacity: 1, duration, delay, ease: "power2.out" },
  }),
  fadeSlideDown: (duration = 0.8, delay = 0): AnimationConfig => ({
    from: { y: 50, opacity: 0 },
    to: { y: 0, opacity: 1, duration, delay, ease: "power3.out" },
  }),
  scaleIn: (duration = 0.6, delay = 0): AnimationConfig => ({
    from: { scale: 0.8, y: -20, opacity: 0 },
    to: { scale: 1, y: 0, opacity: 1, duration, delay, ease: "back.out(1.7)" },
  }),
  bounceIn: (duration = 0.4, delay = 0, stagger = 0): AnimationConfig => ({
    from: { scale: 0.9, y: 30, opacity: 0 },
    to: {
      scale: 1,
      y: 0,
      opacity: 1,
      duration,
      delay,
      stagger,
      ease: "back.out(1.5)",
    },
  }),
};
