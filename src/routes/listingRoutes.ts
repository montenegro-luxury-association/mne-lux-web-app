import { Router } from "express";
import { Listing } from "../models/listing.model";

const router = Router();

router.get("/", async (req, res) => {
	// TODO: Extract 'try/catch' block into reusable wrapper
	try {
		const listings = await Listing.find({}, {}, { limit: 20 }).select(["-owner"]);
		res.json({
			listings
		});
	} catch (err) {
		res.status(500).send("There was an unexpected error.");
	}
});

router.get("/id/:id", async (req, res) => {
	// TODO: Extract 'try/catch' block into reusable wrapper
	try {
		const listing = await Listing.findById(req.params.id).select(["-owner"]);
		res.json({
			listing
		});
	} catch (err) {
		res.status(500).send("There was an unexpected error.");
	}
});

export default router;
