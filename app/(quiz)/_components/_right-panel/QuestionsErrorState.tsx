import ButtonElevated from "@/components/ButtonElevated";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

/**
 * QuestionsErrorState Component
 *
 * Error state displayed when question fetching fails
 * Provides user-friendly error message and recovery option
 *
 * Features:
 * - Clear error message in Dutch
 * - Reload button to retry fetching questions
 * - Centered layout for visual emphasis
 */
const QuestionsErrorState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-2xl font-bold max-w-md mx-auto">
      {/* Error message */}
      Er is een fout opgetreden bij het laden van de vragen. Probeer het later
      opnieuw.
      {/* Reload button */}
      <ButtonElevated
        text="Pagina herladen"
        icon={faRotateRight}
        addedButtonClasses="mt-4 bg-primary-white text-primary-blue-dark mx-auto"
        afterColor="after:bg-grey-dark"
        onClick={() => window.location.reload()}
      />
    </div>
  );
};

export default QuestionsErrorState;
