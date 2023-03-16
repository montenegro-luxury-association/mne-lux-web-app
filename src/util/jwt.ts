import { Request } from "express";
import jwt from "jsonwebtoken";

export function createJWTToken(payload: object) {
	if (!process.env.JWT_SECRET) {
		throw new Error("Env variable 'JWT_SECRET' is not defined.");
	}

	return jwt.sign(payload, process.env.JWT_SECRET);
}

export function verifyJWTToken(token: string) {
	if (!process.env.JWT_SECRET) {
		throw new Error("Env variable 'JWT_SECRET' is not defined.");
	}

	return jwt.verify(token, process.env.JWT_SECRET) as { [key: string]: any };
}

export function getRawJWTTokenFromRequest(req: Request) {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		throw new Error("No authorization header found.");
	}

	// NOTE: The JWT token is stored in the authorization header in the format: "Bearer <token>",
	// hence the 'split' call below
	const encodedToken = authHeader.split(" ")[1];
	if (!encodedToken) {
		throw new Error("No token found in authorization header.");
	}

	return encodedToken;
}

export function getDecodedJWTTokenFromRequest(req: Request) {
	const encodedToken = getRawJWTTokenFromRequest(req);
	return verifyJWTToken(encodedToken);
}
