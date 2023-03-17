import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import listingRoutes from "./routes/listingRoutes";
import bodyParser from "body-parser";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;

// Set up MongoDB connection
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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Hook up routes
app.use("/listings", listingRoutes);

// Start the server
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
