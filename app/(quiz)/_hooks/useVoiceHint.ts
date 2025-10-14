import { useCallback, useEffect, useRef, useState } from "react";
import { generateVoiceHint } from "../actions";
import { Question } from "../types";

export const useVoiceHint = (
  currentQuestion: Question | undefined,
  currentQuestionIndex: number
) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isLoadingHint, setIsLoadingHint] = useState(false);

  const handleGetHint = useCallback(async () => {
    if (!currentQuestion || isLoadingHint) return;

    setIsLoadingHint(true);

    try {
      const result = await generateVoiceHint(currentQuestion);

      if (result.success && result.audioBase64) {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }

        const audioBlob = new Blob(
          [Uint8Array.from(atob(result.audioBase64), (c) => c.charCodeAt(0))],
          { type: "audio/mp3" }
        );
        const audioUrl = URL.createObjectURL(audioBlob);

        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
          audioRef.current = null;
        };

        await audio.play();
      } else {
        console.error("Failed to generate hint:", result.error);
      }
    } catch (error) {
      console.error("Error playing hint:", error);
    } finally {
      setIsLoadingHint(false);
    }
  }, [currentQuestion, isLoadingHint]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [currentQuestionIndex]);

  return {
    handleGetHint,
    isLoadingHint,
  };
};
