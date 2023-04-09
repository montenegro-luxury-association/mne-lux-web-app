const PAYMENT_OPTIONS = [
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

type PaymentOption = typeof PAYMENT_OPTIONS[number];

export type Listing = {
	// TODO: Make these (type, category) of type: "typeof LISTING_CATEGORIES[number]" instead of 'string'.
	// I ran into issues doing this where once I specified the 'category' property in a 'Listing' object, autocomplete
	// for remaining properties stopped working. Maybe will use "mongoose discriminators" or something
	_id: string;
	type: string; // TODO: verify which types we want here, add enumm
	category: string; // TODO: verify what this is, make enum
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
	minimumAge?: number; // TODO:  Ask Stefan how this ties in with 'areChildrenWelcome' property
	mediaURIs: string[];
	owner: string;
};
