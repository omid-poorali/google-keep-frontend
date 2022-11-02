import React from "react";
import { Link } from "react-router-dom";
import { useTags } from "contexts";
import * as Routes from "routes";

interface propsType {
    children: React.ReactNode;
}

export const Dashboard = ({ children }: propsType) => {

    const { tags } = useTags();


    return (
        <div className="parent md:h-screen md:grid md:grid-cols-6">
            <section className="sidebar flex flex-row md:flex-col bg-green-400 md:col-span-1">
                <Link className="w-full p-2 text-center" to="/">All</Link>
                {React.Children.toArray(tags.map(tag => (
                    <Link className="w-full p-2 text-center" to={`${Routes.Main.home.path}?tag=${tag.id}`}>{tag.name}</Link>
                )))}
            </section>
            <main className="main md:col-span-5">{children}</main>
        </div>
    )
}