// TODO: eslint is being annoying, remove when no longer needed
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
import axios from "axios";
import { useEffect, useState } from "react";
import CheckBoxInput from "../common/check-box-input/CheckBoxInput";
import Input from "../common/input/Input";
import RadioButtonInput from "../common/radio-button-input/RadioButtonInput";
import TopNavBar from "../common/top-nav-bar/TopNavBar";
import "./AdminCreateListingPage.scss";
import { GeoJSONPoint, Listing, PAYMENT_OPTIONS, PaymentOption } from "../../types/apiTypes";
import SelectDropdown from "../common/select-dropdown/SelectDropdown";

export default function AdminCreateListingPage() {
	const [listing, setListing] = useState<Listing>();
	const [selectedFiles, setSelectedFiles] = useState<File[]>();
	const [imagesUploadedCount, setImagesUploadedCount] = useState(0);
	const [showImagesUploadedCount, setShowImagesUploadedCount] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	// NOTE: Technically we could do without these "duplicate" string-based states, but it makes things a bit easier
	const [checkInTimeString, setCheckInTimeString] = useState("00:00");
	const [checkOutTimeString, setCheckOutTimeString] = useState("00:00");

	useEffect(() => {
		onGenericPropertyChangeRaw(
			convertHumanReadableTimeToSeconds(checkInTimeString),
			"checkInFromSeconds"
		);
	}, [checkInTimeString]);

	useEffect(() => {
		onGenericPropertyChangeRaw(
			convertHumanReadableTimeToSeconds(checkOutTimeString),
			"checkOutUntilSeconds"
		);
	}, [checkOutTimeString]);

	/**
	 * Converts human-readable time strings (12:30, 18:47, etc) to seconds from start of day
	 * @param humanTime Human-readable time string
	 */
	function convertHumanReadableTimeToSeconds(humanTime: string) {
		const [hours, minutes] = humanTime.split(":");

		const hoursInSeconds = parseInt(hours) * 60 * 60;
		const minutesInSeconds = parseInt(minutes) * 60;

		return hoursInSeconds + minutesInSeconds;
	}

	function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.files) {
			setSelectedFiles(Array.from(e.target.files));
		}
	}

	async function uploadListingImages(listingId: string) {
		if (selectedFiles) {
			for (const image of selectedFiles) {
				const response = await axios.post(`/admin/add-s3-listing-media/${listingId}`);
				const { uploadURL } = response.data;

				await axios.put(uploadURL, image, {
					headers: { "Content-Type": "multipart/form-data" }
				});

				setImagesUploadedCount(prev => prev + 1);
			}
		}
	}

	async function onClickSubmit() {
		setIsLoading(true);
		const uploadStartTime = Date.now();

		try {
			// TODO: Replace with real location and
			const DUMMY_LOCATION: GeoJSONPoint = { type: "Point", coordinates: [42.288, 18.849] };

			const hotelApiObject: Listing = {
				...(listing as Listing),
				location: DUMMY_LOCATION,
				experiences: []
			};
			const response = await axios.post("/admin/add-listing", hotelApiObject);

			showImageUploadCountAfterDelay(Date.now() - uploadStartTime);

			await uploadListingImages(response.data.listingId);

			setListing(undefined);
			alert("Success!");
		} catch (err) {
			alert("Something went wrong!");
		} finally {
			setIsLoading(false);
			setImagesUploadedCount(0);
			setShowImagesUploadedCount(false);
		}
	}

	// NOTE: once the listing is uploaded to the DB we show the number of images being being uploaded, however
	// we want to wait at least 800ms before showing the image count to avoid text flickering too fast
	function showImageUploadCountAfterDelay(timePassedSinceUploadStart: number) {
		const minDelayMS = 800;

		if (timePassedSinceUploadStart > minDelayMS) {
			setShowImagesUploadedCount(true);
		} else {
			setTimeout(
				() => setShowImagesUploadedCount(true),
				minDelayMS - timePassedSinceUploadStart
			);
		}
	}

	// Most properties are set in the same way, so we can use a single function for most of them
	function onGenericPropertyChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		property: keyof Listing
	) {
		setListing({
			...listing,
			[property]: e.target.type === "number" ? parseFloat(e.target.value) : e.target.value
		} as Listing);
	}
	function onGenericPropertyChangeRaw(value: number | string, property: keyof Listing) {
		setListing({
			...listing,
			[property]: value
		} as Listing);
	}

	function onPaymentOptionsChange(
		e: React.ChangeEvent<HTMLInputElement>,
		paymentOption: PaymentOption
	) {
		let updatedPaymentOptions = listing?.paymentOptions || [];

		if (e.target.checked === true) {
			updatedPaymentOptions.push(paymentOption);
		} else {
			updatedPaymentOptions = updatedPaymentOptions.filter(item => item === paymentOption);
		}

		setListing({ ...listing, paymentOptions: updatedPaymentOptions } as Listing);
	}

	function onMinCheckInAgeChange(minAge: number | undefined) {
		setListing({
			...listing,
			minCheckInAge: minAge
		} as Listing);
	}

	function onChildrenWelcomeChange(areChildrenWelcome: boolean) {
		setListing({
			...listing,
			areChildrenWelcome
		} as Listing);
	}

	// Handle formatting and allow easy editing of hh:mm format time string
	function onCheckInOutTimeChange(
		e: React.ChangeEvent<HTMLInputElement>,
		type: "check-in" | "check-out"
	) {
		const onChangeHandler = (prevVal: string) => {
			const currentTimeWithoutCol = prevVal.replace(":", "");
			let newTimeWithoutCol: string;

			if (e.target.value.length > prevVal.length) {
				// New character was added

				const newChar = findNewChar(prevVal, e.target.value);

				if (isNaN(parseInt(newChar))) {
					return prevVal;
				}

				// If hours & minutes are already filled, don't 'push back' time further
				if (prevVal[0] !== "0") {
					return prevVal;
				}

				newTimeWithoutCol = currentTimeWithoutCol.slice(1) + newChar;
			} else {
				// Character was erased
				newTimeWithoutCol = `0${currentTimeWithoutCol.slice(0, -1)}`;
			}

			return `${newTimeWithoutCol.slice(0, 2)}:${newTimeWithoutCol.slice(2)}`;
		};

		if (type === "check-in") {
			setCheckInTimeString(onChangeHandler);
		} else {
			setCheckOutTimeString(onChangeHandler);
		}
	}

	function findNewChar(prevVal: string, newVal: string) {
		console.log({ prevLen: prevVal.length, newLen: newVal.length });
		if (newVal.length > prevVal.length) {
			for (let i = 0; i < newVal.length; i++) {
				if (newVal[i] !== prevVal[i]) {
					return newVal[i];
				}
			}
		}

		return "";
	}

	const minimumCheckInAge = [undefined, 18, 21, 25];
	const hotelTypeOptions = [
		{ value: 4, label: "4 Stars" },
		{ value: 5, label: "5 Stars" }
	];
	const hotelCategoryOptions = [{ value: "hotel", label: "Hotel" }];

	console.log({ hotel: listing });

	return (
		<div className="mb-3 admin-create-listing-page">
			<TopNavBar title="Administrator" />

			{/* Main inputs */}
			<div className="p-3">
				<label>Type:</label>
				<SelectDropdown
					className="mb-2"
					options={hotelCategoryOptions}
					placeholder="Choose type"
					onChange={value => onGenericPropertyChangeRaw(value, "type")}
					value={listing?.type}
				/>
				<label>Category:</label>
				<SelectDropdown
					className="mb-2"
					options={hotelTypeOptions}
					placeholder="Chose category"
					onChange={value => onGenericPropertyChangeRaw(value, "ratingCategory")}
					value={listing?.ratingCategory}
				/>

				<Input
					className="mb-2"
					label="Name:"
					placeholder="Write hotel name"
					value={listing?.name}
					onChange={e => onGenericPropertyChange(e, "name")}
				/>
				<Input
					className="mb-2"
					label="Address:"
					placeholder="Write hotel address"
					value={listing?.address}
					onChange={e => onGenericPropertyChange(e, "address")}
				/>
				<Input
					className="mb-2"
					label="Key one sentence description"
					placeholder="Write breathtaking punch line"
					value={listing?.shortDescription}
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
					value={listing?.fullDescription}
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
					value={listing?.cityName}
					onChange={e => onGenericPropertyChange(e, "cityName")}
				/>

				<label>About the city:</label>
				<textarea
					placeholder="Write description here"
					className="form-control input rounded-3 mb-2 h-100"
					value={listing?.cityDescription}
					onChange={e => onGenericPropertyChange(e, "cityDescription")}
					rows={5}
				/>

				<label>Hotel policies</label>
				<div className="d-flex align-items-center check-in-time-container">
					<p className="fw-700 text-smaller m-0 me-2">Check-in from:</p>
					{/* TODO: Make this input in a human-readable format */}
					<Input
						placeholder="Time"
						value={checkInTimeString}
						onChange={e => onCheckInOutTimeChange(e, "check-in")}
					/>
				</div>
				<div className="d-flex align-items-center check-in-time-container">
					<p className="fw-700 text-smaller m-0 me-2">Check-out until:</p>
					{/* TODO: Make this input in a human-readable format */}
					<Input
						placeholder="Time"
						value={checkOutTimeString}
						onChange={e => onCheckInOutTimeChange(e, "check-out")}
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

				{/* TODO: verify if this is fine  */}
				{selectedFiles && (
					<div className="d-flex w-100 listing-upload-preview-images">
						{selectedFiles.map(file => (
							<img key={file.name} src={URL.createObjectURL(file)} />
						))}
					</div>
				)}

				<div className="add-media-container rounded-3">
					<img src="/images/icons/upload-media.svg" />
					<p className="text-middle-gray text-smaller mb-0 mt-2">
						Drag and drop file here
					</p>
					<p className="text-middle-gray text-smaller mb-2">or</p>

					<label
						htmlFor="listing-images"
						className="add-media-btn btn btn-primary btn-disabled-gray rounded-pill h-auto px-3 text-black">
						Browse here
					</label>
					<input
						onChange={handleFileSelect}
						id="listing-images"
						className="d-none"
						type="file"
						multiple
					/>
				</div>

				{isLoading && (
					<div className="admin-create-listing-loading-overlay">
						<h4 className="text-white">
							{showImagesUploadedCount
								? `Uploading images... (${imagesUploadedCount + 1}/${
										selectedFiles?.length
								  })`
								: "Saving listing..."}
						</h4>
					</div>
				)}

				<button
					className="btn btn-primary btn-disabled-gray w-100 mt-5"
					onClick={onClickSubmit}>
					Submit
				</button>
			</div>
		</div>
	);
}
