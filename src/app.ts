import express, { Application } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import allApiRoutes from "./api";

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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Hook up routes
app.use("/api", allApiRoutes);

// Server react files for frontend if on production
if (process.env.NODE_ENV !== "production") {
	const frontendBuildDir = path.resolve(
		__dirname, // /backend/build/
		"..",
		"..",
		"montenegro-luxury-association-frontend",
		"build"
	);

	app.use(express.static(frontendBuildDir));

	app.get("*", (req, res) => {
		res.sendFile(path.join(frontendBuildDir, "index.html"));
	});
}

// Start the server
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
