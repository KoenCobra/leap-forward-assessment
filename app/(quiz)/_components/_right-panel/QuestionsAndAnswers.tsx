"use client";

import ButtonElevated from "@/components/ButtonElevated";
import RightPanel from "@/components/RightPanel";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SOUNDS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useSound } from "react-sounds";
import { useQuestions } from "../../_hooks/useQuestions";
import useQuizContext from "../../_hooks/useQuizContext";
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
    setTime,
    setSelectedAnswers,
    hasAllAnswerCorrect,
  } = useQuizContext();
  const { questions, isLoadingQuestions, errorQuestions } = useQuestions();
  const router = useRouter();
  const { play: playAllCorrectAnswers } = useSound(SOUNDS.all_correct_answers);
  const { play: playIncorrectAnswers } = useSound(SOUNDS.incorrect_answers);

  useGSAP(
    () => {
      if (!panelRef.current) return;

      gsap.fromTo(
        panelRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    },
    { scope: panelRef, dependencies: [isLoadingQuestions] }
  );

  useGSAP(
    () => {
      if (!questionRef.current) return;

      gsap.fromTo(
        questionRef.current,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.3,
          ease: "power2.out",
        }
      );
    },
    { scope: questionRef, dependencies: [currentQuestionIndex] }
  );

  useGSAP(
    () => {
      if (!buttonsRef.current) return;

      gsap.fromTo(
        buttonsRef.current,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.8,
          ease: "power2.out",
        }
      );
    },
    { scope: buttonsRef, dependencies: [currentQuestionIndex] }
  );

  useGSAP(
    () => {
      if (!tipButtonRef.current || isAnswerReady) return;

      gsap.fromTo(
        tipButtonRef.current,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.8,
          ease: "power2.out",
        }
      );
    },
    { scope: tipButtonRef, dependencies: [currentQuestionIndex] }
  );

  if (isLoadingQuestions) return <QuestionLoadingSkeleton />;
  if (errorQuestions) return <QuestionsErrorState />;

  const currentQuestion = questions?.[currentQuestionIndex];
  const isLastQuestion =
    questions?.length && currentQuestionIndex === questions.length - 1;
  const canSubmit = isAnswerReady || hasSelectedAnswers;
  const showTooltip = !canSubmit;

  const handleCheckQuestion = () => {
    setIsAnswerReady(true);
    setTime(0);
    if (hasAllAnswerCorrect) {
      playAllCorrectAnswers();
    } else {
      playIncorrectAnswers();
    }
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
    if (isAnswerReady) return handleNextQuestion();

    handleCheckQuestion();
  };

  const getButtonClasses = () =>
    cn(
      "bg-grey-light text-primary-blue-dark",
      canSubmit
        ? "bg-secondary-yellow after:bg-yellow-darkest"
        : "cursor-default"
    );

  return (
    <RightPanel>
      <div
        ref={panelRef}
        className="bg-primary-blue-darkest h-full rounded-2xl pt-2 px-12 pb-15.5"
      >
        <QuestionTimer />

        <h2 ref={questionRef} className="font-bold text-center text-2xl mt-4.5">
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
