import React from 'react';
import classnames from 'classnames';

type CustomProps = {
	children?: React.ReactNode;
	className?: string;
	color?: 'primary';
	size?: 'medium';
	variant?: 'text';
	disabled?: boolean;
} & React.ComponentPropsWithoutRef<'button'>;

type PropsType = CustomProps & Omit<React.ComponentPropsWithoutRef<'button'>, keyof CustomProps>;

const ButtonComponent = React.forwardRef((props: PropsType, forwardedRef: React.Ref<HTMLButtonElement>) => {
	const {
		children,
		className,
		color = 'neutral',
		disabled = false,
		size = 'medium',
		variant = 'text',
		...rest
	} = props;


	const rootClassName = classnames({
		"text-neutral-600": color === "neutral",
		"rounded-md py-1 px-3": size === "medium",
		"bg-transparent hover:bg-gray-100": variant === "text"
	}, className);

	return (
		<button
			ref={forwardedRef}
			className={rootClassName}
			disabled={disabled}
			{...rest}
		>
			{children}
		</button>
	);
});

ButtonComponent.displayName = "Button";
export const Button = ButtonComponent;
