import { Request, Response, Router } from "express";
import { Listing } from "../models/listing.model";

const router = Router();

router.post("/add-listing", async (req, res) => {
	try {
		// TODO: Get owner from authenticated request
		const newListing = new Listing({ ...req.body, owner: "6410c327fdfb5af2123919ce" });
		console.log({ newListing: newListing.toObject(), body: req.body });
		await newListing.save();
		res.json({ newListing: newListing.id });
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

export default router;
