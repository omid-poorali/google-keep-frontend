
import React from "react";
import { useOutsideRefClick, useCombineRefs, useScrollLock } from "../../hooks";
import { FocusTrap } from "./focusTrap";

type CustomProps = {
	initialFocusRef?: React.RefObject<HTMLElement>;
	focusTrapped?: boolean;
	className?: string;
	open?: boolean;
	onOverlayClick?: () => void;
} & React.ComponentPropsWithoutRef<'div'>;

type PropsType = CustomProps & Omit<React.ComponentPropsWithoutRef<'div'>, keyof CustomProps>;

const ModalComponent = React.forwardRef((props: PropsType, forwardedRef: React.Ref<HTMLDivElement>) => {
	const {
		initialFocusRef = undefined,
		focusTrapped = true,
		className,
		open = false,
		onOverlayClick,
		...rest
	} = props;

	const innerRef = React.useRef<HTMLDivElement>(null);
	const combinedRef = useCombineRefs([innerRef, forwardedRef]);

	useOutsideRefClick(() => {
		onOverlayClick?.();
	}, innerRef);

	// Hook used to manage the scroll
	useScrollLock(innerRef, open, false, open);

	if (open) {
		return (
			<div className='fixed flex justify-center items-center w-full h-full top-0 bottom-0 right-0 left-0 bg-[rgba(0,0,0,0.3)]' >
				<div
					ref={combinedRef}
					className={className}
					{...rest}>
					{focusTrapped && (
						<FocusTrap
							container={innerRef}
							initialFocusRef={initialFocusRef}
						/>
					)}
					{props.children}
				</div>
			</div>
		);
	}

	return null;
});

ModalComponent.displayName = "Modal";
export const Modal = ModalComponent;
