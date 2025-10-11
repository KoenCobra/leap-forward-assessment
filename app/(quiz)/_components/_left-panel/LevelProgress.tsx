import ContentElevated from "@/components/ContentElevated";

/**
 * LevelProgress Component
 *
 * Displays current level and total levels in the quiz
 * Shows visual progress bar with striped fill effect
 *
 * Currently static - could be enhanced to:
 * - Connect to quiz context for dynamic progress
 * - Animate progress bar fill
 * - Update level based on completed questions
 */
const LevelProgress = () => {
  return (
    <div className="flex-1">
      <ContentElevated>
        <div className="pl-1 py-1 pr-4.5 flex items-center gap-1.5 w-full">
          {/* Progress bar container */}
          <div className="h-7 rounded-sm bg-blue-background flex-1">
            {/* Filled portion - width should be dynamic */}
            <div className="rounded-sm bg-secondary-yellow w-fit h-full overflow-hidden flex items-center gap-3 px-1">
              {/* Decorative stripe effect */}
              <div className="h-full w-2 rotate-25 scale-120 bg-yellow-darker"></div>
            </div>
          </div>
          {/* Level indicator text */}
          <span className="text-md font-bold">Level 2 / 8</span>
        </div>
      </ContentElevated>
    </div>
  );
};

export default LevelProgress;
