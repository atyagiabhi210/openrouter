import { prisma } from "db";
import {
  createApiKeySchema,
  deleteApiKeySchema,
  getApiKeysSchema,
  toggleApiKeyStatusSchema,
  type CreateApiKeyRequest,
  type CreateApiKeyResponse,
  type DeleteApiKeyRequest,
  type DeleteApiKeyResponse,
  type GetApiKeysRequest,
  type GetApiKeysResponse,
  type ToggleApiKeyStatusRequest,
  type ToggleApiKeyStatusResponse,
} from "../schemas/apiKeys.schema";
import type { ErrorResponse } from "../schemas/error.schema";
const API_KEY_LENGTH = 20;
const ALPHABET_SET = "zxcbbdscvbvjnohonsdapowrq12302344565";
export const createApiKey = async (
  body: CreateApiKeyRequest,
  userId: number,
): Promise<CreateApiKeyResponse | ErrorResponse> => {
  try {
    const result = createApiKeySchema.safeParse(body);
    if (!result.success) {
      return {
        success: false,
        code: "INVALID_REQUEST",
        message: "Invalid request",
        status: 400,
        data: result.error.issues,
      };
    }
    const { name } = result.data;
    const apiKey = createRandomApiKey();
    const apiKeyDb = await prisma.apiKey.create({
      data: {
        name,
        apiKey,
        userId,
      },
    });
    if (!apiKeyDb) {
      return {
        success: false,
        code: "API_KEY_CREATION_FAILED",
        message: "API key creation failed",
        status: 500,
      };
    }
    return {
      id: apiKeyDb.id.toString(),
      apiKey: apiKeyDb.apiKey,
    };
  } catch (err) {
    throw err;
  }
};
export const getApiKeys = async (
  userId: number,
): Promise<GetApiKeysResponse | ErrorResponse> => {
  try {
    const apiKeys = await prisma.apiKey.findMany({
      where: {
        userId,
        deleted: false,
      },
    });

    if (!apiKeys) {
      return {
        success: false,
        code: "API_KEYS_NOT_FOUND",
        message: "API keys not found",
        status: 404,
      };
    }
    const apiKeysResponse = apiKeys.map((apiKey) => ({
      id: apiKey.id.toString(),
      apiKey: apiKey.apiKey,
      status: apiKey.disabled,
      lastUsed: apiKey.lastUsed?.toString() || "",
      creditsConsumed: apiKey.creditsConsumed,
    }));
    return apiKeysResponse;
  } catch (err) {
    throw err;
  }
};

export const toggleApiKeyStatus = async (
  body: ToggleApiKeyStatusRequest,
  userId: number,
): Promise<ToggleApiKeyStatusResponse | ErrorResponse> => {
  try {
    const result = toggleApiKeyStatusSchema.safeParse(body);
    if (!result.success) {
      return {
        success: false,
        code: "INVALID_REQUEST",
        message: "Invalid request",
        status: 400,
        data: result.error.issues,
      };
    }
    const { id } = result.data;
    const apiKey = await prisma.apiKey.findUnique({
      where: {
        id: parseInt(id),
        userId,
      },
    });
    if (!apiKey) {
      return {
        success: false,
        code: "API_KEY_NOT_FOUND",
        message: "API key not found",
        status: 404,
      };
    }
    const updatedApiKey = await prisma.apiKey.update({
      where: {
        id: parseInt(id),
      },
      data: {
        disabled: !apiKey.disabled,
      },
    });
    if (!updatedApiKey) {
      return {
        success: false,
        code: "API_KEY_STATUS_UPDATE_FAILED",
        message: "API key status update failed",
        status: 500,
      };
    }
    return {
      id: updatedApiKey.id.toString(),
      status: updatedApiKey.disabled,
      message: "API key status updated successfully",
    };
  } catch (err) {
    throw err;
  }
};

export const deleteApiKey = async (
  body: DeleteApiKeyRequest,
  userId: number,
): Promise<DeleteApiKeyResponse | ErrorResponse> => {
  try {
    const result = deleteApiKeySchema.safeParse(body);
    if (!result.success) {
      return {
        success: false,
        code: "INVALID_REQUEST",
        message: "Invalid request",
        status: 400,
        data: result.error.issues,
      };
    }
    const { id } = result.data;
    const apiKey = await prisma.apiKey.findUnique({
      where: {
        id: parseInt(id),
        userId,
      },
    });
    if (!apiKey) {
      return {
        success: false,
        code: "API_KEY_NOT_FOUND",
        message: "API key not found",
        status: 404,
      };
    }
    const deletedApiKey = await prisma.apiKey.update({
      where: {
        id: parseInt(id),
      },
      data: {
        deleted: true,
      },
    });
    if (!deletedApiKey) {
      return {
        success: false,
        code: "API_KEY_DELETION_FAILED",
        message: "API key deletion failed",
        status: 500,
      };
    }
    return {
      id: deletedApiKey.id.toString(),
      message: "API key deleted successfully",
    };
  } catch (err) {
    throw err;
  }
};

const createRandomApiKey = () => {
  let suffixKey = "";
  for (let i = 0; i < API_KEY_LENGTH; i++) {
    suffixKey += ALPHABET_SET[Math.floor(Math.random() * ALPHABET_SET.length)];
  }
  return `sk-or-v1-${suffixKey}`;
};
