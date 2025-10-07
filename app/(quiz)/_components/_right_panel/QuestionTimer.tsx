import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const QuestionTimer = () => {
  return (
    <div className="px-4 py-2 flex items-center gap-2 bg-primary-white rounded-4xl text-primary-blue-dark">
      <FontAwesomeIcon icon={faStopwatch} className="text-sm" />
      <span className="font-md font-bold">42:32</span>
    </div>
  );
};

export default QuestionTimer;
