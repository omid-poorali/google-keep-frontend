interface propsType {
    children: React.ReactNode;
}

export const Dashboard = ({ children }: propsType) => {
    return (
        <div className="parent md:h-screen md:grid md:grid-cols-6">
            <section className="sidebar bg-green-400 md:col-span-1">Sidebar</section>
            <main className="main md:col-span-5">{children}</main>
        </div>
    )
}