import useSound from "use-sound";

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
