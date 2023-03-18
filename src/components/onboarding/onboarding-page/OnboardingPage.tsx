import { useNavigate } from "react-router-dom";
import Input from "../../common/input/Input";
import "./OnboardingPage.scss";

export default function OnboardingPage() {
	const navigate = useNavigate();

	return (
		<div className="container-onboarding-page vh-100 p-4 m-0">
			<img src="/images/logo.svg" alt="Company Logo" className="onboarding-page-logo" />
			<h1 className="text-light">Montenegro Luxury Association</h1>

			<div>
				<Input
					icon="/images/icons/mail.svg"
					placeholder="E-mail here"
					label="E-mail"
					className="input-dark-bg mb-2 mt-4 pt-2"
				/>
				<Input
					icon="/images/icons/lock.svg"
					placeholder="Password here"
					label="Password"
					type="password"
					className="input-dark-bg"
				/>

				<p
					onClick={() => navigate("/password-reset")}
					className="text-end mt-2 fw-bold text-light-green text-small">
					Forgot Password
				</p>
			</div>

			<div>
				<button className="btn btn-primary w-100 mt-3">Login</button>

				<p className="text-center text-smaller text-light-green mt-3 pb-1">
					Don&apos;t have an account?
					<span
						onClick={() => navigate("/sign-up")}
						className="text-primary fw-500 text-regular ps-2 text-decoration-none">
						Sign Up
					</span>
				</p>
			</div>

			<div className="mt-4 mb-4 position-relative">
				<span className="line" />
				<p className="text-light-green text-center onboarding-login-with-text text-small">
					Login with
				</p>
			</div>

			<div className="pt-2">
				<button className="btn btn-light onboarding-alternate-login-button">
					<img src="/images/icons/login-linkedin-icon.svg" alt="LinkedIn logo" />
					Continue With LinkedIn
				</button>
				<button className="btn btn-light mt-3 onboarding-alternate-login-button">
					<img src="/images/icons/login-google-icon.svg" alt="Google logo" />
					Continue With Google
				</button>

				<button
					onClick={() => navigate("/login/country")}
					className="btn btn-light mt-3 onboarding-alternate-login-button">
					<img src="/images/icons/phone.svg" alt="Phone icon" />
					Continue With Phone
				</button>
			</div>

			<div
				onClick={() => navigate("/")}
				className="mt-4 d-flex justify-content-center align-items-center text-decoration-none">
				<p className="text-light text-center fw-semibold mb-0">Skip for now</p>
				<img className="ms-2" src="./images/icons/arrow-right.svg" alt="Arrow" />
			</div>
		</div>
	);
}
