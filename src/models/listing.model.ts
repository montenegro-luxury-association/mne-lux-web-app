import { model, Schema, Types } from "mongoose";
import { GeoJSONPoint, pointSchema } from "./common-schemas/pointSchema";

const LISTING_TYPES = ["hotel"] as const;
const PAYMENT_OPTIONS = [
	"cash",
	"debit-card",
	"credit-card",
	"bank-transfer",
	"paypal",
	"crypto"
] as const;
export const MAX_LISTING_MEDIA_LENGTH = 20;

type ListingExperience = {
	imageUri: string;
	title: string;
};

type PaymentOption = (typeof PAYMENT_OPTIONS)[number];

/**
 * In the future we will add other types of listings, e.g. "apartment", "cabin", etc.
 */
type ListingType = (typeof LISTING_TYPES)[number];

// NOTE: I ran into issues doing this where once I specified the 'category' property in a 'Listing' object, autocomplete
// for remaining properties stopped working. Maybe will use "mongoose discriminators" or something
export type Listing = {
	/**
	 * The type of listing. Currently the only option is "hotel"
	 */
	type: ListingType;
	/**
	 * Either 4-star or 5-star hotel
	 */
	ratingCategory: number;
	name: string;
	address: string;
	shortDescription?: string; // TODO: Is this required?
	fullDescription?: string; // TODO: Is this required?
	experiences: ListingExperience[];
	location: GeoJSONPoint;
	cityName: string;
	cityDescription?: string; // TODO: We probably want some sort of standardization here later
	/**
	 * The number of seconds from the start of the day (00:00) that check-in is available
	 */
	checkInFromSeconds: number;
	/**
	 * The number of seconds from the start of the day (00:00) until when check-out is possible
	 */
	checkOutUntilSeconds: number;
	paymentOptions: PaymentOption[];
	areChildrenWelcome: boolean;
	petFriendly: boolean;
	minCheckInAge?: number;
	mediaURIs: string[];
	owner: Types.ObjectId;
};

const experienceSchema = new Schema<ListingExperience>(
	{
		imageUri: { type: String, required: true },
		title: { type: String, required: true }
	},
	{ _id: false, versionKey: false }
);

const listingSchema = new Schema<Listing>(
	{
		type: { type: String, enum: LISTING_TYPES, required: true },
		ratingCategory: { type: Number, required: true },
		name: { type: String, required: true },
		address: { type: String, required: true },
		shortDescription: { type: String },
		fullDescription: { type: String },
		experiences: { type: [experienceSchema], default: [] },
		location: {
			type: pointSchema,
			required: true
		},
		cityName: { type: String, required: true },
		cityDescription: { type: String },
		checkInFromSeconds: { type: Number, required: true },
		checkOutUntilSeconds: { type: Number, required: true },
		paymentOptions: { type: [String], enum: PAYMENT_OPTIONS, default: [] },
		areChildrenWelcome: { type: Boolean, default: true },
		petFriendly: { type: Boolean, default: true },
		minCheckInAge: { type: Number },
		mediaURIs: { type: [String], default: [] },
		owner: { type: Schema.Types.ObjectId, ref: "Admin", required: true }
	},
	{ versionKey: false, timestamps: true }
);

export const Listing = model<Listing>("Listing", listingSchema);
