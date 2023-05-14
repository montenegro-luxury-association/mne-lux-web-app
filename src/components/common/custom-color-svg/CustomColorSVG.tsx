import "./CustomColorSVG.scss";

type Props = {
	src: string;
	className?: string;
	onClick?: () => void;
};

/**
 * Allows you to use SVGs with custom colors thanks to CSS masks.
 * - Make sure to specify the correct width and height - the defaults are hard-coded and not based on the 'src' image
 *
 */
export default function CustomColorSVG({ src, className, onClick }: Props) {
	const maskSource = `url(${src})`;
	const style = {
		maskImage: maskSource,
		WebkitMaskImage: maskSource
	};

	return (
		<span
			onClick={onClick}
			className={`custom-color-svg ${className || ""}`}
			style={{ ...style }}
		/>
	);
}
