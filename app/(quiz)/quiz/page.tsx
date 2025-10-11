import { CACHE_TIME } from "@/lib/constants";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import DescriptionAndQuizControls from "../_components/_left-panel/DescriptionAndControls";
import QuestionsAndAnswers from "../_components/_right-panel/QuestionsAndAnswers";
import { fetchQuestions } from "../_hooks/useQuestions";
import { QUERY_KEYS } from "../queryKeys";

/**
 * Quiz Page Component (Server Component)
 *
 * Implements server-side data prefetching for optimal performance
 * Questions are fetched on the server and hydrated on the client
 *
 * Layout:
 * - Left Panel: Quiz description and controls
 * - Right Panel: Questions and answers
 */
const QuizPage = async () => {
  const queryClient = new QueryClient();

  // Prefetch questions on the server for instant display
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.QUESTIONS],
    queryFn: fetchQuestions,
    staleTime: CACHE_TIME,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="min-h-screen space-y-4 xl:space-y-0 p-2 xl:p-6 xl:grid xl:grid-cols-[32%_1fr] gap-4">
        <DescriptionAndQuizControls />
        <QuestionsAndAnswers />
      </div>
    </HydrationBoundary>
  );
};

export default QuizPage;
