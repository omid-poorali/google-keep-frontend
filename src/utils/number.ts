export const parseNumber = (x: string): number | null => {
    const parsed = parseFloat(x);
    if (isNaN(parsed)) {
        return null;
    }

    return parsed;
};
