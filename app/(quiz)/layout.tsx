import React from "react";
import { QuizContextProvider } from "./QuizContext";

const QuizLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <QuizContextProvider>{children}</QuizContextProvider>
    </main>
  );
};

export default QuizLayout;
