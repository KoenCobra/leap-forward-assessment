import useSound from "use-sound";

/**
 * Custom hook for managing quiz sound effects
 * Centralizes all sound logic to avoid duplication across components
 *
 * @returns Object containing sound player functions
 */
export const useQuizSounds = () => {
  const [playCorrect] = useSound("/sounds/completed.mp3");
  const [playError] = useSound("/sounds/error.mp3");
  const [playWarning] = useSound("/sounds/item_deselect.mp3");
  const [playClick] = useSound("/sounds/button_soft.mp3");

  return {
    playCorrect,
    playError,
    playWarning,
    playClick,
  };
};
