/**
 * OpenAPI 3.0 spec for Primary Backend API.
 * Served at /api-docs (Swagger UI).
 */
const spec = {
  openapi: "3.0.0",
  info: {
    title: "Primary Backend API",
    version: "1.0.0",
    description: "API documentation for the primary backend service",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
  paths: {
    "/api/auth/sign-up": {
      post: {
        tags: ["Auth"],
        summary: "Sign up",
        description: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "password"],
                properties: {
                  name: { type: "string", description: "User's full name" },
                  email: {
                    type: "string",
                    format: "email",
                    description: "User's email",
                  },
                  password: {
                    type: "string",
                    minLength: 8,
                    description: "Password (min 8 characters)",
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "User created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: { type: "string" },
                    email: { type: "string" },
                    id: { type: "number" },
                  },
                },
              },
            },
          },
          "4xx": {
            description: "Validation or business error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
    "/api/auth/sign-in": {
      post: {
        tags: ["Auth"],
        summary: "Sign in",
        description: "Authenticate and get a token",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: {
                    type: "string",
                    format: "email",
                    description: "User's email",
                  },
                  password: {
                    type: "string",
                    minLength: 8,
                    description: "Password (min 8 characters)",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Sign in successful",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: { type: "string" },
                    email: { type: "string" },
                    id: { type: "number" },
                  },
                },
              },
            },
          },
          "4xx": {
            description: "Invalid credentials or error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
    "/api/api-keys/create": {
      post: {
        tags: ["API Keys"],
        summary: "Create API key",
        description: "Create a new API key. Requires Bearer token.",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name"],
                properties: {
                  name: { type: "string", description: "Name for the API key" },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "API key created",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    apiKey: { type: "string" },
                  },
                },
              },
            },
          },
          "401": { description: "Unauthorized" },
          "4xx": {
            description: "Validation or error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
    "/api/api-keys/get": {
      get: {
        tags: ["API Keys"],
        summary: "Get API keys",
        description: "List API keys for the authenticated user. Requires Bearer token.",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "List of API keys",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      apiKey: { type: "string" },
                      status: { type: "boolean" },
                      lastUsed: { type: "string" },
                      creditsConsumed: { type: "number" },
                    },
                  },
                },
              },
            },
          },
          "401": { description: "Unauthorized" },
          "4xx": {
            description: "Error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
    "/api/api-keys/delete": {
      delete: {
        tags: ["API Keys"],
        summary: "Delete API key",
        description: "Delete an API key by id. Requires Bearer token.",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["id"],
                properties: {
                  id: { type: "string", description: "API key id" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "API key deleted",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    message: { type: "string" },
                  },
                },
              },
            },
          },
          "401": { description: "Unauthorized" },
          "4xx": {
            description: "Error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
    "/api/api-keys/toggle-status": {
      put: {
        tags: ["API Keys"],
        summary: "Toggle API key status",
        description: "Enable or disable an API key. Requires Bearer token.",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["id"],
                properties: {
                  id: { type: "string", description: "API key id" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Status toggled",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    status: { type: "boolean" },
                    message: { type: "string" },
                  },
                },
              },
            },
          },
          "401": { description: "Unauthorized" },
          "4xx": {
            description: "Error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Session token from sign-in",
      },
    },
    schemas: {
      ErrorResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: false },
          code: { type: "string" },
          message: { type: "string" },
          status: { type: "number" },
          data: {},
        },
      },
    },
  },
} as const;

export default spec;
