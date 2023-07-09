import dotenv from "dotenv";
import { createJWTToken, verifyJWTToken } from "../../src/util/jwt";
dotenv.config();

function main() {
	const signedToken = createJWTToken({ foo: "bar" });
	const decodedToken = verifyJWTToken(signedToken);

	console.log({ signedToken, decodedToken, foo: decodedToken.foo });
}

main();
