/**
 * Quiz-specific constants
 * Contains timing configurations and UI thresholds
 */

/** Time threshold (in seconds) when timer should show warning state */
export const LOW_TIME_THRESHOLD = 3;

/** Number of seconds to wait before showing animations */
export const ANIMATION_DELAYS = {
  QUESTION: 0.3,
  ANSWERS: 0.5,
  BUTTONS: 0.8,
} as const;

/** GSAP animation durations (in seconds) */
export const ANIMATION_DURATIONS = {
  FAST: 0.4,
  NORMAL: 0.6,
  SLOW: 0.8,
} as const;
