import {
  signInSchema,
  signUpSchema,
  type SignInInput,
  type SignInResponse,
  type SignUpInput,
  type SignUpResponse,
} from "../schemas/auth.schema";
import { prisma } from "db/client";
import type { ErrorResponse } from "../schemas/error.schema";

export const handleSignService = async (
  body: SignInInput,
): Promise<SignInResponse | ErrorResponse> => {
  try {
    console.log("handleSignService", body);
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

    // we will process it
    // check if user already exists
    // if not return error
    // if user exists, generate token
    // return token
    return {
      token: "1234567890",
      email: email,
      id: 1,
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
    // we will process it
    // check if user already exists
    // if not, create user
    // generate token
    // return token

    return {
      token: "1234567890",
      email: email,
      id: 1,
    };
  } catch (err) {
    throw err;
  }
};
