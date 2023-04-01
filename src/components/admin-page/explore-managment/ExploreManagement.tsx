import { useState } from "react";
import Input from "../../common/input/Input";
import TopNavBar from "../../common/top-nav-bar/TopNavBar";
import "./ExploreManagement.scss";

export default function ExploreManagement() {
	const [dummyData, setDummyData] = useState([
		{
			hotelPic: "/images/dummy/Frame-3.svg",
			dateAdded: "21/02/2023",
			status: true,
			id: 1,
			isOpen: false
		},
		{
			hotelPic: "/images/dummy/Frame-2.svg",
			dateAdded: "05/01/2023",
			status: false,
			id: 2,
			isOpen: false
		},
		{
			hotelPic: "/images/dummy/Frame-1.svg",
			dateAdded: "29/12/2022",
			status: true,
			id: 3,
			isOpen: false
		},
		{
			hotelPic: "/images/dummy/Frame-1.svg",
			dateAdded: "30/10/2022",
			status: false,
			id: 4,
			isOpen: false
		},
		{
			hotelPic: "/images/dummy/Frame-2.svg",
			dateAdded: "05/01/2023",
			status: false,
			id: 5,
			isOpen: false
		},
		{
			hotelPic: "/images/dummy/Frame-1.svg",
			dateAdded: "29/12/2022",
			status: true,
			id: 6,
			isOpen: false
		},
		{
			hotelPic: "/images/dummy/Frame-1.svg",
			dateAdded: "30/10/2022",
			status: false,
			id: 7,
			isOpen: false
		},
		{
			hotelPic: "/images/dummy/Frame-2.svg",
			dateAdded: "05/01/2023",
			status: false,
			id: 8,
			isOpen: false
		},
		{
			hotelPic: "/images/dummy/Frame-1.svg",
			dateAdded: "29/12/2022",
			status: true,
			id: 9,
			isOpen: false
		},
		{
			hotelPic: "/images/dummy/Frame-1.svg",
			dateAdded: "30/10/2022",
			status: false,
			id: 10,
			isOpen: false
		}
	]);

	const handleOpenMenu = (index: number) => {
		const newData = dummyData.map((item, i) => {
			if (i === index) {
				return { ...item, isOpen: !item.isOpen };
			} else {
				return { ...item, isOpen: false };
			}
		});
		setDummyData(newData);
	};

	return (
		<div className="pt-4 admin-explore-page-container vh-100">
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
			<div className="px-4 main-content-container pt-1">
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
						{dummyData.map((hotel, index) => (
							<div
								key={hotel.id}
								className="d-flex justify-content-between my-1 align-items-center">
								<img src={hotel.hotelPic} alt="Hotel Picture" />
								<div className="fw-500 text-small">{hotel.dateAdded}</div>
								<div className="admin-explore-hotels-status d-flex justify-content-end">
									{hotel.status ? (
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
											onClick={() => handleOpenMenu(index)}
											src="/images/icons/more-vertical.svg"
											alt="More Options Icon"
										/>

										<div
											className={`admin-explore-dropdown-menu ${
												hotel.isOpen && "admin-explore-dropdown-menu-open"
											}`}>
											<div className="d-flex flex-column gap-3 text-nowrap fw-700 text-smaller lh-120">
												<div className="d-flex align-items-center gap-2">
													<img
														src="/images/icons/edit.svg"
														alt="Edit Icon"
													/>
													Edit
												</div>
												<div className="d-flex align-items-center gap-2">
													<img
														src="/images/icons/view-globe-icon.svg"
														alt="View Icon"
													/>
													View
												</div>
												<div className="d-flex align-items-center gap-2">
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
				<button className="btn btn-primary btn-disabled-gray w-100 mt-4 ">Add new</button>
			</div>
		</div>
	);
}
