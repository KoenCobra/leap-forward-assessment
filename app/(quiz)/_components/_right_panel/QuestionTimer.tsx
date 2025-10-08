import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useQuestions } from "../../_hooks/useQuestions";
import useQuizContext from "../../_hooks/useQuizContext";

const QuestionTimer = () => {
  const { questions } = useQuestions();
  const { currentQuestionIndex, time, setTime } = useQuizContext();

  const questionTimeLimit =
    questions?.[currentQuestionIndex]?.time_limit_s || 0;

  useEffect(() => {
    if (questionTimeLimit) {
      setTime(questionTimeLimit);
    }
  }, [questionTimeLimit, setTime]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (time <= 0) {
        clearInterval(timer);
        return;
      }
      setTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [time, setTime]);

  return (
    <div className="px-4 py-2 flex items-center gap-2 bg-primary-white rounded-4xl text-primary-blue-dark w-fit mx-auto">
      <FontAwesomeIcon icon={faStopwatch} className="text-sm" />
      <span className="font-md font-bold">
        00:{String(time).padStart(2, "0")}
      </span>
    </div>
  );
};

export default QuestionTimer;
