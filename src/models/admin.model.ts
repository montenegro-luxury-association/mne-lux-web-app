import { model, Schema } from "mongoose";

export type Admin = {
	email: string;
	password: string;
};

const adminSchema = new Schema<Admin>(
	{
		email: { type: String, required: true, index: true, unique: true },
		password: { type: String, required: true }
	},
	{ versionKey: false, timestamps: { createdAt: true, updatedAt: false } }
);

export const Admin = model<Admin>("Admin", adminSchema);
