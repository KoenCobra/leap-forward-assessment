"use client";

import ButtonElevated from "@/components/ButtonElevated";
import { useState } from "react";
import { useQuestions } from "../../_hooks/useQuestions";
import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";

const QuestionsAndAnswers = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const { questions, isLoadingQuestions, errorQuestions } = useQuestions();

  return (
    <div className="bg-blue-background rounded-2xl p-4">
      <div className="bg-primary-blue-darkest h-full rounded-2xl pt-2 px-12 pb-15.5">
        <QuestionTimer />
        <h2 className="font-bold text-center text-2xl mt-4.5">
          {questions?.[currentQuestionIndex]?.question}
        </h2>
        <Answers />
        <ButtonElevated
          isDisabled
          text="Klaar!"
          addedButtonClasses="mt-7.5 bg-grey-light text-primary-blue-dark w-3/5 mx-auto"
          afterColor="after:bg-grey-dark"
        />
        <ButtonElevated
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
