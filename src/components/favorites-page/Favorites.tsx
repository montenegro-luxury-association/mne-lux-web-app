import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavbar from "../bottom-navbar/BottomNavbar";
import TopNavBar from "../common/top-nav-bar/TopNavBar";
import { Listing } from "../../types/apiTypes";
import "./Favorites.scss";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContextProvider";

export default function Favorites() {
	const navigate = useNavigate();
	const [favorites, setFavorites] = useState<Listing[]>();
	const authContext = useAuthContext();

	useEffect(() => {
		fetchAndSetFavorites();
	}, []);

	function onClickHotel(id: string) {
		navigate(`/hotel-page?id=${id}`);
	}

	async function fetchAndSetFavorites() {
		const response = await axios.get("/listings/favorites");
		setFavorites(response.data.listings);
	}

	async function onRemoveFavorite(id: string, e: React.MouseEvent<HTMLDivElement>) {
		e.stopPropagation();
		const newFavorites = favorites?.filter(favorite => favorite._id !== id);
		setFavorites(newFavorites);
		await axios.post(`/listings/toggle-favorites/${id}`);
	}

	return (
		<>
			<TopNavBar title={"Favorites"} />
			{authContext.user ? (
				<>
					{favorites?.length ? (
						<div className="home-page-container pt-0">
							<div className="home-page-cards-container d-flex flex-column">
								{favorites.map(hotel => (
									<div
										onClick={() => onClickHotel(hotel._id)}
										key={hotel._id}
										style={{
											background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 58.74%, rgba(0, 0, 0, 0.5) 70.78%),
                        url(${hotel.mediaURIs[0]}), #d9d9d9`
										}}
										className="home-page-card-container container-fluid d-flex flex-column justify-content-between">
										<div className="d-flex justify-content-end">
											<img
												onClick={(e: React.MouseEvent<HTMLDivElement>) => {
													onRemoveFavorite(hotel._id, e);
												}}
												className="home-page-un-favor-button"
												src="./images/icons/hart-icon.svg"
												alt="Unfavor Hotel Button"
											/>
										</div>
										<div className="d-flex flex-column home-page-card-description">
											<span className="home-page-hotel-title">
												{hotel.name}
											</span>
											<span>{hotel.cityName}</span>
											<span>{hotel.cityDescription}</span>
										</div>
									</div>
								))}
							</div>
						</div>
					) : (
						<h4 className="text-center add-favorites-text">
							You didn't add your favorite spot yet
						</h4>
					)}
				</>
			) : (
				<div className="d-flex flex-column px-4 align-content-center bg-white justify-content-center favorites-login-container">
					{authContext.isLoading ? (
						<h5 className="text-center">Loading...</h5>
					) : (
						<>
							<img src="./images/girl-login-screen.svg" alt="Girl Login Icon" />
							<h2 className="fw-700 font-big lh-120 text-dark-green text-center">
								Login to view your favorites
							</h2>
							<button
								onClick={() => navigate("/login")}
								className="btn btn-primary btn-disabled-gray w-100 mt-4">
								Login
							</button>
						</>
					)}
				</div>
			)}
			<BottomNavbar />
		</>
	);
}
