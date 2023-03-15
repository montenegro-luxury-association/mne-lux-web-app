import { useNavigate } from "react-router";
import Input from "../../common/input/Input";
import TopNavBar from "../../common/top-nav-bar/TopNavBar";
import "./RegisterPage.scss";

export default function RegisterPage() {
	const navigate = useNavigate();

	return (
		<div className="vh-100 pt-4 m-0">
			<TopNavBar title={"Finish Signing Up"} />

			<div className="p-4">
				{/* TODO: Maybe center content vertically if keyboard is not showing (ask Stefan first) */}
				<div className="mb-3 mt-1">
					<Input
						label="Full name"
						placeholder="Name and surname"
						className="mb-3 mt-1"
						icon="/images/icons/user.svg"
					/>
					{/* TODO: Make date selector */}
					<Input
						label="Birthday"
						placeholder="mm/dd/yyyy"
						className="mb-3 mt-1"
						icon="/images/icons/calendar.svg"
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
						label="Password"
						type="password"
					/>
					<Input
						icon="/images/icons/lock.svg"
						placeholder="Password here"
						label="Confirm password"
						type="password"
					/>
				</div>

				<div>
					{/* TODO: Add a condition that user can't click on Sign up if the inputted info is invalid in any way */}

					<button
						onClick={() => navigate("/")}
						className="btn btn-primary btn-disabled-gray w-100 mt-3">
						Sign Up
					</button>
				</div>
			</div>
		</div>
	);
}
