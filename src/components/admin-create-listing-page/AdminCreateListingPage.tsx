import CheckBoxInput from "../common/check-box-input/CheckBoxInput";
import Input from "../common/input/Input";
import RadioButtonInput from "../common/radio-button-input/RadioButtonInput";
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

				<label className="mb-3">Payment options:</label>

				<CheckBoxInput className="mb-2" title={"Cash"} />
				<CheckBoxInput className="mb-2" title={"Debit Card"} />
				<CheckBoxInput className="mb-2" title={"Electronic Bank Transfer"} />

				<div className="separator-line mt-4 mb-4" />

				<label className="mb-3">Children:</label>

				<RadioButtonInput title="Children are welcome" name="children-welcome" />
				<RadioButtonInput title="Adults only" name="children-welcome" />

				<div className="separator-line mt-4 mb-4" />

				<RadioButtonInput title="No restriction" name="age-restriction" />
				<RadioButtonInput title="18 and above" name="age-restriction" />
				<RadioButtonInput title="21 and above" name="age-restriction" />
				<RadioButtonInput title="25 and above" name="age-restriction" />

				<label className="mt-3 mb-3">Media</label>

				<div className="add-media-container rounded-3">
					<img src="/images/icons/upload-media.svg" />
					<p className="text-middle-gray text-smaller mb-0 mt-2">
						Drag and drop file here
					</p>
					<p className="text-middle-gray text-smaller mb-2">or</p>
					<button className="add-media-btn btn btn-primary btn-disabled-gray rounded-pill h-auto px-3 text-black">
						Browse here
					</button>
				</div>

				<button className="btn btn-primary btn-disabled-gray w-100 mt-5">Submit</button>
			</div>
		</div>
	);
}
