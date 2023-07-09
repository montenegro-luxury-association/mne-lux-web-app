import { Schema } from "mongoose";

export type GeoJSONPoint = {
	type: "Point";
	/**
	 * [longitude, latitude]
	 */
	coordinates: [number, number];
};

export const pointSchema = new Schema<GeoJSONPoint>({
	type: {
		type: String,
		enum: ["Point"],
		required: true
	},
	coordinates: {
		type: [Number],
		required: true
	}
});
