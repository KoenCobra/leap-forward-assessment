"use client";
import { createContext, useCallback, useMemo, useState } from "react";

interface QuizContextProps {
  index: number;
}

const QuizContext = createContext<QuizContextProps | null>(null);

const QuizContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [index, setIndex] = useState<number>(0);

  const handleSetIndex = useCallback(() => setIndex((prev) => prev + 1), []);

  const contextValue = useMemo<QuizContextProps>(
    () => ({ index, handleSetIndex }),
    [index, handleSetIndex]
  );

  return (
    <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
  );
};

export { QuizContext, QuizContextProvider };
