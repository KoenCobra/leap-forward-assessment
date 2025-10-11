/**
 * Core types for the quiz feature
 */

/** Represents a single answer option for a question */
export interface Answer {
  answer: string;
  correct: boolean;
}

/** Represents a quiz question with its answer options and time limit */
export interface Question {
  question: string;
  time_limit_s: number;
  answers: Answer[];
}

/**
 * Quiz state management types
 */

/** Props for the Quiz Context */
export interface QuizContextValue {
  // Question navigation
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;

  // Answer management
  selectedAnswers: Answer[];
  setSelectedAnswers: (answers: Answer[]) => void;

  // Timer management
  time: number;
  setTime: (time: number | ((prev: number) => number)) => void;

  // Quiz state
  isAnswerReady: boolean;
  setIsAnswerReady: (isReady: boolean) => void;

  // Computed properties
  hasSelectedAnswers: boolean;
  hasAllAnswerCorrect: boolean;
  isLowTime: boolean;
}

/** Type guard to check if an answer is selected */
export const isAnswerSelected = (
  answer: Answer,
  selectedAnswers: Answer[]
): boolean => {
  return selectedAnswers.includes(answer);
};
