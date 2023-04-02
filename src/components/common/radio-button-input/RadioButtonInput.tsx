import { InputHTMLAttributes } from "react";
import "./RadioButtonInput.scss";

type Props = {
	title: string;
	className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function RadioButtonInput({ title, className, ...props }: Props) {
	return (
		<label className={`radio-container ${className}`}>
			{title}
			<input {...props} type="radio" />
			<span className="radio"></span>
		</label>
	);
}
