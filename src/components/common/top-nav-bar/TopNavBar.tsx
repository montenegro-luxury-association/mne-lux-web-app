import "./TopNavBar.scss";

type Props = {
	title: string;
};

export default function TopNavBar({ title }: Props) {
	return (
		<div className="top-nav-bar">
			<img src="/images/icons/arrow-left-dark.svg" alt="Left arrow" />

			<p className="m-0 text-dark-green fw-semibold">{title}</p>
		</div>
	);
}
