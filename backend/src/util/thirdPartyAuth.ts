import { Profile } from "passport";
import { Request, Response } from "express";
import { User } from "../models/user.model";
import { createJWTToken, setAuthTokenCookie } from "./jwt";

export function handleProviderLoginSuccess(req: Request, res: Response) {
	// req.user gets set by the done() function in the passport google strategy which is configured in passport-setup.js.
	const user = req.user as User;

	if (!user) {
		res.sendStatus(401);
	}

	// create JWT token for google user and save as cookie
	const token = createJWTToken({ user_id: user.id.toString() });

	setAuthTokenCookie(res, token);

	// redirect to home page
	const homePage = process.env.NODE_ENV === "production" ? "/" : "http://localhost:3000";
	res.redirect(homePage);
}

export async function createUserFromThirdPartyProvider(
	provider: "LinkedIn" | "Google",
	providerProfile: Profile
) {
	const email = providerProfile.emails && providerProfile.emails[0].value;

	// if not, create new user
	if (!email) {
		throw new Error(`No email found in ${provider} profile`);
	}

	if (!providerProfile.name?.givenName && !providerProfile.name?.familyName) {
		throw new Error(`No name found in ${provider} profile`);
	}

	const newUser = await new User({
		linkedInId: providerProfile.id,
		email: providerProfile.emails?.[0].value,
		fullName: (providerProfile.name?.givenName + " " + providerProfile.name?.familyName).trim(),
		favorites: []
	}).save();

	return newUser;
}
