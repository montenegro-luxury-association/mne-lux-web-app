import Input from "../common/input/Input";
import TopNavBar from "../common/top-nav-bar/TopNavBar";

export default function ContactUsPage() {
	function onClickSocialIcon() {
		alert("This functionality is still being developed. Stay tuned! :)");
	}

	return (
		<div className="container-onboarding-page vh-100 m-0">
			<TopNavBar title="Contact us" />
			<div className="p-4 pt-3">
				<img
					src="/images/logo.svg"
					alt="Company Logo"
					className="m-auto d-flex mb-3 pt-3"
				/>
				<h1 className="text-dark-green pt-1">Montenegro Luxury Association</h1>

				<p className="text-dark-green text-smaller mt-4 mb-4 text-justify">
					There are many variations of passages of Lorem Ipsum available, but the majority
					have suffered alteration in some form, by injected humour, or randomised words
					which don't look even slightly believable.
				</p>

				<Input
					label="Full name"
					placeholder="Name and surname"
					icon="/images/icons/user.svg"
					className="mb-2 pb-1"
				/>
				<Input
					label="E-mail"
					placeholder="E-mail here"
					icon="/images/icons/mail.svg"
					className="mb-3"
				/>
				<textarea
					className="form-control input rounded-3 h-100"
					placeholder="Message here..."
					rows={3}
				/>

				<button className="btn btn-primary btn-disabled-gray w-100 mt-3">Send</button>

				<div className="mt-3 d-flex align-items-center justify-content-between">
					<p className="fw-semibold text-dark-green">Find us on</p>

					<div>
						<img
							onClick={onClickSocialIcon}
							src="/images/icons/instagram.svg"
							alt="Instagram logo"
							className="me-2"
						/>
						<img
							onClick={onClickSocialIcon}
							src="/images/icons/twitter.svg"
							alt="Twitter logo"
							className="me-2"
						/>
						<img
							onClick={onClickSocialIcon}
							src="/images/icons/youtube.svg"
							alt="Youtube logo"
							className="me-2"
						/>
						<img
							onClick={onClickSocialIcon}
							src="/images/icons/linkedin.svg"
							alt="LinkedIn logo"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
