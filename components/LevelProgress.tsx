import ContentElevated from "@/components/ContentElevated";

interface LevelProgressProps {
  level: number;
  totalLevels: number;
}

const LevelProgress = ({ level, totalLevels }: LevelProgressProps) => {
  const getProgressWidth = (level: number, totalLevels: number) =>
    (level / totalLevels) * 100;

  return (
    <div className="flex-1">
      <ContentElevated>
        <div className="pl-1 py-1 pr-4.5 flex items-center gap-1.5 w-full">
          <div className="h-7 rounded-sm bg-blue-background flex-1">
            <div
              style={{ width: `${getProgressWidth(level, totalLevels)}%` }}
              className="rounded-sm bg-secondary-yellow h-full overflow-hidden flex items-center gap-3.25"
            >
              {Array.from({ length: level }).map((_, index) => (
                <div
                  key={index}
                  className="h-full translate-x-1.5 w-2 rotate-25 scale-120 bg-yellow-darker"
                ></div>
              ))}
            </div>
          </div>
          <span className="text-md font-bold">
            Level {level} / {totalLevels}
          </span>
        </div>
      </ContentElevated>
    </div>
  );
};

export default LevelProgress;
