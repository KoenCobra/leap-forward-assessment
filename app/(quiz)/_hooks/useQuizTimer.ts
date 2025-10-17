import { useEffect } from "react";
import { LOW_TIME_THRESHOLD } from "../constants";
import useQuizContext from "./useQuizContext";
import { useQuizSounds } from "./useQuizSounds";

export const useQuizTimer = (timeLimit: number) => {
  const {
    time,
    setTime,
    isAnswerReady,
    setIsAnswerReady,
    hasAllAnswerCorrect,
    currentQuestionIndex,
  } = useQuizContext();
  const { playWarning, playCorrect, playError } = useQuizSounds();

  // Initialize timer when question changes
  useEffect(() => {
    if (timeLimit) {
      setTime(timeLimit);
    }
  }, [timeLimit, setTime, currentQuestionIndex]);

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

  // Play sound when answer is revealed (either by user clicking or timer expiring)
  useEffect(() => {
    if (isAnswerReady) {
      if (hasAllAnswerCorrect) {
        playCorrect();
      } else {
        playError();
      }
    }
  }, [isAnswerReady, hasAllAnswerCorrect, playCorrect, playError]);

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
