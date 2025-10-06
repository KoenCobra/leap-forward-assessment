import ContentElevated from "@/components/ContentElevated";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import LevelCounter from "./LevelCounter";

const DescriptionCard = () => {
  return (
    <div className="rounded-2xl flex-1 flex flex-col">
      <div
        className="bg-printing-houses bg-primary-blue-darkest/60 bg-blend-overlay
       bg-cover bg-center h-40 lg:h-[31%] rounded-t-lg p-2 relative"
      >
        <div className="flex items-center gap-2">
          <ContentElevated>
            <div className="px-3 py-1.5 flex items-center gap-2">
              <FontAwesomeIcon icon={faStopwatch} className="text-sm" />
              <span className="font-md font-bold">42:32</span>
            </div>
          </ContentElevated>
          <div className="flex-1">
            <ContentElevated>
              <div className="pl-1 py-1 pr-4.5 flex items-center gap-1.5 w-full">
                <div className="h-7 rounded-sm bg-blue-background flex-1">
                  <LevelCounter />
                </div>
                <span className="text-md font-bold">Level 2 / 8</span>
              </div>
            </ContentElevated>
          </div>
        </div>
        <Image
          src="/images/manager.png"
          alt="manager"
          width={135}
          height={135}
          className="w-[clamp(100px,15vh,135px)] h-[clamp(100px,15vh,135px)] border-4
           border-primary-white bg-primary-white rounded-full
           absolute bottom-[-20%] left-1/2 -translate-x-1/2 shadow-2xl"
        />
      </div>
      <div className="bg-primary-white rounded-b-lg p-4 h-full"></div>
    </div>
  );
};

export default DescriptionCard;
