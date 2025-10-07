"use client";

import ContentElevated from "@/components/ContentElevated";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCountDown } from "@reactuses/core";

const GlobalQuizTimer = () => {
  const [_, minute, second] = useCountDown(50 * 60);

  return (
    <ContentElevated>
      <div className="px-3 py-1.5 flex items-center gap-2">
        <FontAwesomeIcon icon={faStopwatch} className="text-sm" />
        <span className="font-md font-bold">
          {minute}:{second}
        </span>
      </div>
    </ContentElevated>
  );
};

export default GlobalQuizTimer;
