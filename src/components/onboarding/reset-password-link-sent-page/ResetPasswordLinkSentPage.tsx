import { useNavigate } from "react-router";
import CustomColorSVG from "../../common/custom-color-svg/CustomColorSVG";
import "./ResetPasswordLinkSentPage.scss";

export default function ResetPasswordLinkSentPage() {
	const navigate = useNavigate();

	return (
		<div className="vh-100 p-4 m-0 d-flex flex-column">
			<div className="flex-fill d-flex flex-column justify-content-center align-items-center">
				<img
					className="d-block"
					src="/images/girl-with-password-screen.svg"
					alt="Reset password screen preview"
				/>
				<h4 className="text-center text-dark-green fw-semibold mt-2 mb-4 lh-120">
					A link to reset your password has been send to your e-mail address
				</h4>
			</div>

			<div onClick={() => navigate("/")} className="d-flex justify-content-center">
				<CustomColorSVG src="/images/icons/arrow-left-dark.svg" className="back-arrow" />
				<p className="text-secondary m-0 fw-semibold text-small">Back to explore page</p>
			</div>
		</div>
	);
}
