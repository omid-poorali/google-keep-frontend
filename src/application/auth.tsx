import React, { useEffect } from "react";
import * as Utils from "../utils";

type AuthContext = {
    isAuthenticated: boolean;
    loading: boolean;
    login: (payload: { accessToken: string }) => void;
    logout: () => void;
}

const authContext = React.createContext<AuthContext>({
    isAuthenticated: false,
    loading: true,
    login: () => null,
    logout: () => null
});


type PropsType = {
    children: React.ReactNode;
}

type State = {
    isAuthenticated: boolean;
    loading: boolean;
}

export const AuthProvider = ({ children }: PropsType) => {

    const [state, setState] = React.useState<State>({
        isAuthenticated: false,
        loading: true
    });

    const updateState = (newState: Partial<State>) => {
        setState(prevState => ({ ...prevState, ...newState }))
    }

    useEffect(() => {

        updateState({
            isAuthenticated: true,
            loading: false
        });
        // const accessToken = Utils.getCookie("accessToken");
        // if (accessToken) {
        //     updateState({
        //         isAuthenticated: true,
        //         loading: false
        //     });
        // }
        // else {
        //     updateState({
        //         loading: false
        //     });
        // }

    }, []);


    const login = (payload: { accessToken: string }) => {
        Utils.setCookie("accessToken", payload.accessToken);
        updateState({
            isAuthenticated: true,
        });
    }

    const logout = () => {
        Utils.removeCookie("accessToken");
        updateState({
            isAuthenticated: false,
        });
    }

    return (
        <authContext.Provider value={{ ...state, login, logout }}>
            {children}
        </authContext.Provider>
    );
}

export const useAuthContext = () => {
    const context = React.useContext(authContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be used within a AuthProvider");
    }
    return context;
}