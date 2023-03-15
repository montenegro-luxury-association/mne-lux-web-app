import { config } from "dotenv";
import { connect } from "mongoose";
import { Listing } from "../../src/models/listing.model";
import { User } from "../../src/models/user.model";
config();

// TODO: This is temporary. Currently this is a 'manual' test. In the future, we need to use a testing framework.
async function main() {
	await connect(process.env.MONGODB_URI || "");

	const listing = new Listing({
		name: "Splendid Hotel",
		address: "Jadranski Put 14",
		category: "mountain", // TODO: Make sure this is an enum
		checkInFromSeconds: 14 * 60 * 60, // 14:00h
		checkOutUntilSeconds: 10 * 60 * 60, // 10:00h
		cityName: "Budva",
		cityDescription: "This is a lovely city",
		areChildrenWelcome: true,
		experiences: [],
		fullDescription:
			"This is a lovely hotel in the middle of the adriatic coast. It is located in the very heart of Budva, a rich tourist attraction with plenty to do for families and couples alike.",
		location: {
			type: "Point",
			coordinates: [18.845, 42.283]
		},
		mediaURIs: [],
		paymentOptions: ["cash", "debit-card", "credit-card", "bank-transfer", "paypal", "crypto"],
		shortDescription: "This is a great hotel on the adriatic coast.",
		type: "hotel",
		owner: "6410c327fdfb5af2123919ce"
	});

	await listing.save();

	const listingsFromDB = await Listing.find({}, {}, { lean: true });

	console.log({ listingsFromDB });
}

main();
