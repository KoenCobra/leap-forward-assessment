import ContentElevated from "@/components/ContentElevated";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DescriptionCard = () => {
  return (
    <div className="rounded-2xl flex-1">
      <div className="bg-printing-houses bg-black/40 bg-blend-overlay bg-cover bg-center h-[25%] rounded-t-lg p-2">
        <div className="flex items-center gap-2">
          <ContentElevated>
            <div className="px-3 py-1.5 flex items-center gap-2">
              <FontAwesomeIcon icon={faStopwatch} className="text-sm " />
              <span className="font-md font-bold">42:32</span>
            </div>
          </ContentElevated>
          <div className="flex-1">
            <ContentElevated>
              <div className="pl-1 py-1 pr-4.5 flex items-center gap-1.5 w-full">
                <div className="h-7 rounded-sm bg-blue-background flex-1"></div>
                <span className="text-md font-bold">Level 2 / 8</span>
              </div>
            </ContentElevated>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionCard;
