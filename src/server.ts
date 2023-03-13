import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;

app.get("/", (_: Request, res: Response): void => {
	res.send("Hello World!");
});

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
