import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuestions } from "../../_hooks/useQuestions";
import useQuizContext from "../../_hooks/useQuizContext";

const QuestionTimer = () => {
  const { questions } = useQuestions();
  const { index } = useQuizContext();

  return (
    <div className="px-4 py-2 flex items-center gap-2 bg-primary-white rounded-4xl text-primary-blue-dark w-fit mx-auto">
      <FontAwesomeIcon icon={faStopwatch} className="text-sm" />
      <span className="font-md font-bold">
        00:{questions?.[index]?.time_limit_s}
      </span>
    </div>
  );
};

export default QuestionTimer;
