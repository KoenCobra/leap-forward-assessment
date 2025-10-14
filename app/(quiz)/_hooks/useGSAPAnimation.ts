import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RefObject } from "react";

interface AnimationConfig {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
}

interface AnimationConfigWithCallbacks extends AnimationConfig {
  onComplete?: () => void;
  onStart?: () => void;
}

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

export const useGSAPChildrenAnimation = (
  containerRef: RefObject<HTMLElement | null>,
  config: AnimationConfigWithCallbacks,
  dependencies: unknown[] = []
) => {
  useGSAP(
    () => {
      const children = containerRef.current?.children;
      if (!children) return;

      config.onStart?.();
      gsap.fromTo(children, config.from, {
        ...config.to,
        onComplete: config.onComplete,
      });
    },
    { scope: containerRef, dependencies }
  );
};

/**
 * Predefined animation configurations for common patterns
 */
export const ANIMATION_PRESETS = {
  fadeSlideUp: (duration = 0.6, delay = 0): AnimationConfig => ({
    from: { y: 20, autoAlpha: 0 },
    to: { y: 0, autoAlpha: 1, duration, delay, ease: "power2.out" },
  }),
  fadeSlideDown: (duration = 0.8, delay = 0): AnimationConfig => ({
    from: { y: 50, autoAlpha: 0 },
    to: { y: 0, autoAlpha: 1, duration, delay, ease: "power3.out" },
  }),
  scaleIn: (duration = 0.6, delay = 0): AnimationConfig => ({
    from: { scale: 0.8, y: -20, autoAlpha: 0 },
    to: {
      scale: 1,
      y: 0,
      autoAlpha: 1,
      duration,
      delay,
      ease: "back.out(1.7)",
    },
  }),
  bounceIn: (duration = 0.4, delay = 0, stagger = 0): AnimationConfig => ({
    from: { scale: 0.9, y: 30, autoAlpha: 0 },
    to: {
      scale: 1,
      y: 0,
      autoAlpha: 1,
      duration,
      delay,
      stagger,
      ease: "back.out(1.5)",
    },
  }),
  rotateScaleIn: (duration = 0.8, delay = 0): AnimationConfig => ({
    from: { scale: 0, rotation: -180, autoAlpha: 0 },
    to: {
      scale: 1,
      rotation: 0,
      autoAlpha: 1,
      duration,
      delay,
      ease: "back.out(1.7)",
    },
  }),
};

/**
 * Predefined animation configurations for children/staggered animations
 */
export const CHILDREN_ANIMATION_PRESETS = {
  fadeSlideUpStagger: (
    duration = 0.8,
    stagger = 0.2,
    delay = 0
  ): AnimationConfig => ({
    from: { y: 50, autoAlpha: 0 },
    to: { y: 0, autoAlpha: 1, duration, stagger, delay, ease: "power3.out" },
  }),
  fadeSlideDownStagger: (
    duration = 0.6,
    stagger = 0.1,
    delay = 0
  ): AnimationConfig => ({
    from: { y: -20, autoAlpha: 0 },
    to: { y: 0, autoAlpha: 1, duration, stagger, delay, ease: "power2.out" },
  }),
  scaleInStagger: (
    duration = 0.5,
    stagger = 0.1,
    delay = 0
  ): AnimationConfig => ({
    from: { scale: 0.8, autoAlpha: 0, y: 20 },
    to: {
      scale: 1,
      autoAlpha: 1,
      y: 0,
      duration,
      stagger,
      delay,
      ease: "back.out(1.7)",
    },
  }),
  bounceInStagger: (
    duration = 0.4,
    stagger = 0.08,
    delay = 0
  ): AnimationConfig => ({
    from: { scale: 0.9, y: 30, autoAlpha: 0 },
    to: {
      scale: 1,
      y: 0,
      autoAlpha: 1,
      duration,
      stagger,
      delay,
      ease: "back.out(1.5)",
    },
  }),
};
