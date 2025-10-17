"use client";

import ButtonElevated from "@/components/ButtonElevated";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import {
  ANIMATION_PRESETS,
  useGSAPAnimation,
} from "../../_hooks/useGSAPAnimation";
import { useQuestions } from "../../_hooks/useQuestions";
import useQuizContext from "../../_hooks/useQuizContext";
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
    setTime,
  } = useQuizContext();
  const { questions, isLoadingQuestions, errorQuestions } = useQuestions();
  const router = useRouter();

  const currentQuestion = questions?.[currentQuestionIndex];
  const isLastQuestion =
    questions && currentQuestionIndex === questions.length - 1;

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

  const handleCheckQuestion = () => {
    setIsAnswerReady(true);
    setTime(0);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      router.push("/");
      return;
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setIsAnswerReady(false);
    setSelectedAnswers([]);
  };

  const handleButtonClick = () => {
    if (isAnswerReady) {
      handleNextQuestion();
    } else {
      handleCheckQuestion();
    }
  };

  const getButtonClasses = () =>
    cn(
      "bg-grey-light text-primary-blue-dark",
      canSubmit
        ? "bg-secondary-yellow after:bg-yellow-darkest"
        : "cursor-default"
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

      {!isAnswerReady && (
        <div ref={tipButtonRef}>
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
