import express, { Application, Request, Response } from "express";

const app: Application = express();

app.get("/", (_: Request, res: Response): void => {
	res.send("Hello World!");
});

app.listen(3000, () => {
	console.log("Server started on port 3000");
});
