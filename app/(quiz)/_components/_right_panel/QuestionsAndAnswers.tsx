import QuestionTimer from "./QuestionTimer";

const QuestionsAndAnswers = () => {
  return (
    <div className="bg-blue-background rounded-2xl p-4">
      <div className="flex flex-col items-center gap-2 bg-primary-blue-darkest h-full rounded-2xl pt-2 px-12 pb-15.5">
        <div className="flex flex-col items-center gap-2">
          <QuestionTimer />
        </div>
      </div>
    </div>
  );
};

export default QuestionsAndAnswers;
