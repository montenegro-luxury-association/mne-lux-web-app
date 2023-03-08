import "./TopNavBar.scss";

type Props = {
	title: string;
};

export default function TopNavBar({ title }: Props) {
	return (
		<div className="top-nav-bar">
			<img src="/arrow-left-dark.svg" />

			<p className="m-0 text-dark-green fw-semibold">{title}</p>
		</div>
	);
}
