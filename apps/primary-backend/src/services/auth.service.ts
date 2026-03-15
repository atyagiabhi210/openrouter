import {
  signInSchema,
  signUpSchema,
  type SignInInput,
  type SignInResponse,
  type SignUpInput,
  type SignUpResponse,
} from "../schemas/auth.schema";
import { prisma } from "db";
import type { ErrorResponse } from "../schemas/error.schema";
import { createSessionToken } from "./jwt.service";

export const handleSignService = async (
  body: SignInInput,
): Promise<SignInResponse | ErrorResponse> => {
  try {
    console.log("handleSignService", body);
    // we will process it
    const result = signInSchema.safeParse(body);
    if (!result.success) {
      return {
        success: false,
        code: "INVALID_REQUEST",
        message: "Invalid request",
        status: 400,
        data: result.error.issues,
      };
    }
    const { email, password } = result.data;

    // check if user already exists
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    // if not return error
    if (!user) {
      return {
        success: false,
        code: "USER_NOT_FOUND",
        message: "User not found",
        status: 404,
        data: {
          email: email,
        },
      };
    }
    if (user) {
      const matched = await Bun.password.verify(password, user.password);
      if (matched) {
        const token = await createSessionToken(user.id, user.email);
        return {
          token: token,
          email: user.email,
          id: user.id,
        };
      }
      return {
        success: false,
        code: "INVALID_CREDENTIALS",
        message: "Invalid credentials",
        status: 401,
        data: {
          email: email,
        },
      };
    }
    return {
      success: false,
      code: "USER_NOT_FOUND",
      message: "User not found",
      status: 404,
      data: {
        email: email,
      },
    };
  } catch (err) {
    throw err;
  }
};

export const handleSignUpService = async (
  body: SignUpInput,
): Promise<SignUpResponse | ErrorResponse> => {
  try {
    console.log("handleSignUpService", body);
    // we will process it
    const result = signUpSchema.safeParse(body);
    if (!result.success) {
      return {
        success: false,
        code: "INVALID_REQUEST",
        message: "Invalid request",
        status: 400,
        data: result.error.issues,
      };
    }
    const { name, email, password } = result.data;

    // check if user already exists
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      return {
        success: false,
        code: "USER_ALREADY_EXISTS",
        message: "User already exists",
        status: 400,
        data: {
          email: email,
        },
      };
    }
    // if not, create user
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: await Bun.password.hash(password),
      },
    });
    if (!newUser) {
      return {
        success: false,
        code: "USER_CREATION_FAILED",
        message: "User creation failed",
        status: 500,
      };
    }
    const token = await createSessionToken(newUser.id, newUser.email);
    return {
      token: token,
      email: newUser.email,
      id: newUser.id,
    };
  } catch (err) {
    throw err;
  }
};
