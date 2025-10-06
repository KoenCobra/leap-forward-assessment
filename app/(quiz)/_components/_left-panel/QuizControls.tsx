import ButtonElevated from "@/components/ButtonElevated";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

const QuizControls = () => {
  return (
    <div className="flex gap-2">
      <ButtonElevated icon={faQuestion} iconClassName="text-xl" />
    </div>
  );
};

export default QuizControls;
