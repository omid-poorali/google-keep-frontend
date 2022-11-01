import { useCallback, useEffect, useState } from "react";

export const useSessionStorage = <T>(key: string, initialValue: T) => {
    const syncValueWithStorage = useCallback(() => {
        try {
            // Get from local storage by key
            const item = window.sessionStorage.getItem(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // If error also return initialValue
            console.log(error);
            return initialValue;
        }
    }, [key, initialValue]);

    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState<T>(syncValueWithStorage);

    useEffect(() => {
        try {
            // Save to local storage
            window.sessionStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue] as const;
};
