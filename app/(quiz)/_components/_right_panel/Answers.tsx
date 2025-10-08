import { cn } from "@/lib/utils";
import { useQuestions } from "../../_hooks/useQuestions";
import useQuizContext from "../../_hooks/useQuizContext";
import { Answer } from "../../types";

const Answers = () => {
  const { questions } = useQuestions();
  const {
    currentQuestionIndex,
    selectedAnswers,
    setSelectedAnswers,
    isAnswerReady,
  } = useQuizContext();

  const currentAnswers = questions?.[currentQuestionIndex]?.answers ?? [];
  const isSelected = (answer: Answer) => selectedAnswers.includes(answer);

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
    setSelectedAnswers(
      isSelected(answer)
        ? selectedAnswers.filter((a) => a !== answer)
        : [...selectedAnswers, answer]
    );
  };

  return (
    <div className="grid grid-cols-2 gap-6 mt-8 w-full">
      {currentAnswers.map((answer) => (
        <button
          key={answer.answer}
          disabled={isAnswerReady}
          className={getAnswerClasses(answer)}
          onClick={() => toggleAnswer(answer)}
        >
          {answer.answer}
        </button>
      ))}
    </div>
  );
};

export default Answers;
