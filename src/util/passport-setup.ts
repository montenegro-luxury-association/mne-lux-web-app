import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.model";

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
			callbackURL: `${
				process.env.NODE_ENV === "production"
					? "https://mnelux.com"
					: "http://localhost:3001"
			}/api/auth/google/callback`
		},
		async (accessToken, refreshToken, profile, done) => {
			const email = profile.emails && profile.emails[0].value;

			const existingUser = await User.findOne({ $or: [{ googleId: profile.id }, { email }] });
			if (existingUser) {
				// user already exists

				if (!existingUser.googleId) {
					// we found the user by ID. Associate their google account by updating their googleId
					existingUser.googleId = profile.id;
					await existingUser.save();
				}

				done(null, existingUser);
			} else {
				// if not, create new user
				if (!email) {
					done(new Error("No email found in Google profile"));
				}

				if (!profile.name?.givenName && !profile.name?.familyName) {
					done(new Error("No name found in Google profile"));
				}

				const newUser = await new User({
					googleId: profile.id,
					email: profile.emails?.[0].value,
					fullName: (profile.name?.givenName + " " + profile.name?.familyName).trim(),
					favorites: []
				}).save();

				done(null, newUser);
			}
		}
	)
);
