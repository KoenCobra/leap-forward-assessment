import DescriptionAndQuizControls from "../_components/_left-panel/DescriptionAndControls";
import QuestionsAndAnswers from "../_components/_right_panel/QuestionsAndAnswers";

const page = () => {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[30%_1fr] gap-4 p-6">
      <DescriptionAndQuizControls />
      <QuestionsAndAnswers />
    </div>
  );
};

export default page;
