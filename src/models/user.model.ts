import { model, Schema, Types } from "mongoose";

export type User = {
	fullName: string;
	email: string;
	phoneNumber: string;
	country: string;
	dateOfBirth: Date;
	password: string;
	favorites: Types.ObjectId[];
};

const userSchema = new Schema<User>(
	{
		fullName: { type: String, required: true },
		email: { type: String, required: true, index: true, unique: true },
		phoneNumber: { type: String, required: true, index: true, unique: true },
		country: { type: String, required: true },
		dateOfBirth: { type: Date, required: true },
		password: { type: String, required: true },
		favorites: [{ type: Schema.Types.ObjectId, ref: "Listing" }]
	},
	{ versionKey: false, timestamps: { createdAt: true, updatedAt: false } }
);

export const User = model<User>("User", userSchema);
