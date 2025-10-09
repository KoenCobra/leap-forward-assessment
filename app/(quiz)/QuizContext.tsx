"use client";
import { createContext, useState } from "react";
import { Answer } from "./types";

interface QuizContextProps {
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  selectedAnswers: Answer[];
  hasSelectedAnswers: boolean;
  hasAllAnswerCorrect: boolean;
  setSelectedAnswers: (answer: Answer[]) => void;
  time: number;
  setTime: (time: number | ((prev: number) => number)) => void;
  isAnswerReady: boolean;
  setIsAnswerReady: (isAnswerReady: boolean) => void;
  isLowTime: boolean;
}

const QuizContext = createContext<QuizContextProps | null>(null);

const QuizContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>([]);
  const [time, setTime] = useState<number>(0);
  const [isAnswerReady, setIsAnswerReady] = useState<boolean>(false);

  const hasSelectedAnswers = selectedAnswers.length > 0;
  const hasAllAnswerCorrect =
    selectedAnswers.length > 0 &&
    selectedAnswers.every((answer) => answer.correct);
  const isLowTime = time <= 3 && time > 0;

  const contextValue = {
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

export { QuizContext, QuizContextProvider };
