import Input from "../../common/input/Input";
import TopNavBar from "../../common/top-nav-bar/TopNavBar";

export default function ForgotPasswordPage() {
	return (
		<div className="vh-100 pt-4 m-0">
			<TopNavBar title={"Forgot Password"} />

			<div className="p-4">
				<img
					className="d-block m-auto"
					src="/images/guy-with-phone.svg"
					alt="Guy with a phone"
				/>

				<p className="text-secondary text-center mt-2 mb-3 lh-120">
					We will send you a code to reset <br />
					your password.
				</p>

				<Input placeholder="Email here" label="E-mail" icon="/images/icons/mail.svg" />

				<button className="btn btn-primary btn-disabled-gray w-100 mt-4">Send</button>
			</div>
		</div>
	);
}
