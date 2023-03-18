import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavbar from "../bottom-navbar/BottomNavbar";
import "./homePage.scss";

export default function HomePage() {
	const navigate = useNavigate();

	// NOTE: This data is currently hard-coded purely for testing purposes. In the final product, it will be coming from the backend.
	const testingData = [
		{
			id: 0,
			title: "Splendid Hotel",
			location: "Becici, Montenegro",
			locationDesc: "A lovely location next to the beach",
			image: "./images/dummy/test-img-0.jpg",
			favored: true
		},
		{
			id: 1,
			title: "Dukley Gardens",
			location: "Budva, Montenegro",
			locationDesc: "A lovely location next to the beach",
			image: "./images/dummy/test-img-1.jpg",
			favored: false
		},
		{
			id: 2,
			title: "Hotel #3 Name",
			location: "Budva, Montenegro",
			locationDesc: "A lovely location next to the beach",
			image: "./images/dummy/test-img-2.jpg",
			favored: false
		},
		{
			id: 3,
			title: "Hotel #4 Name",
			location: "Budva, Montenegro",
			locationDesc: "A lovely location next to the beach",
			image: "./images/dummy/test-img-3.jpg",
			favored: true
		},
		{
			id: 4,
			title: "Hotel #5 Name",
			location: "Budva, Montenegro",
			locationDesc: "A lovely location next to the beach",
			image: "./images/dummy/test-img-4.jpg",
			favored: true
		}
	];

	useEffect(() => {
		fetchAndSetListings();
	}, []);

	// NOTE: This function is still under development.
	async function fetchAndSetListings() {
		const response = await axios.get("/listings");
		console.log({ response });
		// TODO: Save the listings we received to state.
	}

	function onClickHotel(id: number) {
		navigate(`/hotel-page?id=${id}`);
	}

	return (
		<>
			<div className="home-page-container">
				<div className="position-relative d-flex justify-content-center align-items-center container-fluid">
					<img
						className="position-absolute home-page-logo"
						src="./images/logo-black.svg"
						alt="Company Logo"
					/>
					<h1 className="home-page-title">Luxury Quality</h1>
				</div>
				<div className="home-page-cards-container d-flex flex-column">
					{testingData.map(hotel => (
						<div
							onClick={() => onClickHotel(hotel.id)}
							key={hotel.id}
							style={{
								background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 58.74%, rgba(0, 0, 0, 0.5) 70.78%),
                        url(${hotel.image}), #d9d9d9`
							}}
							className="home-page-card-container container-fluid d-flex flex-column justify-content-between">
							<div className="d-flex justify-content-end">
								{hotel.favored ? (
									<img
										className="home-page-un-favor-button"
										src="./images/icons/hart-icon.svg"
										alt="Unfavor Hotel Button"
									/>
								) : (
									<img
										className="home-page-favor-button"
										src="./images/icons/empty-hart.svg"
										alt="Favor Hotel Button"
									/>
								)}
							</div>
							<div className="d-flex flex-column home-page-card-description">
								<span className="home-page-hotel-title">{hotel.title}</span>
								<span>{hotel.location}</span>
								<span>{hotel.locationDesc}</span>
							</div>
						</div>
					))}
				</div>
			</div>
			<BottomNavbar />
		</>
	);
}
