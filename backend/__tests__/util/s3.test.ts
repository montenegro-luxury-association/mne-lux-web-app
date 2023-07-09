import dotenv from "dotenv";
dotenv.config();
import { generateS3UploadURL } from "../../src/util/s3";

async function main() {
	const uploadURL = await generateS3UploadURL("my-image");

	console.log({ uploadURL });
}

main();
