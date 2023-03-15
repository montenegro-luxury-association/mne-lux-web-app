// TODO: This is temporary. Currently this is a 'manual' test. In the future, we need to use a testing framework.
import { config } from "dotenv";
import { connect, connection } from "mongoose";
import { Admin } from "../../src/models/admin.model";
import { Listing } from "../../src/models/listing.model";
config();

async function setup() {
	await connect(process.env.MONGODB_URI || "");
}

async function createAdmin() {
	await setup();

	const admin = new Admin({
		email: "johndoe@gmail.com",
		password: "pretend-this-is-a-hash"
	});

	await admin.save();

	const adminFromDB = await Admin.find({}, {}, { lean: true });

	console.log({ adminFromDB });
}

async function fetchListingsByAdmin() {
	await setup();

	// NOTE: We need to be importing and using the Listing model in some way in order for it to be registered with
	// the schema and for thus for the populate() method to work.
	const admin = await Admin.findOne();

	const listingsByAdmin = await Listing.find({ owner: admin?.id }, {}, { lean: true });

	console.log(JSON.stringify({ listingsByAdmin, admin }, null, 2));
}

// createAdmin();
fetchListingsByAdmin();
