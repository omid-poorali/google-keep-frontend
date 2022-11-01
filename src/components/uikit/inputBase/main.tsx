import React from 'react';
import classnames from 'classnames';
import { useControlled } from '../../../hooks';
import './main.scss';

type CustomProps = {
	ltr?: boolean;
	fullWidth?: boolean;
	className?: string;
	color?: 'primary';
	variant?: 'outlined';
	size?: 'medium';
	disabled?: boolean;
};

type PropsType = CustomProps & Omit<React.ComponentPropsWithoutRef<'input'>, keyof CustomProps>

const InputBaseComponent = React.forwardRef((props: PropsType, forwardedRef: React.Ref<HTMLInputElement>) => {
	const {
		ltr = false,
		fullWidth = false,
		className,
		color = 'primary',
		variant = 'outlined',
		size = 'medium',
		disabled = false,
		value: propValue,
		defaultValue,
		onChange,
		...rest
	} = props;

	const [value, setValue] = useControlled<PropsType['value']>({
		controlled: propValue,
		default: defaultValue,
		initialValue: '',
	});

	const inputClassName = classnames('puiInputBase',
		`puiInputBase--${color}-${variant}`,
		`puiInputBase--${size}`,
		{
			'puiInputBase--ltr': ltr && value,
			'puiInputBase--fullWidth': fullWidth,
			'puiInputBase--disabled': disabled,
		},
		className);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setValue(value);
		onChange?.(event);
	};

	return (
		<input
			ref={forwardedRef}
			className={inputClassName}
			disabled={disabled}
			value={value}
			onChange={handleChange}
			{...rest} />
	);
});

InputBaseComponent.displayName = "InputBase";
export const InputBase = InputBaseComponent;
