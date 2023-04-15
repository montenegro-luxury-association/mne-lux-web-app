import axios from "axios";
import "./IndivudualPage.scss";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { Listing } from "../../types/apiTypes";

interface Image {
	src: string;
}
const IndividualPage = () => {
	const [showFullText, setShowFullText] = useState<boolean>(false);
	const [showHotelPolicies, setShowHotelPolicies] = useState<boolean>(false);
	const [currentSlide, setCurrentSlide] = useState<number>(1);
	const [listing, setListing] = useState<Listing | undefined>(undefined);

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

	useEffect(() => {
		fetchAndSetListingDetails();
	}, []);

	async function fetchAndSetListingDetails() {
		const response = await axios.get(`/listings/id/${listingId}`);
		setListing(response.data.listing);
	}

	const HotelPolicies = () => {
		return (
			<div className="col">
				<div className="col pt-2">
					<div className="d-flex">
						<p className="col-3 fw-800 text-small lh-120 text-color-black">Check-in:</p>
						<p className="col-9 fw-500 text-small lh-120 text-color-black">
							from 14:30PM
						</p>
					</div>
					<div className="d-flex pt-2">
						<p className="col-3 fw-800 text-small lh-120 text-color-black">
							Check-out:
						</p>
						<p className="col-9 fw-500 text-small lh-120 text-color-black">
							until 11:30AM
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
		<div className="col overflow-x-hidden">
			<div className="images-slider-container position-relative">
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
					<div className="hotel-policies-container d-flex justify-content-start align-items-center pb-2">
						<p
							className="text-color-black fw-700 text-big lh-120 mb-0"
							onClick={toggleHotelPolicies}>
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
			{/* TODO: Button je fiksiran ali je problem sto ide preko sekcije Hotel Policies i onda se ta sekcija ne vidi uopste i onda user nije u mogucnosti da klikne na nju */}
			<div className="check-availability-container">
				<button className="btn btn-primary btn-disabled-gray w-100">
					Check availability
				</button>
			</div>
		</div>
	);
};

export default IndividualPage;
