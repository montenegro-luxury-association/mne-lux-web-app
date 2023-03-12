import { COUNTRY_CODES } from "../../../util/countryCodesList";
import Input from "../../common/input/Input";
import TopNavBar from "../../common/top-nav-bar/TopNavBar";
import "./CountrySelectionPage.scss";

export default function CountrySelectionPage() {
	return (
		<div className="vh-100 pt-4 m-0 d-flex flex-column">
			<TopNavBar title={"Select Country"} />

			<Input
				placeholder="Search country here"
				className="m-3 mt-3 mb-4"
				icon="/images/icons/search.svg"
				iconPosition="right"
				rounded={true}
			/>

			<div className="countries-list-container">
				{/* TODO: There may be a few extra countries in here */}
				{COUNTRY_CODES.map(country => (
					<div key={country.code} className="country-selection-item">
						<img
							src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
							alt={`${country.name} flag`}
							width="35"
						/>
						<div className="m-0 ms-2 text-small text-nowrap d-flex overflow-hidden country-name-and-code">
							<span className="text-secondary-dark-green fw-semibold">
								{country.name}
							</span>{" "}
							<span className="text-secondary">({country.code})</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
