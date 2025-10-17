"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Question } from "../page";

const answerSchema = z.object({
  answer: z.string().min(1, "Answer is required"),
  correct: z.boolean(),
});

const questionFormSchema = z.object({
  question: z.string().min(5, "Question must be at least 5 characters"),
  time_limit_s: z
    .number()
    .min(5, "Time limit must be at least 5 seconds")
    .max(300, "Time limit cannot exceed 300 seconds"),
  answers: z
    .array(answerSchema)
    .min(2, "At least 2 answers are required")
    .refine(
      (answers) => answers.some((answer) => answer.correct),
      "At least one answer must be marked as correct"
    ),
});

type QuestionFormValues = z.infer<typeof questionFormSchema>;

interface QuestionFormProps {
  question?: Question;
  onSuccess: () => void;
}

export function QuestionForm({ question, onSuccess }: QuestionFormProps) {
  const createQuestion = useMutation(api.questions.createQuestion);
  const updateQuestion = useMutation(api.questions.updateQuestion);

  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: question
      ? {
          question: question.question,
          time_limit_s: question.time_limit_s,
          answers: question.answers,
        }
      : {
          question: "",
          time_limit_s: 20,
          answers: [
            { answer: "", correct: false },
            { answer: "", correct: false },
          ],
        },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "answers",
  });

  const onSubmit = async (values: QuestionFormValues) => {
    try {
      if (question) {
        await updateQuestion({
          id: question._id,
          ...values,
        });
      } else {
        await createQuestion(values);
      }
      onSuccess();
      form.reset();
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your question here..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Write a clear and concise question for the quiz.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="time_limit_s"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time Limit (seconds)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="20"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                Time limit for answering this question (5-300 seconds).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <FormLabel>Answers</FormLabel>
              <FormDescription>
                Add answers and mark the correct ones with the checkbox.
              </FormDescription>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ answer: "", correct: false })}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Answer
            </Button>
          </div>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex gap-4 items-start p-4 border rounded-lg"
            >
              <FormField
                control={form.control}
                name={`answers.${index}.correct`}
                render={({ field }) => (
                  <FormItem className="flex items-center space-y-0 pt-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`answers.${index}.answer`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder={`Answer ${index + 1}`} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {fields.length > 2 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                  className="mt-0"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              )}
            </div>
          ))}

          {form.formState.errors.answers?.root && (
            <p className="text-sm font-medium text-destructive">
              {form.formState.errors.answers.root.message}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {question ? "Update Question" : "Create Question"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
