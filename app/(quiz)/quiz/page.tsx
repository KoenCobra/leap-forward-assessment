import DescriptionAndQuizControls from "../_components/DescriptionAndControls";
import QuestionsAndAnswers from "../_components/QuestionsAndAnswers";

const page = () => {
  return (
    <div className="min-h-screen grid grid-cols-[23%_1fr] gap-4 p-6">
      <DescriptionAndQuizControls />
      <QuestionsAndAnswers />
    </div>
  );
};

export default page;
