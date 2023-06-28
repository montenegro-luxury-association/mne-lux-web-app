import axios from "axios";
import "./IndivudualPage.scss";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { Listing } from "../../types/apiTypes";
import SelectDropdown from "../common/select-dropdown/SelectDropdown";
import Input from "../common/input/Input";

interface Image {
	src: string;
}
const IndividualPage = () => {
	const [showFullText, setShowFullText] = useState<boolean>(false);
	const [showHotelPolicies, setShowHotelPolicies] = useState<boolean>(false);
	const [currentSlide, setCurrentSlide] = useState<number>(1);
	const [listing, setListing] = useState<Listing | undefined>(undefined);
	const [openModal, setOpenModal] = useState(false);

	const [queryParams] = useSearchParams();
	const listingId = queryParams.get("id");

	function toggleHotelPolicies() {
		setShowHotelPolicies(!showHotelPolicies);
	}
	function toggleFullText() {
		setShowFullText(!showFullText);
	}

	const navigate = useNavigate();
	const luxuryExperienceImages: Image[] = [
		{ src: "/massage.png" },
		{ src: "/massage.png" },
		{ src: "/massage.png" },
		{ src: "/massage.png" },
		{ src: "/massage.png" }
	];
	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		beforeChange: (current: number, next: number) => setCurrentSlide(next + 1),
		afterChange: (current: number) => setCurrentSlide(current + 1)
	};

	const deductedText = showFullText
		? listing?.fullDescription
		: `${listing?.fullDescription?.slice(0, 190) + "..."}`;

	// TODO: Ova tvoja Djoka funkcija mi je davala error pa sam je morao vratit u stari izgled
	// const peopleOptions = Array(6)
	// 	.fill(null)
	// 	.map((_, i) => ({ value: i + 1, label: i + 1 }));

	const peopleOptions = [
		{ value: 0, label: "0" },
		{ value: 1, label: "1" },
		{ value: 2, label: "2" },
		{ value: 3, label: "3" },
		{ value: 4, label: "4" },
		{ value: 5, label: "5" },
		{ value: 6, label: "6" }
	];
	const travelOptions = [
		{ value: "business", label: "Business" },
		{ value: "pleasure", label: "Pleasure" }
	];
	useEffect(() => {
		fetchAndSetListingDetails();
	}, []);

	function onClickAwayFromModal() {
		setOpenModal(false);
	}

	function onClickAvailability(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.stopPropagation();
		setOpenModal(true);
	}

	async function fetchAndSetListingDetails() {
		const response = await axios.get(`/listings/id/${listingId}`);
		setListing(response.data.listing);
	}

	function formatCheckInOutTime(secondsFromMidnight: number) {
		const hours = Math.floor(secondsFromMidnight / (60 * 60));
		const minutes = Math.floor(secondsFromMidnight / 60) % 60;

		return `${prefixZeroIfNeeded(hours)}:${prefixZeroIfNeeded(minutes)}`;
	}

	function prefixZeroIfNeeded(number: number) {
		return `0${number}`.slice(-2);
	}

	if (!listing) {
		return <h4 className="text-center mt-5">Loading...</h4>;
	}

	const HotelPolicies = () => {
		return (
			<div className="col">
				<div className="col pt-2">
					<div className="d-flex">
						<p className="col-3 fw-800 text-small lh-120 text-color-black">Check-in:</p>
						<p className="col-9 fw-500 text-small lh-120 text-color-black">
							from {formatCheckInOutTime(listing.checkInFromSeconds)}
						</p>
					</div>
					<div className="d-flex pt-2">
						<p className="col-3 fw-800 text-small lh-120 text-color-black">
							Check-out:
						</p>
						<p className="col-9 fw-500 text-small lh-120 text-color-black">
							until {formatCheckInOutTime(listing.checkOutUntilSeconds)}
						</p>
					</div>
				</div>
				<div className="pt-3">
					<div className="divider"></div>
				</div>
				<div className="col pt-3">
					<p className="fw-800 text-small lh-120 text-color-black">Payment Options:</p>
					{listing?.paymentOptions.map(paymentOption => (
						<p
							key={paymentOption}
							className="fw-500 text-small lh-120 text-color-black pt-1 text-capitalize">
							{paymentOption}
						</p>
					))}
				</div>
				<div className="pt-3">
					<div className="divider"></div>
				</div>
				<div className="col pt-3">
					<p className="fw-800 text-small lh-120 text-color-black">Children:</p>
					<p className="fw-500 text-small lh-120 text-color-black pt-1">
						{listing?.areChildrenWelcome ? "Children are welcome" : "Adults only"}
					</p>
				</div>
				<div className="pt-3">
					<div className="divider"></div>
				</div>
				<div className="col pt-3">
					<p className="fw-800 text-small lh-120 text-color-black">
						Check in age restriction:
					</p>
					<p className="fw-500 text-small lh-120 text-color-black pt-1">
						{listing?.minCheckInAge
							? `${listing.minCheckInAge} and above`
							: "No restriction"}
					</p>
				</div>
			</div>
		);
	};

	return (
		<div
			className={`col overflow-x-hidden position-relative ${openModal && "page-open-modal"}`}>
			<div className="position-relative">
				<img
					onClick={() => navigate(-1)}
					src="./images/icons/back-button-hotel.svg"
					className="hotel-back-button position-absolute"
					alt="Back Button"
				/>
				<div>
					<img
						src="./images/icons/share-button-hotel.svg"
						className="hotel-share-button position-absolute"
						alt="Share Button"
					/>
					<img
						src="./images/icons/share.svg"
						className="hotel-share-button-icon position-absolute"
						alt="Share Button"
					/>
				</div>

				<img
					src="./images/icons/favor-button-hotel.svg"
					className="hotel-favor-button position-absolute"
					alt="Favor Button"
				/>
				<div className="image-counter-wrapper position-absolute ms-4 p-1">
					<div className="image-counter-numbers fw-500 text-small lh-120 text-center px-1">
						{currentSlide}/{listing?.mediaURIs.length}
					</div>
				</div>

				<Slider {...settings} className="hotel-images-slider">
					{listing?.mediaURIs.map(mediaURI => (
						<img
							src={mediaURI}
							key={mediaURI}
							alt="Hotel Image"
							className="w-100 hotel-slide-image"
						/>
					))}
				</Slider>
			</div>

			<div className="p-3 mb-5 pb-5">
				<div className="">
					<p className="text-color-black fw-700 text-big lh-120">{listing?.name}</p>
					<div className="d-flex align-items-center pt-2">
						<img src="/location.svg" className="location-icon" alt="Location icon" />
						<p className="text-color-black fw-500 text-small lh-120 col-11 pt-1 ps-1 mb-0">
							{listing?.address}
						</p>
					</div>
					<div className="d-flex align-items-center">
						<img src="/building.svg" className="location-icon" alt="Building icon" />
						<p className="text-color-black fw-500 text-small lh-120 col-11 pt-1 ps-1 mb-0">
							{listing?.ratingCategory} stars Hotel
						</p>
					</div>
					<p className="pt-3 text-middle-gray text-justify fw-500 text-small lh-120">
						{listing?.shortDescription}
					</p>
				</div>
				<div className="col pt-4">
					<p className="text-color-black fw-700 text-big lh-120">Luxury Experience</p>
					<div className="images-container">
						{luxuryExperienceImages.map(image => (
							<div key={image.src + Math.random()} className="image-wrapper ">
								<img src={image.src} />
								<p>Massages</p>
							</div>
						))}
					</div>
				</div>
				<div className="col ">
					<p className="text-color-black fw-700 text-big lh-120 pt-4">About us</p>
					<div className="about-us-desc text-justify lh-130 pt-2 fw-500 text-small ">
						{deductedText}
					</div>
					<div onClick={toggleFullText}>
						<div className="d-flex align-items-center pt-2">
							<p className="m-0 read-more-text fw-700 text-small lh-120 pe-1">
								{!showFullText ? "Read More" : "Read Less"}
							</p>
							<img
								src="/chevron-down.svg"
								className={`read-more-icon ${showFullText && "read-less-icon"}`}
							/>
						</div>
					</div>
					<div className="col pt-4">
						<img src="/mapa.png" className="w-100" />
						<p className="pt-3 text-color-black fw-700 text-small lh-120">
							{listing?.cityName}, {listing?.address}, Montenegro
						</p>
					</div>
				</div>
				<div className="col pt-4">
					<div className="text-color-black fw-700 text-big lh-120">About the town</div>
					<p className="text-justify text-color-black fw-500 text-small lh-130 pt-2">
						{listing?.cityDescription}
					</p>
				</div>
				<div className="col pt-3">
					<div
						className="hotel-policies-container d-flex justify-content-start align-items-center pb-2"
						onClick={toggleHotelPolicies}>
						<p className="text-color-black fw-700 text-big lh-120 mb-0">
							Hotel Policies
						</p>
						<div className="ps-1">
							{showHotelPolicies ? (
								<img src="/chevron-down.svg" className="more-button" />
							) : (
								<img src="/chevron-down.svg" className="less-button" />
							)}
						</div>
					</div>
					{showHotelPolicies && <HotelPolicies />}
				</div>
			</div>
			{openModal && <div onClick={onClickAwayFromModal} className="modal-background"></div>}
			<div className="check-availability-container">
				<button
					onClick={onClickAvailability}
					className="btn btn-primary btn-disabled-gray w-100">
					Check availability
				</button>
			</div>

			<div
				className={`availability-modal p-4  d-flex flex-column gap-08  ${
					openModal && "availability-modal-open"
				}`}>
				<div className="d-flex justify-content-between text-color-black fw-700 text-big lh-120 ">
					Choose dates{" "}
					<img onClick={onClickAwayFromModal} src="./images/icons/x.svg" alt="X" />
				</div>
				<div className="d-flex gap-08 mt-1">
					<Input label="Check-in-date" placeholder="Mon 14 Sept 2023" />
					<Input label="Check-out-date" placeholder="Thur 17 Sept 2023" />
				</div>
				<div className="d-flex w-100 gap-08 mt-1">
					<div className="d-flex flex-column flex-grow-1">
						<label>Adults</label>
						<SelectDropdown options={peopleOptions} placeholder="0" />
					</div>
					<div className="d-flex flex-column flex-grow-1">
						<label>Children</label>
						<SelectDropdown options={peopleOptions} placeholder="0" />
					</div>
					<div className="d-flex flex-column flex-grow-1">
						<label>Infants</label>
						<SelectDropdown options={peopleOptions} placeholder="0" />
					</div>
				</div>
				<div>
					<label>Traveling for</label>
					<SelectDropdown options={travelOptions} placeholder="Business" />
				</div>
				<div>
					<label>Special request</label>
					<textarea
						placeholder="Message here..."
						className="form-control input rounded-3  h-100"
						rows={3}
					/>
				</div>
				<button className="btn btn-primary btn-disabled-gray w-100 mt-3">
					Send Inquiry
				</button>
			</div>
		</div>
	);
};

export default IndividualPage;
