import { API_URL, CACHE_TIME } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../queyKeys";
import { Question } from "../types";

export const fetchQuestions = async () => {
  const response = await fetch(API_URL);
  return response.json() as Promise<Question[]>;
};

export const useQuestions = () => {
  const {
    data: questions,
    isLoading: isLoadingQuestions,
    error: errorQuestions,
  } = useQuery<Question[]>({
    queryKey: [QUERY_KEYS.QUESTIONS],
    queryFn: async () => {
      return await fetchQuestions();
    },
    staleTime: CACHE_TIME,
    gcTime: CACHE_TIME,
  });

  return { questions, isLoadingQuestions, errorQuestions };
};
