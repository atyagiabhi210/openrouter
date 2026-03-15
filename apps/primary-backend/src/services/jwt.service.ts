import * as jose from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

async function createSessionToken(
  userId: number,
  email: string,
): Promise<string> {
  return await new jose.SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(SECRET);
}

async function verifySessionToken(
  token: string,
): Promise<{ userId: number; email: string }> {
  const { payload } = await jose.jwtVerify(token, SECRET);
  const { userId, email } = payload as { userId: number; email?: string };
  return { userId, email: email ?? "" };
}

export { createSessionToken, verifySessionToken };
