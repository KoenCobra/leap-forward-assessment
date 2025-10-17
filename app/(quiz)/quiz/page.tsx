import { LeftPanel } from "@/components/LeftPanel";
import MainLayout from "@/components/MainLayout";
import RightPanel from "@/components/RightPanel";
import DescriptionAndQuizControls from "../_components/_left-panel/DescriptionAndControls";
import QuestionsAndAnswers from "../_components/_right-panel/QuestionsAndAnswers";

/**
 * Quiz Page Component
 *
 * Questions are fetched from Convex and subscribed to via TanStack Query
 * Convex handles real-time updates automatically
 *
 * Layout:
 * - Left Panel: Quiz description and controls
 * - Right Panel: Questions and answers
 */
const QuizPage = () => {
  return (
    <MainLayout>
      <LeftPanel>
        <DescriptionAndQuizControls />
      </LeftPanel>
      <RightPanel>
        <QuestionsAndAnswers />
      </RightPanel>
    </MainLayout>
  );
};

export default QuizPage;
