import "./Input.scss";

import { InputHTMLAttributes, useState } from "react";

type Props = {
	/**
	 * This is the className passed to the container div of the input. If you want to apply styles to the actual input, feel free to implement that logic
	 */
	className?: string;
	icon?: string;
	label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({ icon, className, label, ...props }: Props) {
	const [isFocused, setIsFocused] = useState(false);
	const [passwordVisible, setPasswordVisible] = useState(false);

	function onFocus(e: React.FocusEvent<HTMLInputElement, Element>) {
		setIsFocused(true);
		if (props.onFocus) {
			props.onFocus(e);
		}
	}

	function onBlur(e: React.FocusEvent<HTMLInputElement, Element>) {
		setIsFocused(false);
		if (props.onBlur) {
			props.onBlur(e);
		}
	}

	function togglePasswordVisible() {
		setPasswordVisible(prev => !prev);
	}

	const iconClassName = `input-icon ${isFocused ? "focused" : ""}`;
	const inputClassName = `form-control input ${icon ? "with-icon" : ""}`;
	const seePasswordButtonClassName = `input-icon show-password-button ${
		isFocused ? "focused" : ""
	} ${passwordVisible ? "password-visible" : ""}`;

	// we need to use this fancy mask property to be able to change SVG colors properly (alternative is exporting them into JSX, which is messy)
	const iconMaskSource = `url(${icon})`;
	const iconStyle = {
		maskImage: iconMaskSource,
		WebkitMaskImage: iconMaskSource
	};

	return (
		<div className={`input-container ${className || ""}`}>
			{label && <label htmlFor="input-id">{label}</label>}

			<div className="position-relative">
				{icon && <span className={iconClassName} style={iconStyle} />}

				<input
					{...props}
					onFocus={onFocus}
					onBlur={onBlur}
					className={inputClassName}
					type={props.type === "password" && passwordVisible ? "text" : props.type}
				/>

				{props.type === "password" && (
					<span onClick={togglePasswordVisible} className={seePasswordButtonClassName} />
				)}
			</div>
		</div>
	);
}
