import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavbar from "../bottom-navbar/BottomNavbar";
import TopNavBar from "../common/top-nav-bar/TopNavBar";
import "./Favorites.scss";

export default function Favorites() {
	const navigate = useNavigate();

	const user = true;

	const [dummyData, setDummyData] = useState([
		{
			id: 0,
			title: "Ime hotela 1",
			location: "Lokacija 1",
			locationDesc: "Opis 1",
			image: "./images/dummy/test-img-0.jpg",
			favored: true
		},
		{
			id: 1,
			title: "Ime hotela 2",
			location: "Lokacija 2",
			locationDesc: "Opis 2",
			image: "./images/dummy/test-img-1.jpg",
			favored: true
		},
		{
			id: 2,
			title: "Ime hotela 3",
			location: "Lokacija 3",
			locationDesc: "Opis 3",
			image: "./images/dummy/test-img-2.jpg",
			favored: true
		},
		{
			id: 3,
			title: "Ime hotela 4",
			location: "Lokacija 4",
			locationDesc: "Opis 4",
			image: "./images/dummy/test-img-3.jpg",
			favored: true
		},
		{
			id: 4,
			title: "Ime hotela 5",
			location: "Lokacija 5",
			locationDesc: "Opis 5",
			image: "./images/dummy/test-img-4.jpg",
			favored: true
		}
	]);

	return (
		<>
			<TopNavBar title={"Favorites"} />
			{user ? (
				<>
					{dummyData.length ? (
						<div className="home-page-container pt-0">
							<div className="home-page-cards-container d-flex flex-column">
								{dummyData.map(hotel => (
									<div
										key={hotel.id}
										style={{
											background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 58.74%, rgba(0, 0, 0, 0.5) 70.78%),
                        url(${hotel.image}), #d9d9d9`
										}}
										className="home-page-card-container container-fluid d-flex flex-column justify-content-between">
										<div className="d-flex justify-content-end">
											{hotel.favored ? (
												<img
													onClick={() => {
														setDummyData(
															dummyData.filter(
																hostel => hostel.id !== hotel.id
															)
														);
													}}
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
											<span className="home-page-hotel-title">
												{hotel.title}
											</span>
											<span>{hotel.location}</span>
											<span>{hotel.locationDesc}</span>
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
					<BottomNavbar />
				</>
			) : (
				<div className="container-fluid d-flex flex-column px-4 align-content-center">
					<img src="./images/girl-login-screen.svg" alt="Girl Login Icon" />
					<h2 className="fw-700 font-big lh-120 text-dark-green text-center">
						Login to view your favorites
					</h2>
					<button
						onClick={() => navigate("/login")}
						className="btn btn-primary btn-disabled-gray w-100 mt-4">
						Login
					</button>
				</div>
			)}
		</>
	);
}
