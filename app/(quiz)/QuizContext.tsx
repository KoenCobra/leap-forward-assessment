"use client";

import { createContext, ReactNode, useState } from "react";
import { LOW_TIME_THRESHOLD } from "./constants";
import { Answer, QuizContextValue } from "./types";

const QuizContext = createContext<QuizContextValue | null>(null);

interface QuizContextProviderProps {
  children: ReactNode;
}

export const QuizContextProvider = ({ children }: QuizContextProviderProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>([]);
  const [time, setTime] = useState(0);
  const [isAnswerReady, setIsAnswerReady] = useState(false);

  const hasSelectedAnswers = selectedAnswers.length > 0;

  const hasAllAnswerCorrect =
    selectedAnswers.length > 0 &&
    selectedAnswers.every((answer) => answer.correct);

  const isLowTime = time <= LOW_TIME_THRESHOLD && time > 0;

  const contextValue: QuizContextValue = {
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
  };

  return (
    <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
  );
};

export { QuizContext };
