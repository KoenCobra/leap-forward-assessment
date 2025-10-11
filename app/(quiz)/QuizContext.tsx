"use client";

import { createContext, ReactNode, useMemo, useState } from "react";
import { LOW_TIME_THRESHOLD } from "./constants";
import { Answer, QuizContextValue } from "./types";

/**
 * Quiz Context - Manages global quiz state
 *
 * This context provides:
 * - Current question navigation
 * - Answer selection state
 * - Timer state
 * - Computed quiz properties
 */

const QuizContext = createContext<QuizContextValue | null>(null);

interface QuizContextProviderProps {
  children: ReactNode;
}

export const QuizContextProvider = ({ children }: QuizContextProviderProps) => {
  // State management
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>([]);
  const [time, setTime] = useState(0);
  const [isAnswerReady, setIsAnswerReady] = useState(false);

  // Memoized computed values to prevent unnecessary re-renders
  const hasSelectedAnswers = useMemo(
    () => selectedAnswers.length > 0,
    [selectedAnswers.length]
  );

  const hasAllAnswerCorrect = useMemo(
    () =>
      selectedAnswers.length > 0 &&
      selectedAnswers.every((answer) => answer.correct),
    [selectedAnswers]
  );

  const isLowTime = useMemo(
    () => time <= LOW_TIME_THRESHOLD && time > 0,
    [time]
  );

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo<QuizContextValue>(
    () => ({
      currentQuestionIndex,
      setCurrentQuestionIndex,
      selectedAnswers,
      hasSelectedAnswers,
      hasAllAnswerCorrect,
      setSelectedAnswers,
      time,
      setTime,
      isAnswerReady,
      setIsAnswerReady,
      isLowTime,
    }),
    [
      currentQuestionIndex,
      selectedAnswers,
      hasSelectedAnswers,
      hasAllAnswerCorrect,
      time,
      isAnswerReady,
      isLowTime,
    ]
  );

  return (
    <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
  );
};

export { QuizContext };
