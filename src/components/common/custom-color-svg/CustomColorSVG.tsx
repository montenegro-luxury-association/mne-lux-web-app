import "./CustomColorSVG.scss";

type Props = {
	src: string;
	className?: string;
};

/**
 * Allows you to use SVGs with custom colors thanks to CSS masks.
 * - Make sure to specify the correct width and height - the defaults are hard-coded and not based on the 'src' image
 *
 */
export default function CustomColorSVG({ src, className }: Props) {
	const maskSource = `url(${src})`;
	const style = {
		maskImage: maskSource,
		WebkitMaskImage: maskSource
	};

	return <span className={`custom-color-svg ${className || ""}`} style={{ ...style }} />;
}
