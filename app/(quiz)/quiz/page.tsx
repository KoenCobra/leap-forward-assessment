import DescriptionAndQuizControls from "../_components/_left-panel/DescriptionAndControls";
import QuestionsAndAnswers from "../_components/_right_panel/QuestionsAndAnswers";

const page = () => {
  return (
    <div className="min-h-screen space-y-4 lg:space-y-0 p-2 lg:p-6 lg:grid lg:grid-cols-[27%_1fr] gap-4">
      <DescriptionAndQuizControls />
      <QuestionsAndAnswers />
    </div>
  );
};

export default page;
