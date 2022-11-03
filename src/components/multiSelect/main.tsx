import React, { useEffect, useRef, useState } from "react";
import { useControlled, useOutsideRefClick } from "hooks";
import classnames from "classnames";
import { Icons, IconButton } from 'components';
import * as utils from 'utils';

type Option = {
	label: string;
	value: any;
}

type CustomProps = {
	fullWidth?: boolean;
	className?: string;
	disabled?: boolean;
	options?: Array<Option>;
	filterSelectedOptions?: boolean;
	searchable?: boolean;
	value?: any[];
	defaultValue?: any[];
	onChange?: (_event: { event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>, option?: Option, value: any[] }) => void;
};

type PropsType = CustomProps & Omit<React.ComponentPropsWithoutRef<"input">, keyof CustomProps>

export const MultiSelect = (props: PropsType) => {
	const {
		fullWidth = false,
		className,
		disabled = false,
		options = [],
		value: propValue,
		defaultValue,
		onChange,
	} = props;

	const container = useRef<HTMLDivElement>(null);
	const optionListRef = useRef<HTMLUListElement>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);


	useOutsideRefClick(() => {
		handleClose();
	}, container);


	const [value, setValue] = useControlled<any[]>({
		controlled: propValue,
		default: defaultValue,
		initialValue: [],
	});

	useEffect(() => {
		const newSelectedOptions: Option[] = [];
		const newUnSelectedOptions: Option[] = [];
		for (const option of options) {
			if (isOptionSelected(option)) {
				newSelectedOptions.push(option);
			} else {
				newUnSelectedOptions.push(option);
			}
		}

		setSelectedOptions(() => newSelectedOptions);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	const isOptionSelected = (targetOption: Option): boolean => {
		return value.some(optionValue => {
			if (typeof optionValue === "object") {
				return utils.deepEqualObjects(targetOption.value, optionValue);
			}

			return (targetOption.value === optionValue);
		});
	};

	const handleOptionClick = (event: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLInputElement>, targetOption: Option) => {
		if (!isOptionSelected(targetOption)) {
			const newValue = value.concat([targetOption.value]);
			onChange?.({ event, option: targetOption, value: newValue });
			setValue(newValue);
		}
	};

	const handleDelete = (event: React.MouseEvent<HTMLButtonElement>, targetOption: Option) => {
		event.stopPropagation();
		if (!disabled) {
			const newValue = value.filter(optionValue => optionValue !== targetOption.value);
			onChange?.({ event, option: targetOption, value: newValue });
			setValue(newValue);
		}
	};

	const handleOpen = () => {
		setIsOpen(true);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	const rootClassName = classnames('relative flex flex-col', {
		'w-full': fullWidth,
	}, className);

	const wrapperClassName = "w-full flex flex-row items-center";
	const tagsWrapperClassName = "w-full min-h-[2rem] flex flex-row flex-wrap items-center flex-start";
	const tagClassName = "p-1 m-2 text-sm rounded-xl bg-green-50 cursor-pointer flex items-center justify-center";
	const triggerClassName = "cursor-pointer select-none";
	const optionsClassName = "z-40 bg-white absolute rounded top-full w-full mt-1 shadow-[0px_1px_1px_rgba(9,30,66,0.25),0px_0px_1px_1px_rgba(9,30,66,0.13)]";
	const optionClassName = "cursor-pointer p-2 hover:bg-neutral-50";

	return (

		<div
			ref={container}
			className={rootClassName}>
			<div
				className={wrapperClassName}
				onClick={handleOpen}>

				<span
					onClick={event => {
						event.stopPropagation();
						if (isOpen) {
							handleClose();
						} else {
							handleOpen();
						}
					}}
					className={triggerClassName}>
					<Icons.Label />
				</span>

				<div className={tagsWrapperClassName}>
					{React.Children.toArray(selectedOptions.map(selectedOption => (
						<span onClick={event => event.stopPropagation()} className={tagClassName}>
							{selectedOption.label}

							<IconButton
								className="text-green-500"
								type='button'
								onClick={event => handleDelete(event, selectedOption)} >
								<Icons.Close />
							</IconButton>
						</span>
					)))}
				</div>

			</div>
			{isOpen && options.length > 0 && (
				<ul
					ref={optionListRef}
					role='listbox'
					className={optionsClassName}>
					{React.Children.toArray(options.map((option: Option) => (
						<li
							className={optionClassName}
							onMouseDown={(event: React.MouseEvent<HTMLLIElement>) => handleOptionClick(event, option)}>
							{option.label}
						</li>
					)))}
				</ul>
			)}
		</div>
	);
};
