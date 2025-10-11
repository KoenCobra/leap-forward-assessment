import { useEffect } from "react";
import { LOW_TIME_THRESHOLD } from "../constants";
import useQuizContext from "./useQuizContext";
import { useQuizSounds } from "./useQuizSounds";

/**
 * Custom hook for managing quiz timer logic
 * Handles countdown, auto-submission on timeout, and sound effects
 *
 * @param timeLimit - Time limit for current question in seconds
 */
export const useQuizTimer = (timeLimit: number) => {
  const {
    time,
    setTime,
    isAnswerReady,
    setIsAnswerReady,
    hasAllAnswerCorrect,
  } = useQuizContext();
  const { playCorrect, playError, playWarning } = useQuizSounds();

  // Initialize timer when question changes
  useEffect(() => {
    if (timeLimit) {
      setTime(timeLimit);
    }
  }, [timeLimit, setTime]);

  // Countdown timer logic
  useEffect(() => {
    if (isAnswerReady) return;

    const countdown = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          setIsAnswerReady(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [setTime, setIsAnswerReady, isAnswerReady]);

  // Play sound when timer expires
  useEffect(() => {
    if (isAnswerReady && time === 0) {
      if (hasAllAnswerCorrect) {
        playCorrect();
      } else {
        playError();
      }
    }
  }, [isAnswerReady, time, hasAllAnswerCorrect, playCorrect, playError]);

  // Play warning sound when time is running low
  useEffect(() => {
    if (time > 0 && time <= LOW_TIME_THRESHOLD) {
      playWarning();
    }
  }, [playWarning, time]);

  const formattedTime = `00:${String(time).padStart(2, "0")}`;
  const isLowTime = time <= LOW_TIME_THRESHOLD && time > 0;

  return {
    formattedTime,
    isLowTime,
  };
};
