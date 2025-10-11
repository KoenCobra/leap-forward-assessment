"use client";
import { LeftPanel } from "@/components/LeftPanel";
import { DESCRIPTION_CARD } from "@/lib/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import DescriptionCard from "./DescriptionCard";
import QuizControls from "./QuizControls";

const DescriptionAndQuizControls = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const children = containerRef.current?.children;
      if (!children) return;

      document.body.style.overflow = "hidden";

      gsap.fromTo(
        children,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          onComplete: () => {
            document.body.style.overflow = "";
          },
        }
      );
    },
    { scope: containerRef }
  );

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
