"use client";

import ButtonElevated from "@/components/ButtonElevated";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useQuestions } from "../../_hooks/useQuestions";
import useQuizContext from "../../_hooks/useQuizContext";
import Answers from "./Answers";
import QuestionLoadingSkeleton from "./QuestionLoadingSkeleton";
import QuestionTimer from "./QuestionTimer";
import QuestionsErrorState from "./QuestionsErrorState";

const QuestionsAndAnswers = () => {
  const {
    hasSelectedAnswers,
    isTimeLimitReached,
    currentQuestionIndex,
    setCurrentQuestionIndex,
  } = useQuizContext();
  const { questions, isLoadingQuestions, errorQuestions } = useQuestions();

  if (isLoadingQuestions) {
    return <QuestionLoadingSkeleton />;
  }

  if (!isLoadingQuestions && errorQuestions) {
    return <QuestionsErrorState />;
  }

  const handleNextQuestion = () => {
    if (hasSelectedAnswers || isTimeLimitReached) {
      if (questions?.length && currentQuestionIndex === questions?.length - 1) {
        return;
      }
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <div className="bg-blue-background rounded-2xl p-4">
      <div className="bg-primary-blue-darkest h-full rounded-2xl pt-2 px-12 pb-15.5">
        <QuestionTimer />

        <h2 className="font-bold text-center text-2xl mt-4.5">
          {questions?.[currentQuestionIndex]?.question}
        </h2>

        <Answers />

        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-3/5 mx-auto mt-7.5">
              <ButtonElevated
                isDisabled={!hasSelectedAnswers}
                text="Klaar!"
                addedButtonClasses={cn(
                  "bg-grey-light text-primary-blue-dark",
                  hasSelectedAnswers || isTimeLimitReached
                    ? "bg-secondary-yellow after:bg-yellow-darkest"
                    : "cursor-default"
                )}
                afterColor="after:bg-grey-dark"
                onClick={() => {
                  if (hasSelectedAnswers || isTimeLimitReached) {
                    handleNextQuestion();
                  }
                }}
              />
            </div>
          </TooltipTrigger>
          {!hasSelectedAnswers && !isTimeLimitReached && (
            <TooltipContent>
              <p>Selecteer minstens één antwoord</p>
            </TooltipContent>
          )}
        </Tooltip>

        <ButtonElevated
          isDisabled={isTimeLimitReached}
          text="Geef me een tip..."
          addedButtonClasses="
             mt-4 bg-primary-white text-primary-blue-dark w-3/5 mx-auto
             hover:bg-grey-light transition-all duration-300"
          afterColor="after:bg-grey-light"
        />
      </div>
    </div>
  );
};

export default QuestionsAndAnswers;
