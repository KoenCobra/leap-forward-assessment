import ContentElevated from "@/components/ContentElevated";

interface LevelProgressProps {
  level: number;
  totalLevels: number;
}

const LevelProgress = ({ level, totalLevels }: LevelProgressProps) => {
  const getProgressWidth = (level: number, totalLevels: number) =>
    (level / totalLevels) * 100;

  // Progress bar styles with diagonal stripe pattern using repeating-linear-gradient
  // 115deg: angle of diagonal stripes | 8px transparent + 8px darker = 16px repeating pattern
  const progressBarClassName = () =>
    "rounded-sm bg-secondary-yellow h-full overflow-hidden bg-[repeating-linear-gradient(115deg,transparent,transparent_8px,rgba(0,0,0,0.1)_8px,rgba(0,0,0,0.1)_16px)]";

  return (
    <div className="flex-1">
      <ContentElevated>
        <div className="pl-1 py-1 pr-4.5 flex items-center gap-1.5 w-full">
          <div className="h-7 rounded-sm bg-blue-background flex-1">
            <div
              style={{ width: `${getProgressWidth(level, totalLevels)}%` }}
              className={progressBarClassName()}
            ></div>
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
