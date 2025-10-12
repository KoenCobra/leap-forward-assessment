"use client";

import LevelProgress from "@/components/LevelProgress";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import UnlockButton from "./UnlockButton";

const buttonPositions = [
  { top: 25, left: 30 },
  { top: 60, left: 70 },
  { top: 45, left: 15 },
  { top: 75, left: 40 },
  { top: 20, left: 70 },
];

const MapNavigation = () => {
  const buttonsRef = useRef<HTMLDivElement>(null);
  const levelProgressRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const buttons = buttonsRef.current?.children;
    if (!buttons) return;

    gsap.fromTo(
      buttons,
      { scale: 0.2, autoAlpha: 0 },
      {
        scale: 1,
        autoAlpha: 1,
        duration: 0.5,
        stagger: 0.06,
        delay: 0,
        ease: "back.out(1.5)",
      }
    );

    gsap.fromTo(
      levelProgressRef.current,
      {
        y: -30,
        autoAlpha: 0,
      },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.5,
        ease: "power1",
      }
    );
  });

  return (
    <div className="relative h-screen xl:h-full rounded-2xl bg-map bg-cover bg-center p-3">
      <div ref={levelProgressRef} className="w-1/2 lg:w-1/3 xl:w-1/5 invisible">
        <LevelProgress level={0} totalLevels={6} />
      </div>

      <div ref={buttonsRef} className="[&>*]:invisible h-full">
        {buttonPositions.map((position, index) => (
          <UnlockButton key={index} position={position} />
        ))}
      </div>
    </div>
  );
};

export default MapNavigation;
