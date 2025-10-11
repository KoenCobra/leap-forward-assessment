"use client";

import { cn } from "@/lib/utils";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import {
  ANIMATION_PRESETS,
  useGSAPAnimation,
} from "../../_hooks/useGSAPAnimation";
import { useQuestions } from "../../_hooks/useQuestions";
import useQuizContext from "../../_hooks/useQuizContext";
import { useQuizTimer } from "../../_hooks/useQuizTimer";

/**
 * QuestionTimer Component
 *
 * Displays a countdown timer for the current question
 * Features:
 * - Auto-submission when timer reaches zero
 * - Visual warning when time is running low
 * - Sound effects for time warnings
 * - Smooth animations on question changes
 */
const QuestionTimer = () => {
  const timerContainerRef = useRef<HTMLDivElement>(null);
  const { questions } = useQuestions();
  const { currentQuestionIndex } = useQuizContext();

  // Get current question and its time limit
  const currentQuestion = questions?.[currentQuestionIndex];
  const timeLimit = currentQuestion?.time_limit_s || 0;

  // Use custom timer hook for all timer logic
  const { formattedTime, isLowTime } = useQuizTimer(timeLimit);

  // Animate timer on question change
  useGSAPAnimation(timerContainerRef, ANIMATION_PRESETS.scaleIn(), [
    currentQuestionIndex,
  ]);

  return (
    <div
      ref={timerContainerRef}
      className={cn(
        "px-4 py-2 flex items-center gap-2 bg-primary-white rounded-4xl w-fit mx-auto",
        isLowTime
          ? "text-error-red animate-scale-pulse"
          : "text-primary-blue-dark"
      )}
      role="timer"
      aria-label={`Time remaining: ${formattedTime}`}
    >
      <FontAwesomeIcon icon={faStopwatch} className="text-sm" />
      <span className="font-md font-bold">{formattedTime}</span>
    </div>
  );
};

export default QuestionTimer;
