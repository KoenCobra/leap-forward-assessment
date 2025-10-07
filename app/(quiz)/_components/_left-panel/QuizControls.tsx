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
          addedIconClasses="mr-2"
          text="Naar de kaart"
          addedButtonClasses="bg-secondary-yellow text-primary-blue-darkest flex-1 w-full"
          afterColor="after:bg-yellow-darkest"
        />
      </div>
    </div>
  );
};

export default QuizControls;
