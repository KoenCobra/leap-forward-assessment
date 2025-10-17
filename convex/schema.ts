import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  questions: defineTable({
    question: v.string(),
    time_limit_s: v.number(),
    answers: v.array(
      v.object({
        answer: v.string(),
        correct: v.boolean(),
      })
    ),
  }),
});
