import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useSound } from "react-sounds";
import { useQuestions } from "../../_hooks/useQuestions";
import useQuizContext from "../../_hooks/useQuizContext";
import { Answer } from "../../types";

const Answers = () => {
  const { play } = useSound("/sounds/button_soft.mp3");
  const { questions } = useQuestions();
  const {
    currentQuestionIndex,
    selectedAnswers,
    setSelectedAnswers,
    isAnswerReady,
  } = useQuizContext();

  const answersContainerRef = useRef<HTMLDivElement>(null);

  const currentAnswers = questions?.[currentQuestionIndex]?.answers ?? [];
  const isSelected = (answer: Answer) => selectedAnswers.includes(answer);

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
          delay: 0.5,
          stagger: 0.08,
          ease: "back.out(1.5)",
        }
      );
    },
    { scope: answersContainerRef, dependencies: [currentQuestionIndex] }
  );

  const handleButtonHover = (
    e: React.MouseEvent<HTMLButtonElement>,
    entering: boolean
  ) => {
    if (isAnswerReady) return;

    gsap.to(e.currentTarget, {
      scale: entering ? 1.02 : 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const getAnswerClasses = (answer: Answer) => {
    const selected = isSelected(answer);

    return cn(
      "w-full rounded-lg px-8 py-4 font-bold text-xl",
      "bg-secondary-blue-light text-primary-blue-dark",

      selected &&
        !isAnswerReady && [
          "bg-blue-medium text-primary-white",
          "outline-2 outline-secondary-yellow",
        ],

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
  };

  const toggleAnswer = (answer: Answer) => {
    play();
    setSelectedAnswers(
      isSelected(answer)
        ? selectedAnswers.filter((a) => a !== answer)
        : [...selectedAnswers, answer]
    );
  };

  return (
    <div
      ref={answersContainerRef}
      className="grid lg:grid-cols-2 gap-6 mt-8 w-full"
    >
      {currentAnswers.map((answer) => (
        <button
          key={answer.answer}
          disabled={isAnswerReady}
          className={getAnswerClasses(answer)}
          onClick={() => toggleAnswer(answer)}
          onMouseEnter={(e) => handleButtonHover(e, true)}
          onMouseLeave={(e) => handleButtonHover(e, false)}
        >
          {answer.answer}
        </button>
      ))}
    </div>
  );
};

export default Answers;
