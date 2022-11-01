export const isBrowser = typeof window !== 'undefined';

export const isElementFocused = (el: Element): boolean => document.activeElement === el;

export const isElementVisible = (ele: Element, container: Element, patrial?: boolean) => {
    const { top: eleTop, bottom: eleBottom } = ele.getBoundingClientRect();
    const { top: containerTop, bottom: containerBottom } = container.getBoundingClientRect();

    if (patrial) {
        return (eleTop < containerTop && containerTop < eleBottom) || (eleTop < containerBottom && containerBottom < eleBottom);
    }

    // The element is fully visible in the container
    return (eleTop >= containerTop && eleBottom <= containerBottom);
};
