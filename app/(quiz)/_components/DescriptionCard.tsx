import ContentElevated from "@/components/ContentElevated";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DescriptionCard = () => {
  return (
    <div className="rounded-2xl p-2 flex-1">
      <div className="bg-printing-houses bg-black/40 bg-blend-overlay bg-cover bg-center h-[25%] rounded-t-lg p-2">
        <ContentElevated>
          <FontAwesomeIcon icon={faStopwatch} className="text-2xl" />
          42:32
        </ContentElevated>
      </div>
    </div>
  );
};

export default DescriptionCard;
