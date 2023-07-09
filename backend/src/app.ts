import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import allApiRoutes from "./api";
import passport from "passport";
import "./util/passport-setup";

const PORT = process.env.PORT || 3001;

const app: Application = express();

// Set up middleware
app.use(express.json());
app.use(
	cors({
		origin:
			process.env.NODE_ENV === "production" ? "https://mnelux.com" : "http://localhost:3000",
		credentials: true
	})
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(passport.initialize());

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
app.use("/api", allApiRoutes);

// Server react files for frontend if on production
if (process.env.NODE_ENV === "production") {
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
