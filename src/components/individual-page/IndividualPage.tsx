import "./IndivudualPage.scss";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router";

interface Image {
	src: string;
}
const IndividualPage = () => {
	const [showFullText, setShowFullText] = useState<boolean>(false);
	const [showHotelPolicies, setShowHotelPolicies] = useState<boolean>(false);
	const [currentSlide, setCurrentSlide] = useState<number>(1);
	function toggleHotelPolicies() {
		setShowHotelPolicies(!showHotelPolicies);
	}
	function toggleFullText() {
		setShowFullText(!showFullText);
	}

	const navigate = useNavigate();
	const images: Image[] = [{ src: "/image.png" }, { src: "/image.png" }];
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

	const hotelTextDescription =
		"Located in the UNESCO-listed Boka Bay within a luxury Porto Montenegro Village in the town of Tivat, Regent Porto Montenegro offers an outdoor pool, as well as a spa and wellness centre Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,";
	const deductedText = showFullText
		? hotelTextDescription
		: `${hotelTextDescription.slice(0, 190) + "..."}`;

	const HotelPolicies = () => {
		return (
			<div className="col">
				<div className="col pt-2">
					<div className="d-flex">
						<p className="col-3 hotel-policies-bold-text">Check-in:</p>
						<p className="col-9 hotel-policies-light-text">from 14:30PM</p>
					</div>
					<div className="d-flex pt-2">
						<p className="col-3 hotel-policies-bold-text">Check-out:</p>
						<p className="col-9 hotel-policies-light-text">until 11:30AM</p>
					</div>
				</div>
				<div className="pt-3">
					<div className="divider"></div>
				</div>
				<div className="col pt-3">
					<p className="hotel-policies-bold-text">Payment Options:</p>
					<p className="hotel-policies-light-text pt-1">Cash</p>
					<p className="hotel-policies-light-text pt-2">Debit card</p>
					<p className="hotel-policies-light-text pt-2">Credit card</p>
					<p className="hotel-policies-light-text pt-2">Electronic bank transfer</p>
					<p className="hotel-policies-light-text pt-2">Paypal</p>
					<p className="hotel-policies-light-text pt-2 ">Crypto payments</p>
				</div>
				<div className="pt-3">
					<div className="divider"></div>
				</div>
				<div className="col pt-3">
					<p className="hotel-policies-bold-text">Children:</p>
					<p className="hotel-policies-light-text pt-1">Children are welcome</p>
				</div>
				<div className="pt-3">
					<div className="divider"></div>
				</div>
				<div className="col pt-3">
					<p className="hotel-policies-bold-text">Check in age restriction:</p>
					<p className="hotel-policies-light-text pt-1">18 and above</p>
				</div>
			</div>
		);
	};

	return (
		<div className="col overflow-x-hidden">
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
				<div className="image-counter-numbers text-center px-1">
					{currentSlide}/{images.length}
				</div>
			</div>
			<Slider {...settings}>
				{images.map(image => (
					<div key={image.src}>
						<img src={image.src} alt="Hotel Image" className="hotel-image" />
					</div>
				))}
			</Slider>

			<div className="p-3 mb-5 pb-5">
				<div className="">
					<p className="location-text-color fw-700 text-big lh-120">
						Regent Porto Montenegro
					</p>
					<div className="d-flex align-items-center pt-2">
						<img src="/location.svg" className="location-icon" alt="Location icon" />
						<p className="location-text-color fw-500 text-small lh-120 col-11 pt-1 ps-1 mb-0">
							Tivat, Montenegro
						</p>
					</div>
					<div className="d-flex align-items-center">
						<img src="/building.svg" className="location-icon" alt="Building icon" />
						<p className="location-text-color fw-500 text-small lh-120 col-11 pt-1 ps-1 mb-0">
							5 stars Hotel
						</p>
					</div>
					<p className="pt-3 hotel-desc fw-500 text-smaller lh-120">
						Experience luxurious seaside living at Hotel Regent Porto Montenegro.
					</p>
				</div>
				<div className="col pt-4">
					<p className="location-text-color fw-700 text-big lh-120">Luxury Experience</p>
					<div className="images-container">
						{luxuryExperienceImages.map(image => (
							<div key={image.src} className="image-wrapper ">
								<img src={image.src} />
								<p>Massages</p>
							</div>
						))}
					</div>
				</div>
				<div className="col ">
					<p className="location-text-color fw-700 text-big lh-120 pt-4">About us</p>
					<div className="about-us-desc pt-2 fw-500 text-smaller ">{deductedText}</div>
					<div onClick={toggleFullText}>
						<div className="d-flex align-items-center pt-2">
							<p className="m-0 read-more-text fw-700 text-smaller lh-120 pe-1">
								{!showFullText ? "Read More" : "Read Less"}
							</p>
							<img
								src="/chevron-down.svg"
								className={`read-more-icon ${showFullText && "read-less-icon"}`}
							/>
						</div>
					</div>
					<div className="col pt-4">
						<img src="/mapa.png" className="hotel-image" />
						<p className="pt-3 location-text-color fw-700 text-small lh-120">
							Porto Montenegro, Obala bb, Tivat 85320, Montenegro
						</p>
					</div>
				</div>
				<div className="col pt-4">
					<div className="location-text-color fw-700 text-big lh-120">About the town</div>
					<p className="town-desc fw-500 text-smaller pt-2">
						Tivat is a relatively small town, but it offers a wide range of activities
						and attractions for visitors, such as water sports, hiking, and cultural
						events. It has a pleasant Mediterranean climate with mild winters and warm
						summers, making it a popular destination for sun-seekers. Tivat is also
						well-connected to other popular destinations in Montenegro, such as the
						historic town of Kotor, the Durmitor National Park, and the capital city of
						Podgorica, making it an ideal base for exploring the country.
					</p>
				</div>
				<div className="col pt-3">
					<div className="hotel-policies-container pb-2">
						<p
							className="location-text-color fw-700 text-big lh-120 mb-0"
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
