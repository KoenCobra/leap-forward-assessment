import { cn } from "@/lib/utils";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import { useQuestions } from "../../_hooks/useQuestions";
import useQuizContext from "../../_hooks/useQuizContext";

const QuestionTimer = () => {
  const { questions } = useQuestions();
  const {
    currentQuestionIndex,
    time,
    setTime,
    setIsAnswerReady,
    isAnswerReady,
  } = useQuizContext();

  const timerContainerRef = useRef<HTMLDivElement>(null);

  const currentQuestion = questions?.[currentQuestionIndex];
  const timeLimit = currentQuestion?.time_limit_s || 0;
  const formattedTime = `00:${String(time).padStart(2, "0")}`;

  useEffect(() => {
    if (timeLimit) {
      setTime(timeLimit);
    }
  }, [timeLimit, setTime]);

  useEffect(() => {
    if (isAnswerReady) return;

    const countdown = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          setIsAnswerReady(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [setTime, setIsAnswerReady, isAnswerReady]);

  const isLowTime = time <= 3 && time > 0;

  return (
    <div
      ref={timerContainerRef}
      className={cn(
        "px-4 py-2 flex items-center gap-2 bg-primary-white rounded-4xl w-fit mx-auto",
        isLowTime
          ? "text-error-red animate-scale-pulse"
          : "text-primary-blue-dark"
      )}
    >
      <FontAwesomeIcon icon={faStopwatch} className="text-sm" />
      <span className="font-md font-bold">{formattedTime}</span>
    </div>
  );
};

export default QuestionTimer;
