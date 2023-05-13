import { Router } from "express";
import { Listing } from "../models/listing.model";
import { User } from "../models/user.model";
import { mapListingToIncludeFullMediaURLs } from "../util/s3";
import mongoose from "mongoose";

const router = Router();

router.get("/", async (req, res) => {
	// TODO: Extract 'try/catch' block into reusable wrapper
	try {
		const listings = await Listing.find({}, {}, { limit: 20 }).select(["-owner"]).lean();
		res.json({
			listings: listings.map(mapListingToIncludeFullMediaURLs)
		});
	} catch (err) {
		res.status(500).send("There was an unexpected error.");
	}
});

router.get("/id/:id", async (req, res) => {
	// TODO: Extract 'try/catch' block into reusable wrapper
	try {
		const listing = await Listing.findById(req.params.id).select(["-owner"]).lean();

		if (!listing) {
			return res.status(404).send("Listing not found.");
		}

		res.json({
			listing: mapListingToIncludeFullMediaURLs(listing)
		});
	} catch (err) {
		res.status(500).send("There was an unexpected error.");
	}
});

router.get("/favorites", async (req, res) => {
	try {
		const user = await User.findById("64283141b9898225fdfab36a");
		// Replace with reusable Id
		const favorites = await Listing.find({ _id: { $in: user?.favorites } })
			.select(["-owner"])
			.lean();
		res.json({
			listings: favorites.map(mapListingToIncludeFullMediaURLs)
		});
	} catch (err) {
		res.status(500).send("There was an unexpected error.");
	}
});
router.post("/toggle-favorites/:id", async (req, res) => {
	try {
		const listingID = new mongoose.Types.ObjectId(req.params.id);
		const permanentID = "64283141b9898225fdfab36a";
		const user = await User.findById(permanentID);
		// Replace with reusable Id
		if (user?.favorites.includes(listingID)) {
			console.log(user?.favorites.includes(listingID));
			await User.updateOne({ _id: permanentID }, { $pull: { favorites: listingID } });
		} else {
			console.log(user?.favorites.includes(listingID));
			await User.updateOne({ _id: permanentID }, { $addToSet: { favorites: listingID } });
		}
	} catch (err) {
		res.status(500).send("There was an unexpected error.");
		console.log(err);
	}
});

export default router;
