import { InputHTMLAttributes } from "react";
import "./CheckBoxInput.scss";

type Props = {
	title: string;
	className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function CheckBoxInput({ title, className, ...props }: Props) {
	return (
		<label className={`checkbox-container ${className}`}>
			{title}
			<input type="checkbox" {...props} />
			<div className="checkmark-box">
				<img src="/images/icons/checkmark.svg" className="checkmark" />
			</div>
		</label>
	);
}
