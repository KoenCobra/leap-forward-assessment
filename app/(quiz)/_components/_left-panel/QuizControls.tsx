import ButtonElevated from "@/components/ButtonElevated";
import {
  faMap,
  faQuestion,
  faRotateRight,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";

const QuizControls = () => {
  return (
    <div className="flex items-center gap-2">
      <ButtonElevated icon={faQuestion} />
      <ButtonElevated icon={faRotateRight} />
      <ButtonElevated icon={faVolumeXmark} />
      <div className="flex-1">
        <ButtonElevated
          icon={faMap}
          text="Naar de kaart"
          addedButtonClasses="bg-secondary-yellow text-primary-blue-darkest w-full"
          afterColor="after:bg-yellow-darkest"
          iconSize={20}
        />
      </div>
    </div>
  );
};

export default QuizControls;
