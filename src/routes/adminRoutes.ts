import { Request, Response, Router } from "express";
import { Listing } from "../models/listing.model";

const router = Router();

router.post("/:id", async (req: Request, res: Response) => {
	try {
		const newHotel = new Listing(req.body);
		console.log(req.body);

		await newHotel.save().then((item: any) => {
			res.send("Item is saved in Database");
		});
	} catch (err: any) {
		res.status(500).send();
	}
});

export default router;
