import "./PhoneLoginEnterCodePage.scss";
import VerificationInput from "react-verification-input";
import TopNavBar from "../../common/top-nav-bar/TopNavBar";
import { useNavigate } from "react-router";

export default function PhoneLoginEnterCodePage() {
	const navigate = useNavigate();

	return (
		<div className="vh-100 pt-4 m-0">
			<TopNavBar title={"Login code"} />

			<div className="p-4">
				<img
					className="d-block m-auto mb-1"
					src="/images/girl-with-password-screen.svg"
					alt="Reset password screen preview"
				/>

				<p className="text-secondary text-center mt-2 pb-3 lh-120">
					Enter Your verification code we just
					<br /> send you on mail adress.
				</p>

				<div className="d-flex justify-content-center mt-4 mb-3">
					<VerificationInput
						classNames={{
							container: "mh-auto",
							character: "code-input-char",
							characterSelected: "code-input-char-selected"
						}}
						length={4}
						inputProps={{ type: "number" }}
						placeholder={""}
					/>
				</div>

				<button
					onClick={() => navigate("/")}
					className="btn btn-primary btn-disabled-gray w-100 mt-4">
					Verify
				</button>
			</div>
		</div>
	);
}
