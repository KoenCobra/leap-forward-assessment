import ButtonElevated from "@/components/ButtonElevated";
import {
  faQuestion,
  faRotateRight,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";

const QuizControls = () => {
  return (
    <div className="flex gap-2">
      <ButtonElevated icon={faQuestion} />
      <ButtonElevated icon={faRotateRight} />
      <ButtonElevated icon={faVolumeXmark} />
    </div>
  );
};

export default QuizControls;
