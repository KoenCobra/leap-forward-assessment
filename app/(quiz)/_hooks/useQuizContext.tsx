"use client";
import { useContext } from "react";
import { QuizContext } from "../QuizContext";

export default function useQuizContext() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuizContext must be used within a QuizContextProvider");
  }
  return context;
}
