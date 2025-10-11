import { Skeleton } from "@/components/ui/skeleton";

/**
 * QuestionLoadingSkeleton Component
 *
 * Loading state placeholder for quiz questions
 * Matches the layout of the actual question component for smooth transition
 *
 * Displays skeleton placeholders for:
 * - Timer
 * - Question text
 * - Answer options (8 buttons in 2x4 grid)
 * - Action buttons
 */
const QuestionLoadingSkeleton = () => {
  return (
    <div className="bg-blue-background rounded-2xl p-4">
      <div className="bg-primary-blue-darkest h-full rounded-2xl pt-2 px-12 pb-15.5">
        {/* Timer skeleton */}
        <div className="flex justify-center">
          <Skeleton className="h-8 w-24 rounded-full bg-secondary-blue-light/30" />
        </div>

        {/* Question text skeleton */}
        <div className="mt-4.5 flex flex-col items-center gap-3">
          <Skeleton className="h-7 w-4/5 bg-secondary-blue-light/30" />
        </div>

        {/* Answer options skeleton - 2x4 grid */}
        <div className="grid grid-cols-2 gap-6 mt-8 w-full">
          {[...Array(8)].map((_, i) => (
            <Skeleton
              key={i}
              className="h-16 w-full rounded-lg bg-secondary-blue-light/30"
            />
          ))}
        </div>

        {/* Action buttons skeleton */}
        <div className="flex flex-col items-center gap-4 mt-7.5">
          <Skeleton className="h-14 w-3/5 rounded-lg bg-secondary-blue-light/30" />
          <Skeleton className="h-14 w-3/5 rounded-lg bg-secondary-blue-light/30" />
        </div>
      </div>
    </div>
  );
};

export default QuestionLoadingSkeleton;
