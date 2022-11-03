import React from "react";

export const Close = (props: React.ComponentProps<'svg'>) => {
    return (
        <svg
            width='10'
            height='10'
            viewBox='0 0 10 10'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}>
            <path d='M2.5 2.5L7.5 7.5M2.5 7.5L7.5 2.5L2.5 7.5Z' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    );
};
