import "./ProfilePage.scss";
import Input from "../common/input/Input";
import TopNavBar from "../common/top-nav-bar/TopNavBar";
import { useState } from "react";

export default function ProfilePage() {
	const [showConfirmationPrompt, setShowConfirmationPrompt] = useState(false);

	function onClickUpdate() {
		setShowConfirmationPrompt(true);
	}

	// TODO: Also call this function when user clicks outside of prompt
	function onClickClosePrompt() {
		setShowConfirmationPrompt(false);
	}

	return (
		<div className="vh-100 m-0">
			<TopNavBar title={"My profile"} />

			<div className="p-4">
				<img
					src="https://media.licdn.com/dms/image/D4D03AQFfrjWR5yZIHw/profile-displayphoto-shrink_800_800/0/1674846333077?e=1683763200&v=beta&t=tpei_6UDrbsqMtKT-mxEdM3LuOii6buMEdOjrSmRrBA"
					alt="Profile avatar"
					className="rounded-circle mx-auto d-block mt-2 mb-4 profile-image"
				/>

				<div className="mb-3 mt-1">
					<Input
						label="Full name"
						placeholder="Name and surname"
						className="mb-3 mt-1"
						icon="/images/icons/user.svg"
					/>
					{/* TODO: Make dropdown */}
					<Input
						label="Country"
						placeholder="Your country here"
						className="mb-3 mt-1"
						icon="/images/icons/globe.svg"
					/>
					<Input
						label="E-mail"
						placeholder="E-mail here"
						className="mb-3 mt-1"
						icon="/images/icons/mail.svg"
					/>
					<Input
						label="Phone number"
						placeholder="+382"
						className="mb-3 mt-1"
						icon="/images/icons/phone.svg"
					/>
					<Input
						icon="/images/icons/lock.svg"
						placeholder="Password here"
						className="mb-3 mt-1"
						label="Change password"
						type="password"
					/>
				</div>

				<button
					onClick={onClickUpdate}
					className="btn btn-primary btn-disabled-gray w-100 mt-3">
					Save Changes
				</button>

				{/* TODO: Add bottom nav bar */}

				{/* TODO: Add fade-in-out animation */}
				{showConfirmationPrompt && (
					<div className="change-password-blur-background-container">
						<div className="change-password-prompt">
							<img
								className="password-prompt-close-icon"
								src="/images/icons/close-icon.svg"
								alt="Close icon"
								onClick={onClickClosePrompt}
							/>
							<div>
								<p className="text-dark-green text-center mt-3 fw-semibold">
									Are you sure that you want to change your password
								</p>
								<button className="btn btn-primary btn-disabled-gray w-100 mt-2">
									Reset
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
