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
    isTimeLimitReached,
  } = useQuizContext();

  const handleSetSelectedAnswers = (answer: Answer) => {
    if (selectedAnswers.includes(answer)) {
      return setSelectedAnswers(
        selectedAnswers.filter((selectedAnswer) => selectedAnswer !== answer)
      );
    }
    setSelectedAnswers([...selectedAnswers, answer]);
  };

  return (
    <div className="grid grid-cols-2 gap-6 mt-8 w-full">
      {questions?.[currentQuestionIndex]?.answers.map((answer) => (
        <button
          disabled={isTimeLimitReached}
          key={answer.answer}
          className={cn(
            "w-full rounded-lg bg-secondary-blue-light cursor-pointer",
            "px-8 py-4 text-primary-blue-dark font-bold text-xl",
            selectedAnswers.includes(answer) &&
              "bg-blue-medium text-primary-white outline-2 outline-secondary-yellow",
            isTimeLimitReached && "cursor-default"
          )}
          onClick={() => handleSetSelectedAnswers(answer)}
        >
          {answer.answer}
        </button>
      ))}
    </div>
  );
};

export default Answers;
