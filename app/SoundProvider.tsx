"use client";

import { SOUNDS } from "@/lib/constants";
import React from "react";
import { SoundProvider as ReactSoundsProvider } from "react-sounds";

const SoundProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactSoundsProvider
      preload={[
        SOUNDS.button_soft_double,
        SOUNDS.time_almost_up,
        SOUNDS.all_correct_answers,
        SOUNDS.incorrect_answers,
      ]}
    >
      {children}
    </ReactSoundsProvider>
  );
};

export default SoundProvider;
