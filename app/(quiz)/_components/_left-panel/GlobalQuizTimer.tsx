"use client";

import ContentElevated from "@/components/ContentElevated";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * GlobalQuizTimer Component
 *
 * Displays total time spent on the quiz
 * Currently shows static time - could be enhanced to track actual elapsed time
 *
 * Note: This is different from QuestionTimer which tracks per-question time
 */
const GlobalQuizTimer = () => {
  return (
    <ContentElevated>
      <div className="px-3 py-1.5 flex items-center gap-2">
        <FontAwesomeIcon icon={faStopwatch} className="text-sm" />
        <span className="font-md font-bold">42:32</span>
      </div>
    </ContentElevated>
  );
};

export default GlobalQuizTimer;
