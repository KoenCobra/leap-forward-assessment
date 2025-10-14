import { API_URL, CACHE_TIME } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../queryKeys";
import { Question } from "../types";

export const fetchQuestions = async (): Promise<Question[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch questions");
  }

  return response.json();
};

export const useQuestions = () => {
  const {
    data: questions,
    isLoading: isLoadingQuestions,
    error: errorQuestions,
  } = useQuery<Question[]>({
    queryKey: [QUERY_KEYS.QUESTIONS],
    queryFn: fetchQuestions,
    staleTime: CACHE_TIME,
    gcTime: CACHE_TIME,
  });

  return { questions, isLoadingQuestions, errorQuestions };
};
