import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all questions
export const getQuestions = query({
  args: {},
  handler: async (ctx) => {
    const questions = await ctx.db.query("questions").collect();
    return questions;
  },
});

// Get a single question by ID
export const getQuestion = query({
  args: { id: v.id("questions") },
  handler: async (ctx, args) => {
    const question = await ctx.db.get(args.id);
    return question;
  },
});

// Create a new question
export const createQuestion = mutation({
  args: {
    question: v.string(),
    time_limit_s: v.number(),
    answers: v.array(
      v.object({
        answer: v.string(),
        correct: v.boolean(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const questionId = await ctx.db.insert("questions", {
      question: args.question,
      time_limit_s: args.time_limit_s,
      answers: args.answers,
    });
    return questionId;
  },
});

// Update an existing question
export const updateQuestion = mutation({
  args: {
    id: v.id("questions"),
    question: v.string(),
    time_limit_s: v.number(),
    answers: v.array(
      v.object({
        answer: v.string(),
        correct: v.boolean(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const { id, ...updateData } = args;
    await ctx.db.patch(id, updateData);
    return id;
  },
});

// Delete a question
export const deleteQuestion = mutation({
  args: { id: v.id("questions") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return args.id;
  },
});
