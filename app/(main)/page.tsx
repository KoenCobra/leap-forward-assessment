"use client";

import { LEVEL_CARDS } from "@/lib/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import LevelCard from "./_components/LevelCard";

export default function Home() {
  const levelCardsContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const levelCards = levelCardsContainerRef.current?.children;
      if (!levelCards) return;

      gsap.fromTo(
        levelCards,
        {
          x: 30,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.3,
          ease: "power1",
        }
      );
    },
    { scope: levelCardsContainerRef, dependencies: [] }
  );
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-main bg-cover bg-center">
      <div className="text-center">
        <h1 className="font-bold text-7xl animate-fadeInDown">
          Kies je niveau!
        </h1>
        <p className="text-2xl mt-4">Welkom in Kanstad:</p>
        <p className="text-xl text-balance max-w-4xl mx-auto">
          Een virtueel spel waarin je nieuwe kennis kan opdoen rond heel wat
          interessante beroepen. Begin er meteen aan. Aangeboden door VDAB.
        </p>
      </div>
      <div
        ref={levelCardsContainerRef}
        className="grid md:grid-cols-3 gap-25 md:gap-6 lg:gap-8 max-w-5xl mx-auto mt-32"
      >
        {LEVEL_CARDS.map((card) => (
          <LevelCard key={card.title} {...card} />
        ))}
      </div>
    </main>
  );
}
