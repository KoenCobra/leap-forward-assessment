import ButtonElevated from "@/components/ButtonElevated";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

const QuestionsErrorState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-2xl font-bold max-w-md mx-auto">
      Er is een fout opgetreden bij het laden van de vragen. Probeer het later
      opnieuw.
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
