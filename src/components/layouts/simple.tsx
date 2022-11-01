import { ReactNode } from "react";

interface propsType {
    children: ReactNode;
}

export const Simple = ({ children }: propsType) => {
    return (
        <main className="w-screen h-screen flex justify-center items-center">
            {children}
        </main>
    )
}