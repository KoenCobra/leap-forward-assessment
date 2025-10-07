import ContentElevated from "@/components/ContentElevated";

const LevelProgress = () => {
  return (
    <div className="flex-1">
      <ContentElevated>
        <div className="pl-1 py-1 pr-4.5 flex items-center gap-1.5 w-full">
          <div className="h-7 rounded-sm bg-blue-background flex-1">
            <div className="rounded-sm bg-secondary-yellow w-fit h-full overflow-hidden flex items-center gap-3 px-1">
              <div className="h-full w-2 rotate-25 scale-120 bg-yellow-darker"></div>
            </div>
          </div>
          <span className="text-md font-bold">Level 2 / 8</span>
        </div>
      </ContentElevated>
    </div>
  );
};

export default LevelProgress;
