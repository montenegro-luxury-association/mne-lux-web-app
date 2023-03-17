import express, { Application } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import listingRoutes from "./routes/listingRoutes";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 3001;

const app: Application = express();

app.use(cors());

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

// Hook up routes
app.use("/listings", listingRoutes);

// Start the server
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
