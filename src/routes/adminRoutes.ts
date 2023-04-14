import { Request, Response, Router } from "express";
import { Listing } from "../models/listing.model";
import { log } from "console";

const router = Router();

router.post("/add-listing", async (req, res) => {
	try {
		const newListing = new Listing(req.body);
		await newListing.save();
		res.json({ newListing: newListing.id });
	} catch (err) {
		res.sendStatus(500);
	}
});

export default router;
