"use client";

import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCallback, useRef } from "react";
import { useQuestions } from "../../_hooks/useQuestions";
import useQuizContext from "../../_hooks/useQuizContext";
import { useQuizSounds } from "../../_hooks/useQuizSounds";
import { ANIMATION_DELAYS } from "../../constants";
import { Answer, isAnswerSelected } from "../../types";

/**
 * Answers Component
 *
 * Displays answer options for the current question
 * Features:
 * - Multi-select answer support
 * - Visual feedback for selected/correct/incorrect answers
 * - Hover animations
 * - Sound effects on interaction
 * - Staggered entrance animations
 */
const Answers = () => {
  const answersContainerRef = useRef<HTMLDivElement>(null);
  const { playClick } = useQuizSounds();
  const { questions } = useQuestions();
  const {
    currentQuestionIndex,
    selectedAnswers,
    setSelectedAnswers,
    isAnswerReady,
  } = useQuizContext();

  const currentAnswers = questions?.[currentQuestionIndex]?.answers ?? [];

  // Staggered animation for answer buttons
  useGSAP(
    () => {
      const buttons = answersContainerRef.current?.children;
      if (!buttons) return;

      gsap.fromTo(
        buttons,
        {
          scale: 0.9,
          y: 30,
          opacity: 0,
        },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.4,
          delay: ANIMATION_DELAYS.ANSWERS,
          stagger: 0.08,
          ease: "back.out(1.5)",
        }
      );
    },
    { scope: answersContainerRef, dependencies: [currentQuestionIndex] }
  );

  /**
   * Handles hover animation for answer buttons
   * Scales up slightly on hover for better UX
   */
  const handleButtonHover = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, entering: boolean) => {
      if (isAnswerReady) return;

      gsap.to(e.currentTarget, {
        scale: entering ? 1.02 : 1,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    [isAnswerReady]
  );

  /**
   * Determines CSS classes for answer button based on its state
   * - Default: light blue background
   * - Selected (before reveal): darker blue with yellow outline
   * - Correct (after reveal): white background with green outline
   * - Incorrect (after reveal): white background with red outline
   */
  const getAnswerClasses = useCallback(
    (answer: Answer) => {
      const selected = isAnswerSelected(answer, selectedAnswers);

      return cn(
        "w-full rounded-lg px-8 py-4 font-bold text-xl",
        "bg-secondary-blue-light text-primary-blue-dark",

        // Selected state (before answer is revealed)
        selected &&
          !isAnswerReady && [
            "bg-blue-medium text-primary-white",
            "outline-2 outline-secondary-yellow",
          ],

        // Revealed state (after clicking "Klaar!")
        isAnswerReady && [
          "cursor-default",
          selected &&
            answer.correct &&
            "bg-primary-white outline-[3px] outline-success-green",
          selected &&
            !answer.correct &&
            "bg-primary-white outline-[3px] outline-error-red",
        ],

        !isAnswerReady && "cursor-pointer"
      );
    },
    [selectedAnswers, isAnswerReady]
  );

  /**
   * Toggles answer selection
   * Supports multi-select - answers can be added/removed from selection
   */
  const toggleAnswer = useCallback(
    (answer: Answer) => {
      playClick();
      setSelectedAnswers(
        isAnswerSelected(answer, selectedAnswers)
          ? selectedAnswers.filter((a) => a !== answer)
          : [...selectedAnswers, answer]
      );
    },
    [playClick, selectedAnswers, setSelectedAnswers]
  );

  return (
    <div
      ref={answersContainerRef}
      className="grid lg:grid-cols-2 gap-6 mt-8 w-full"
      role="group"
      aria-label="Answer options"
    >
      {currentAnswers.map((answer) => (
        <button
          key={answer.answer}
          disabled={isAnswerReady}
          className={getAnswerClasses(answer)}
          onClick={() => toggleAnswer(answer)}
          onMouseEnter={(e) => handleButtonHover(e, true)}
          onMouseLeave={(e) => handleButtonHover(e, false)}
          aria-pressed={isAnswerSelected(answer, selectedAnswers)}
          aria-label={`Answer option: ${answer.answer}`}
        >
          {answer.answer}
        </button>
      ))}
    </div>
  );
};

export default Answers;
