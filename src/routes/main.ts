import { Enums } from "../commons";
import { lazy } from "react";

export type SystemRoute = {
    path: string;
    element: React.LazyExoticComponent<() => JSX.Element>;
    layout: Enums.Layout;
    access: Enums.RouteAccess;
}

export const addNote: SystemRoute = {
    path: "/add-note",
    element: lazy(() => import("../pages/add-note")),
    layout: Enums.Layout.Dashboard,
    access: Enums.RouteAccess.Private
}


export const all = [
    addNote
]