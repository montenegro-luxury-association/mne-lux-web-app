import { useEffect, useState } from "react";
import "./SelectDropdown.scss";

type Props = {
	options: { label: string; value: string | number }[];
	placeholder?: string;
	value?: string | number;
	onChange?: (value: string | number) => void;
	className?: string;
};
export default function SelectDropdown({
	options,
	placeholder = "Select",
	value,
	onChange,
	className
}: Props) {
	const [showDropdown, setShowDropdown] = useState(false);

	useEffect(() => {
		window.addEventListener("click", onClickAwayFromDropdown);
	}, []);

	function onClickAwayFromDropdown() {
		setShowDropdown(false);
	}

	function onClickDropdown(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		e.stopPropagation();
		setShowDropdown(prev => !prev);
	}

	return (
		<div className={`input-base custom-dropdown-container ${className}`}>
			{/* Input */}
			<div onClick={onClickDropdown} className="custom-dropdown-input">
				<div className={`dropdown-selected-value ${value ? "text-dark-green" : ""}`}>
					{value ? options.find(option => option.value === value)?.label : placeholder}
				</div>
				<img
					className={`custom-dropdown-icon ${showDropdown ? "rotate-180" : ""}`}
					src="/images/icons/arrow-down.svg"
				/>
			</div>

			{/* Dropdown */}
			{showDropdown && (
				<div className="custom-dropdown-menu">
					{options.map(option => (
						<div
							className="input-base custom-dropdown-menu-item"
							key={option.value}
							onClick={() => onChange && onChange(option.value)}>
							{option.label}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
