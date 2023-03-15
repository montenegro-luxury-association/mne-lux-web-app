// TODO: This is temporary. Currently this is a 'manual' test. In the future, we need to use a testing framework.
import { config } from "dotenv";
import { connect, connection } from "mongoose";
import { Listing } from "../../src/models/listing.model";
import { User } from "../../src/models/user.model";
config();

async function setup() {
	await connect(process.env.MONGODB_URI || "");

	await User.deleteMany();
}

async function createUser() {
	await setup();

	const user = new User({
		fullName: "John Doe",
		email: "johndoe@gmail.com",
		phoneNumber: "038269111222",
		country: "Montenegro",
		dateOfBirth: new Date("1990-01-01"),
		password: "pretend-this-is-a-hash"
	});

	await user.save();

	const usersFromDB = await User.find({}, {}, { lean: true });

	console.log({ usersFromDB });
}

async function fetchFavorites() {
	await createUser();

	// NOTE: We need to be importing and using the Listing model in some way in order for it to be registered with
	// the schema and for thus for the populate() method to work.
	await Listing.findOne();

	await User.updateOne(
		{ email: "johndoe@gmail.com" },
		{ $push: { favorites: "6410bea41770f40260d3fe93" } }
	);

	const rawUser = await User.findOne({}, {}, { lean: true });
	// <{ favorites: Listing[] }>
	const populatedUser = await User.findOne({}, {}, { lean: true }).populate("favorites");

	console.log(JSON.stringify({ rawUser, populatedUser }, null, 2));
}

fetchFavorites();
