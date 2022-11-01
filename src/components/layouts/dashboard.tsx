interface propsType {
    children: React.ReactNode;
}

export const Dashboard = ({ children }: propsType) => {
    return (
        <main>
            {children}
        </main>
    )
}