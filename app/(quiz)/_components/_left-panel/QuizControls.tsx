import ButtonElevated from "@/components/ButtonElevated";
import {
  faMap,
  faQuestion,
  faRotateRight,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";

const QuizControls = () => {
  return (
    <div
      className="
        grid grid-cols-3 gap-2  
        md:grid-cols-[auto_auto_auto_1fr] 
        lg:grid-cols-3
        2xl:md:grid-cols-[auto_auto_auto_1fr]"
    >
      <div className="col-span-1 lg:col-span-1">
        <ButtonElevated icon={faQuestion} />
      </div>
      <div className="col-span-1 lg:col-span-1">
        <ButtonElevated icon={faRotateRight} />
      </div>
      <div className="col-span-1 lg:col-span-1">
        <ButtonElevated icon={faVolumeXmark} />
      </div>
      <div className="col-span-3 md:col-span-1 lg:col-span-3 2xl:col-span-1">
        <ButtonElevated
          icon={faMap}
          text="Naar de kaart"
          addedButtonClasses="bg-secondary-yellow text-primary-blue-darkest"
          afterColor="after:bg-yellow-darkest"
          iconSize={20}
        />
      </div>
    </div>
  );
};

export default QuizControls;
