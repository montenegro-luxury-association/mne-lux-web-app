export const LISTING_TYPES = ["hotel"] as const;
export const PAYMENT_OPTIONS = [
	"cash",
	"debit-card",
	"credit-card",
	"bank-transfer",
	"paypal",
	"crypto"
] as const;

type ListingExperience = {
	imageUri: string;
	title: string;
};

export type GeoJSONPoint = {
	type: "Point";
	/**
	 * [longitude, latitude]
	 */
	coordinates: [number, number];
};

/**
 * In the future we will add other types of listings, e.g. "apartment", "cabin", etc.
 */
export type ListingType = (typeof LISTING_TYPES)[number];
export type PaymentOption = (typeof PAYMENT_OPTIONS)[number];

// NOTE: I ran into issues doing this where once I specified the 'category' property in a 'Listing' object, autocomplete
// for remaining properties stopped working. Maybe will use "mongoose discriminators" or something
export type Listing = {
	_id: string;
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
	minCheckInAge?: number;
	mediaURIs: string[];
	owner: string;
	createdAt: Date;
};

export type User = {
	fullName: string;
	email: string;
	phoneNumber: string;
	country: string;
	dateOfBirth: Date;
	password: string;
	// favorites: Types.ObjectId[];
};
