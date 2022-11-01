import React, { useEffect } from 'react';
import classnames from 'classnames';
import { useCombineRefs, useControlled } from 'hooks';

type CustomProps = {
	autoGrowing?: boolean;
};

type PropsType = CustomProps & Omit<React.ComponentPropsWithoutRef<'textarea'>, keyof CustomProps>

const TextareaComponent = React.forwardRef((props: PropsType, forwardedRef: React.Ref<HTMLTextAreaElement>) => {
	const {
		className,
		autoGrowing = false,
		value: propValue,
		defaultValue,
		onChange,
		...rest
	} = props;

	const innerRef = React.useRef<HTMLTextAreaElement>(null);
	const combinedRef = useCombineRefs([innerRef, forwardedRef]);

	const [value, setValue] = useControlled<PropsType['value']>({
		controlled: propValue,
		default: defaultValue,
		initialValue: '',
	});


	useEffect(() => {
		if (autoGrowing) {
			if (innerRef.current) {
				if (innerRef.current.scrollHeight) {
					const scrollHeight = innerRef.current.scrollHeight;
					innerRef.current.style.height = scrollHeight + "px";
				}
			}
		}
	}, [autoGrowing, value]);

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { value } = event.target;
		setValue(value);
		onChange?.(event);
	};

	const textAreaClassName = classnames({
		"resize-none": autoGrowing
	}, className);

	return (
		<textarea
			ref={combinedRef}
			className={textAreaClassName}
			value={value}
			onChange={handleChange}
			{...rest} />
	);
});

TextareaComponent.displayName = "Textarea";
export const Textarea = TextareaComponent;