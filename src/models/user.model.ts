import { model, Schema, Types } from "mongoose";

export type User = {
	id: Types.ObjectId;
	fullName: string;
	email: string;
	phoneNumber: string;
	country: string;
	dateOfBirth: Date;
	password?: string;
	googleId?: string;
	favorites: Types.ObjectId[];
};

const userSchema = new Schema<User>(
	{
		fullName: { type: String, required: true },
		email: { type: String, required: true, index: true, unique: true },
		phoneNumber: { type: String, index: true, unique: true, sparse: true },
		country: { type: String }, // required for non-google signups
		dateOfBirth: { type: Date }, // required for non-google signups
		password: { type: String }, // required for non-google signups
		googleId: { type: String, index: true, unique: true, sparse: true },
		favorites: [{ type: Schema.Types.ObjectId, ref: "Listing" }]
	},
	{ versionKey: false, timestamps: { createdAt: true, updatedAt: false } }
);

export const User = model<User>("User", userSchema);
