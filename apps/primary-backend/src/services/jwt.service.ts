import * as jose from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

async function createSessionToken(
  userId: number,
  email: string,
): Promise<string> {
  return await new jose.SignJWT({ userId, email })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(SECRET);
}

async function verifySessionToken(token: string) {
  const { payload } = await jose.jwtVerify(token, SECRET);
  return { userId: Number(payload.sub), email: payload.email };
}

export { createSessionToken, verifySessionToken };
