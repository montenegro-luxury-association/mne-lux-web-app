import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Listing } from "../../types/apiTypes";
import BottomNavbar from "../bottom-navbar/BottomNavbar";
import "./homePage.scss";

export default function HomePage() {
	const navigate = useNavigate();
	const [hotels, setHotels] = useState<Listing[]>();

	useEffect(() => {
		fetchAndSetListings();
	}, []);

	async function fetchAndSetListings() {
		const response = await axios.get("/listings");
		setHotels(response.data.listings);
	}

	function onClickHotel(id: string) {
		navigate(`/hotel-page?id=${id}`);
	}

	async function onToggleFavorites(id: string, e: React.MouseEvent<HTMLDivElement>) {
		e.stopPropagation();
		await axios.post(`/listings/toggle-favorites/${id}`);
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
					{hotels &&
						hotels?.map(hotel => (
							<div
								onClick={() => onClickHotel(hotel._id)}
								key={hotel._id}
								style={{
									// TODO: would prolly be nice to have a separate <img> tag and an overlay above it than this
									background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 58.74%, rgba(0, 0, 0, 0.5) 70.78%),
                        url(${hotel.mediaURIs[0]}), #d9d9d9`
								}}
								className="home-page-card-container container-fluid d-flex flex-column justify-content-between">
								<div className="d-flex justify-content-end">
									{/*TODO: Add functionality for favorites */}
									{/* {hotel.favored ? (
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
								)} */}
									{/* TODO:Remove this when functionality is done */}
									<img
										onClick={(e: React.MouseEvent<HTMLDivElement>) => {
											onToggleFavorites(hotel._id, e);
										}}
										className="home-page-favor-button"
										src="./images/icons/empty-hart.svg"
										alt="Favor Hotel Button"
									/>
								</div>
								<div className="d-flex flex-column home-page-card-description">
									<span className="home-page-hotel-title">{hotel.name}</span>
									<span>{hotel.cityName}</span>
								</div>
							</div>
						))}
				</div>
			</div>
			<BottomNavbar />
		</>
	);
}
