import "./Input.scss";

import { InputHTMLAttributes, useState } from "react";

type Props = {
	/**
	 * This is the className passed to the container div of the input. If you want to apply styles to the actual input, use inputClassName
	 */
	className?: string;
	/**
	 * This is the className passed to the input itself.
	 */
	inputClassName?: string;
	icon?: string;
	iconPosition?: "left" | "right";
	/**
	 * Text label that appears above the input
	 */
	label?: string;
	rounded?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({
	icon,
	iconPosition = "left",
	className,
	inputClassName,
	label,
	rounded,
	...props
}: Props) {
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

	function getInputClassName() {
		let className = "form-control input";

		if (inputClassName) {
			className += ` ${inputClassName}`;
		}

		if (icon) {
			className += ` with-icon-${iconPosition}`;
		}

		if (props.type === "password") {
			className += " with-icon-right";
		}

		if (rounded) {
			className += " rounded-pill";
		}

		return className;
	}

	const iconClassName = `input-icon ${isFocused ? "focused" : ""} ${iconPosition} ${
		rounded ? "rounded" : ""
	}`;
	const seePasswordButtonClassName = `input-icon show-password-button ${
		isFocused ? "focused" : ""
	} ${passwordVisible ? "password-visible" : ""} ${rounded ? "rounded" : ""}`;

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
					className={getInputClassName()}
					type={props.type === "password" && passwordVisible ? "text" : props.type}
				/>

				{props.type === "password" && (
					<span onClick={togglePasswordVisible} className={seePasswordButtonClassName} />
				)}
			</div>
		</div>
	);
}
