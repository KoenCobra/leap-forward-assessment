"use client";

import { useContext } from "react";
import { QuizContext } from "../QuizContext";
import { QuizContextValue } from "../types";

export default function useQuizContext(): QuizContextValue {
  const context = useContext(QuizContext);

  if (!context) {
    throw new Error("useQuizContext must be used within a QuizContextProvider");
  }

  return context;
}
