import { Router } from "express";
import { wrapAuthUser } from "../middleware/authMiddleware";
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

router.get(
	"/favorites",
	wrapAuthUser(async (req, res) => {
		try {
			const user = await User.findById(req.userId);

			const favorites = await Listing.find({ _id: { $in: user?.favorites } })
				.select(["-owner"])
				.lean();
			res.json({
				listings: favorites.map(mapListingToIncludeFullMediaURLs)
			});
		} catch (err) {
			res.status(500).send("There was an unexpected error.");
		}
	})
);

router.post(
	"/toggle-favorites/:id",
	wrapAuthUser(async (req, res) => {
		try {
			const { userId } = req;
			const user = await User.findById(userId);
			const listingID = new mongoose.Types.ObjectId(req.params.id);

			if (user?.favorites.includes(listingID)) {
				await User.updateOne({ _id: userId }, { $pull: { favorites: listingID } });
			} else {
				await User.updateOne({ _id: userId }, { $addToSet: { favorites: listingID } });
			}
			res.sendStatus(200);
		} catch (err) {
			console.error(err);
			res.status(500).send("There was an unexpected error.");
		}
	})
);

export default router;
