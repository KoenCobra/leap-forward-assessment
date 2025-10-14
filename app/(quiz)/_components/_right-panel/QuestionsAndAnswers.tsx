"use client";

import ButtonElevated from "@/components/ButtonElevated";
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
import { useVoiceHint } from "../../_hooks/useVoiceHint";
import { ANIMATION_DELAYS } from "../../constants";
import Answers from "./Answers";
import QuestionLoadingSkeleton from "./QuestionLoadingSkeleton";
import QuestionTimer from "./QuestionTimer";
import QuestionsErrorState from "./QuestionsErrorState";

const QuestionsAndAnswers = () => {
  const panelRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLHeadingElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const tipButtonRef = useRef<HTMLDivElement>(null);

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

  const currentQuestion = questions?.[currentQuestionIndex];
  const isLastQuestion = useMemo(
    () => questions && currentQuestionIndex === questions.length - 1,
    [questions, currentQuestionIndex]
  );
  const canSubmit = isAnswerReady || hasSelectedAnswers;
  const showTooltip = !canSubmit;

  const { handleGetHint, isLoadingHint } = useVoiceHint(
    currentQuestion,
    currentQuestionIndex
  );

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

  const handleCheckQuestion = useCallback(() => {
    setIsAnswerReady(true);

    if (hasAllAnswerCorrect) {
      playCorrect();
    } else {
      playError();
    }
  }, [setIsAnswerReady, hasAllAnswerCorrect, playCorrect, playError]);

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

  const handleButtonClick = useCallback(() => {
    if (isAnswerReady) {
      handleNextQuestion();
    } else {
      handleCheckQuestion();
    }
  }, [isAnswerReady, handleNextQuestion, handleCheckQuestion]);

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

  if (isLoadingQuestions) {
    return <QuestionLoadingSkeleton />;
  }

  if (errorQuestions) {
    return <QuestionsErrorState />;
  }

  return (
    <div
      ref={panelRef}
      className="bg-primary-blue-darkest h-full rounded-2xl pt-2 px-12 pb-15.5 invisible"
    >
      <QuestionTimer />

      <h2
        ref={questionRef}
        className="font-bold text-center text-2xl mt-4.5 invisible"
      >
        {currentQuestion?.question}
      </h2>

      <Answers />

      <Tooltip>
        <TooltipTrigger asChild>
          <div ref={buttonsRef} className="w-3/5 mx-auto mt-7.5 invisible">
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

      {!isAnswerReady && (
        <div ref={tipButtonRef} className="invisible">
          <ButtonElevated
            text={
              isLoadingHint ? "Hint wordt gegenereerd..." : "Geef me een tip..."
            }
            addedButtonClasses="mt-4 bg-primary-white text-primary-blue-dark w-3/5 mx-auto hover:bg-grey-light transition-all duration-300"
            afterColor="after:bg-grey-light"
            isDisabled={isLoadingHint}
            onClick={handleGetHint}
          />
        </div>
      )}
    </div>
  );
};

export default QuestionsAndAnswers;
