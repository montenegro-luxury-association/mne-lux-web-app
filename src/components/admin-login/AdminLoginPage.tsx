import React, { useState } from "react";
import Input from "../common/input/Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContextProvider";

export default function AdminLoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const authContext = useAuthContext();
	const navigate = useNavigate();

	async function onClickLogin() {
		try {
			if (!email || !password) {
				return;
			}

			const response = await axios.post<{ adminId: string }>("/auth/login-admin", {
				email,
				password
			});
			authContext.loginAdmin({ id: response.data?.adminId });
			navigate("/admin");
		} catch (err) {
			alert("Oops! Something went wrong.");
		}
	}

	return (
		<div className="container-onboarding-page vh-100">
			{/* TODO: Replace with TopNavBar */}
			<h6 className="text-center text-light mt-4 pt-1 ">Superadmin Login</h6>

			<div className="p-4 mt-3 m-0">
				<img src="/images/logo.svg" alt="Company Logo" className="onboarding-page-logo" />
				<h1 className="text-light">Montenegro Luxury Association</h1>

				<div>
					<Input
						icon="/images/icons/mail.svg"
						placeholder="E-mail here"
						label="E-mail"
						className="input-dark-bg mb-2 mt-4 pt-2"
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<Input
						icon="/images/icons/lock.svg"
						placeholder="Password here"
						label="Password"
						type="password"
						className="input-dark-bg"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>

					<p
						onClick={() => navigate("/password-reset")}
						className="text-end mt-2 fw-bold text-light-green text-small">
						Forgot Password
					</p>
				</div>

				<div>
					<button
						disabled={!email || !password}
						className="btn btn-primary w-100 mt-3"
						onClick={onClickLogin}>
						Login
					</button>
				</div>
			</div>
		</div>
	);
}
