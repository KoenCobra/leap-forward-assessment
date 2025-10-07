import Image from "next/image";
import GlobalQuizTimer from "./GlobalQuizTimer";
import LevelProgress from "./LevelProgress";

const DescriptionCard = () => {
  return (
    <div className="rounded-2xl flex-1 flex flex-col">
      <div
        className="
          bg-printing-houses bg-primary-blue-darkest/60 bg-blend-overlay
          bg-cover bg-center h-48 xl:h-[40%]
          rounded-t-lg p-2 relative
        "
      >
        <div className="flex items-center gap-2">
          <GlobalQuizTimer />
          <LevelProgress />
        </div>
        <Image
          src="/images/manager.png"
          alt="manager"
          width={135}
          height={135}
          className="
            w-[clamp(100px,15vh,135px)] h-[clamp(100px,15vh,135px)]
            border-4 border-primary-white bg-primary-white rounded-full
            absolute bottom-[-10%] left-1/2 -translate-x-1/2 shadow-2xl
          "
        />
      </div>
      <div className="bg-primary-white rounded-b-lg p-4 h-full text-center">
        <h2
          className="
            text-2xl font-bold text-primary-blue-dark
            mt-8 pb-3.5
            border-b-2 border-blue-medium
            w-fit mx-auto"
        >
          Drukkerij
        </h2>
        <p
          className="
            text-primary-blue-dark font-light leading-5.5
            mt-4 text-balance max-w-2xl mx-auto pb-6
          "
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
