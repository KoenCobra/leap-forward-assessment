import ContentElevated from "@/components/ContentElevated";
import { cn } from "@/lib/utils";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import LevelCounter from "./LevelCounter";

const DescriptionCard = () => {
  return (
    <div className="rounded-2xl flex-1 flex flex-col">
      <div
        className={cn(
          "bg-printing-houses bg-primary-blue-darkest/60 bg-blend-overlay",
          "bg-cover bg-center h-40 lg:h-[31%]",
          "rounded-t-lg p-2 relative"
        )}
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
          className={cn(
            "w-[clamp(100px,15vh,135px)] h-[clamp(100px,15vh,135px)]",
            "border-4 border-primary-white bg-primary-white rounded-full",
            "absolute bottom-[-20%] left-1/2 -translate-x-1/2 shadow-2xl"
          )}
        />
      </div>
      <div className="bg-primary-white rounded-b-lg p-4 h-full text-center">
        <h2
          className={cn(
            "text-2xl font-bold text-primary-blue-dark",
            "mt-8 pb-3.5",
            "border-b-2 border-blue-medium",
            "w-fit mx-auto"
          )}
        >
          Drukkerij
        </h2>
        <p
          className={cn(
            "text-primary-blue-dark font-light leading-5.5",
            "mt-4 text-balance max-w-2xl mx-auto"
          )}
        >
          Je moet je goed bewust zijn van wat jij allemaal moet doen. Als
          drukafwerker heb je een heel uiteenlopend takenpakket. Sommige van
          onderstaande taken behoren echter niet tot het takenpakket, stop er
          snel mee voor je baas het ziet!
        </p>
      </div>
    </div>
  );
};

export default DescriptionCard;
