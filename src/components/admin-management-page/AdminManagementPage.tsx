import { useEffect, useState } from "react";
import Input from "../common/input/Input";
import TopNavBar from "../common/top-nav-bar/TopNavBar";
import "./AdminManagementPage.scss";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { Listing } from "../../types/apiTypes";
import { useAuthContext } from "../../context/AuthContextProvider";

export default function AdminManagementPage() {
	const [listings, setListings] = useState<Listing[]>();
	const [tooltipOpenForHotelId, setTooltipOpenForHotelId] = useState<string>();
	const [tooltipOpen, setTooltipOpen] = useState(false);
	const { admin, isLoading } = useAuthContext();
	const navigate = useNavigate();

	async function fetchData() {
		const response = await axios.get("/listings/");
		setListings(response.data.listings);
	}
	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		window.addEventListener("click", onClickAwayFromDropdown);
	}, []);

	function onClickAwayFromDropdown() {
		setTooltipOpen(false);
	}
	function onOptionClick() {
		setTooltipOpen(false);
	}

	function onClickDropdown(e: React.MouseEvent<HTMLDivElement, MouseEvent>, hotelId: string) {
		setTooltipOpenForHotelId(hotelId);
		e.stopPropagation();
		setTooltipOpen(prev => !prev);
	}

	function onClickAddNew() {
		navigate("/admin/create-listing");
	}

	if (!admin && !isLoading) {
		return <Navigate to="/" />;
	}

	return (
		<div className="admin-explore-page-container vh-100">
			<TopNavBar title={"Explore management"} borderBottom={false} />
			<div className="admin-explore-header-container d-flex fw-700 lh-120 text-smaller w-100 justify-content-between align-content-center px-4 pt-2 mb-2 pb-1">
				<div className="d-flex flex-column align-items-center admin-explore-header-active text-dark-green">
					<img src="/images/icons/hotels-icon.svg" alt="Hotel Icon" /> Hotels
				</div>
				<div className="d-flex flex-column align-items-center">
					<img src="/images/icons/restaurants-icon.svg" alt="Restaurant Icon" />
					Restaurants
				</div>
				<div className="d-flex flex-column align-items-center">
					<img src="/images/icons/villas-icon.svg" alt="Villa Icon" /> Villas
				</div>
				<div className="d-flex flex-column align-items-center">
					<img src="/images/icons/resorts-icon.svg" alt="Resort Icon" /> Resorts
				</div>
				<div className="d-flex flex-column align-items-center">
					<img src="/images/icons/yacht-icon.svg" alt="Yacht Icon" /> Yachts
				</div>
			</div>
			<div className="px-4 pt-1">
				<div className="d-flex gap-3 mb-4 mt-3">
					<Input
						placeholder="Country"
						icon="/images/icons/dropdown-icon.svg"
						className="admin-explore-filters"
						iconPosition="right"
					/>
					<Input
						placeholder="Search..."
						icon="/images/icons/search-icon-grey.svg"
						className="admin-explore-filters"
						iconPosition="right"
					/>
				</div>
				<div className="admin-explore-hotels-container">
					<div className="admin-explore-header d-flex justify-content-between fw-700 text-small lh-120 pt-3 px-4 pb-1">
						<div>Name</div>
						<div>Date</div>
						<div className="admin-explore-header-status">Status</div>
					</div>
					<div className="admin-explore-options-container d-flex flex-column px-2 py-1">
						{listings?.map(hotel => (
							<div
								key={hotel._id}
								className="d-flex justify-content-between my-1 align-items-center ">
								<img
									src={hotel.mediaURIs[0]}
									alt="Hotel"
									className="admin-management-listing-image"
								/>
								<div className="fw-500 text-small">{hotel.name}</div>
								<div className="admin-explore-hotels-status d-flex justify-content-end">
									{/* TODO: Add real status data */}
									{Math.random() > 0.5 ? (
										<img
											className="me-3"
											src="/images/icons/active-icon.svg"
											alt="Active Status Icon"
										/>
									) : (
										<img
											src="/images/icons/non-active-icon.svg"
											alt="Inactive Status Icon"
										/>
									)}
									<div className="position-relative">
										<img
											onClick={e => onClickDropdown(e, hotel._id)}
											src="/images/icons/more-vertical.svg"
											alt="More Options Icon"
										/>

										<div
											className={`admin-explore-dropdown-menu ${
												hotel._id === tooltipOpenForHotelId &&
												tooltipOpen &&
												"admin-explore-dropdown-menu-open"
											}`}>
											<div className="d-flex flex-column gap-3 text-nowrap fw-700 text-smaller lh-120">
												<div
													onClick={onOptionClick}
													className="d-flex align-items-center gap-2">
													<img
														src="/images/icons/edit.svg"
														alt="Edit Icon"
													/>
													Edit
												</div>
												<div
													onClick={onOptionClick}
													className="d-flex align-items-center gap-2">
													<img
														src="/images/icons/view-globe-icon.svg"
														alt="View Icon"
													/>
													View
												</div>
												<div
													onClick={onOptionClick}
													className="d-flex align-items-center gap-2">
													<img
														src="/images/icons/bar-chart.svg"
														alt="Analytics Icon"
													/>
													Analytics
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
				<button
					onClick={onClickAddNew}
					className="btn btn-primary btn-disabled-gray w-100 mt-4 mb-4">
					Add new
				</button>
			</div>
		</div>
	);
}
