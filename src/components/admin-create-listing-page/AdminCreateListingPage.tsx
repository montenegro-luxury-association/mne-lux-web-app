import { useState } from "react";
import CheckBoxInput from "../common/check-box-input/CheckBoxInput";
import Input from "../common/input/Input";
import RadioButtonInput from "../common/radio-button-input/RadioButtonInput";
import TopNavBar from "../common/top-nav-bar/TopNavBar";
import "./AdminCreateListingPage.scss";
import { GeoJSONPoint, Listing, PAYMENT_OPTIONS, PaymentOption } from "../../types/apiTypes";
import axios from "axios";

export default function AdminCreateListingPage() {
	const [hotel, setHotel] = useState<Listing>();

	async function onClickSubmit() {
		try {
			// TODO: Replace with real location and
			const DUMMY_LOCATION: GeoJSONPoint = { type: "Point", coordinates: [42.288, 18.849] };

			const hotelApiObject: Listing = {
				...(hotel as Listing),
				location: DUMMY_LOCATION,
				experiences: []
			};
			await axios.post("/admin/add-listing", hotelApiObject);
			setHotel(undefined);
			alert("Success!");
		} catch (err) {
			alert("Something went wrong!");
		}
	}

	// Most properties are set in the same way, so we can use a single function for most of them
	function onGenericPropertyChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		property: keyof Listing
	) {
		setHotel({
			...hotel,
			[property]: e.target.type === "number" ? parseFloat(e.target.value) : e.target.value
		} as Listing);
	}

	function onPaymentOptionsChange(
		e: React.ChangeEvent<HTMLInputElement>,
		paymentOption: PaymentOption
	) {
		let updatedPaymentOptions = hotel?.paymentOptions || [];

		if (e.target.checked === true) {
			updatedPaymentOptions.push(paymentOption);
		} else {
			updatedPaymentOptions = updatedPaymentOptions.filter(item => item === paymentOption);
		}

		setHotel({ ...hotel, paymentOptions: updatedPaymentOptions } as Listing);
	}

	function onMinCheckInAgeChange(minAge: number | undefined) {
		setHotel({
			...hotel,
			minCheckInAge: minAge
		} as Listing);
	}

	function onChildrenWelcomeChange(areChildrenWelcome: boolean) {
		console.log({ areChildrenWelcome });
		setHotel({
			...hotel,
			areChildrenWelcome
		} as Listing);
	}

	const minimumCheckInAge = [undefined, 18, 21, 25];

	return (
		<div className="pt-4 mb-3 admin-create-listing-page">
			<TopNavBar title="Administrator" />

			{/* Main inputs */}
			<div className="p-3">
				{/* TODO: Convert to drop-down */}
				<Input
					className="mb-2"
					label="Type:"
					placeholder="Chose type"
					onChange={e => onGenericPropertyChange(e, "type")}
				/>
				{/* TODO: Convert to drop-down with '4-star' and '5-star' options */}
				<Input
					className="mb-2"
					label="Category:"
					type="number"
					placeholder="Chose category"
					onChange={e => onGenericPropertyChange(e, "ratingCategory")}
				/>
				<Input
					className="mb-2"
					label="Name:"
					placeholder="Write hotel name"
					onChange={e => onGenericPropertyChange(e, "name")}
				/>
				<Input
					className="mb-2"
					label="Address:"
					placeholder="Write hotel address"
					onChange={e => onGenericPropertyChange(e, "address")}
				/>
				<Input
					className="mb-2"
					label="Key one sentence description"
					placeholder="Write breathtaking punch line"
					onChange={e => onGenericPropertyChange(e, "shortDescription")}
				/>
				<label className="mb-2">Luxury experience offer</label>
			</div>

			{/* Experiences list container */}
			{/* TODO: Add experience editing */}
			<div className="experiences-container">
				<div>
					<div className="experience-image-placeholder rounded-3">
						<img src="/images/icons/image-icon.svg" />
					</div>
					<Input placeholder="Write experience here (WIP)" disabled={true} />
				</div>
				<div>
					<div className="experience-image-placeholder rounded-3">
						<img src="/images/icons/image-icon.svg" />
					</div>
					<Input placeholder="Write experience here (WIP)" disabled={true} />
				</div>
				<div>
					<div className="experience-image-placeholder rounded-3">
						<img src="/images/icons/image-icon.svg" />
					</div>
					<Input placeholder="Write experience here (WIP)" disabled={true} />
				</div>
			</div>

			{/* Main inputs (2nd half) */}
			<div className="p-3">
				<label>Full text description</label>
				<textarea
					placeholder="Write description here"
					className="form-control input rounded-3 mb-4 h-100"
					onChange={e => onGenericPropertyChange(e, "fullDescription")}
					rows={5}
				/>

				<label className="mb-2">Pin hotel location</label>
				{/* TODO: Replace with real map component */}
				<img className="w-100 mb-2" src="/images/listing-location-placeholder.png" />

				<Input
					className="mb-2"
					label="City name:"
					placeholder="Write city name"
					onChange={e => onGenericPropertyChange(e, "cityName")}
				/>

				<label>About the city:</label>
				<textarea
					placeholder="Write description here"
					className="form-control input rounded-3 mb-2 h-100"
					onChange={e => onGenericPropertyChange(e, "cityDescription")}
					rows={5}
				/>

				<label>Hotel policies</label>
				<div className="d-flex align-items-center check-in-time-container">
					<p className="fw-700 text-smaller m-0 me-2">Check-in from:</p>
					{/* TODO: Make this input in a human-readable format */}
					<Input
						type="number"
						placeholder="13:30PM"
						onChange={e => onGenericPropertyChange(e, "checkInFromSeconds")}
					/>
				</div>
				<div className="d-flex align-items-center check-in-time-container">
					<p className="fw-700 text-smaller m-0 me-2">Check-out from:</p>
					{/* TODO: Make this input in a human-readable format */}
					<Input
						type="number"
						placeholder="14:30PM"
						onChange={e => onGenericPropertyChange(e, "checkOutUntilSeconds")}
					/>
				</div>

				<div className="separator-line mt-4 mb-4" />

				<label className="mb-3">Payment options:</label>

				{[
					PAYMENT_OPTIONS.map(paymentOption => (
						<CheckBoxInput
							key={paymentOption}
							className="mb-2 text-capitalize"
							title={paymentOption.replace(/-/g, " ")}
							onChange={e => onPaymentOptionsChange(e, paymentOption)}
						/>
					))
				]}

				<div className="separator-line mt-4 mb-4" />

				<label className="mb-3">Children:</label>

				<RadioButtonInput
					key={"true"}
					title={"Children are welcome"}
					name="children-welcome"
					onChange={() => onChildrenWelcomeChange(true)}
				/>
				<RadioButtonInput
					key={"false"}
					title={"Adults only"}
					name="children-welcome"
					onChange={() => onChildrenWelcomeChange(false)}
				/>

				<div className="separator-line mt-4 mb-4" />

				<label className="mb-3">Check-in Age:</label>

				{minimumCheckInAge.map(age => (
					<RadioButtonInput
						key={age}
						title={age ? `${age} and above` : "No restriction"}
						name="age-restriction"
						onChange={() => onMinCheckInAgeChange(age)}
					/>
				))}

				<label className="mt-3 mb-3">Media</label>

				<div className="add-media-container rounded-3">
					<img src="/images/icons/upload-media.svg" />
					<p className="text-middle-gray text-smaller mb-0 mt-2">
						Drag and drop file here
					</p>
					<p className="text-middle-gray text-smaller mb-2">or</p>
					<button className="add-media-btn btn btn-primary btn-disabled-gray rounded-pill h-auto px-3 text-black">
						Browse here
					</button>
				</div>

				<button
					className="btn btn-primary btn-disabled-gray w-100 mt-5"
					onClick={onClickSubmit}>
					Submit
				</button>
			</div>
		</div>
	);
}
