import "./CheckBoxInput.scss";

type Props = {
	title: string;
};

// WIP
export default function CheckBoxInput({ title }: Props) {
	return (
		<div className="d-flex align-items-center">
			<input type="checkbox" className="checkbox" />
			<p className="mb-0 ms-2">{title}</p>
		</div>
	);
}
