import { API_URL, CACHE_TIME } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../queryKeys";
import { Question } from "../types";

/**
 * Fetches quiz questions from the API
 * Used for both server-side prefetching and client-side queries
 *
 * @returns Promise resolving to array of questions
 */
export const fetchQuestions = async (): Promise<Question[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch questions");
  }

  return response.json();
};

/**
 * Custom hook for accessing quiz questions
 * Uses React Query for caching and state management
 * Questions are prefetched on the server for optimal performance
 *
 * @returns Object containing:
 * - questions: Array of quiz questions
 * - isLoadingQuestions: Loading state
 * - errorQuestions: Error state
 */
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
