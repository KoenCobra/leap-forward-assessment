import { cn } from "@/lib/utils";
import { useQuestions } from "../../_hooks/useQuestions";
import useQuizContext from "../../_hooks/useQuizContext";

const Answers = () => {
  const { questions } = useQuestions();
  const { index, selectedAnswers, handleSetSelectedAnswers } = useQuizContext();

  return (
    <div className="grid grid-cols-2 gap-6 mt-8 w-full">
      {questions?.[index]?.answers.map((answer) => (
        <button
          key={answer.answer}
          className={cn(
            "w-full rounded-lg bg-secondary-blue-light cursor-pointer",
            "px-8 py-4 text-primary-blue-dark font-bold text-xl",
            selectedAnswers.includes(answer) &&
              "bg-blue-medium text-primary-white outline-2 outline-secondary-yellow"
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
