import React from "react";
import { useNavigate } from "react-router";
import Input from "../../common/input/Input";
import TopNavBar from "../../common/top-nav-bar/TopNavBar";

export default function PhoneLoginPage() {
	const navigate = useNavigate();

	return (
		<div className="vh-100 pt-4 m-0">
			<TopNavBar title={"Login with phone number"} />

			<div className="p-4">
				<img
					className="d-block m-auto"
					src="/images/guy-with-phone.svg"
					alt="Guy with a phone"
				/>

				<p className="text-secondary text-center mt-2 mb-3 lh-120">
					We will send you a code to continue <br /> your login sesion.
				</p>

				<Input placeholder="+382" label="Phone number" icon="/images/icons/phone.svg" />

				{/* TODO: Add a condition that user can't click on Login if the inputted number is invalid in any way */}

				<button
					onClick={() => navigate("/login/phone/code")}
					className="btn btn-primary btn-disabled-gray w-100 mt-4">
					Login
				</button>
			</div>
		</div>
	);
}
