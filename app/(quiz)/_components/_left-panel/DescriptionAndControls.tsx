"use client";

import { LeftPanel } from "@/components/LeftPanel";
import { DESCRIPTION_CARD } from "@/lib/constants";
import { useRef } from "react";
import {
  CHILDREN_ANIMATION_PRESETS,
  useGSAPChildrenAnimation,
} from "../../_hooks/useGSAPAnimation";
import DescriptionCard from "./DescriptionCard";
import QuizControls from "./QuizControls";

const DescriptionAndQuizControls = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAPChildrenAnimation(containerRef, {
    ...CHILDREN_ANIMATION_PRESETS.fadeSlideUpStagger(0.8, 0.2),
    onStart: () => {
      // Prevent scrolling during entrance animation
      document.body.style.overflow = "hidden";
    },
    onComplete: () => {
      document.body.style.overflow = "";
    },
  });

  return (
    <LeftPanel>
      <div ref={containerRef} className="contents">
        <DescriptionCard
          title={DESCRIPTION_CARD.printingHouse.title}
          description={DESCRIPTION_CARD.printingHouse.description}
          backgroundImage={DESCRIPTION_CARD.printingHouse.backgroundImage}
          userImage={DESCRIPTION_CARD.printingHouse.userImage}
        />
        <QuizControls />
      </div>
    </LeftPanel>
  );
};

export default DescriptionAndQuizControls;
