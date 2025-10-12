"use client";

import { LEVEL_CARDS } from "@/lib/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import LevelCard from "./_components/LevelCard";

export default function Home() {
  const levelCardsContainerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const levelCards = levelCardsContainerRef.current?.children;
      if (!levelCards) return;

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.fromTo(
        headingRef.current,
        {
          autoAlpha: 0,
          scale: 0.9,
          letterSpacing: "0.5em",
          y: -20,
        },
        {
          autoAlpha: 1,
          scale: 1,
          letterSpacing: "0em",
          y: 0,
          duration: 1.2,
          ease: "power3.out",
        }
      );

      const paragraphs = paragraphsRef.current?.children;
      if (paragraphs) {
        tl.fromTo(
          paragraphs,
          {
            autoAlpha: 0,
            y: 20,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
          },
          "-=0.6"
        );
      }

      gsap.fromTo(
        levelCards,
        {
          x: 30,
          autoAlpha: 0,
        },
        {
          x: 0,
          autoAlpha: 1,
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
        <h1 ref={headingRef} className="font-bold text-7xl">
          Kies je niveau!
        </h1>
        <div ref={paragraphsRef}>
          <p className="text-2xl mt-4">Welkom in Kanstad:</p>
          <p className="text-xl text-balance max-w-4xl mx-auto">
            Een virtueel spel waarin je nieuwe kennis kan opdoen rond heel wat
            interessante beroepen. Begin er meteen aan. Aangeboden door VDAB.
          </p>
        </div>
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
