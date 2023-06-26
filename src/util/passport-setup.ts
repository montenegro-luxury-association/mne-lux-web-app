import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LinkedinStrategy } from "passport-linkedin-oauth2";
import { User } from "../models/user.model";
import { createUserFromThirdPartyProvider } from "./thirdPartyAuth";

const baseCallbackUrl =
	process.env.NODE_ENV === "production" ? "https://mnelux.com" : "http://localhost:3001";

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
			callbackURL: `${baseCallbackUrl}/api/auth/google/callback`
		},
		async (accessToken, refreshToken, profile, done) => {
			const email = profile.emails && profile.emails[0].value;

			const existingUser = await User.findOne({ $or: [{ googleId: profile.id }, { email }] });
			if (existingUser) {
				// user already exists

				if (!existingUser.googleId) {
					// we found the user by email. Associate their google account by updating their googleId
					existingUser.googleId = profile.id;
					await existingUser.save();
				}

				done(null, existingUser);
			} else {
				// if not, create new user
				const newUser = await createUserFromThirdPartyProvider("Google", profile);
				done(null, newUser);
			}
		}
	)
);

passport.use(
	new LinkedinStrategy(
		{
			// https://www.linkedin.com/developers/apps/
			// these need to be updated every 2 months
			clientID: process.env.LINKEDIN_CLIENT_ID || "",
			clientSecret: process.env.LINKEDIN_CLIENT_SECRET || "",
			callbackURL: `${baseCallbackUrl}/api/auth/linkedin/callback`,
			scope: ["r_emailaddress", "r_liteprofile"]
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({
				linkedInId: profile.id
			});
			if (existingUser) {
				// user already exists
				done(null, existingUser);
			} else {
				// if not, create new user
				const newUser = await createUserFromThirdPartyProvider("LinkedIn", profile);
				done(null, newUser);
			}
		}
	)
);
