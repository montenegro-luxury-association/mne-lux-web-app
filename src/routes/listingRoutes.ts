import { Router } from "express";
import { Listing } from "../models/listing.model";
import { mapListingToIncludeFullMediaURLs } from "../util/s3";

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

export default router;
