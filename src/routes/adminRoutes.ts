import { Request, Response, Router } from "express";
import { Listing } from "../models/listing.model";

const router = Router();

router.post("/add-listing", async (req, res) => {
	try {
		const newListing = new Listing(req.body);
		await newListing.save().then((item: any) => {
			res.send("Item is saved in Database");
		});
	} catch (err: any) {
		res.status(500).send();
	}
});

export default router;
