import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./util/axiosConfig";

import HomePage from "./components/home-page/HomePage";
import Favorites from "./components/favorites-page/Favorites";
import OnboardingPage from "./components/onboarding/onboarding-page/OnboardingPage";
import RegisterPage from "./components/onboarding/register-page/RegisterPage";
import PhoneLoginEnterCodePage from "./components/onboarding/phone-login-enter-code-page/PhoneLoginEnterCodePage";
import PhoneLoginPage from "./components/onboarding/phone-login-page/PhoneLoginPage";
import ForgotPasswordPage from "./components/onboarding/forgot-password-page/ForgotPasswordPage";
import ResetPasswordLinkSentPage from "./components/onboarding/reset-password-link-sent-page/ResetPasswordLinkSentPage";
import CountrySelectionPage from "./components/onboarding/country-selection-page/CountrySelectionPage";
import AdminManagementPage from "./components/admin-management-page/AdminManagementPage";
import IndividualPage from "./components/individual-page/IndividualPage";
import AdminCreateListingPage from "./components/admin-create-listing-page/AdminCreateListingPage";
import ContactUsPage from "./components/contact-us-page/ContactUsPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* TODO: Put the HomePage and Favorites page in a group so that the BottomNavBar doesn't refresh while clicking between these two pages, hope I explained it well for more info call urke */}
				{/* TODO: Probably need to change the name for some routers */}
				<Route path="/" element={<HomePage />} />
				<Route path="/favorites" element={<Favorites />} />
				<Route path="/login" element={<OnboardingPage />} />
				<Route path="/login/country" element={<CountrySelectionPage />} />
				<Route path="/login/phone" element={<PhoneLoginPage />} />
				<Route path="/login/phone/code" element={<PhoneLoginEnterCodePage />} />
				<Route path="/password-reset" element={<ForgotPasswordPage />} />
				<Route path="/password-reset/link-sent" element={<ResetPasswordLinkSentPage />} />
				<Route path="/sign-up" element={<RegisterPage />} />
				<Route path="/contact-us" element={<ContactUsPage />} />
				<Route path="/admin" element={<AdminManagementPage />} />
				<Route path="/admin/create-listing" element={<AdminCreateListingPage />} />
				<Route path="/hotel-page" element={<IndividualPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
