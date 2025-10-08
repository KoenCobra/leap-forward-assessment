import { CACHE_TIME } from "@/lib/constants";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import DescriptionAndQuizControls from "../_components/_left-panel/DescriptionAndControls";
import QuestionsAndAnswers from "../_components/_right_panel/QuestionsAndAnswers";
import { fetchQuestions } from "../_hooks/useQuestions";
import { QUERY_KEYS } from "../queyKeys";

const page = async () => {
  const queryClient = new QueryClient();

  // Prefetch the questions on the server
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

export default page;
