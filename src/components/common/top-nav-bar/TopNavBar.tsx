import "./TopNavBar.scss";
import { useNavigate } from "react-router-dom";

type Props = {
	title: string;
	borderBottom?: boolean;
};

export default function TopNavBar({ title, borderBottom = true }: Props) {
	const navigate = useNavigate();

	return (
		<div
			className="top-nav-bar"
			style={{ borderBottom: `${borderBottom ? "#e6e6e6 1px solid" : "none"}` }}>
			<img
				onClick={() => navigate(-1)}
				src="/images/icons/arrow-left-dark.svg"
				alt="Left arrow"
			/>

			<p className="m-0 text-dark-green fw-semibold">{title}</p>
		</div>
	);
}
