"use client";
import { createContext, useMemo, useState } from "react";
import { Answer } from "./types";

interface QuizContextProps {
  index: number;
  setIndex: (index: number) => void;
  selectedAnswers: Answer[];
  hasSelectedAnswers: boolean;
  setSelectedAnswers: (answer: Answer[]) => void;
}

const QuizContext = createContext<QuizContextProps | null>(null);

const QuizContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [index, setIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>([]);

  const hasSelectedAnswers = selectedAnswers.length > 0;

  const contextValue = useMemo<QuizContextProps>(
    () => ({
      index,
      setIndex,
      selectedAnswers,
      hasSelectedAnswers,
      setSelectedAnswers,
    }),
    [index, setIndex, selectedAnswers, setSelectedAnswers, hasSelectedAnswers]
  );

  return (
    <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
  );
};

export { QuizContext, QuizContextProvider };
