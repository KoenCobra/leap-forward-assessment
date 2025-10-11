"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useCallback, useRef } from "react";
import {
  CHILDREN_ANIMATION_PRESETS,
  useGSAPChildrenAnimation,
} from "../../_hooks/useGSAPAnimation";
import { useQuestions } from "../../_hooks/useQuestions";
import useQuizContext from "../../_hooks/useQuizContext";
import { useQuizSounds } from "../../_hooks/useQuizSounds";
import { ANIMATION_DELAYS } from "../../constants";
import { Answer, isAnswerSelected } from "../../types";

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

  useGSAPChildrenAnimation(
    answersContainerRef,
    CHILDREN_ANIMATION_PRESETS.bounceInStagger(
      0.4,
      0.08,
      ANIMATION_DELAYS.ANSWERS
    ),
    [currentQuestionIndex]
  );

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

  /*
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
