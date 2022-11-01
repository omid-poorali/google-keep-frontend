import React, { useId } from 'react';
import classnames from 'classnames';
import { InputBase } from '../inputBase';
import './main.scss';

type CustomProps = {
	ltr?: boolean;
	error?: boolean;
	fullWidth?: boolean;
	style?: React.CSSProperties;
	className?: string;
	color?: 'primary';
	variant?: 'outlined';
	size?: 'medium';
	disabled?: boolean;
	label?: string;
	helperText?: string;
	endAdornment?: React.ReactNode;
	startAdornment?: React.ReactNode;
};

type PropsType = CustomProps & Omit<React.ComponentPropsWithoutRef<'input'>, keyof CustomProps>

const InputTextComponent = React.forwardRef((props: PropsType, forwardedRef: React.Ref<HTMLInputElement>) => {
	const {
		error = false,
		fullWidth = false,
		style,
		className,
		color = 'primary',
		variant = 'outlined',
		size = 'medium',
		disabled = false,
		label,
		helperText,
		endAdornment,
		startAdornment,
		...rest
	} = props;

	const inputId = useId();

	const rootClassName = classnames('puiInputText',
		`puiInputText--${size}`,
		{
			'puiInputText--fullWidth': fullWidth,
		},
		className);

	const labelClassName = classnames('puiInputText-label',
		`puiInputText-label--${color}-${variant}`,
		`puiInputText-label--${size}`);

	const inputWrapperClassName = classnames('puiInputText-inputWrapper', {
		'puiInputText-inputWrapper--startAdornment': Boolean(startAdornment),
		'puiInputText-inputWrapper--endAdornment': Boolean(endAdornment),
	});

	const helperTextClassName = classnames('puiInputText-helperText',
		`puiInputText-helperText--${color}-${variant}`,
		`puiInputText-helperText--${size}`,
		{
			'puiInputText-helperText--error': error,
			'puiInputText-helperText--invisible': !helperText,
		});

	const startAdornmentClassName = classnames('puiInputText-startAdornment', {
		'puiInputText-startAdornment--disabled': disabled,
	});
	const endAdornmentClassName = classnames('puiInputText-endAdornment', {
		'puiInputText-endAdornment--disabled': disabled,
	});

	return (
		<div style={style} className={rootClassName}>
			{label && <label htmlFor={inputId} className={labelClassName}>{label}</label>}
			<div className={inputWrapperClassName}>
				{startAdornment && (<span className={startAdornmentClassName}>{startAdornment}</span>)}
				<InputBase
					id={inputId}
					ref={forwardedRef}
					fullWidth={fullWidth}
					disabled={disabled}
					color={color}
					variant={variant}
					size={size}
					{...rest}
					type='text'
				/>
				{endAdornment && (<span className={endAdornmentClassName}>{endAdornment}</span>)}
			</div>
			<p className={helperTextClassName}>{helperText ? helperText : "placeholder"}</p>
		</div>
	);
});

InputTextComponent.displayName = "InputText";
export const InputText = InputTextComponent;
