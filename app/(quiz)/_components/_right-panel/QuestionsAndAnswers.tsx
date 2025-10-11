"use client";

import ButtonElevated from "@/components/ButtonElevated";
import RightPanel from "@/components/RightPanel";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef } from "react";
import {
  ANIMATION_PRESETS,
  useGSAPAnimation,
} from "../../_hooks/useGSAPAnimation";
import { useQuestions } from "../../_hooks/useQuestions";
import useQuizContext from "../../_hooks/useQuizContext";
import { useQuizSounds } from "../../_hooks/useQuizSounds";
import { ANIMATION_DELAYS } from "../../constants";
import Answers from "./Answers";
import QuestionLoadingSkeleton from "./QuestionLoadingSkeleton";
import QuestionTimer from "./QuestionTimer";
import QuestionsErrorState from "./QuestionsErrorState";

/**
 * QuestionsAndAnswers Component
 *
 * Main component for the quiz interface
 * Responsibilities:
 * - Display current question
 * - Show answer options
 * - Handle answer submission
 * - Navigate between questions
 * - Display loading and error states
 *
 * Features:
 * - Server-side data prefetching
 * - Smooth animations
 * - Sound effects
 * - Accessibility support
 */
const QuestionsAndAnswers = () => {
  // Refs for animations
  const panelRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLHeadingElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const tipButtonRef = useRef<HTMLDivElement>(null);

  // Context and hooks
  const {
    hasSelectedAnswers,
    isAnswerReady,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    setIsAnswerReady,
    setSelectedAnswers,
    hasAllAnswerCorrect,
  } = useQuizContext();
  const { questions, isLoadingQuestions, errorQuestions } = useQuestions();
  const router = useRouter();
  const { playCorrect, playError } = useQuizSounds();

  // Computed values
  const currentQuestion = questions?.[currentQuestionIndex];
  const isLastQuestion = useMemo(
    () => questions && currentQuestionIndex === questions.length - 1,
    [questions, currentQuestionIndex]
  );
  const canSubmit = isAnswerReady || hasSelectedAnswers;
  const showTooltip = !canSubmit;

  // Animation configurations
  useGSAPAnimation(panelRef, ANIMATION_PRESETS.fadeSlideDown(), [
    isLoadingQuestions,
  ]);

  useGSAPAnimation(
    questionRef,
    ANIMATION_PRESETS.fadeSlideUp(0.6, ANIMATION_DELAYS.QUESTION),
    [currentQuestionIndex]
  );

  useGSAPAnimation(
    buttonsRef,
    ANIMATION_PRESETS.fadeSlideUp(0.5, ANIMATION_DELAYS.BUTTONS),
    [currentQuestionIndex]
  );

  useGSAPAnimation(
    tipButtonRef,
    ANIMATION_PRESETS.fadeSlideUp(0.5, ANIMATION_DELAYS.BUTTONS),
    [currentQuestionIndex, isAnswerReady]
  );

  /**
   * Validates and reveals the correctness of selected answers
   * Plays appropriate sound effect based on results
   */
  const handleCheckQuestion = useCallback(() => {
    setIsAnswerReady(true);

    if (hasAllAnswerCorrect) {
      playCorrect();
    } else {
      playError();
    }
  }, [setIsAnswerReady, hasAllAnswerCorrect, playCorrect, playError]);

  /**
   * Advances to next question or returns to home on quiz completion
   * Resets question-specific state
   */
  const handleNextQuestion = useCallback(() => {
    if (isLastQuestion) {
      router.push("/");
      return;
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setIsAnswerReady(false);
    setSelectedAnswers([]);
  }, [
    isLastQuestion,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    setIsAnswerReady,
    setSelectedAnswers,
    router,
  ]);

  /**
   * Handles main action button click
   * Either checks answers or moves to next question depending on state
   */
  const handleButtonClick = useCallback(() => {
    if (isAnswerReady) {
      handleNextQuestion();
    } else {
      handleCheckQuestion();
    }
  }, [isAnswerReady, handleNextQuestion, handleCheckQuestion]);

  /**
   * Determines button styling based on submit state
   */
  const getButtonClasses = useCallback(
    () =>
      cn(
        "bg-grey-light text-primary-blue-dark",
        canSubmit
          ? "bg-secondary-yellow after:bg-yellow-darkest"
          : "cursor-default"
      ),
    [canSubmit]
  );

  // Loading state
  if (isLoadingQuestions) {
    return <QuestionLoadingSkeleton />;
  }

  // Error state
  if (errorQuestions) {
    return <QuestionsErrorState />;
  }

  return (
    <RightPanel>
      <div
        ref={panelRef}
        className="bg-primary-blue-darkest h-full rounded-2xl pt-2 px-12 pb-15.5"
      >
        {/* Timer - counts down for each question */}
        <QuestionTimer />

        {/* Current question text */}
        <h2 ref={questionRef} className="font-bold text-center text-2xl mt-4.5">
          {currentQuestion?.question}
        </h2>

        {/* Answer options grid */}
        <Answers />

        {/* Main action button (Check / Continue) */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div ref={buttonsRef} className="w-3/5 mx-auto mt-7.5">
              <ButtonElevated
                isDisabled={!canSubmit}
                text={isAnswerReady ? "Doorgaan!" : "Klaar!"}
                addedButtonClasses={getButtonClasses()}
                afterColor="after:bg-grey-dark"
                onClick={handleButtonClick}
              />
            </div>
          </TooltipTrigger>
          {showTooltip && (
            <TooltipContent>
              <p>Selecteer minstens één antwoord</p>
            </TooltipContent>
          )}
        </Tooltip>

        {/* Hint button - only shown before answer is revealed */}
        {!isAnswerReady && (
          <div ref={tipButtonRef}>
            <ButtonElevated
              text="Geef me een tip..."
              addedButtonClasses="mt-4 bg-primary-white text-primary-blue-dark w-3/5 mx-auto hover:bg-grey-light transition-all duration-300"
              afterColor="after:bg-grey-light"
            />
          </div>
        )}
      </div>
    </RightPanel>
  );
};

export default QuestionsAndAnswers;
