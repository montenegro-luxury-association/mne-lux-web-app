import aws from "aws-sdk";
import { Listing } from "../models/listing.model";

const region = "eu-central-1";
const bucketName = "mne-lux-images";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID || "";
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || "";

const s3 = new aws.S3({
	region,
	credentials: {
		accessKeyId,
		secretAccessKey
	},
	signatureVersion: "v4"
});

export const IMAGES_S3_BUCKET_URL = "https://mne-lux-images.s3.eu-central-1.amazonaws.com";

export async function generateS3UploadURL(filename: string) {
	const params = {
		Bucket: bucketName,
		Key: filename,
		Expires: 60
	};

	const uploadURL = await s3.getSignedUrlPromise("putObject", params);
	return uploadURL;
}

/**
 * In the database we only store the filename of the image for scalability reasons. To actually get the image
 * address, we need to prefix it with the URL of the S3 bucket, which is done in this bucket.
 */
export function mapListingToIncludeFullMediaURLs(listing: Listing) {
	return {
		...listing,
		mediaURIs: listing.mediaURIs.map(mediaURIKey => `${IMAGES_S3_BUCKET_URL}/${mediaURIKey}`)
	};
}
