import React from "react";
import { QuizContextProvider } from "./QuizContext";

/**
 * Wraps all quiz routes with the QuizContextProvider
 * This ensures quiz state is available to all child components
 */
const QuizLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <QuizContextProvider>{children}</QuizContextProvider>
    </main>
  );
};

export default QuizLayout;
