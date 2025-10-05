import DescriptionCard from "./DescriptionCard";
import QuizControls from "./QuizControls";

const DescriptionAndQuizControls = () => {
  return (
    <div className="bg-blue-background rounded-2xl h-full p-4 flex flex-col gap-4">
      <DescriptionCard />
      <QuizControls />
    </div>
  );
};

export default DescriptionAndQuizControls;
