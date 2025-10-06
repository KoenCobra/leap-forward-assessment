import ButtonElevated from "@/components/ButtonElevated";
import {
  faMap,
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
      <ButtonElevated
        icon={faMap}
        iconClassName="text-lg"
        text="Naar de kaart"
      />
    </div>
  );
};

export default QuizControls;
