import DescriptionAndQuizControls from "../_components/_left-panel/DescriptionAndControls";
import QuestionsAndAnswers from "../_components/_right_panel/QuestionsAndAnswers";

const page = () => {
  return (
    <div className="min-h-screen space-y-4 xl:space-y-0 p-2 xl:p-6 xl:grid xl:grid-cols-[32%_1fr] gap-4">
      <DescriptionAndQuizControls />
      <QuestionsAndAnswers />
    </div>
  );
};

export default page;
