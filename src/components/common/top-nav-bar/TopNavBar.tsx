import "./TopNavBar.scss";
import { useNavigate } from "react-router-dom";

type Props = {
	title: string;
};

export default function TopNavBar({ title }: Props) {
	const navigate = useNavigate();

	return (
		<div className="top-nav-bar">
			<img
				onClick={() => navigate(-1)}
				src="/images/icons/arrow-left-dark.svg"
				alt="Left arrow"
			/>

			<p className="m-0 text-dark-green fw-semibold">{title}</p>
		</div>
	);
}
