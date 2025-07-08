import { cn } from "@lib/utils";

type MaxWidthWrapperProps = React.HTMLAttributes<HTMLDivElement>;

export default function MaxWidthWrapper(props: MaxWidthWrapperProps) {
	return (
		<div
			className={cn(
				"mx-auto w-11/12 max-w-screen-xl px-2.5 sm:w-full sm:px-20",
				props.className,
			)}
		>
			{props.children}
		</div>
	);
}
