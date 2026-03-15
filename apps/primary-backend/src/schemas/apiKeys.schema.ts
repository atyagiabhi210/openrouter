import { z } from "zod";

export const createApiKeySchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export const createApiKeyResponseSchema = z.object({
  id: z.string(),
  apiKey: z.string(),
});

export const toggleApiKeyStatusSchema = z.object({
  id: z.string(),
});

export const toggleApiKeyStatusResponseSchema = z.object({
  id: z.string(),
  status: z.boolean(),
  message: z.string(),
});

export const deleteApiKeySchema = z.object({
  id: z.string(),
});

export const deleteApiKeyResponseSchema = z.object({
  id: z.string(),
  message: z.string(),
});

export const getApiKeysSchema = z.object({
  id: z.string(),
});

export const getApiKeysResponseSchema = z.array(
  z.object({
    id: z.string(),
    apiKey: z.string(),
    status: z.boolean(),
    lastUsed: z.string(),
    creditsConsumed: z.number(),
  }),
);

export type CreateApiKeyRequest = z.infer<typeof createApiKeySchema>;
export type CreateApiKeyResponse = z.infer<typeof createApiKeyResponseSchema>;
export type ToggleApiKeyStatusRequest = z.infer<
  typeof toggleApiKeyStatusSchema
>;
export type ToggleApiKeyStatusResponse = z.infer<
  typeof toggleApiKeyStatusResponseSchema
>;
export type DeleteApiKeyRequest = z.infer<typeof deleteApiKeySchema>;
export type DeleteApiKeyResponse = z.infer<typeof deleteApiKeyResponseSchema>;
export type GetApiKeysRequest = z.infer<typeof getApiKeysSchema>;
export type GetApiKeysResponse = z.infer<typeof getApiKeysResponseSchema>;
