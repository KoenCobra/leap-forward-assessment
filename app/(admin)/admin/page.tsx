"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { SignOutButton } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { LogOut, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { DeleteConfirmDialog } from "./components/DeleteConfirmDialog";
import { QuestionForm } from "./components/QuestionForm";

export interface Question {
  _id: Id<"questions">;
  _creationTime: number;
  question: string;
  time_limit_s: number;
  answers: Array<{
    answer: string;
    correct: boolean;
  }>;
}

const AdminPage = () => {
  const questions = useQuery(api.questions.getQuestions);
  const deleteQuestion = useMutation(api.questions.deleteQuestion);

  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deletingQuestionId, setDeletingQuestionId] =
    useState<Id<"questions"> | null>(null);

  const handleDelete = async (id: Id<"questions">) => {
    await deleteQuestion({ id });
    setDeletingQuestionId(null);
  };

  const handleEdit = (question: Question) => {
    setEditingQuestion(question);
    setIsEditDialogOpen(true);
  };

  const countCorrectAnswers = (
    answers: Array<{ answer: string; correct: boolean }>
  ) => {
    return answers.filter((a) => a.correct).length;
  };

  if (questions === undefined) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">Loading questions...</div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Questions Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage your quiz questions here. Create, edit, or delete questions.
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Question
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Question</DialogTitle>
              </DialogHeader>
              <QuestionForm onSuccess={() => setIsCreateDialogOpen(false)} />
            </DialogContent>
          </Dialog>
          <SignOutButton>
            <Button variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </SignOutButton>
        </div>
      </div>

      {questions.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            No questions yet. Create your first question!
          </p>
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">Question</TableHead>
                <TableHead>Time Limit</TableHead>
                <TableHead>Answers</TableHead>
                <TableHead>Correct Answers</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {questions.map((question) => (
                <TableRow key={question._id}>
                  <TableCell className="font-medium">
                    {question.question}
                  </TableCell>
                  <TableCell>{question.time_limit_s}s</TableCell>
                  <TableCell>{question.answers.length}</TableCell>
                  <TableCell>{countCorrectAnswers(question.answers)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(question)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setDeletingQuestionId(question._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Question</DialogTitle>
          </DialogHeader>
          {editingQuestion && (
            <QuestionForm
              question={editingQuestion}
              onSuccess={() => {
                setIsEditDialogOpen(false);
                setEditingQuestion(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deletingQuestionId !== null}
        onOpenChange={(open: boolean) => !open && setDeletingQuestionId(null)}
        onConfirm={async () => {
          if (deletingQuestionId) await handleDelete(deletingQuestionId);
        }}
      />
    </div>
  );
};

export default AdminPage;
