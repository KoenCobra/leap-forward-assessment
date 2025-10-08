"use client";
import { createContext, useMemo, useState } from "react";
import { Answer } from "./types";

interface QuizContextProps {
  index: number;
  setIndex: (index: number) => void;
  selectedAnswers: Answer[];
  hasSelectedAnswers: boolean;
  setSelectedAnswers: (answer: Answer[]) => void;
  time: number;
  setTime: (time: number | ((prev: number) => number)) => void;
  isTimeLimitReached: boolean;
}

const QuizContext = createContext<QuizContextProps | null>(null);

const QuizContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [index, setIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>([]);
  const [time, setTime] = useState<number>(0);

  const hasSelectedAnswers = selectedAnswers.length > 0;
  const isTimeLimitReached = time <= 0;

  const contextValue = useMemo<QuizContextProps>(
    () => ({
      index,
      setIndex,
      selectedAnswers,
      hasSelectedAnswers,
      setSelectedAnswers,
      time,
      setTime,
      isTimeLimitReached,
    }),
    [index, selectedAnswers, hasSelectedAnswers, time, isTimeLimitReached]
  );

  return (
    <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
  );
};

export { QuizContext, QuizContextProvider };
