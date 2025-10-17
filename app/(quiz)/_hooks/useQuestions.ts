import { api } from "@/convex/_generated/api";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";

export const useQuestions = () => {
  const {
    data: questions,
    isPending: isLoadingQuestions,
    error: errorQuestions,
  } = useQuery(convexQuery(api.questions.getQuestions, {}));

  return { questions, isLoadingQuestions, errorQuestions };
};
