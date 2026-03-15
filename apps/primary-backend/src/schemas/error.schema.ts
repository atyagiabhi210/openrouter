import { z } from "zod";

export const errorResponseSchema = z.object({
  success: z.literal(false),
  code: z.string(),
  message: z.string(),
  status: z.number(),
  data: z.unknown().optional(),
});

export type ErrorResponse = z.infer<typeof errorResponseSchema>;
