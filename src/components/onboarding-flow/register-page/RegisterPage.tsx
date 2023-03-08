import Input from "../../common/input/Input";
import TopNavBar from "../../common/top-nav-bar/TopNavBar";
import "./RegisterPage.scss";

export default function RegisterPage() {
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
						icon="/user.svg"
					/>
					{/* TODO: Make date selector */}
					<Input
						label="Birthday"
						placeholder="mm/dd/yyyy"
						className="mb-3 mt-1"
						icon="/calendar.svg"
					/>
					{/* TODO: Make dropdown */}
					<Input
						label="Country"
						placeholder="Your country here"
						className="mb-3 mt-1"
						icon="/globe.svg"
					/>
					<Input
						label="E-mail"
						placeholder="E-mail here"
						className="mb-3 mt-1"
						icon="/mail.svg"
					/>
					<Input
						label="Phone number"
						placeholder="+382"
						className="mb-3 mt-1"
						icon="/phone.svg"
					/>
					<Input
						icon="/lock.svg"
						placeholder="Password here"
						className="mb-3 mt-1"
						label="Password"
						type="password"
					/>
					<Input
						icon="/lock.svg"
						placeholder="Password here"
						label="Confirm password"
						type="password"
					/>
				</div>

				<div>
					<button className="btn btn-primary btn-disabled-gray w-100 mt-3">
						Sign Up
					</button>
				</div>
			</div>
		</div>
	);
}
