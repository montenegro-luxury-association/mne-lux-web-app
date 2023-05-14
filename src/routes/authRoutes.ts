import bcrypt from "bcrypt";
import { Router } from "express";
import { User } from "../models/user.model";
import {
	createJWTToken,
	getDecodedJWTTokenFromRequest,
	setAdminIdInCookie,
	setAuthTokenCookie,
	setUserIdInCookie
} from "../util/jwt";
import { Admin } from "../models/admin.model";

const router = Router();

// TODO: Make 2nd version for admins, or make this one work for both
export type UserAuthStatusResponse =
	| {
			status: "authenticated";
			user: {
				id: string;
			};
	  }
	| {
			status: "unauthorized";
	  };

router.get("/status", async (req, res) => {
	try {
		const userOrAdminData = getDecodedJWTTokenFromRequest(req);

		const [user, admin] = await Promise.all([
			User.findById(userOrAdminData?.user_id),
			Admin.findById(userOrAdminData?.admin_id)
		]);

		return res.json({
			user: user && { id: user._id, favorites: user.favorites },
			admin: admin && { id: admin._id }
		});
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

router.post("/login-user", async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) {
			return res.sendStatus(404);
		}

		const passwordMatches = await bcrypt.compare(password, user.password);
		if (!passwordMatches) {
			return res.sendStatus(401);
		}

		setUserIdInCookie(user._id.toString(), req, res);

		res.json({ userId: user._id, favorites: user.favorites });
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

router.post("/login-admin", async (req, res) => {
	try {
		const { email, password } = req.body;

		const admin = await Admin.findOne({ email });
		if (!admin) {
			return res.sendStatus(401);
		}

		const passwordMatches = await bcrypt.compare(password, admin.password);
		if (!passwordMatches) {
			return res.sendStatus(401);
		}

		setAdminIdInCookie(admin._id.toString(), req, res);

		res.json({ adminId: admin._id });
	} catch (err) {
		res.sendStatus(500);
	}
});

router.post("/register-user", async (req, res) => {
	try {
		// Make sure we got all the data we needed from the request
		const allRequiredUserProperties = Object.keys(User.schema.paths).filter(
			property => User.schema.paths[property]?.isRequired
		);
		if (allRequiredUserProperties.some(property => req.body?.[property] === undefined)) {
			return res.sendStatus(400);
		}

		const { password: rawPassword, ...userData } = req.body;

		const newUser = await User.create({
			...userData,
			password: await bcrypt.hash(rawPassword, 10)
		});

		const authToken = createJWTToken({ user_id: newUser._id.toString() });
		setAuthTokenCookie(res, authToken);

		res.json({ userId: newUser._id });
	} catch (err) {
		console.error(err);
		res.status(500).send("There was an unexpected error.");
	}
});

export default router;
