import { SOUNDS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import { useSound } from "react-sounds";
import { useQuestions } from "../../_hooks/useQuestions";
import useQuizContext from "../../_hooks/useQuizContext";

const QuestionTimer = () => {
  const { play } = useSound(SOUNDS.time_almost_up);
  const { play: playAllCorrectAnswers } = useSound(SOUNDS.all_correct_answers);
  const { play: playIncorrectAnswers } = useSound(SOUNDS.incorrect_answers);
  const { questions } = useQuestions();
  const {
    currentQuestionIndex,
    time,
    setTime,
    setIsAnswerReady,
    isAnswerReady,
    hasAllAnswerCorrect,
    isLowTime,
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
          if (hasAllAnswerCorrect) {
            playAllCorrectAnswers();
          } else {
            playIncorrectAnswers();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [
    setTime,
    setIsAnswerReady,
    isAnswerReady,
    hasAllAnswerCorrect,
    playAllCorrectAnswers,
    playIncorrectAnswers,
  ]);

  useEffect(() => {
    if (isLowTime) {
      play();
    }
  }, [play, isLowTime]);

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
