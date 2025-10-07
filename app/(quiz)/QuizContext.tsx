"use client";
import { createContext, useCallback, useMemo, useState } from "react";
import { Answer } from "./types";

interface QuizContextProps {
  index: number;
  handleSetIndex: () => void;
  selectedAnswers: Answer[];
  hasSelectedAnswers: boolean;
  handleSetSelectedAnswers: (answer: Answer) => void;
}

const QuizContext = createContext<QuizContextProps | null>(null);

const QuizContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [index, setIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>([]);

  const handleSetIndex = useCallback(() => setIndex((prev) => prev + 1), []);

  const hasSelectedAnswers = selectedAnswers.length > 0;

  const handleSetSelectedAnswers = useCallback(
    (answer: Answer) => {
      if (selectedAnswers.includes(answer)) {
        setSelectedAnswers(
          selectedAnswers.filter((selectedAnswer) => selectedAnswer !== answer)
        );
        return;
      }
      setSelectedAnswers([...selectedAnswers, answer]);
    },
    [selectedAnswers]
  );

  const contextValue = useMemo<QuizContextProps>(
    () => ({
      index,
      handleSetIndex,
      selectedAnswers,
      hasSelectedAnswers,
      handleSetSelectedAnswers,
    }),
    [
      index,
      handleSetIndex,
      selectedAnswers,
      handleSetSelectedAnswers,
      hasSelectedAnswers,
    ]
  );

  return (
    <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
  );
};

export { QuizContext, QuizContextProvider };
