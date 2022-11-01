import React from "react";
import { useLocalStorage } from "hooks";


export type Settings = {
    printer: {
        paperWidth: string;
    }
}

type SettingsContext = {
    settings: Settings;
    setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

const settingsContext = React.createContext<SettingsContext>({
    settings: {
        printer: {
            paperWidth: '35ch'
        }
    },
    setSettings: () => null
});

export const SettingsProvider = ({ children }: any) => {

    const [settings, setSettings] = useLocalStorage<Settings>("settings", {
        printer: {
            paperWidth: '35ch'
        }
    });

    return (
        <settingsContext.Provider value={{ settings, setSettings }}>
            {children}
        </settingsContext.Provider>
    );
};

export const useSettingsContext = () => {
    const context = React.useContext(settingsContext);
    if (context === undefined) {
        throw new Error("useSettingsContext must be used within a SettingsProvider");
    }
    return context;
};