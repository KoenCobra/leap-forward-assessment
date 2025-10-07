import { useQuery } from "@tanstack/react-query";
import { Question } from "../types";

const fetchQuestions = async () => {
  const response = await fetch("https://lab.lfwd.be/dev-test/quiz_data.json");
  return response.json() as Promise<Question[]>;
};

export const useQuestions = () => {
  const {
    data: questions,
    isLoading: isLoadingQuestions,
    error: errorQuestions,
  } = useQuery<Question[]>({
    queryKey: ["questions"],
    queryFn: async () => {
      return await fetchQuestions();
    },
  });

  return { questions, isLoadingQuestions, errorQuestions };
};
