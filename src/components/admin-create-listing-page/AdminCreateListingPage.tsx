import CheckBoxInput from "../common/check-box-input/CheckBoxInput";
import Input from "../common/input/Input";
import TopNavBar from "../common/top-nav-bar/TopNavBar";
import "./AdminCreateListingPage.scss";

export default function AdminCreateListingPage() {
	return (
		<div className="pt-4 mb-3">
			<TopNavBar title="Administrator" />

			{/* Main inputs */}
			<div className="p-3">
				<Input className="mb-2" label="Type:" placeholder="Chose type" />
				<Input className="mb-2" label="Category:" placeholder="Chose category" />
				<Input className="mb-2" label="Name:" placeholder="Write hotel name" />
				<Input className="mb-2" label="Address:" placeholder="Write hotel address" />
				<Input
					className="mb-2"
					label="Key one sentence description"
					placeholder="Write breathtaking punch line"
				/>
				<label className="mb-2">Luxury experience offer</label>
			</div>

			{/* Experiences list container */}
			<div className="experiences-container">
				<div>
					<div className="experience-image-placeholder rounded-3">
						<img src="/images/icons/image-icon.svg" />
					</div>
					<Input placeholder="Write experience here" />
				</div>
				<div>
					<div className="experience-image-placeholder rounded-3">
						<img src="/images/icons/image-icon.svg" />
					</div>
					<Input placeholder="Write experience here" />
				</div>
				<div>
					<div className="experience-image-placeholder rounded-3">
						<img src="/images/icons/image-icon.svg" />
					</div>
					<Input placeholder="Write experience here" />
				</div>
			</div>

			{/* Main inputs (2nd half) */}
			<div className="p-3">
				<label>Full text description</label>
				<textarea
					placeholder="Write description here"
					className="form-control input rounded-3 mb-2 h-100"
					rows={5}
				/>

				<label>Hotel policies</label>
				<div className="d-flex align-items-center check-in-time-container">
					<p className="fw-700 text-smaller m-0 me-2">Check-in from:</p>
					<Input placeholder="13:30PM" />
				</div>
				<div className="d-flex align-items-center check-in-time-container">
					<p className="fw-700 text-smaller m-0 me-2">Check-in from:</p>
					<Input placeholder="14:30PM" />
				</div>

				<div className="separator-line mt-4 mb-4" />

				<label>Payment options:</label>

				<CheckBoxInput title={"Cash"} />

				{/* TODO: This is still WIP. The rest of the page is under development. */}
			</div>
		</div>
	);
}
