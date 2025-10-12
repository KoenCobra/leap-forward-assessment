import LevelProgress from "@/components/LevelProgress";
import UnlockButton from "./UnlockButton";

const MapNavigation = () => {
  return (
    <div className="relative h-full rounded-2xl bg-map bg-cover bg-center p-3">
      <div className="w-1/2 lg:w-1/3 xl:w-1/5">
        <LevelProgress level={0} totalLevels={6} />
      </div>
      <UnlockButton />
    </div>
  );
};

export default MapNavigation;
