"use client";

import { useContext } from "react";
import { QuizContext } from "../QuizContext";
import { QuizContextValue } from "../types";

/**
 * Custom hook to access Quiz Context
 *
 * @throws Error if used outside of QuizContextProvider
 * @returns Quiz context value with all quiz state and actions
 *
 * @example
 * const { currentQuestionIndex, setCurrentQuestionIndex } = useQuizContext();
 */
export default function useQuizContext(): QuizContextValue {
  const context = useContext(QuizContext);

  if (!context) {
    throw new Error("useQuizContext must be used within a QuizContextProvider");
  }

  return context;
}
