import "./ProfilePage.scss";
import Input from "../common/input/Input";
import TopNavBar from "../common/top-nav-bar/TopNavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../../types/apiTypes";
import BottomNavbar from "../bottom-navbar/BottomNavbar";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
	const [showConfirmationPrompt, setShowConfirmationPrompt] = useState(false);
	const [showChangesSavedModal, setShowChangesSavedModal] = useState(false);
	const [user, setUser] = useState<User>();
	const navigate = useNavigate();

	useEffect(() => {
		fetchUser();
	}, []);

	async function onClickUpdate() {
		user?.password === "" && delete user.password;
		if (user?.password !== undefined) {
			setShowConfirmationPrompt(true);
		} else {
			setShowChangesSavedModal(true);
			await axios.post("/auth/update-user", user);
		}
	}

	async function onClickChangePassword() {
		setShowConfirmationPrompt(false);
		setShowChangesSavedModal(true);
		await axios.post("/auth/update-user", user);
	}

	// TODO: Also call this function when user clicks outside of prompt
	function onClickClosePrompt() {
		setShowConfirmationPrompt(false);
		setShowChangesSavedModal(false);
	}

	async function fetchUser() {
		const response = await axios.get("/auth/my-profile");
		setUser(response.data.user);
	}

	function onGenericPropertyChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		property: keyof User
	) {
		setUser({
			...user,
			[property]: e.target.type === "number" ? parseFloat(e.target.value) : e.target.value
		} as User);
	}

	function onClickBackToExplore() {
		navigate("/");
	}

	return (
		<>
			<div className="vh-100 m-0">
				<TopNavBar title={"My profile"} />

				<div className="p-4">
					<img
						src="https://media.licdn.com/dms/image/D4D03AQFfrjWR5yZIHw/profile-displayphoto-shrink_800_800/0/1674846333077?e=1683763200&v=beta&t=tpei_6UDrbsqMtKT-mxEdM3LuOii6buMEdOjrSmRrBA"
						alt="Profile avatar"
						className="rounded-circle mx-auto d-block  mb-3 profile-image"
					/>

					<div className="mb-3 mt-1">
						<Input
							label="Full name"
							placeholder="Full Name"
							className="mb-3 mt-1"
							icon="/images/icons/user.svg"
							value={user?.fullName}
							onChange={e => onGenericPropertyChange(e, "fullName")}
						/>
						{/* TODO: Make dropdown */}
						<Input
							label="Country"
							placeholder="Your country here"
							className="mb-3 mt-1"
							icon="/images/icons/globe.svg"
							value={user?.country}
							onChange={e => onGenericPropertyChange(e, "country")}
						/>
						<Input
							label="E-mail"
							placeholder="E-mail here"
							className="mb-3 mt-1"
							icon="/images/icons/mail.svg"
							value={user?.email}
							onChange={e => onGenericPropertyChange(e, "email")}
						/>
						<Input
							label="Phone number"
							placeholder="+382"
							className="mb-3 mt-1"
							icon="/images/icons/phone.svg"
							value={user?.phoneNumber}
							onChange={e => onGenericPropertyChange(e, "phoneNumber")}
						/>
						<Input
							icon="/images/icons/lock.svg"
							placeholder="New Password Here"
							className="mb-3 mt-1"
							label="Change password"
							type="password"
							onChange={e => onGenericPropertyChange(e, "password")}
						/>
					</div>

					<button
						onClick={onClickUpdate}
						className="btn btn-primary btn-disabled-gray w-100 mt-3">
						Save Changes
					</button>

					{/* TODO: Add fade-in-out animation */}
					{showConfirmationPrompt && (
						<>
							<div
								onClick={onClickClosePrompt}
								className="change-password-blur-background-container"></div>
							<div className="change-password-prompt">
								<img
									className="password-prompt-close-icon"
									src="/images/icons/close-icon.svg"
									alt="Close icon"
									onClick={onClickClosePrompt}
								/>
								<div>
									<p className="text-dark-green text-center mt-3 fw-semibold">
										Are you sure that you want to change your password?
									</p>
									<button
										onClick={onClickChangePassword}
										className="btn btn-primary btn-disabled-gray w-100 mt-2">
										Yes
									</button>
								</div>
							</div>
						</>
					)}
					{showChangesSavedModal && (
						<>
							<div
								onClick={onClickClosePrompt}
								className="change-password-blur-background-container"></div>
							<div className="change-password-prompt">
								<img
									className="password-prompt-close-icon"
									src="/images/icons/close-icon.svg"
									alt="Close icon"
									onClick={onClickClosePrompt}
								/>
								<div>
									<p className="text-dark-green text-center mt-3 fw-semibold">
										Changes have been saved!
									</p>
									<button
										onClick={onClickBackToExplore}
										className="btn btn-primary btn-disabled-gray w-100 mt-2">
										Back to explore
									</button>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
			<BottomNavbar />
		</>
	);
}
