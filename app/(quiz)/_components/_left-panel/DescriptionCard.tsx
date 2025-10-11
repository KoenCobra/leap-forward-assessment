"use client";

import LevelProgress from "@/components/LevelProgress";
import Image from "next/image";
import { useRef } from "react";
import {
  ANIMATION_PRESETS,
  CHILDREN_ANIMATION_PRESETS,
  useGSAPAnimation,
  useGSAPChildrenAnimation,
} from "../../_hooks/useGSAPAnimation";
import GlobalQuizTimer from "./GlobalQuizTimer";

interface DescriptionCardProps {
  title: string;
  description: string;
  backgroundImage: string;
  userImage: string;
}

const DescriptionCard = ({
  title,
  description,
  backgroundImage,
  userImage,
}: DescriptionCardProps) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useGSAPChildrenAnimation(
    headerRef,
    CHILDREN_ANIMATION_PRESETS.fadeSlideDownStagger(0.6, 0.1)
  );

  useGSAPAnimation(imageRef, ANIMATION_PRESETS.rotateScaleIn(0.8));

  useGSAPAnimation(titleRef, ANIMATION_PRESETS.fadeSlideUp(0.5));

  useGSAPAnimation(descriptionRef, ANIMATION_PRESETS.fadeSlideUp(0.5));

  return (
    <div className="rounded-2xl flex-1 flex flex-col">
      <div
        className="bg-primary-blue-darkest/60 bg-blend-overlay
          bg-cover bg-center h-48 xl:h-[40%]
          rounded-t-lg p-2 relative"
        style={{
          backgroundImage: `url('/images/${backgroundImage}.jpg')`,
        }}
      >
        <div ref={headerRef} className="flex items-center gap-2">
          <GlobalQuizTimer />
          {/* TODO: make level dynamic */}
          <LevelProgress level={2} totalLevels={8} />
        </div>

        <Image
          ref={imageRef}
          src={`/images/${userImage}`}
          alt={title}
          width={135}
          height={135}
          className="
            w-[clamp(100px,15vh,135px)] h-[clamp(100px,15vh,135px)]
            border-4 border-primary-white bg-primary-white rounded-full
            absolute bottom-[-10%] left-1/2 -translate-x-1/2 shadow-2xl
          "
        />
      </div>

      <div className="bg-primary-white rounded-b-lg p-4 h-full text-center">
        <h2
          ref={titleRef}
          className="
            text-2xl font-bold text-primary-blue-dark
            mt-8 pb-3.5
            border-b-2 border-blue-medium
            w-fit mx-auto"
        >
          {title}
        </h2>
        <p
          ref={descriptionRef}
          className="
            text-primary-blue-dark font-light leading-5.5
            mt-4 text-balance max-w-2xl mx-auto pb-6
          "
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default DescriptionCard;
