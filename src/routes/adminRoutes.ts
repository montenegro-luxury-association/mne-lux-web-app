import { Router } from "express";
import { Listing, MAX_LISTING_MEDIA_LENGTH } from "../models/listing.model";
import { generateS3UploadURL } from "../util/s3";
import { v4 as uuid } from "uuid";

const router = Router();

// get a signed s3 upload link & add to-be-uploaded image link to listing
router.post("/add-s3-listing-media/:listingId", async (req, res) => {
	try {
		const { listingId } = req.params;

		const listingExists = await Listing.exists({
			_id: listingId,
			$expr: { $lt: [{ $size: "$mediaURIs" }, MAX_LISTING_MEDIA_LENGTH] }
		});

		if (!listingExists) {
			// listing either doesn't exist or has too many images
			return res.sendStatus(404);
		}

		const imageKey = `${uuid()}.jpg`;
		const uploadURL = await generateS3UploadURL(imageKey);

		await Listing.updateOne(
			{
				_id: listingId,
				$expr: { $lt: [{ $size: "$mediaURIs" }, MAX_LISTING_MEDIA_LENGTH] }
			},
			{
				$push: {
					mediaURIs: imageKey
				}
			}
		);

		res.json({ uploadURL });
	} catch (err) {
		res.sendStatus(500);
	}
});

router.post("/add-listing", async (req, res) => {
	try {
		// TODO: Get owner from authenticated request
		const newListing = new Listing({ ...req.body, owner: "6410c327fdfb5af2123919ce" });
		console.log({ newListing: newListing.toObject(), body: req.body });
		await newListing.save();
		res.json({ listingId: newListing.id });
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

export default router;
