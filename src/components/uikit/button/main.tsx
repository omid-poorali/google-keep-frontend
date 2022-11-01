import React from 'react';
import classnames from 'classnames';
import './main.scss';

type CustomProps = {
	children?: React.ReactNode;
	className?: string;
	color?: 'primary' | 'neutral';
	size?: 'medium';
	variant?: 'filled';
	disabled?: boolean;
} & React.ComponentPropsWithoutRef<'button'>;

type PropsType = CustomProps & Omit<React.ComponentPropsWithoutRef<'button'>, keyof CustomProps>;

const ButtonComponent = React.forwardRef((props: PropsType, forwardedRef: React.Ref<HTMLButtonElement>) => {
	const {
		children,
		className,
		color = 'primary',
		disabled = false,
		size = 'medium',
		variant = 'filled',
		...rest
	} = props;

	const rootClassName = classnames('puiButton',
		`puiButton--${color}-${variant}`,
		`puiButton--${size}`,
		{ 'puiButton--disabled': disabled },
		className);

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
