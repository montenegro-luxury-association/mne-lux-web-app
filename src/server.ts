import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;

if (process.env.MONGODB_URI) {
	mongoose.connect(process.env.MONGODB_URI);
	mongoose.connection.on("open", () => {
		console.log("Connected to MongoDB");
	});
	mongoose.connection.on("error", err => {
		console.error("Error connecting to MongoDB: \n", err);
	});
} else {
	console.error("Cannot connect to database: env variable MONGODB_URI is not defined.");
}

app.get("/", (_: Request, res: Response): void => {
	res.send("Hello World!");
});

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
