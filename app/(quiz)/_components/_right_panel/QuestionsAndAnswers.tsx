"use client";

import ButtonElevated from "@/components/ButtonElevated";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useQuestions } from "../../_hooks/useQuestions";
import useQuizContext from "../../_hooks/useQuizContext";
import Answers from "./Answers";
import QuestionLoadingSkeleton from "./QuestionLoadingSkeleton";
import QuestionTimer from "./QuestionTimer";
import QuestionsErrorState from "./QuestionsErrorState";

const QuestionsAndAnswers = () => {
  const {
    hasSelectedAnswers,
    isAnswerReady,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    setIsAnswerReady,
    setTime,
    setSelectedAnswers,
  } = useQuizContext();
  const { questions, isLoadingQuestions, errorQuestions } = useQuestions();
  const router = useRouter();

  if (isLoadingQuestions) {
    return <QuestionLoadingSkeleton />;
  }

  if (!isLoadingQuestions && errorQuestions) {
    return <QuestionsErrorState />;
  }

  const handleCheckQuestion = () => {
    setIsAnswerReady(true);
    setTime(0);
  };

  const handleNextQuestion = () => {
    if (questions?.length && currentQuestionIndex === questions?.length - 1) {
      router.push("/");
      return;
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setIsAnswerReady(false);
    setSelectedAnswers([]);
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
                isDisabled={!isAnswerReady && !hasSelectedAnswers}
                text={isAnswerReady ? "Doorgaan!" : "Klaar!"}
                addedButtonClasses={cn(
                  "bg-grey-light text-primary-blue-dark",
                  hasSelectedAnswers || isAnswerReady
                    ? "bg-secondary-yellow after:bg-yellow-darkest"
                    : "cursor-default"
                )}
                afterColor="after:bg-grey-dark"
                onClick={() => {
                  if (!isAnswerReady) {
                    return handleCheckQuestion();
                  }

                  handleNextQuestion();
                }}
              />
            </div>
          </TooltipTrigger>
          {!hasSelectedAnswers && !isAnswerReady && (
            <TooltipContent>
              <p>Selecteer minstens één antwoord</p>
            </TooltipContent>
          )}
        </Tooltip>

        {!isAnswerReady && (
          <ButtonElevated
            text="Geef me een tip..."
            addedButtonClasses="
             mt-4 bg-primary-white text-primary-blue-dark w-3/5 mx-auto
             hover:bg-grey-light transition-all duration-300"
            afterColor="after:bg-grey-light"
          />
        )}
      </div>
    </div>
  );
};

export default QuestionsAndAnswers;
