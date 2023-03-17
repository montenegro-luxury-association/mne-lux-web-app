/* eslint-disable indent */
import { SetStateAction, useEffect, useRef, useState } from "react";
import "./BottomNavbar.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function BottomNavbar() {
	const navigate = useNavigate();
	const location = useLocation();
	const [activeButtonId, setActiveButtonId] = useState<"explore" | "favorites">(
		location.pathname === "/" ? "explore" : "favorites"
	);
	const [openMenu, setOpenMenu] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	// TODO: Nesto mi ne radi ova funkcija moram to bacit pogled posle
	const handleClickOutside = (e: MouseEvent) => {
		console.log({
			ref: dropdownRef.current,
			menu: openMenu,
			contain: !dropdownRef.current?.contains(e.target as Node)
		});
		if (dropdownRef.current && openMenu && !dropdownRef.current.contains(e.target as Node)) {
			setOpenMenu(false);
		}
	};
	useEffect(() => {
		document.addEventListener("click", e => handleClickOutside(e));
		return () => {
			document.removeEventListener("click", e => handleClickOutside(e));
		};
	}, [dropdownRef]);

	const user = false;

	const handleOptionClick = () => {
		setOpenMenu(false);
	};

	const handleButtonClick = (buttonId: SetStateAction<"explore" | "favorites">) => {
		setActiveButtonId(buttonId);
		if (buttonId === "explore") {
			navigate("/");
		} else {
			navigate("/favorites");
		}
	};

	return (
		<div className="bottom-navbar-container container-fluid d-flex justify-content-center">
			<div
				onClick={() => handleButtonClick("explore")}
				className="d-flex flex-column align-items-center p-2 nav-buttons">
				{/* TODO: da se extractuju svg. u novi fajl i importuju ovdje da bi bilo cistije */}
				<svg
					className="bottom-navbar-icons p-1"
					viewBox="0 0 25 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						style={{ transition: "stroke 0.5s" }}
						d="M11.5 19C15.9183 19 19.5 15.4183 19.5 11C19.5 6.58172 15.9183 3 11.5 3C7.08172 3 3.5 6.58172 3.5 11C3.5 15.4183 7.08172 19 11.5 19Z"
						stroke={` ${activeButtonId === "explore" ? "#FFCEA2" : "#ECEFEF"}`}
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						style={{ transition: "stroke 0.5s" }}
						d="M21.5004 20.9999L17.1504 16.6499"
						stroke={` ${activeButtonId === "explore" ? "#FFCEA2" : "#ECEFEF"}`}
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
				<span
					style={{
						color: `${activeButtonId === "explore" ? "#FFCEA2" : "#ECEFEF"}`,
						transition: "color 0.5s"
					}}>
					Explore
				</span>
			</div>
			<div
				onClick={() => handleButtonClick("favorites")}
				className="d-flex flex-column align-items-center p-2 nav-buttons">
				<svg
					className="bottom-navbar-icons p-1"
					viewBox="0 0 25 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						style={{ transition: "stroke 0.5s" }}
						d="M20.9201 4.57996C20.4184 4.07653 19.8223 3.67709 19.1659 3.40455C18.5095 3.132 17.8058 2.9917 17.0951 2.9917C16.3844 2.9917 15.6806 3.132 15.0243 3.40455C14.3679 3.67709 13.7718 4.07653 13.2701 4.57996L12.5001 5.35996L11.7301 4.57996C11.2284 4.07653 10.6323 3.67709 9.97591 3.40455C9.31953 3.132 8.6158 2.9917 7.90509 2.9917C7.19437 2.9917 6.49065 3.132 5.83427 3.40455C5.17789 3.67709 4.58176 4.07653 4.08009 4.57996C1.96009 6.69996 1.83009 10.28 4.50009 13L12.5001 21L20.5001 13C23.1701 10.28 23.0401 6.69996 20.9201 4.57996Z"
						stroke={` ${activeButtonId === "favorites" ? "#FFCEA2" : "#ECEFEF"}`}
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
				<span
					style={{
						color: `${activeButtonId === "favorites" ? "#FFCEA2" : "#ECEFEF"}`,
						transition: "color 0.5s"
					}}>
					Favorites
				</span>
			</div>
			<div ref={dropdownRef}>
				<div className="nav-bar-background"></div>
				<div
					onClick={() => setOpenMenu(!openMenu)}
					className={`nav-buttons d-flex flex-column align-items-center p-2 nav-dropdown-select ${
						openMenu && "nav-dropdown-select-clicked"
					}`}>
					<svg
						className={`bottom-navbar-icons p-1 ${
							openMenu && "nav-dropdown-menu-clicked"
						}`}
						viewBox="0 0 25 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							style={{ transition: "stroke 0.5s" }}
							d="M4.5 12H20.5"
							stroke={` ${openMenu ? "#FFCEA2" : "#ECEFEF"}`}
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							style={{ transition: "stroke 0.5s" }}
							d="M4.5 6H20.5"
							stroke={` ${openMenu ? "#FFCEA2" : "#ECEFEF"}`}
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							style={{ transition: "stroke 0.5s" }}
							d="M4.5 18H20.5"
							stroke={` ${openMenu ? "#FFCEA2" : "#ECEFEF"}`}
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					Menu
				</div>
				<div
					className={`nav-dropdown-menu d-flex flex-column gap-3 text-nowrap ${
						openMenu && "nav-dropdown-menu-open"
					}`}>
					<Link
						to={"/contact-us"}
						onClick={handleOptionClick}
						className="nav-link-text d-flex align-items-center gap-2">
						<img src="./images/mail.svg" alt="Mail Icon" /> Contact Us
					</Link>
					<Link
						to={user ? "/profile" : "/login"}
						onClick={handleOptionClick}
						className="nav-link-text d-flex align-items-center gap-2">
						<img src="./images/user.svg" alt="Profile Icon" />
						{user ? "My Profile" : "Login"}
					</Link>
				</div>
			</div>
		</div>
	);
}
