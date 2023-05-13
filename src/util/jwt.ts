import { Request, Response } from "express";
import jwt from "jsonwebtoken";

// yes I know this acronym makes the 'token' part redundant, it's just for readability
export type JWTTokenPayload = {
	user_id?: string;
	admin_id?: string;
};

export const AUTH_TOKEN_COOKIE_NAME = "auth_token";

export function createJWTToken(payload: JWTTokenPayload) {
	if (!process.env.JWT_SECRET) {
		throw new Error("Env variable 'JWT_SECRET' is not defined.");
	}

	return jwt.sign(payload, process.env.JWT_SECRET);
}

export function verifyJWTToken(token: string) {
	if (!process.env.JWT_SECRET) {
		throw new Error("Env variable 'JWT_SECRET' is not defined.");
	}

	return jwt.verify(token, process.env.JWT_SECRET) as JWTTokenPayload;
}

/**
 * @deprecated Turns out I can just cookies and don't have to manually send the token in a header :shrug:
 */
export function getRawJWTTokenFromRequest(req: Request) {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return;
	}

	// NOTE: The JWT token is stored in the authorization header in the format: "Bearer <token>",
	// hence the 'split' call below
	const encodedToken = authHeader.split(" ")[1];
	if (!encodedToken) {
		return;
	}

	return encodedToken;
}

export function getDecodedJWTTokenFromRequest(req: Request) {
	const encodedToken = req.signedCookies[AUTH_TOKEN_COOKIE_NAME];
	if (!encodedToken) {
		return;
	}
	return verifyJWTToken(encodedToken);
}

// Not strictly JWT related, move to auth.ts file when created
export function setAuthTokenCookie(res: Response, token: string) {
	res.cookie(AUTH_TOKEN_COOKIE_NAME, token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: process.env.NODE_ENV === "production",
		signed: true
	});
}
