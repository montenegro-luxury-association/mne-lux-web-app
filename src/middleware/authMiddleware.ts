import { NextFunction, Request, Response } from "express";
import { getDecodedJWTTokenFromRequest } from "../util/jwt";

export type AuthenticatedUserRequest = Request & { userId: string };
export type AuthenticatedAdminRequest = Request & { adminId: string };

// TODO: Instead of re-defining the handler func ourselves, try to use something from express if it exists
type AuthenticatedRequestHandler<CustomReq> = (
	req: CustomReq,
	res: Response,
	next: NextFunction
) => void;

type AuthenticatedUserRequestHandler = AuthenticatedRequestHandler<AuthenticatedUserRequest>;
type AuthenticatedAdminRequestHandler = AuthenticatedRequestHandler<AuthenticatedAdminRequest>;

// TODO: Maybe somehow merge these 2 functions, or at least reuse JSDoc
/**
 * Technically not a middleware, but a wrapper that you pass a handler to directly. This is done in order
 * to have more control over the TypeScript request type.
 *
 * @param mainHandler This is the function you want to execute after the user has been authenticated. Treat is like a regular Express (req, res) => {...} function
 */
export function wrapAuthUser(mainHandler: AuthenticatedUserRequestHandler) {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			const payload = getDecodedJWTTokenFromRequest(req);

			if (payload?.user_id) {
				const authenticatedReq = {
					...req,
					userId: payload.user_id
				} as AuthenticatedUserRequest;

				mainHandler(authenticatedReq, res, next);
			} else {
				res.sendStatus(401);
			}
		} catch (err) {
			res.sendStatus(401);
		}
	};
}

/**
 * Technically not a middleware, but a wrapper that you pass a handler to directly. This is done in order
 * to have more control over the TypeScript request type.
 *
 * @param mainHandler This is the function you want to execute after the user has been authenticated. Treat is like a regular Express (req, res) => {...} function
 */
export function wrapAuthAdmin(mainHandler: AuthenticatedAdminRequestHandler) {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			const payload = getDecodedJWTTokenFromRequest(req);

			if (payload?.admin_id) {
				const authenticatedReq = {
					...req,
					adminId: payload.admin_id
				} as AuthenticatedAdminRequest;

				mainHandler(authenticatedReq, res, next);
			} else {
				res.sendStatus(401);
			}
		} catch (err) {
			res.sendStatus(401);
		}
	};
}
