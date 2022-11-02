import React from "react";
import classnames from "classnames";

type CustomProps = {
    className?: string;
    disabled?: boolean;
};

type PropsType = CustomProps & Omit<React.ComponentPropsWithoutRef<'button'>, keyof CustomProps>

const IconButtonComponent = React.forwardRef((props: PropsType, forwardedRef: React.Ref<HTMLButtonElement>) => {
    const {
        className,
        disabled = false,
        ...rest
    } = props;

    const buttonClassName = classnames("p-1 inline-flex justify-center items-center cursor-pointer rounded-full outline-none bg-transparent focus:outline-none",
        {
            "hover:bg-neutral-100 outline-none border-none": !disabled,
        },
        className);

    return (
        <button
            ref={forwardedRef}
            className={buttonClassName}
            disabled={disabled}
            {...rest} />
    );
});

IconButtonComponent.displayName = "IconButton";
export const IconButton = IconButtonComponent;
