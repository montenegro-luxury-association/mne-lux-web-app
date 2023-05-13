// TODO: Remove
/* eslint-disable @typescript-eslint/no-unused-vars */
import Input from "../../common/input/Input";
import TopNavBar from "../../common/top-nav-bar/TopNavBar";
import "./RegisterPage.scss";
import { useState } from "react";
import { USER_MODEL_PROPERTIES, User } from "../../../types/apiTypes";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
	const navigate = useNavigate();
	const [user, setUser] = useState<User>();
	const [confirmPassword, setConfirmPassword] = useState("");

	function handleChange(e: React.ChangeEvent<HTMLInputElement>, property: keyof User) {
		setUser({ ...user, [property]: e.target.value } as User);
	}

	function allFieldsFilledOut() {
		return USER_MODEL_PROPERTIES.every(field => !!user?.[field]);
	}

	function passwordsMatch() {
		return user?.password === confirmPassword;
	}

	async function onClickSignUp() {
		try {
			if (!passwordsMatch() || !allFieldsFilledOut()) {
				return;
			}

			console.log("onClickSignup");

			const response = await axios.post("/auth/register-user", user);
			// TODO: Save ID to auth context maybe?
			console.log({ response });
			navigate("/");
		} catch (err) {
			console.error(err);
			alert("Oops! Something went wrong.");
		}
	}

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
						onChange={e => handleChange(e, "fullName")}
					/>
					{/* TODO: Make date selector */}
					<Input
						label="Birthday"
						placeholder="mm/dd/yyyy"
						className="mb-3 mt-1"
						icon="/images/icons/calendar.svg"
						onChange={e => handleChange(e, "dateOfBirth")}
						type="date"
					/>
					{/* TODO: Make dropdown */}
					<Input
						label="Country"
						placeholder="Your country here"
						className="mb-3 mt-1"
						icon="/images/icons/globe.svg"
						onChange={e => handleChange(e, "country")}
					/>
					<Input
						label="E-mail"
						placeholder="E-mail here"
						className="mb-3 mt-1"
						icon="/images/icons/mail.svg"
						onChange={e => handleChange(e, "email")}
						type="email"
					/>
					<Input
						label="Phone number"
						placeholder="+382"
						className="mb-3 mt-1"
						icon="/images/icons/phone.svg"
						onChange={e => handleChange(e, "phoneNumber")}
					/>
					<Input
						icon="/images/icons/lock.svg"
						placeholder="Password here"
						className="mb-3 mt-1"
						label="Password"
						type="password"
						onChange={e => handleChange(e, "password")}
					/>
					<Input
						icon="/images/icons/lock.svg"
						placeholder="Password here"
						label="Confirm password"
						type="password"
						onChange={e => setConfirmPassword(e.target.value)}
					/>
				</div>

				<div>
					<button
						onClick={onClickSignUp}
						disabled={!allFieldsFilledOut() || !passwordsMatch()}
						className="btn btn-primary btn-disabled-gray w-100 mt-3">
						Sign Up
					</button>
				</div>
			</div>
		</div>
	);
}
