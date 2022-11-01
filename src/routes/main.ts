import { Enums } from "../commons";
import { lazy } from "react";

export type SystemRoute = {
    path: string;
    element: React.LazyExoticComponent<() => JSX.Element>;
    layout: Enums.Layout;
    access: Enums.RouteAccess;
}

export const home: SystemRoute = {
    path: "/home",
    element: lazy(() => import("../pages/home")),
    layout: Enums.Layout.Dashboard,
    access: Enums.RouteAccess.Private
}


export const all = [
    home
]